// Electron comunication
const {ipcRenderer, remote} = require('electron')
const {Menu} = remote

import { loadProject, openModal, saveProjectRedux, setAppStateTo, showNotification, setProjectPath, setProjectInfo } from './actions'
import { saveProjectIO, saveProjectAsIO, openProjectIO } from './io'

// React
import React from 'react'
import {render} from 'react-dom'

// Redux for state management
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

// My app
import App from './App.jsx'
import './styles/global.css'
import { readProject } from './io'

//////////////////////////
/// React Application ////
//////////////////////////
let store = createStore(reducers)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

//////////////////////////////
/// IPC with main process ////
//////////////////////////////
// TODO: put all this in a separate file and use constants as events' names: 'OPEN_PROJECT'
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
        store.dispatch( showNotification( { type: 'ERROR', title: '', subtitle: '' } ) )
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


///////////////////
/// Workarounds ///
///////////////////

/* The below chunk will be executed after the react app is rendered */
let nav = document.querySelector('nav')
let main = document.querySelector('main')
let node = document.createElement("SPAN")
let startX, startWidth
const initDrag = (e) => {
   startX = e.clientX
   startWidth = parseInt(window.getComputedStyle(nav).width)
   window.addEventListener('mousemove', doDrag, false)
   window.addEventListener('mouseup', stopDrag, false)
}
const doDrag = (e) => {
   nav.style.width = (startWidth + e.clientX - startX) + 'px'
}
const stopDrag = (e) => {
    window.removeEventListener('mousemove', doDrag, false)
    window.removeEventListener('mouseup', stopDrag, false)
}
node.addEventListener('mousedown', initDrag, false)
main.insertBefore(node, main.children[1])
