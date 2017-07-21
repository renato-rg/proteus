import React from 'react'
import styles from './styles.css'
import UseCase from './UseCase.jsx'

const Tag = (props) => {
    const { node } = props
    switch (node.type) {

        // DOCUMENT
        case 'document':
            return <div className={styles.title}>
                {node.title}
            </div>

        // FOLDER
        case 'folder':
            return <div className={styles.folder}>
                {node.title}
            </div>

        // USE CASE
        case 'useCase':
            return <UseCase node={node}/>

        // PARAGRAPH
        case 'paragraph':
            return <div className={styles.paragraph}>
                <p>{node.title}</p>
            </div>

        // OTHER
        default:
            return <div className={styles.folder}>
                <span>{node.title}</span>
            </div>
    }
}

export default Tag
