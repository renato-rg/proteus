import React from 'react'
import Tool from './Tool.jsx'

import styles from './styles.css'

import tinder from '../../assets/tinder.png'
import folder from '../../assets/folder.png'
import paragraph from '../../assets/paragraph.png'
import helios from '../../assets/helios.png'

const ToolGroup = () => {
    return <div className={styles.toolGroup}>
        <Tool src={folder} type='folder'/>
        <Tool src={paragraph} type='paragraph'/>
        <Tool src={tinder} type='tinder'/>
        <Tool src={helios} type='helios'/>
    </div>

}

export default ToolGroup
