import React from 'react'
import Icon from '../icons/Icon.jsx'
import { scrollbar } from './styles.css'


import propTypes from '../../constants/propTypes/'
import resolveREMIcon from '../icons/resolveREMIcon'

// div (classname: editpanel) > section > div (className: label) > div height toggle 0:inherit
const Details = props => {
    let {__, node, hidePropertiesPanel, update, includeField} = props
    //
    // const updateIn = fieldPath => event => {
    //     update(node.nodeID, fieldPath, event.target.value)
    // }

    const short = 'short_of_'+node.type
    const id = __(short) === short ? '' : `[${__(short)}] `

    return (
        <nav style={nav}>
            <div style={header}>
                <Icon containerSize='32px' type='ARROW_LEFT' size='19px'
                    containerStyle={{background: '#6b9fff', color: 'white', cursor: 'pointer'}}
                    onClick={hidePropertiesPanel}/>
                <img src={resolveREMIcon(node.type)} style={{margin: '0px 8px 0px 10px'}}/>
                <div style={title}>{id}{node.title}</div>
            </div>
            <div className={scrollbar} style={body}>
                {Object.keys(propTypes(node.type))
                .map( section =>
                    <Section key={section} payload={node[section]}
                        {... {__, section, includeField, type: node.type, nodeID: node.nodeID}}/>
                )}
            </div>
        </nav>
    )
}

class Section extends React.Component {
    constructor (props) {
        super(props)
        this.state = { expanded : this.props.section === 'general' }
        this.checkBoxHandler = this.checkBoxHandler.bind(this)
        this.toggleFields = this.toggleFields.bind(this)
    }
    toggleFields () {
        this.setState({expanded: !this.state.expanded})
    }
    checkBoxHandler (section, property) {
        return e => {
            this.props.includeField(this.props.nodeID, section, property, e.target.checked)
        }
    }

    render () {
        const {__, section, payload={}, type} = this.props
        const { expanded } = this.state
        const iconType = expanded ? 'SECTION_OPENED' : 'SECTION_CLOSED'
        const iconStyle = expanded ? {} : {transform: 'rotate(-45deg)'}
        return (
            <section style={sectionContainer}>
                <div onClick={this.toggleFields} style={sectionHeader}>
                    <Icon containerSize='19px' type={iconType} size='7px' styles={iconStyle}/>
                    <div style={sectionLabel}>{__(section)}</div>
                </div>
                { expanded &&
                    <div style={fieldsContainer}>
                        {Object.keys(propTypes(type)[section]).map( property =>
                            <div key={property} style={field}>
                                <input type='checkbox'  readOnly
                                    onClick={this.checkBoxHandler(section, property)}
                                    checked={payload.hasOwnProperty(property)}
                                    style={checkbox}/>
                                <div>{__(property)}</div>
                            </div>
                        )}
                    </div>
                }
            </section>
        )
    }
}
const nav = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    transform: 'translate(100%)',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    fontSize: '12px',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    borderRight: '1px solid var(--tree-border-right-color)'
}
const header = {
    borderBottom: '1px solid #dadada',
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    cursor: 'default',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
}
const body = {
    flex: 1,
    backgroundColor: '#f5f5f5'
}
const title = {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

const sectionContainer = {
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #e1e1e1'
}
const sectionHeader = {
    display: 'flex',
    alignItems: 'center',
    height: '22px',
    cursor: 'pointer'
}
const sectionLabel = {
    fontWeight: '500',
    fontSize: '12px',
    letterSpacing: '0.5px'
}
const fieldsContainer = {
    padding: '4px 23px 13px 18px'
}
const field = {
    padding: '6px 0px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px'
}
const checkbox = {
    margin: '0px 2px',
    outline: 'none',
    height: '11px',
    width: '11px'
}



export default Details
