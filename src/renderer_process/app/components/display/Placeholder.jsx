import React from 'react'
import i18n from '../../i18n'

const defaultPros = require('./defaultProps.json')

class Placeholder extends React.Component {
    render () {
        const {__, type} = this.props
        return (
            <div>{'<'+__(defaultPros[type].placeholder)+'>'}</div>
        )
    }
}

export default i18n(Placeholder)
