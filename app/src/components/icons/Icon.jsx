import React from 'react'

var Paragraph = require('react-icons/lib/go/file-text')
var Folder = require('react-icons/lib/go/file-directory')

// TODO: Poner esto en un archivo separado e importarlo
const resolveIcon = (type) => {
    switch (type.toUpperCase()) {
        case 'PARAGRAPH':
            return Paragraph
        case 'FOLDER':
            return Folder
        default:
            return Paragraph
    }
}


const Icon = (props) => {
    const {type, size} = props
    const Resolved = resolveIcon(type)
    return <Resolved size={size} style={{marginRight: '9px'}}/>
}

Icon.defaultProps = {
    size: '15px'
}

export default Icon
