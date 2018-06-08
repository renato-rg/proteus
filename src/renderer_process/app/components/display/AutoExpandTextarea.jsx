import React from 'react'

class AutoExpandTextarea extends React.Component {
    constructor (props) {
        super(props)
        this.onChange = ev => {
            this.el.style.height = '0px'
            this.el.style.height = this.el.scrollHeight+'px'
            if(this.props.onChange) this.props.onChange(ev.target.value)
        }
    }
    componentDidMount() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    componentDidUpdate() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    render () {
        const rest = Object.assign({}, this.props)
        delete rest.onChange
        return (
            <textarea ref={el => this.el = el}
                onChange={this.onChange}
                {...rest}
                rows={1}
            />
        )
    }
}

export default AutoExpandTextarea
