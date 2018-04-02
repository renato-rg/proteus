import React from 'react'

// Field that allows editing and integrates very well with redux
class Oneline extends React.Component {
    constructor (props) {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onPaste = this.onPaste.bind(this)
    }
    componentDidMount() {
        const ayy = () => {
            this.el.style.height = '0px'
            this.el.style.height = this.el.scrollHeight+'px'
        }
        setTimeout(ayy, 200)
    }
    componentDidUpdate() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    onKeyDown (e) {
        if (e.keyCode == 13) e.preventDefault()
    }
    onChange (e) {
        this.props.onChange(e.target.value)
    }
    onPaste (e) {
        e.preventDefault()
    }
    render () {
        const { value, onKeyDown, className, style, placeholder } = this.props
        return (
            <textarea ref={el => this.el = el}
                onKeyDown={onKeyDown || this.onKeyDown}
                onPaste={this.onPaste}
                onChange={this.onChange}
                placeholder={placeholder}
                className={className}
                value={value}
                style={style}
                rows={1}
            />
        )
    }
}

export default Oneline
