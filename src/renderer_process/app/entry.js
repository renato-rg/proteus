// React app
import React from 'react'
import {render} from 'react-dom'
import App from './components/base_layout/App.jsx'

// Redux state manager
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './state_manager/reducers'

// Electron IPC communication events
import ipcRendererEvents from './ipc_layer/ipcRendererEvents'

//////////////////////////
/// React Application ////
//////////////////////////
export let store = createStore(reducers)
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

//////////////////////////////
/// IPC with main process ////
//////////////////////////////
ipcRendererEvents(store)

///////////////////
/// Workarounds ///
///////////////////
/* The chunk below will be executed after the react app is rendered */
import {resizer} from './components/base_layout/layout.css'
let nav = document.querySelector('nav')
let node = document.querySelector('.'+resizer)
let startX, startWidth
const initDrag = e => {
   startX = e.clientX
   startWidth = parseInt(window.getComputedStyle(nav).width)
   window.addEventListener('mousemove', doDrag, false)
   window.addEventListener('mouseup', stopDrag, false)
}
const doDrag = e => {
    const newWidth = (startWidth + e.clientX - startX)
    nav.style.width = (newWidth < 200 ? 200 : (newWidth > 400 ? 400: newWidth) ) + 'px'
}
const stopDrag = e => {
    window.removeEventListener('mousemove', doDrag, false)
    window.removeEventListener('mouseup', stopDrag, false)
}
node.addEventListener('mousedown', initDrag, false)
