import React from 'react'
import Tool from './Tool.jsx'

//Redux
import { connect } from 'react-redux'

import styles from './styles.css'

import folderPNG from '../../assets/img/folder.png'
import paragraphPNG from '../../assets/img/paragraph.png'
import imagePNG from '../../assets/img/image.png'

const ToolGroup = props => {
    return <div className={styles.toolGroup}>

        {/*<Tool type='traceabilityMatrix'/>
        <Tool type='objectType'/>
        <Tool type='valueType'/>
        <Tool type='asociation'/>
        <Tool type='systemOperation'/>*/}

        <Tool type='folder'/>
        <Tool type='paragraph'/>
        <Tool type='image'/>

        <div style={{borderLeft: '1px solid #bbbbbb', height: '14px'}}/>

        {props.classesNames.map(name =>
          <Tool key={name} type={name} projectPath={props.projectPath}/>
        )}

    </div>

}

const mapStateToProps = state => {
    return {
        classesNames: Object.keys(state.classes.details).filter(n => ['document', 'folder', 'paragraph', 'image'].indexOf(n) < 0),
        projectPath: state.appState.projectPath
    }
}

export default connect(mapStateToProps, null)(ToolGroup)
