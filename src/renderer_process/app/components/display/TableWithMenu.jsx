import React from 'react'
import styles from './TableWithMenu.css'
import SimpleTable from './SimpleTable'

class TableWithMenu extends React.Component {
    constructor (props) {
        super(props)
        this.id = ''
        this.inputs = {}
        this.state = {
            showTrigger: false,
            showMenu: false,
            showSubmenu: {}
        }
        this.toggleTrigger = bool => e => {
            e.preventDefault()
            if (!this.state.showMenu)
                this.setState({ showTrigger: bool })
        }
        this.toggleMenu = e => {
            e.preventDefault()
            if (!this.state.showMenu) {
                document.addEventListener('mousedown', this.handleClick, false)
                this.setState({ showMenu: true })
            }
            else
                this.setState({ showMenu: false, showTrigger: false, showSubmenu: {} })
        }
        this.toggleSubmenu = menu => e => {
            e.preventDefault()
            this.setState({ showSubmenu: { [menu]: this.state.showSubmenu[menu]?false:true } })
        }
        this.handleClick = e => {
            if (this.container.children.length === 3) {
                if (!this.container.children[0].contains(e.target)
                    && !this.container.children[1].contains(e.target)) {
                    document.removeEventListener('mousedown', this.handleClick, false)
                    this.setState({ showMenu: false, showTrigger: false, showSubmenu: {} })
                }
            }
        }
        this.toggleRow = row => e => {
            e.preventDefault()
            if (this.props.toggleRow)
                this.props.toggleRow(row)
        }
    }
    render () {
        return (
            <div style={{position: 'relative'}}
                ref={container => this.container=container}
                onMouseEnter={this.toggleTrigger(true)}
                onMouseLeave={this.toggleTrigger(false)}>

                {this.state.showTrigger &&
                    <div key='trigger' className={styles.trigger} onClick={this.toggleMenu}>
                        <div>
                            AAAA
                        </div>
                    </div>
                }

                {this.state.showMenu &&
                    <div key='menu' className={styles.menu}>
                        {this.props.sections.map( section =>
                            <div key={section} className={styles.section}>
                                {this.state.showSubmenu[section] &&                                
                                    <div className={styles.submenuWrapper}>
                                        <div className={styles.submenu}>
                                            { this.props.scheme[section].map( row =>
                                                <div key={row} onClick={this.toggleRow(row)}>
                                                    <div>{row}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                                <div className={styles.label} onClick={this.toggleSubmenu(section)}>
                                    {section}
                                </div>
                            </div>
                        )}
                    </div>
                }

                <SimpleTable
                    key='table'
                    prefix={this.props.prefix}
                    table={this.props.table}
                    update={this.props.update}
                />
            </div>
        )
    }
}

export default TableWithMenu