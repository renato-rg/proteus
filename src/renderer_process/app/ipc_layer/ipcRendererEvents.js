// Electron comunication
const {ipcRenderer, remote} = require('electron')
const {Menu, dialog} = remote

import { loadProject, setAppStateTo, showNotification, setProjectPath,
          setProjectInfo, setLocale,
          showExplorer, replaceAllCustomObjects, pushTab } from '../state_manager/actions'
import { saveProjectIO, openProjectIO } from './io'

//////////////////////////////
/// IPC with main process ////
//////////////////////////////
export default function ipcRendererEvents(store) {

    //TODO: load the custom objects
    ipcRenderer.on('open-project', (event, path) => {
        store.dispatch( setAppStateTo( 'LOADING_PROJECT' ) )
        openProjectIO(path)
        .then( result => {
            store.dispatch( setProjectPath(path) )
            store.dispatch( replaceAllCustomObjects(result.customObjects) )
            store.dispatch( loadProject(result.entities) )
            store.dispatch( setProjectInfo(result.project) )
            store.dispatch( setAppStateTo('DEFAULT') )
        })
        .catch( error => {
            store.dispatch( setAppStateTo('UNLOADING_PROJECT') )
            store.dispatch( loadProject({}) )
            store.dispatch( setProjectInfo(undefined) )
            store.dispatch( setAppStateTo('DEFAULT') )
            store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: error.stack} ) )
        } )

    })

    ipcRenderer.on('new-object', () => {
        store.dispatch(pushTab('OBJECT_MANAGER', true))
        return
    })

    ipcRenderer.on('project-properties', () => {
        store.dispatch(pushTab('PROJECT_PROPERTIES', true))
        return
    })

    ipcRenderer.on('show-explorer', (event, show) => {
        if (store.getState().switchDocument.showExplorer != show)
            store.dispatch(showExplorer(show))
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
        const index = process.platform === 'darwin' ? 1 : 0
        for (var item of Menu.getApplicationMenu(null).items[index].submenu.items[9].submenu.items) {
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
