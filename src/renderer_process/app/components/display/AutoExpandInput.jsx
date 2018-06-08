import React from 'react'

const AutoExpandInput = props => {
    const rest = Object.assign({}, props)
    delete rest.onChange
    return (
        <input
            {...rest}
            onChange={e => {
                e.target.style.width = e.target.scrollWidth + 'px'
                console.log(e.target)
                if (props.onChange) props.onChange(e)
            }}
        />
    )
}

export default AutoExpandInput