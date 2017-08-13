import React, {Component} from 'react'
import { connect } from 'react-redux'
import styles from './layout.css'

// Components
import TreeViewTabs from '../treeView/TreeViewTabs.jsx'
import DocViewTabs from '../tabs/DocViewTabs.jsx'
import ToolGroup from '../toolbar/ToolGroup.jsx'
import TreeView from '../treeView/TreeView.jsx'
import DocView from '../docView/DocView.jsx'
import DockSide from '../toolbar/DockSide.jsx'

class Editor extends Component {
    render() {
        const {documents, activeIndex, docNode} = this.props
        return (
            <div className={styles.editor}>
                <header className={styles.header}>
                    <ToolGroup/>
                    <DockSide/>
                </header>

                <main className={styles.main}>
                    <div style={{display: 'flex'}}>
                        <nav className={styles.nav}>
                            <TreeViewTabs {...{documents, activeIndex, docNode}}/>
                            <TreeView {...{docNode}}/>
                        </nav>
                        <span className={styles.resizer}></span>
                    </div>
                    <section className={styles.section}>
                        <DocViewTabs tabs={['Log State']}/>
                        <DocView {...{docNode}}/>
                        <div/>
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
    if (state.appState.globalState === 'DEFAULT' && proj) {
        documents = proj.childrenIDs.map(i => state.entities[i])
        docNode = documents[activeIndex]
    }
    return {
        documents,
        activeIndex,
        docNode
    }
}

export default connect(mapStateToProps, null)(Editor)
