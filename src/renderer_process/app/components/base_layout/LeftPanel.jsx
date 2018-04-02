import React, {Component} from 'react'
import { connect } from 'react-redux'
import styles from './layout.css'

// Components
import TreeViewTabs from '../treeView/TreeViewTabs.jsx'
import TreeView from '../treeView/TreeView.jsx'
import DetailsContainer from '../details/DetailsContainer.jsx'
import Transition from 'react-transition-group/Transition'

class LeftPanel extends Component {
    render() {
        const {documents, activeIndex, docNode, showDetails} = this.props
        return (
            <div style={{display: 'flex', width: '25em', transition: 'all 0.5s',
                transform: showDetails?'translate(-100%)':'translate(0%)',
                borderRight: '1px solid var(--tree-border-right-color)'}}>
                <nav className={styles.nav}>
                    <TreeViewTabs {...{documents, activeIndex, docNode}}/>
                    <TreeView {...{docNode}}/>
                </nav>
                <Transition in={showDetails} timeout={500} mountOnEnter={true} unmountOnExit={true}>
                    <DetailsContainer/>
                </Transition>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        showDetails: state.switchDocument.showDetails
    }
}

export default connect(mapStateToProps, null)(LeftPanel)
