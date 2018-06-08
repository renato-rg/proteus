/* ========= Components ========= */
import React, { Component } from 'react'

/* ======== Class Names ======== */
import {
  field,
  primaryColor,
  input, inputFocused,
  label, labelFocused,
  errMsg, invalidColor
} from './styles.css'


const cx = (...classes) => classes.filter(c => typeof c === 'string').join(' ')

export default class Input extends Component {

	constructor(props) {
		super(props)
		this.state = {
      isFocused: false
		}
    this.onFocus = e => {
      this.setState({ isFocused: true })
    }
    this.onBlur = () => {
      this.setState({ isFocused: false })
    }
    this.onChange = e => {
      this.props.onChange(e.target.value)
    }
	}

	render() {
    const { placeholder, validationMsg, type, value = '' } = this.props
    const isEmpty = value === ''

    const inputStyle = cx(
      input,
      this.state.isFocused && inputFocused
    )

    const labelStyle = cx(
      label,
      (!isEmpty || (this.state.isFocused && isEmpty)) && labelFocused,
      this.state.isFocused && primaryColor
    )

    const msgStyle = cx(
      errMsg,
      validationMsg && invalidColor
    )

    return (
      <div className={field}>
        <div className={labelStyle}>{ placeholder }</div>
        <div>
          <input className={inputStyle} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange}
                  type={type||'text'} value={value}/>
          <div className={msgStyle}>{ validationMsg }</div>
        </div>
      </div>
    )
	}
}
