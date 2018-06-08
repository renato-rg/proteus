import en from './en'
import es from './es'

const languages = { en, es }
import { connect } from 'react-redux'
import { store } from '../entry'

export const translate = key => {
    return languages[store.getState().appState.locale][key] || key
}

const mapStateToProps = state => {
    return {
        locale: state.appState.locale
    }
}

export const T = connect(mapStateToProps, ()=>({}))(
    ({txt, children, locale}) => {
        if (txt && typeof txt === 'string')
            return languages[locale][txt] || txt
        
        if (children && typeof children === 'string')
            return languages[locale][children] || children
        
        return ''
    }
)