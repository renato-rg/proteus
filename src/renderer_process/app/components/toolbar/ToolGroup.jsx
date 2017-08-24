import React from 'react'
import Tool from './Tool.jsx'

import styles from './styles.css'


const ToolGroup = () => {
    return <div className={styles.toolGroup}>
        <Tool type='folder'/>
        <Tool type='paragraph'/>
        <Tool type='image'/>

        <div style={{borderLeft: '1px solid #bbbbbb', height: '14px'}}/>

        <Tool type='organization'/>
        <Tool type='stakeholder'/>
        <Tool type='meeting'/>

        <div style={{borderLeft: '1px solid #bbbbbb', height: '14px'}}/>

        <Tool type='objective'/>
        <Tool type='actor'/>
        <Tool type='informationReq'/>
        <Tool type='constraintReq'/>
        <Tool type='useCase'/>
        <Tool type='functionalReq'/>
        <Tool type='nonFunctionalReq'/>
        <Tool type='traceabilityMatrix'/>

        <div style={{borderLeft: '1px solid #bbbbbb', height: '14px'}}/>

        <Tool type='objectType'/>
        <Tool type='valueType'/>
        <Tool type='asociation'/>
        <Tool type='systemOperation'/>

        <div style={{borderLeft: '1px solid #bbbbbb', height: '14px'}}/>

        <Tool type='conflict'/>
        <Tool type='defect'/>
        <Tool type='changeRequest'/>


    </div>

}

export default ToolGroup
