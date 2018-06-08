import React, {Component} from 'react'
import './global.css'
import './fonts.css'

// Two main parts
import Editor from './Editor.jsx'
import Modals from '../modals/Modals.jsx'

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
