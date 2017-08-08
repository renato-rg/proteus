import React from 'react'
import Dropdown from './Dropdown.jsx'
import Icon from '../icons/Icon.jsx'
import i18n from '../../i18n'

const padding = {
    display: 'flex',
    alignItems: 'center'
}
const HoverItem = ({style, icon, label, onClick}) => (
    <div style={style} onClick={onClick}>
        <Icon type={icon} containerSize='35px'/>
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
        const burgerEffect = {
            transition: 'all 0.2s',
            transform: this.state.clicked ? 'rotate(90deg)' : 'inherit'
        }
        const bgdEffect = {
            transition: 'all 0.2s',
            color: this.state.clicked ? 'white' : 'inherit',
            background: this.state.clicked ? '#6b9fff' : 'inherit',
            borderBottom: '1px solid #dadada',
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            cursor: 'pointer'
        }
        const {__, documents, activeIndex, docNode} = this.props
        const toggleDropdown = this.toggleDropdown

        return (
            <div style={{position: 'relative'}}>
                <div style={bgdEffect} onClick={this.toggleDropdown}>
                    <Icon styles={{color: this.state.clicked ? 'white' : 'inherit'}}
                        containerStyle={burgerEffect}
                        containerSize='35px'
                        type='DOC_CONFIG'/>
                    { docNode ?
                        <HoverItem style={padding} icon={'DOCUMENT'} label={docNode.title}/> :
                        <div style={{width: '100%'}}>{__('No Documents')}</div>
                    }
                </div>
                { this.state.clicked &&
                    <Dropdown {...{documents, activeIndex, toggleDropdown}}/>
                }
            </div>
        )
    }
}

export default i18n(TreeViewTabs)
