import React from 'react'
import Oneline2 from './Oneline2.jsx'



const stls = {
    margin: '0',
    padding: '0',
    width: '100%',
    height: 'auto',
    resize: 'none',
    outline: 'none',
    border: 'none',
    fontSize: 'inherit',
    fontFamily: 'inherit'
}
let i=0

// Field that allows editing and integrates very well with redux
class OrderedList extends React.Component {
    constructor (props) {
        super(props)
        this.focused = 0
        this.isFocused = false
        this.onBlur = this.onBlur.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
    }
    onBlur () {
        console.log('onBlur')
        this.isFocused = false
    }
    onFocus () {
        console.log('onFocus')
        this.isFocused = true
    }
    onChange (index) {
        //this.props.onChange
        return newValue => {
            console.log(index, 'onChange', i)
            const copy = this.props.value.slice()
            copy[index] = newValue
            this.props.onChange(copy)
        }
    }
    onKeyDown (index) {
        //this.props.onChange
        return e => {
            console.log(index, 'onKeyDown:', e.key)
            this.focused = index
            if (e.keyCode == 13) {
                e.preventDefault()
                const copy = this.props.value.slice()
                copy.splice(index+1, 0, '')
                this.props.onChange(copy)
                this.focused = index+1
            } else if (e.keyCode == 8 && !e.target.value && this.props.value.length>1) {
                e.preventDefault()
                const copy = this.props.value.slice()
                copy.splice(index, 1)
                this.props.onChange(copy)
                this.focused = index>0?index-1:0
            } else if (e.keyCode == 46 && !e.target.value && index < this.props.value.length-1) {
                e.preventDefault()
                const copy = this.props.value.slice()
                copy.splice(index, 1)
                this.props.onChange(copy)
            }
            // TODO: if cursor is at the end and 46 is pressed concat to next line if index < this.props.value.length-1
            // same when cursor is at the beggining and 8 is pressed concat to previous line if index>0
            // TODO: consider if letting up when
            //  else if (e.keyCode == 38 && index>0) { //UP
            //     this.focused = index-1
            //     this.meowmeows[this.focused].firstElementChild.focus()
            // } else if (e.keyCode == 40 && index<this.props.value.length-1) { //DOWN
            //     this.focused = index+1
            //     this.meowmeows[this.focused].firstElementChild.focus()
            // }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
        console.log(this.focused)
        this.body.children[this.focused].lastElementChild.firstElementChild.focus()
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate:', this.isFocused)
        return this.isFocused
    }
    render () {
        const { className, style } = this.props
        return (
            <table ref={el => this.el = el} onBlur={this.onBlur} onFocus={this.onFocus}>
                <thead>
                    <tr>
                        <th>{'Step'}</th>
                        <th>{'Action'}</th>
                    </tr>
                </thead>
                <tbody ref={b => this.body = b}>
                {this.props.value.map((action, index) =>
                    <tr key={index}>
                        <th>{index+1}</th>
                        <td>
                            <Oneline2 value={action} style={stls}
                                onKeyDown={this.onKeyDown(index)}
                                onChange={this.onChange(index)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

export default OrderedList
