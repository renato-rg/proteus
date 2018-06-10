import React from 'react'
import { noScrollBar } from './AutoHeight.css'

class AutoHeightTextarea extends React.Component {
    constructor (props) {
        super(props)
        this.handleRef = el => {
            this.el = el
            if (this.props.handleRef) this.props.handleRef(el)
        }
        this.onChange = e => {
            if (this.props.onChange)
                this.props.onChange(e.target.value)
            else {
                if (this.el.scrollHeight!==0) {
                    this.el.style.height = '0px'
                    this.el.style.height = this.el.scrollHeight+'px'
                }
            }
        }
    }    
    componentDidMount() {
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
    }
    componentDidUpdate() {
        if (this.el.scrollHeight!==0) {
            this.el.style.height = '0px'
            this.el.style.height = this.el.scrollHeight+'px'
        }
    }

    render () {
        const { value, className = '', style = {}, defaultValue } = this.props
        return (
            <textarea ref={this.handleRef}
                className={noScrollBar + ' ' + className}
                style={style}
                rows={1}

                defaultValue={defaultValue}
                onChange={this.onChange}
                value={value}
                
            />
        )
    }
}

export default AutoHeightTextarea
