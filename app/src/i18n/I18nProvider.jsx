import React, {Component} from 'react'
import Editor from './Editor.jsx'
import Modals from './Modals.jsx'
import { connect } from 'react-redux'
import en from './en.json';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { en }
        this.translate = this.translate.bind(this)
    }

    translate(key) {
        return this.state[this.props.locale][key] || key
    }

    getChildContext() {
        return { translate : this.translate }
    }

    render() {
        return (
            <div>
                <Editor/>
                <Modals/>
            </div>
        )
    }
}

App.childContextTypes = {
    translate: React.PropTypes.func
}

function mapStateToProps(state, props) {
    return {
        locale: state.appState.locale
    }
}
export default connect(mapStateToProps)(App)
