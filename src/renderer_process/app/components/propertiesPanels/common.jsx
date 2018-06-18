import React from 'react'
import styles from './common.css'

import Edit from 'react-icons/lib/md/edit'

import { T } from '../../i18n'

import AutoHeightTextarea from '../display/AutoHeightTextarea'
import AutoHeightInput from '../display/AutoHeightInput'

export const Chapter = props => {
    return (
        <div className={styles.sectionTitle}>
            <div><T>{props.name}</T></div>
            <div/>
        </div>
    )
}
export const Title = ({text, more = ''}) => {
    return (
        <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center', marginBottom: '10px'}}>
            <Edit style={{color: '#949494', height: 'auto', width: '27px'}}/>
            <div style={{fontSize: '22px', fontWeight: 'bold', marginLeft: '5px'}}>
                <T>{text}</T>{more ? ': ':''}{more ? <T>{more}</T>:null}
            </div>
        </div>
    )
}
export const Subtitle = ({text}) => <div style={{textAlign: 'justify'}}><T>{text}</T></div>

export const Field = ({label, inputs, defaultValue, noMultiline}) => {    
    const Cmp = noMultiline ? AutoHeightInput : AutoHeightTextarea
    return (        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '15px'}}>
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', height: '100%'}}>
                <div style={{ position: 'relative',left: '-100%',marginRight: '10px', fontSize: '12px',
                    fontWeight: '500', paddingTop: '7px'}}>    
                    <T>{label}</T>
                </div>
            </div>
            <Cmp handleRef={i => inputs[label]=i} defaultValue={defaultValue}
                className={styles.input} style={{position:'relative', zIndex:'4'}}/>
        </div>
    </div>
    )
}

export class Button extends React.Component {
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