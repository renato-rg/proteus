import React from 'react'

import DockRight from './DockRight.jsx'
import DockLeft from './DockLeft.jsx'
const Document = require('react-icons/lib/md/content-paste')
const Doc_Config = require('react-icons/lib/md/more-vert')
const Paragraph = require('react-icons/lib/go/file-text')
const Folder = require('react-icons/lib/go/file-directory')
const Opened = require('react-icons/lib/go/chevron-down')
const Closed = require('react-icons/lib/go/chevron-right')
const Plus = require('react-icons/lib/md/add')
const TrashCan = require('react-icons/lib/go/trashcan')
const ArrowLeft = require('react-icons/lib/md/arrow-back')
const SectionOpened = require('react-icons/lib/md/signal-cellular-4-bar')
const SectionClosed = require('react-icons/lib/md/signal-cellular-null')
const BlankBox = require('react-icons/lib/md/check-box-outline-blank')
const CheckedBox = require('react-icons/lib/md/check-box')
const Close = require('react-icons/lib/md/close')
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
        case 'TRASHCAN':
            return TrashCan
        case 'DOCKRIGHT':
            return DockRight
        case 'DOCKLEFT':
            return DockLeft
        case 'ARROW_LEFT':
            return ArrowLeft
        case 'SECTION_OPENED':
            return SectionOpened
        case 'SECTION_CLOSED':
            return SectionClosed
        case 'BLANK_BOX':
            return BlankBox
        case 'CHECKED_BOX':
            return CheckedBox
        case 'CLOSE':
            return Close
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
    const {type, size, styles, containerSize, clssNm, containerStyle, onClick} = props
    const joinedStyle = Object.assign({height: containerSize, width: containerSize}, container, containerStyle)
    const Resolved = resolveIcon(type)
    return (
        <div style={joinedStyle} onClick={onClick}>
            <Resolved size={size} style={styles} className={clssNm}/>
        </div>
    )
}

Icon.defaultProps = {
    size: '15px'
}

export default Icon
