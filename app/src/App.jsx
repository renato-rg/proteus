import React, {Component} from 'react'
import { connect } from 'react-redux'
import Editor from './Editor.jsx'
import Manager from './Manager.jsx'

class App extends Component {
    render() {
        if (this.props.projectOpened) {
            return <Editor/>
        } else {
            return <Manager/>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projectOpened: state.projectManager.projectOpened
    }
}

export default connect(mapStateToProps)(App)
