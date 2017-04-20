const fs = require('fs')

// Try to use destructuring
const createEmptyProject = (state) => {
    const file = fs.createWriteStream(state.projectPath+'/rem.json')
    file.write(JSON.stringify({
        name: state.projectName,
        template: state.template
    }, null, '\t'))
    file.end()
    fs.mkdirSync(state.projectPath+'/repository')
}

const createDirs = (path, arr, root = false) => {
    let i = 0
    arr.forEach( el => {

        // TODO: el.name as a string could contains not allowed character to name folders

        // Create directory
        fs.mkdirSync(`${path}/${el.name}`)
        // Create rem.json
        const content = JSON.stringify({
            title: el.name,
            index: i,
            type: root ? "document" : "folder"
        }, null, '\t')
        // Save file inside directory
        const file = fs.createWriteStream(`${path}/${el.name}/rem.json`)
        file.write(content)
        file.end()
        // If it has children, do the same
        if(el.hasOwnProperty('children')) {
            createDirs(`${path}/${el.name}`, el.children)
        }
        i+=1
    })
}

const createMadejaProject = ({projectName, template, projectPath}) => {
    // Project's file definition
    // TODO: add more fields so it can look like REM project's xml files
    const file = fs.createWriteStream(projectPath+'/rem.json')
    file.write(JSON.stringify({
        name: projectName,
        template: template
    }, null, '\t'))
    file.end()

    // Folder where the whole tree will be
    fs.mkdirSync(projectPath+'/repository')
    fs.mkdirSync(projectPath+'/repository/assets')

    projectPath += '/repository'

    // TODO: First level should be Docs, the others, folder.
    // Like this, we get rid of an explicit "type" property
    const project = [{
        name: 'Documento 1',
        children: [{
            name: 'Introducción',
            children: [{
                name: 'Alcance'
            }, {
                name: 'Objetivos'
            }]
        }, {
            name: 'Información sobre el dominio del problema',
            children: [{
                name: 'Introducción al dominio del problema'
            }, {
                name: 'Glosario de términos del domonio del problema'
            }]
        }, {
            name: 'Descripción de la situación actual',
            children: [{
                name: 'Pros y contras de la situación actual',
                children: [{
                    name: 'Fortalezas de la situación actual'
                }, {
                    name: 'Debilidades de la situación actual'
                }]
            }, {
                name: 'Modelos de proceso de negocio actuales',
                children: [{
                    name: 'Descripción de actores de negocio actuales'
                }, {
                    name: 'Descripción de procesos de negocio actuales'
                }]
            }, {
                name: 'Entorno tecnológico actual',
                children: [{
                    name: 'Descripción del entorno de hardware actual'
                }, {
                    name: 'Descripción del entorno de software actual'
                }]
            }]
        }, {
            name: 'Necesidades de negocio',
            children: [{
                name: 'Objetivos de negocio'
            }, {
                name: 'Modelos de procesos de negocio a implantar',
                children : [{
                    name: 'Descripción de actores de negocio a implantar'
                }, {
                    name: 'Descripción de procesos de negocio a implantar'
                }]
            }]
        }, {
            name: 'Descripción de los subsistemas del sistema a desarrollar'
        }, {
            name: 'Catálogo de requisitos del sistema a desarrollar',
            children: [{
                name: 'Requisitos generales del sistema'
            }, {
                name: 'Casos de uso del sistema',
                children : [{
                    name: 'Diagramas de casos de uso del sistema'
                }, {
                    name: 'Especificación de actores del sistema'
                }, {
                    name: 'Especificación de casos de uso del sistema'
                }]
            }, {
                name: 'Requisitos funcionales del sistema',
                children : [{
                    name: 'Requisitos de información del sistema'
                }, {
                    name: 'Requisitos de reglas de negocio'
                }, {
                    name: 'Requisitos de conducta del sistema'
                }]
            }, {
                name: 'Requisitos no funcionales del sistema',
                children : [{
                    name: 'Requisitos de fiabilidad del sistema'
                }, {
                    name: 'Requisitos de usabilidad de sistema'
                }, {
                    name: 'Requisitos de mantenibilidad del sistema'
                }, {
                    name: 'Requisitos de eficiencia del sistema'
                }, {
                    name: 'Requisitos de portabilidad del sistema'
                }, {
                    name: 'Requisitos de seguridad del sistema'
                }, {
                    name: 'Otros requisitos no funcionales del sistema'
                }]
            }, {
                name: 'Restricciones técnicas del sistema'
            }, {
                name: 'Requisitos de integración del sistema'
            }, {
                name: 'Información sobre trazabilidad'
            }]
        }, {
            name: 'Actas de reuniones'
        }, {
            name: 'Documentación relevante'
        }, {
            name: 'Glosario de acrónimos y abreviaturas'
        }]
    }]
    createDirs(projectPath, project, true)
}

export function readProject (projectPath) {
    const repoPath = projectPath + '/repository'

    const isDirectory = (path) => {
        return fs.statSync(path).isDirectory()
    }

    // Here you can add aditional fields
    const getJSON = (path) => {
        const res = JSON.parse(fs.readFileSync(path))
        res.showChildren = true
        return res
    }

    const getChildren = (dir) => {
        const children = fs.readdirSync(dir).filter( name => name != 'rem.json').map( node => {
            const nodePath = dir + '/' + node

            if ( isDirectory(nodePath) ) {
                const innerDirectory = getJSON(nodePath + '/rem.json')
                innerDirectory.children = getChildren(nodePath)
                return innerDirectory
            } else {
                return getJSON(nodePath)
            }
        })
        return children.sort((a,b) => a.index - b.index)
    }

    const documents = fs.readdirSync(repoPath)
                        .filter( name => name != 'assets')
                        .map( dir =>  {
                                dir = repoPath + '/' + dir
                                const doc = getJSON(dir + '/rem.json')
                                doc.children = getChildren(dir)
                                return doc
                            })
                        .sort((a,b) => a.index - b.index)
    console.log(JSON.stringify(documents));
    return documents
}

const handleCreationErrors = (func, state) => {
    try {
        func(state)
        return {error: false}
    } catch (e) {
        // Handle every possible writing error and customize the message
        return {error: true, messsage: e}
    }
}

export function createProject (state, callback) {
    let status = {}
    switch (state.template) {
        case 'empty':
            status = handleCreationErrors(createEmptyProject, state)
            break;
        case 'madeja':
            status = handleCreationErrors(createMadejaProject, state)
            break;
        default:
            status = { error: true, message: `Template "${state.template}" not supported.`}
            break;
    }
    callback(status)
}
