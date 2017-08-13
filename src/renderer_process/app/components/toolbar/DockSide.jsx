import React from 'react'
import Icon from '../icons/Icon.jsx'

import styles from './styles.css'

const DockSide = () => {
    return <div className={styles.dockSide}>
        <Icon type={'DOCKLEFT'} size='20px' containerSize='34px' styles={{color: '#6fabf1'}}/>
        <Icon type={'DOCKRIGHT'} size='20px' containerSize='34px' styles={{color: '#a2a2a2'}}/>
    </div>

}

export default DockSide
