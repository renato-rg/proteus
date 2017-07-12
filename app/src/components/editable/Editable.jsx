import React, {Component} from 'react'
import styles from './styles.css'

// Choose what html tag use for Editable
const Tag = (props) => {
    if (props.type == 'td') {
        return <td {...props}>{props.children}</td>
    } else {
        return <div {...props}>{props.children}</div>
    }
}

// Field that allows editing and integrates very well with redux
const Editable = (props) => {
    const { type, callback } = props
    return <Tag type = {type}
        className = {styles.outlineNone}
        contentEditable = {true}
        onKeyUp = {callback}>{props.children}</Tag>
}

export default Editable
