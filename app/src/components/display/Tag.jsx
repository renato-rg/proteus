import React from 'react'
import styles from './styles.css'

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
            return <div className={styles.useCase}>
            <table>
                <thead>
                    <tr>
                        <th>UC</th>
                        <td>{node.title}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Description</th>
                        <td>Uhhh nice descp man!</td>
                    </tr>
                    <tr>
                        <th>Secuencia</th>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Step</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {node.children.map((step, index) =>
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{step.title}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

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
