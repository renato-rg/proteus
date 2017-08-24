import React from 'react'

// Field that allows editing and integrates very well with redux
/*

shouldComponentUpdate(nextProps, nextState) {
    return false
}

defaultValue={value}

TODO: use onChange to remove \n from the value, or try onInput synthetic event
 */
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

        setInterval(ayy, 1000)
    }
    componentDidUpdate() {
        console.log('\nOld hight:', this.el.style.height)
        console.log('Font family:', this.el.style.fontFamily)
        this.el.style.height = '0px'
        this.el.style.height = this.el.scrollHeight+'px'
        console.log('New hight:', this.el.style.height)
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
        const { value, className, style, placeholder } = this.props
        return (
            <textarea ref={el => this.el = el}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                onPaste={this.onPaste}
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
