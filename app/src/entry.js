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

// AntD
// import { LocaleProvider } from 'antd'
// import enUS from 'antd/lib/locale-provider/en_US'


let store = createStore(reducers)

render(
    // <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    // </LocaleProvider>
    ,
    document.getElementById('app')
)

/* This chunk will be executed after the react app is rendered */
console.log("Workarounds go here :'D")

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


/////////////////////////
// IPC with main process
////////////////////////

ipcRenderer.on('open-project', (event, arg) => {
    store.dispatch(openProject(arg))
})

ipcRenderer.on('new-project-form', _ => {
    store.dispatch(openModal('NEW_PROJECT'))
});
