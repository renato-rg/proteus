import React, {Component} from 'react'
import Editor from './Editor.jsx'
import Modals from './Modals.jsx'
import { connect } from 'react-redux'

class App extends Component {
    getChildContext() {
        return { locale : this.props.locale }
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
    locale: React.PropTypes.string
}

function mapStateToProps(state, props) {
    return {
        locale: state.appState.locale
    }
}
export default connect(mapStateToProps)(App)
