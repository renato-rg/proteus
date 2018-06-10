import React from 'react'
import styles from './SimpleTable.css'
import AutoHeightTextarea from './AutoHeightTextarea'
import { T } from '../../i18n'
import AutoHeightInput from './AutoHeightInput'

const control = [
    { label: 'version' },
    { label: 'creationDate' },
    { label: 'authors', multiline: true}
]
const traceability = [
    { label: 'source', multiline: true},
    { label: 'target', multiline: true}
]

const SimpleTable = props => {
    
    return (
        <div className={styles.table} style={props.stls||{marginBottom: '12px'}}>
            <div className={styles.th}>
                <div className={styles.thLeft}>
                    <div>{props.prefix || '???'}-{!props.table.ref && '???'}</div>
                    <AutoHeightInput
                        value={props.table.ref}
                        onChange={newValue => props.update({propName: 'ref', newValue})}/>
                </div>
                <div className={styles.thRight}>
                    <AutoHeightInput
                        value={props.table.title}
                        onChange={newValue => props.update({propName: 'title', newValue})}/>
                </div>
            </div>
            {
                control.map( ({label, multiline}) => {
                    if (!props.table.hasOwnProperty(label)) return null
                    const Cmp = multiline ? AutoHeightTextarea : AutoHeightInput
                    return (
                        <div key={label} className={styles.tr}>
                            <div className={styles.trLeft}>
                                <div><T>{label}</T></div>
                            </div>
                            <div className={styles.trRight}>
                                <Cmp value={props.table[label]} onChange={newValue => props.update({propName: label, newValue})}/>
                            </div>
                        </div>
                    )
                })
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
                            <AutoHeightTextarea
                                value={props.table.fields[label]}
                                onChange={newValue => props.update({fieldName: label, newValue})}/>
                        </div>
                    </div>
                )
            }
            {
                traceability.map( ({label, multiline}) => {
                    if (!props.table.hasOwnProperty(label)) return null
                    const Cmp = multiline ? AutoHeightTextarea : AutoHeightInput
                    return (
                        <div key={label} className={styles.tr}>
                            <div className={styles.trLeft}>
                                <div><T>{label}</T></div>
                            </div>
                            <div className={styles.trRight}>
                                <Cmp value={props.table[label]} onChange={newValue => props.update({propName: label, newValue})}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SimpleTable
