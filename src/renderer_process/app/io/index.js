const fs = require('fs')
const path = require('path')

// Creates an empty REM project
const createEmptyProject = ({projectName, template, projectPath}) => {
    const file = fs.createWriteStream(projectPath+'/rem.json')
    file.write(JSON.stringify({
        name: projectName,
        template: template
    }, null, '\t'))
    file.end()
    fs.mkdirSync(projectPath+'/assets')
    fs.mkdirSync(projectPath+'/objects')
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
            type: root ? 'document' : 'folder'
        }, null, '\t')
        // Save file inside directory
        const file = fs.createWriteStream(`${path}/${el.name}/rem.json`)
        file.write(content)
        file.end()
        // If it has children, do the same
        if (el.hasOwnProperty('children'))
            createDirs(`${path}/${el.name}`, el.children)
        i+=1
    })
}

const createMadejaProject = ({projectName, template, projectPath}) => {
    // Project's file definition
    createEmptyProject({projectName, template, projectPath})
    // TODO: First level is for Docs, this way we get rid of an 'type' property
    const templateStructure = [{
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
    createDirs(projectPath+'/objects', templateStructure, true)
}

export function readProjectSync (projectPath) {
    let currentID = 0
    const nextID = () => ++currentID
    const isDirectory = path => fs.statSync(path).isDirectory()
    // Here you can add aditional fields
    const getJSON = path => {
        const res = JSON.parse(fs.readFileSync(path))
        res.showChildren = res.type=='document' ? true: false
        return res
    }

    const project = {}
    const getChildrenIDs = dir => {
        const childrenIDs = []
        fs.readdirSync(dir).filter( name => name != 'rem.json').map( node => {
            const nodePath = dir + '/' + node

            if ( isDirectory(nodePath) ) {
                const innerDirectory = getJSON(nodePath + '/rem.json')
                innerDirectory.childrenIDs = getChildrenIDs(nodePath)
                return innerDirectory
            } else {
                const res = getJSON(nodePath)
                // If it has nested objects, normalize them
                if(res.children!=undefined){
                    const nestedChildrenIDs = []
                    res.children.forEach( nestedNode => {
                        nestedNode.nodeID = nextID()
                        nestedNode.childrenIDs = []
                        project[currentID] = nestedNode
                        nestedChildrenIDs.push(currentID)
                    })
                    delete res.children
                    res.childrenIDs = nestedChildrenIDs
                }
                return res
            }
        }).sort((a,b) => a.index - b.index).forEach(node => {
            delete node.index
            node.nodeID = nextID()
            project[currentID] = node
            childrenIDs.push(currentID)
        })
        return childrenIDs
    }
    //Load Project Object
    const projectObj = getJSON(projectPath + '/rem.json')
    projectObj.childrenIDs = getChildrenIDs(projectPath + '/objects')
    project['PROJECT'] = projectObj
    return project
}

export function readProject (projectPath) {
    return new Promise( (resolve, reject) => {
        const project = readProjectSync(projectPath)
        resolve(project)
    })
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
            break
        case 'madeja':
            status = handleCreationErrors(createMadejaProject, state)
            break
        default:
            status = { error: true, message: `Template "${state.template}" not supported.`}
            break
    }
    callback(status)
}

///////////////////////////////////////////////////////////////////////////////

export function openProjectIO (projectPath) {
    return new Promise( (resolve, reject) => {

        // Load Project Object
        const projectAbsolutePath = path.join(projectPath, 'rem.json')
        const project = JSON.parse(fs.readFileSync(projectAbsolutePath))

        // Load the rest: documents, objects...
        const entities = {}
        fs.readdirSync(projectPath + '/objects').map( filename => {
            const entityAbsolutePath = path.join(projectPath, 'objects', filename)
            const res = JSON.parse(fs.readFileSync(entityAbsolutePath))
            entities[res.nodeID] = res
        })

        // End of Promise
        resolve({project, entities})
    })
}

export function saveProjectIO (state) {
    return new Promise( (resolve, reject) => {
        const {projectPath, projectInfo} = state.appState
        const entities = state.entities

        // Update project file
        const projectAbsolutePath = path.join(projectPath, 'rem.json')
        fs.writeFileSync(projectAbsolutePath, JSON.stringify(projectInfo, null, 2))

        // Update entities
        for ( let id in entities) {
            const entity = entities[id]
            const entityAbsolutePath = path.join(projectPath, 'objects', entity.nodeID+'.json')
            fs.writeFileSync(entityAbsolutePath, JSON.stringify(entity, null, 2))
        }

        // End of Promise
        resolve()
    })
}

export function saveProjectAsIO (state, newPath) {
    return new Promise( (resolve, reject) => {
        const entities = state.entities
        const projectInfo = state.appState.projectInfo

        // Creates rem.json, /assets and /objects
        const projectAbsolutePath = path.join(newPath, 'rem.json')
        fs.writeFileSync(projectAbsolutePath, JSON.stringify(projectInfo, null, 2))
        fs.mkdirSync(newPath+'/assets')
        fs.mkdirSync(newPath+'/objects')

        // Save entities into /objects
        for ( let id in entities) {
            const entity = entities[id]
            const entityAbsolutePath = path.join(newPath, 'objects', entity.nodeID+'.json')
            fs.writeFileSync(entityAbsolutePath, JSON.stringify(entity, null, 2))
        }

        // End of Promise
        resolve()
    })
}
