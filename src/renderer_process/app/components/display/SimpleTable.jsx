import React from 'react'
import styles from './SimpleTable.css'
import AutoExpandTextarea from './AutoExpandTextarea'
import { T } from '../../i18n'

const control = ['version', 'creationDate', 'authors']
const traceability = ['source', 'target']

const SimpleTable = props => {

    const fields = arr => arr.map( label =>                    
        <div key={label} className={styles.tr}>
            <div className={styles.trLeft}>
                <div><T>{label}</T></div>
            </div>
            <div className={styles.trRight}>
                <AutoExpandTextarea value={props.table[label]} onChange={newValue => props.update({propName: label, newValue})}/>
            </div>
        </div>
    )
    
    return (
        <div className={styles.table} style={props.stls||{marginBottom: '12px'}}>
            <div className={styles.th}>
                <div className={styles.thLeft}>
                    <div>{props.prefix || '???'}-{!props.table.ref && '???'}</div>
                    <AutoExpandTextarea
                        value={props.table.ref}
                        onChange={newValue => props.update({propName: 'ref', newValue})}/>
                </div>
                <div className={styles.thRight}>
                    <AutoExpandTextarea
                        value={props.table.title}
                        onChange={newValue => props.update({propName: 'title', newValue})}/>
                </div>
            </div>
            {
                fields(control)
            }
            {
                Object.keys(props.table.fields).map( label =>
                    <div key={label} className={styles.tr}>
                        <div className={styles.trLeft}>
                            <div>
                                {label}
                            </div>
                        </div>
                        <div className={styles.trRight}>
                            <AutoExpandTextarea
                                value={props.table.fields[label]}
                                onChange={newValue => props.update({fieldName: label, newValue})}/>
                        </div>
                    </div>
                )
            }
            {
                fields(traceability)
            }
        </div>
    )
}

export default SimpleTable
