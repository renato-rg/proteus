import React from 'react'

// Field that allows editing and integrates very well with redux
/*

shouldComponentUpdate(nextProps, nextState) {
    return false
}

defaultValue={value}

TODO: use onChange to remove \n from the value, or try onInput synthetic event
 */
class Oneline2 extends React.Component {
    constructor (props) {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onChange = this.onChange.bind(this)
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
        console.log('onKeyDown')
        console.log(e)
        if (e.keyCode == 13) e.preventDefault()
    }
    onChange (e) {
        this.props.onChange(e.target.value)
    }
    onPaste (e) {
        e.preventDefault()
    }
    render () {
        console.log('Rendered Oneline2!')
        const { value, onKeyDown, className, style, placeholder, autoFocus } = this.props
        return (
            <textarea ref={el => this.el = el} autoFocus={autoFocus}
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

export default Oneline2
