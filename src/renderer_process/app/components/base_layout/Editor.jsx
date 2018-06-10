import React, {Component} from 'react'
import { connect } from 'react-redux'
import styles from './layout.css'

// Components
import ToolGroup from '../toolbar/ToolGroup.jsx'
import DocView from '../docView/DocView.jsx'
import Tabs from '../tabs/Tabs.jsx'
import ObjectManager from '../objectManager/ObjectManager.jsx'
import TreeViewTabs from '../treeView/TreeViewTabs'
import TreeView from '../treeView/TreeView'
import TableProperties from '../propertiesPanels/TableProperties'
import ProjectProperties from '../propertiesPanels/ProjectProperties'
import DefaultObjectProperties from '../propertiesPanels/DefaultObjectProperties'

class Editor extends Component {
    render() {
        const {documents, activeIndex, docNode, showExplorer, tabs, types, activeTab} = this.props
        return (
            <div className={styles.editor}>
                <header className={styles.header}>
                    <ToolGroup/>
                </header>

                <main className={styles.main}>
                    <nav className={styles.nav} style={showExplorer?{}:{display: 'none'}}>
                            <TreeViewTabs {...{documents, activeIndex, docNode}}/>
                            <TreeView {...{docNode}}/>
                    </nav>
                    <div className={styles.resizer}>
                        <div className={styles.resizerHead}/>
                        <div className={styles.resizerBody}/>
                    </div>
                    <section className={styles.mainSection}>
                        <Tabs/>
                        <div style={{flex: 1, position: 'relative'}}>
                            <DocView {...{docNode}} isVisible={activeTab===0}/>
                            {
                                tabs.map((id, index) => {                        
                                    if (id === 'DOCUMENT_VIEWER')
                                        return null
                                    
                                    if (id === 'OBJECT_MANAGER')
                                        return <ObjectManager key={id} isVisible={activeTab===index}/>

                                    if (id === 'PROJECT_PROPERTIES')
                                        return <ProjectProperties key={id} isVisible={activeTab===index}/>
                                    
                                    if (['document', 'folder', 'paragraph', 'image'].indexOf(types[index])>-1)
                                        return <DefaultObjectProperties key={id} nodeID={id} isVisible={activeTab===index}/>

                                    return <TableProperties key={id} nodeID={id} isVisible={activeTab===index}/>
                                })
                            }
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const activeIndex = state.switchDocument.navActiveTab
    const proj = state.appState.projectInfo
    let docNode = undefined
    let documents = []
    if (proj.childrenIDs.length>0) {
        documents = proj.childrenIDs.map(i => state.entities[i])
        docNode = documents[activeIndex]
    }
    return {
        documents,
        activeIndex,
        docNode,
        showExplorer: state.switchDocument.showExplorer,
        activeTab: state.switchDocument.sectionActiveTab,
        tabs: state.switchDocument.sectionTabs,
        types: state.switchDocument.sectionTabs.map( id => (state.entities[id]||{}).type )
    }
}

export default connect(mapStateToProps, null)(Editor)
