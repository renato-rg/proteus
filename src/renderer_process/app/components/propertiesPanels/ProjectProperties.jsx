import React from 'react'
import styles from './ProjectProperties.css'

import Edit from 'react-icons/lib/md/edit'

import { T } from '../../i18n'

//Redux
import { connect } from 'react-redux'
import { setProjectInfo } from '../../state_manager/actions'


const Chapter = props => {
    return (
        <div className={styles.sectionTitle}>
            <div><T>{props.name}</T></div>
            <div/>
        </div>
    )
}
const Title = ({text}) => {
    return (
        <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center', marginBottom: '10px'}}>
            <Edit style={{color: '#949494', height: 'auto', width: '27px'}}/>
            <div style={{fontSize: '22px', fontWeight: 'bold', marginLeft: '5px'}}>
                <T>{text}</T>
            </div>
        </div>
    )
}
const Subtitle = ({text}) => <div style={{textAlign: 'justify'}}><T>{text}</T></div>
const Field = ({label, inputs, defaultValue}) => {
    return (        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '15px'}}>
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', height: '100%'}}>
                <div style={{ position: 'relative',left: '-100%',marginRight: '10px', fontSize: '12px',
                    fontWeight: '500',display: 'flex',alignItems: 'center',height: '100%'}}>      
                    <T>{label}</T>
                </div>
            </div>
            <input ref={i => inputs[label]=i} defaultValue={defaultValue}
                type={'text'} className={styles.input} style={{position:'relative',zIndex:'4'}}/>
        </div>
    </div>
    )
}

class Button extends React.Component {
    constructor (props) {
        super(props)
        this.state = { isBeingHovered: false, isBeingPressed: false }
        this.onMouseEnter = e => this.setState({ isBeingHovered: true })
        this.onMouseLeave = e => this.setState({ isBeingHovered: false, isBeingPressed: false })
        this.onMouseDown = e => this.setState({ isBeingPressed: true })
        this.onMouseUp = e => this.setState({ isBeingPressed: false })
    }
    render () {
        const {children, onClick, className, pressStyle, hoverStyle} = this.props
        const {onMouseDown, onMouseUp, onMouseEnter, onMouseLeave} = this
        const style = Object.assign({},
            this.props.style,
            (this.state.isBeingPressed) ? pressStyle : {},
            (this.state.isBeingHovered && !this.state.isBeingPressed) ? hoverStyle : {}
        )
        return (
            <div {...{onClick, className, style, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave}}>
                {children}
            </div>
        )
    }
}

/* ================================================ */
/* ============ DISCONNECTED COMPONENT ============ */
/* ================================================ */
export class ObjectManagerDC extends React.Component {
    constructor (props) {
        super(props)
        this.inputs={}
        this.save = e => {
            const data = {childrenIDs: this.props.projectInfo.childrenIDs}
            const labels = ['version', 'creationDate', 'authors', 'name', 'description', 'comments']
            labels.map(label => {
                data[label] = this.inputs[label].value
            })
            console.log(data)
            this.props.setProjectInfo(data)
        }
    }
    render () {
        const {projectInfo} = this.props
        return (
            <div className={styles.objectManager} style={{
                padding: '35px 100px 0px 100px', overflow: 'auto', flex: '1',
                display: this.props.isVisible ? 'flex': 'none'}}>

                <div style={{flex: '1', minWidth: '530px'}}>
                    <Title text='EDIT_PROJECT'/>
                    <Subtitle text='EDIT_PROJECT_SUBTITLE'/>
                    
                    <Chapter name='GENERAL'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['version']} label='version'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['creationDate']} label='creationDate'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['authors']} label='authors'/>

                    <Chapter name='DETAILS'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['name']} label='name'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['description']} label='description'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['comments']} label='comments'/>

                    <div className={styles.finish}>
                        <Button onClick={this.save}
                            hoverStyle={{ backgroundColor: '#576aff' }}
                            pressStyle={{ backgroundColor: '#b8c0ff' }}>
                            <T>SAVE_CHANGES</T>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

/* ======================= */
/* === STORE CONECTION === */
/* ======================= */
const ObjectManager = connect(
    state =>
        ({ projectInfo: state.appState.projectInfo }),
    dispatch =>
        ({ setProjectInfo: data => dispatch(setProjectInfo(data)) })
)(ObjectManagerDC)
export default ObjectManager