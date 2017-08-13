import React from 'react'
import i18n from '../../i18n'
import defaultProps from '../display/defaultProps.json'

const styles = {
    margin: '0',
    padding: '0',
    width: '100%',
    height: 'auto',
    resize: 'none',
    outline: 'none',
    border: 'none'
}

// Field that allows editing and integrates very well with redux
class Editable2 extends React.Component {
    constructor (props) {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onPaste = this.onPaste.bind(this)
    }
    componentDidMount() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    componentDidUpdate() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    onKeyDown (e) {
        if (this.props.introForbidden && e.keyCode == 13) e.preventDefault()
    }
    onPaste (e) {
        if (this.props.introForbidden) e.preventDefault()
    }
    render () {
        const { __, value, type, callback, className } = this.props
        const placeholder = '<'+__(defaultProps[type].placeholder)+'>'
        return (
            <textarea ref={el => this.el = el}
                placeholder={placeholder}
                onKeyDown={this.onKeyDown}
                onPaste={this.onPaste}
                onChange={callback}
                style={styles}
                className={className}
                value={value}
                rows={1}
            />
        )
    }
}

export default i18n(Editable2)
