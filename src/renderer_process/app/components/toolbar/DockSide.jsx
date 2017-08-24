import React from 'react'
import { connect } from 'react-redux'
import Icon from '../icons/Icon.jsx'

import styles from './styles.css'

import { toggleLeftPanel } from '../../state_manager/actions'

const DockSide = ({toggleLeftPanel, showLeftPanel}) => {
    return <div className={styles.dockSide}>
        <Icon type={'DOCKLEFT'} size='18px' containerStyle={{cursor: 'pointer', width: '30px'}}
            styles={{color: showLeftPanel?'#6fabf1':'#a2a2a2'}}
            onClick={toggleLeftPanel}/>
        <Icon type={'DOCKRIGHT'} size='18px' containerStyle={{width: '30px'}} styles={{color: '#a2a2a2'}}/>
    </div>

}

const mapStateToProps = state => {
    return {
        showLeftPanel: state.switchDocument.showLeftPanel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLeftPanel: () => dispatch(toggleLeftPanel())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DockSide)
