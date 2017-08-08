import React from 'react'

const Document = require('react-icons/lib/go/repo')
const Doc_Config = require('react-icons/lib/go/three-bars')
const Paragraph = require('react-icons/lib/go/file-text')
const Folder = require('react-icons/lib/go/file-directory')
const Opened = require('react-icons/lib/go/chevron-down')
const Closed = require('react-icons/lib/go/chevron-right')
const Plus = require('react-icons/lib/go/plus')
const Default = () => <div></div>

// TODO: Poner esto en un archivo separado e importarlo
const resolveIcon = (type = '') => {
    switch (type.toUpperCase()) {
        case 'PARAGRAPH':
            return Paragraph
        case 'USECASE':
            return Paragraph
        case 'USECASESTEP':
            return Paragraph
        case 'FOLDER':
            return Folder
        case 'OPENED':
            return Opened
        case 'CLOSED':
            return Closed
        case 'DOCUMENT':
            return Document
        case 'DOC_CONFIG':
            return Doc_Config
        case 'PLUS':
            return Plus
        default:
            return Default
    }
}

const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: '0'
}

const Icon = props => {
    const {type, size, styles, containerSize, containerStyle} = props
    const joinedStyle = Object.assign({height: containerSize, width: containerSize}, container, containerStyle)
    const Resolved = resolveIcon(type)
    return (
        <div style={joinedStyle}>
            <Resolved size={size} style={styles}/>
        </div>
    )
}

Icon.defaultProps = {
    size: '15px'
}

export default Icon
