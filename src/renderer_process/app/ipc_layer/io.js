const fs = require('fs')
const path = require('path')

export function openProjectIO (projectPath) {
    return new Promise( (resolve, reject) => {

        // Load Project info and custom Objects
        const projectAbsolutePath = path.join(projectPath, 'rem.json')
        const project = JSON.parse(fs.readFileSync(projectAbsolutePath))
        let customObjects = {}
        if (project.customObjects) {
            customObjects.names = Object.keys(project.customObjects)
            customObjects.details = project.customObjects
            delete project.customObjects
        }

        // Load the rest: documents, objects...
        const entities = {}
        fs.readdirSync(projectPath + '/objects').map( filename => {
            const entityAbsolutePath = path.join(projectPath, 'objects', filename)
            const res = JSON.parse(fs.readFileSync(entityAbsolutePath))
            entities[res.nodeID] = res
        })

        // End of Promise
        resolve({project, entities, customObjects})
    })
}

export function saveProjectIO (state, payload) {
    return new Promise( (resolve, reject) => {
        const entities = state.entities
        const projectInfo = state.appState.projectInfo
        projectInfo.customObjects = {}
        Object.keys(state.classes.details)
            .filter(o => ['document','folder','paragraph','image'].indexOf(o) < 0)
            .map(o => projectInfo.customObjects[o] = state.classes.details[o])

        const projectPath = payload.newPath || state.appState.projectPath

        // Creates rem.json, /assets and /objects
        const projectAbsolutePath = path.join(projectPath, 'rem.json')
        fs.writeFileSync(projectAbsolutePath, JSON.stringify(projectInfo, null, 2))
        if (payload.init) {
            fs.mkdirSync(projectPath+'/assets')
            fs.mkdirSync(projectPath+'/objects')
        }

        // Save entities into /objects
        for ( let id in entities) {
            const entity = entities[id]
            const entityAbsolutePath = path.join(projectPath, 'objects', entity.nodeID+'.json')
            fs.writeFileSync(entityAbsolutePath, JSON.stringify(entity, null, 2))
        }

        // End of Promise
        resolve()
    })
}
