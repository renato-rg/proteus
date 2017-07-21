import React, {Component} from 'react'
import { connect } from 'react-redux'
import en from './en';
import es from './es';

const languages = { en, es }

const translate = locale => key => {
    return languages[locale][key] || key
}

export default function i18n(ComponentToTranslate) {

    class ComponentWithTranslations extends Component {
        render() {
            return <ComponentToTranslate {...this.props} {...this.state} __={translate(this.props.locale)}/>
        }
    }

    function mapStateToProps(state, props) {
        return {
            locale : state.appState.locale
        }
    }

    return connect(mapStateToProps)(ComponentWithTranslations)
}
