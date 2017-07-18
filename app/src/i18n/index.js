import React, {Component} from 'react'
import en from './en.json';

// TODO: it should load the languages .json on demand and garbage collect the unused ones
const languages = {
    en
}

const translate = locale => key => {
    return languages[locale][key] || key
}

export default function i18n(ComponentToTranslate) {
    
    class ComponentWithTranslations extends Component {
        render() {
            return <ComponentToTranslate {...this.props} {...this.state} __={translate(this.context.locale)}/>;
        }
    }

    ComponentWithTranslations.contextTypes = {
        locale: React.PropTypes.string
    }

    return ComponentWithTranslations
}
