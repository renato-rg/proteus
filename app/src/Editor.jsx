import React, {Component} from 'react'
import {header, main, nav, section, footer, A4} from './styles/layout.css'
import TreeViewTabs from './containers/TreeViewTabs.jsx'
import DocViewTabs from './containers/DocViewTabs.jsx'

// React-dnd context
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Transformers
import TreeView from './components/TreeView.jsx'
import DocView from './components/docView/DocView.jsx'


class Editor extends Component {
    render() {
        return (
            <div className="editor">
                <header className={header}>
                    <div>Tabs</div>
                    <div>Icons</div>
                </header>

                <main className={main}>
                    <nav className={nav}>
                        <TreeViewTabs tabs={['Doc 1', 'Doc 2', 'Doc 3']}/>
                        <TreeView/>
                    </nav>

                    <section className={section}>
                        <DocViewTabs tabs={[`View 1`, `View 2`]}/>
                        <DocView/>
                        <div/>
                    </section>
                </main>

                <footer className={footer}/>
            </div>
        )
    }
}


export default DragDropContext(HTML5Backend)(Editor)
