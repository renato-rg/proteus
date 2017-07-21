// Electron comunication
const {ipcRenderer, remote} = require('electron')
const {Menu} = remote

import { loadProject, openModal, setAppStateTo, showNotification, setProjectPath,
            setProjectInfo, setLocale } from '../state_manager/actions'
import { saveProjectIO, saveProjectAsIO, openProjectIO } from '../io'

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
            Menu.getApplicationMenu(null).items[0].submenu.items[5].enabled = true
            Menu.getApplicationMenu(null).items[0].submenu.items[6].enabled = true
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
        })
        .catch( error => {
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
            store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: error.stack} ) )
        } )

    })

    ipcRenderer.on('new-project-form', _ => {
        store.dispatch(openModal('NEW_PROJECT'))
    })

    ipcRenderer.on('menu-save', _ => {
        // TODO: use the constants from its reducer
        store.dispatch( setAppStateTo( 'SAVING_PROJECT' ) )
        saveProjectIO( store.getState() )
        .then( _ => {
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
        } )
        .catch( error => {
            store.dispatch( setAppStateTo( 'DEFAULT' ) )
            store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: '' } ) )
        } )
    })

    ipcRenderer.on('menu-save-as', (event, newPath) => {
        // TODO: use the constants from its reducer
        store.dispatch( setAppStateTo( 'SAVING_PROJECT' ) )
        saveProjectAsIO( store.getState(), newPath )
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
