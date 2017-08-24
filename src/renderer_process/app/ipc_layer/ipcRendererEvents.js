// Electron comunication
const {ipcRenderer, remote} = require('electron')
const {Menu, dialog} = remote
import uuid from 'uuid/v1'

import { loadProject, setAppStateTo, showNotification, setProjectPath,
            setProjectInfo, setLocale, mergeNodes, insertDocIDs } from '../state_manager/actions'
import { saveProjectIO, openProjectIO } from '../io'

import templates from '../constants/templates/'
import entities from '../constants/entities/'

//////////////////////////////
/// IPC with main process ////
//////////////////////////////
// TODO: Use constants as events' names: 'OPEN_PROJECT'
export default function ipcRendererEvents(store) {

    ipcRenderer.on('open-project', (event, path) => {
        store.dispatch( setAppStateTo( 'LOADING_PROJECT' ) )
        openProjectIO(path)
        .then( result => {
            store.dispatch( setProjectPath( path ) )
            store.dispatch( loadProject( result.entities ) )
            store.dispatch( setProjectInfo( result.project ) )
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
        })
        .catch( error => {
            store.dispatch( setAppStateTo( 'UNLOADING_PROJECT' ) )
            store.dispatch( loadProject( {} ) )
            store.dispatch( setProjectInfo( undefined ) )
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
            store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: error.stack} ) )
        } )

    })

    const recursive = (template = []) => {
        let nodes = {}
        const nodeIDs = []
        template.forEach( obj => {

            const res = recursive(obj.children)
            const accNodes = res.nodes
            const accDocIDs = res.nodeIDs

            const nodeID = uuid()
            const node = Object.assign({}, entities(obj.type),
                {nodeID, childrenIDs: accDocIDs, title: obj.name})

            nodes = Object.assign({}, nodes, accNodes)
            nodes[nodeID] = node
            nodeIDs.push(nodeID)
        })
        return {nodes, nodeIDs}
    }

    ipcRenderer.on('menu-add-template', (event, type) => {
        const {nodes, nodeIDs} = recursive(templates(type))
        store.dispatch(mergeNodes(nodes))
        store.dispatch(insertDocIDs(nodeIDs))
    })

    ipcRenderer.on('menu-save', (event, title) => {
        let init = false
        if (store.getState().appState.projectPath===''){
            init = true
            const newPath = dialog.showOpenDialog({
                title: title,
                properties: [ 'openDirectory' ]
            })
            store.dispatch( setProjectPath(newPath[0]) )
        }

        store.dispatch( setAppStateTo( 'SAVING_PROJECT' ) )
        saveProjectIO( store.getState(), {init} )
        .then( _ => {
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
        } )
        .catch( error => {
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
            store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: '' } ) )
        } )
    })

    ipcRenderer.on('menu-save-as', (event, newPath) => {
        store.dispatch( setAppStateTo( 'SAVING_PROJECT' ) )
        saveProjectIO( store.getState(), {newPath, init: true} )
        .then( _ => {
            ipcRenderer.send('load-project-in-new-window', newPath)
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
        } )
        .catch( error => {
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
            store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: '' } ) )
        } )
    })

    ipcRenderer.on('menu-language', (event, {language, code})  => {
        // Unchecks the other items
        for (var item of Menu.getApplicationMenu(null).items[0].submenu.items[8].submenu.items) {
            if (item.label != language) {
                item.checked = false
                item.enabled = true
            } else {
                item.checked = true
                item.enabled = false
            }
        }
        store.dispatch(setLocale(code))
        ipcRenderer.send('menu-language-updated', {language, code})
    })
}
