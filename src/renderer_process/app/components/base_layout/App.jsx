import React, {Component} from 'react'
import './global.css'

// Two main parts
import Editor from './Editor.jsx'
import Modals from '../modals/Modals.jsx'

// React-dnd context
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


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

export default DragDropContext(HTML5Backend)(App)
