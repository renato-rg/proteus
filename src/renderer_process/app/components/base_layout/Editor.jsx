import React, {Component} from 'react'
import { connect } from 'react-redux'
import styles from './layout.css'

// Components
import DocViewTabs from '../tabs/DocViewTabs.jsx'
import ToolGroup from '../toolbar/ToolGroup.jsx'
import LeftPanel from './LeftPanel.jsx'
import DocView from '../docView/DocView.jsx'
import DockSide from '../toolbar/DockSide.jsx'

class Editor extends Component {
    render() {
        const {documents, activeIndex, docNode, showLeftPanel} = this.props
        return (
            <div className={styles.editor}>
                <header className={styles.header}>
                    <ToolGroup/>
                    <DockSide/>
                </header>

                <main className={styles.main}>
                    { showLeftPanel &&
                        <LeftPanel {...{documents, activeIndex, docNode}}/>
                    }
                    <span className={styles.resizer}></span>
                    <section className={styles.section}>
                        <DocViewTabs tabs={['Log State']}/>
                        <DocView {...{docNode}}/>
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
        docNode,
        showLeftPanel: state.switchDocument.showLeftPanel
    }
}

export default connect(mapStateToProps, null)(Editor)
