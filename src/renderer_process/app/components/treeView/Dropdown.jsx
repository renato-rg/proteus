import React from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import Icon from '../icons/Icon.jsx'
import i18n from '../../i18n'
import { setTreeViewTab, deleteDocument, createDocument, insertDocument } from '../../state_manager/actions'
import { dropdown, dropdownDoc, newDoc, dropdownDocItem } from './treeView.css'

const HoverItem = ({placeholder, label, onClick, deleteAction, index, activeIndex, setTreeViewTab}) => (
    <div onClick={onClick} className={dropdownDocItem}>
        <div className={dropdownDoc}>{label ? label : placeholder}</div>
        <Icon type={'CLOSE'} containerSize='35px'
          onClick={e => {
            e.stopPropagation()
            deleteAction(index)
            if (index===activeIndex)
                setTreeViewTab(0)
            else
                setTreeViewTab(activeIndex + (index<=activeIndex ? -1 : 0))
        }}/>
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
        const {__, documents, activeIndex, createDocument} = this.props
        return (
            <div className={dropdown} ref={el => this.dropdownEl = el}>
                {documents.map((doc, index) =>
                    <HoverItem key={doc.nodeID} icon={'DOCUMENT'} label={doc.title}
                        activeIndex={activeIndex}
                        index={index}
                        onClick={() => this.changeDocument(index)}
                        deleteAction={this.props.deleteDocument}
                        setTreeViewTab={this.props.setTreeViewTab}
                        placeholder={'<'+__('New document')+'>'}/>)
                }
                <div className={newDoc} onClick={e => {e.stopPropagation(); createDocument()}}>
                    <Icon type={'PLUS'} containerSize='35px'/>
                    <div style={{width: '100%', textAlign: 'left'}}>{__('New Document')}</div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setTreeViewTab: docIndex => {
            dispatch(setTreeViewTab(docIndex))
        },
        deleteDocument: docIndex => {
            dispatch(deleteDocument(docIndex))
        },
        createDocument: () => {
            const docID = uuid()
            dispatch(createDocument(docID))
            dispatch(insertDocument(docID))
        }
    }
}

export default connect(null, mapDispatchToProps)(i18n(Dropdown))
