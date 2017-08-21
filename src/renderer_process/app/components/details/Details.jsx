import React from 'react'
import Icon from '../icons/Icon.jsx'

import Editable2 from '../editable/Editable2.jsx'


import entity from '../../constants/entity'

// div (classname: editpanel) > section > div (className: label) > div height toggle 0:inherit
const Details = props => {

    const nav = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        transform: 'translate(100%)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        fontSize: '12px',
        fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif'
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

    let {__, node, hidePropertiesPanel, update} = props

    const updateIn = fieldPath => event => {
        update(node.nodeID, fieldPath, event.target.value)
    }

    return (
        <nav style={nav}>
            <div style={header}>
                <Icon containerSize='32px' type='ARROW_LEFT' size='19px'
                    containerStyle={{background: '#6b9fff', color: 'white', cursor: 'pointer'}}
                    onClick={hidePropertiesPanel}/>
                <Icon type={node.type} containerSize='32px'/>
                <div style={title}>{node.title}</div>
            </div>
            <div style={body}>
                {Object.keys(entity(node.type))
                .map( section =>
                    <Section key={section} payload={node[section]} {... {__, section, updateIn, type: node.type}}/>
                )}
            </div>
        </nav>
    )
}

class Section extends React.Component {
    constructor (props) {
        super(props)
        this.state = { expanded : this.props.section === 'general' }
        this.toggleFields = this.toggleFields.bind(this)
    }
    toggleFields () {
        this.setState({expanded: !this.state.expanded})
    }
    render () {
        const {__, section} = this.props
        const { expanded } = this.state
        return (
            <section style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e1e1e1' }}>
                <div onClick={this.toggleFields} style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '22px',
                        cursor: 'pointer'
                    }}>
                    <Icon containerSize='19px' type={expanded?'SECTION_OPENED':'SECTION_CLOSED'} size='7px'
                        styles={expanded?{}:{transform: 'rotate(-45deg)'}}/>
                    <div style={{fontWeight: '500', fontSize: '12px', letterSpacing: '0.5px'}}>{__(section)}</div>
                </div>
                { expanded &&
                    <Fields {...this.props}/>
                }
            </section>
        )
    }
}

const fieldsContainer = {
    padding: '4px 23px 20px 18px'
}
const label = {
    display: 'flex',
    fontSize: '12px',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const textarea = {
    display: 'flex',
    fontFamily: 'inherit',
    width: 'auto',
    height: 'auto',
    textAlign: 'justify',
    fontSize: '12px',
    outline: 'none',
    border: '1px solid #e0e0e0',
    marginTop: '2px',
    padding: '0px 10px'
}
const field = {
    padding: '6px 0px',
    display: 'flex',
    flexDirection: 'column'
}

const checkBoxHandler = e => {
    console.log(e.target.checked)
}

const Fields = ({__, section, payload, updateIn, type}) => {
    const fields = Object.keys(entity(type)[section])
        .map( property =>
            <div key={property} style={field}>
                <div style={label}>
                    <div>{__(property)}</div>
                    { type === 'useCase' &&
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <input type='checkbox' onClick={checkBoxHandler}
                                style={{margin: '0px 2px',
                                        outline: 'none',
                                        height: '11px',
                                        width: '11px'}}/>
                            <div style={{fontSize: '11px'}}>{__('hide')}</div>
                        </div>
                    }
                </div>
                <Editable2 style={textarea}
                            value={payload[property]}
                            introForbidden={entity(type)[section][property]==='oneline'}
                            callback={updateIn([section, property])}/>
            </div>
        )
    return <div style={fieldsContainer}> {fields} </div>
}


export default Details
