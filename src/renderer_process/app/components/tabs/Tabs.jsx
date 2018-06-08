import React from 'react'
import { connect } from 'react-redux'
import { setDocViewTab, pushTab, removeTab } from '../../state_manager/actions'
import { T } from '../../i18n'

import styles from './styles.css'
import Close from 'react-icons/lib/md/close'
import Settings from 'react-icons/lib/md/settings'
import Document from 'react-icons/lib/md/import-contacts'

const proteusLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACp0lEQVQ4jY2TXUhTYRjH/+85R410c/iBui5003R+Yi1mgohWmkkaRESl1E1djLrwLomg04WBNxNFu2hmpJYpFU1dw5IyQyRKixkJGfjB3FiujwtJd7Zzni5SEcvRc/PcvL/f8/J8AP8Ofi0fBKAmIgaAbfP2rxDWgPKGhltyYWHVAACeiLj/kQhEIgeg0mLpDM7NEbW1vSW93jQIgOvrIz6EpGQDbrJ0B+YXiFpaRmWHwyPd7vhIOp1pIJREWPtipcXSFXAtEl0yN8h5eSVUVFRN/bYpf8edqe0kmyo3dQdm54kuX3woA/sISFGADKU4vYns/T/81vbJDcnWnlQ0N3cHZ2YU2dr+Qc42VFDpAbNSdugKcZxOiUSpcrW+m546fH6r9T3pdH96AhDj9fr8msbGm/fLyk6EORzvIAgy9+zlG1pdzWXLK5FY8npYgCNkZAKRO5OE+PjEQEFBucHtdu11u8+8EGJjYy6EhSXsGB2dliLCWXhAlig6mIH5aR8YCPE4DFJ+MY+LJxh5eL0eXqWKCcbFpVQByOHd7tlOm20wPykpPTst1SBJwZ+CzyVBl3YeeoOJJRuM0ESpKTr+E0s37FdWVvxobRUxNnb3CIBhThQJwNfjPT037KOvX4Vr1IlSSj5je4qjUFevxamzCdDmellktKB8//YFXV0Wxel8XE1EzwHw/MjIdYgisaGhup6ZGadRo9mdmZuTKnkWl4RdWhW5XD7mWuhXNJoc2O33lMnJR8eIyMEY4wHI62NgokhMFBlUqmRbbe21o1lZ2ZLT6Qj3+2VFrU7D+LhDmZh4sBkObl0mJorEAeBUquRBs7mdens/+y2WAcVoPBkEULl2I0KoW9gk0T2pqWkmk+ncMoAj6xsbCt6QAMQAICJCOwzwp0PBvwEFMT+rrbQAGAAAAABJRU5ErkJggg=='

const cx = (...classes) => {
    return classes.filter(n => typeof n == 'string').join(' ')
}

const limit = (str='') => str.length > 30 ? str.substr(0, 30) + '...' : str

class Tabs extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        const { tabs, entities, images, prefixes, activeTab, setDocViewTab, removeTab } = this.props
        if (tabs.length===1) return null
        return (
            <div className={styles.tabs}>
                {
                    tabs.map((id, index) => {
                        if (id==='DOCUMENT_VIEWER') {
                            return (
                                <div key={id} className={cx(styles.fixed, activeTab === index && styles.activeFixed)}
                                        onClick={() => setDocViewTab(index)}>
                                    <Document className={styles.fixedImage}/>
                                    <div className={styles.fixedTitle}>
                                        <T>DOCUMENT_VIEWER</T>
                                    </div>
                                </div>
                            )
                        }
                        if (id==='PROJECT_PROPERTIES') {
                            return (
                                <div key={id} className={cx(styles.unfixed, activeTab === index && styles.activeUnfixed)}
                                    onClick={() => setDocViewTab(index)}>
                                    <img src={proteusLogo}/>
                                    <div className={styles.unfixedTitle}>
                                        <T>PROJECT_PROPERTIES</T>
                                    </div>
                                    <Close size={'12px'} onClick={e => {e.stopPropagation();removeTab(index)}}
                                        className={activeTab === index ? styles.activeUnfixedClose : styles.unfixedClose}/>
                                </div>
                            )
                        }
                        if (id==='OBJECT_MANAGER') {
                            return (
                                <div key={id} className={cx(styles.unfixed, activeTab === index && styles.activeUnfixed)}
                                    onClick={() => setDocViewTab(index)}>
                                    <Settings size={'17px'} className={styles.unfixedImage}/>
                                    <div className={styles.unfixedTitle}>
                                        <T>OBJECT_MANAGER</T>
                                    </div>
                                    <Close size={'12px'} onClick={e => {e.stopPropagation();removeTab(index)}}
                                        className={activeTab === index ? styles.activeUnfixedClose : styles.unfixedClose}/>
                                </div>
                            )
                        }
                        return (
                            <div key={id} className={cx(styles.unfixed, activeTab === index && styles.activeUnfixed)}
                                onClick={() => setDocViewTab(index)}>                                
                                <img height={16} width={16} src={images[index]}/>
                                <div className={styles.unfixedTitle}>                                    
                                    <T>
                                        {(() =>{
                                            if (['document', 'folder', 'paragraph', 'image'].indexOf(entities[index].type)>-1)
                                                return limit(entities[index].title) || 'UNTITLED'
                                            return limit('['+(prefixes[index]||'???')+'-'+(entities[index].ref||'???')+'] '+(entities[index].title||'UNTITLED'))
                                        })()}
                                    </T>
                                </div>
                                <Close size={'12px'} onClick={e => {e.stopPropagation();removeTab(index)}}
                                    className={activeTab === index ? styles.activeUnfixedClose : styles.unfixedClose}/>
                            </div>
                        )
                    }
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        entities: state.switchDocument.sectionTabs.map( id => state.entities[id]||{} ),
        images: state.switchDocument.sectionTabs.map( id => (state.classes.details[(state.entities[id]||{}).type]||{}).image),
        prefixes: state.switchDocument.sectionTabs.map( id => (state.classes.details[(state.entities[id]||{}).type]||{}).prefix),
        activeTab: state.switchDocument.sectionActiveTab,
        tabs: state.switchDocument.sectionTabs
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setDocViewTab: index => dispatch(setDocViewTab(index)),
        pushTab: (id, focus) => dispatch(pushTab(id, focus)),
        removeTab: index => dispatch(removeTab(index))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
