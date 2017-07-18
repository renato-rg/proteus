import React, {Component} from 'react'
import { connect } from 'react-redux'

export default function i18n(ComponentToTranslate) {

    class ComponentWithTranslations extends Component {
        render() {
            return <ComponentToTranslate {...this.props} {...this.state} __={this.context.translate(this.props.locale)}/>
        }
    }

    ComponentWithTranslations.contextTypes = {
        translate: React.PropTypes.func
    }

    function mapStateToProps(state, props) {
        return {
            locale : state.appState.locale
        }
    }

    return connect(mapStateToProps)(ComponentWithTranslations)
}
