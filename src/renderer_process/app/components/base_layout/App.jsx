import React, {Component} from 'react'

import Editor from './Editor.jsx'
import Modals from '../modals/Modals.jsx'

import './global.css'

class App extends Component {
    render() {
        return (
            <div>
                <Editor/>
                <Modals/>
            </div>
        )
    }
}

export default App
