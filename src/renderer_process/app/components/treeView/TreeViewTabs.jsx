import React from 'react'
import Dropdown from './Dropdown.jsx'
import Icon from '../icons/Icon.jsx'
import { T } from '../../i18n'

const padding = {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap'
}
const HoverItem = ({style, icon, label, onClick}) => (
    <div style={style} onClick={onClick}>
        <div>{label}</div>
    </div>
)

class TreeViewTabs extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            clicked : false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this)
    }

    toggleDropdown () {
        this.setState({clicked: !this.state.clicked})
    }

    render () {
        const bgdEffect = {
            transition: 'all 0.2s',
            color: this.state.clicked ? 'var(--doc-picker-font--active)' : 'var(--doc-picker-font)',
            background: this.state.clicked ? 'var(--doc-picker--active)' : 'var(--doc-picker)',
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            cursor: 'pointer'
        }
        const {documents, activeIndex, docNode} = this.props
        const toggleDropdown = this.toggleDropdown

        return (
            <div>
                <div style={bgdEffect} onClick={this.toggleDropdown}>

                      <Icon styles={{color: this.state.clicked ? 'white' : 'inherit'}}
                        type={this.state.clicked ? 'CLOSE' : 'DOC_CONFIG'} containerSize='35px'
                        size={this.state.clicked ? '20px' : '22px'}/>

                    { docNode ?
                        <HoverItem style={padding} icon={'DOCUMENT'} label={docNode.title}/> :
                        <div style={{width: '100%'}}><T>No Documents</T></div>
                    }
                </div>
                { this.state.clicked &&
                    <Dropdown {...{documents, activeIndex, toggleDropdown}}/>
                }
            </div>
        )
    }
}

export default TreeViewTabs
