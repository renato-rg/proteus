import React from 'react'

var Document = require('react-icons/lib/go/book')
var Paragraph = require('react-icons/lib/go/file-text')
var Folder = require('react-icons/lib/go/file-directory')
var Opened = require('react-icons/lib/go/chevron-down')
var Closed = require('react-icons/lib/go/chevron-right')

// TODO: Poner esto en un archivo separado e importarlo
const resolveIcon = (type = '') => {
    switch (type.toUpperCase()) {
        case 'PARAGRAPH':
            return Paragraph
        case 'FOLDER':
            return Folder
        case 'OPENED':
            return Opened
        case 'CLOSED':
            return Closed
        case 'DOCUMENT':
            return Document
        default:
            return Paragraph
    }
}


const Icon = (props) => {
    const {type, size, color} = props
    const Resolved = resolveIcon(type)
    return <Resolved size={size} style={{marginRight: '9px', color}}/>
}

Icon.defaultProps = {
    size: '15px',
    color: 'inherit'
}

export default Icon
