// Electron comunication
var {ipcRenderer} = require('electron')
import { openProject, openModal } from './actions'

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

ipcRenderer.on('open-project', (event, arg) => {
    store.dispatch(openProject(arg))
})

ipcRenderer.on('new-project-form', _ => {
    store.dispatch(openModal('NEW_PROJECT'))
});


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
