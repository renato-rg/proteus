import React from 'react'

// Field that allows editing and integrates very well with redux
class Multiline extends React.Component {
    constructor (props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    componentDidUpdate() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    onChange (e) {
        this.props.onChange(e.target.value)
    }
    render () {
        const { value, className, style, placeholder } = this.props
        return (
            <textarea ref={el => this.el = el}
                placeholder={placeholder}
                onChange={this.onChange}
                className={className}
                style={style}
                value={value}
                rows={1}
            />
        )
    }
}

export default Multiline
