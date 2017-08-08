import React from 'react'
import { connect } from 'react-redux'
import Icon from '../icons/Icon.jsx'
import i18n from '../../i18n'
import { setTreeViewTab } from '../../state_manager/actions'
import { dropdown } from './treeView.css'

const HoverItem = ({style, icon, label, onClick}) => (
    <div style={style} onClick={onClick}>
        <Icon type={icon} containerSize='35px'/>
        <div>{label}</div>
    </div>
)

class Dropdown extends React.Component {

    constructor (props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.escapeHandler = this.escapeHandler.bind(this)
        this.changeDocument = this.changeDocument.bind(this)
    }

    changeDocument (index) {
        this.props.toggleDropdown()
        if (index !== this.props.activeIndex)
            this.props.setTreeViewTab(index)
    }

    escapeHandler (e) {
        e.preventDefault()
        if (e.keyCode === 27) this.props.toggleDropdown()
    }
    clickHandler (e) {
        e.preventDefault()
        if (!this.dropdownEl.contains(e.target)) this.props.toggleDropdown()
    }

    componentDidMount() {
        this.dropdownEl.ownerDocument.addEventListener('keyup', this.escapeHandler)
        this.dropdownEl.ownerDocument.addEventListener('click', this.clickHandler)
    }

    componentWillUnmount() {
        this.dropdownEl.ownerDocument.removeEventListener('keyup', this.escapeHandler)
        this.dropdownEl.ownerDocument.removeEventListener('click', this.clickHandler)
    }

    render () {
        const {__, documents, activeIndex} = this.props
        return (
            <div className={dropdown} ref={el => this.dropdownEl = el}>
                {documents.map((doc, index) =>
                    <HoverItem key={doc.nodeID} icon={'DOCUMENT'} label={doc.title}
                        style={{color: index===activeIndex?'black':'inherit'}}
                        onClick={() => this.changeDocument(index)}/>)
                }
                <HoverItem icon={'PLUS'} label={__('New Document')}/>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setTreeViewTab: index => {
            dispatch(setTreeViewTab(index))
        }
    }
}

export default connect(null, mapDispatchToProps)(i18n(Dropdown))
