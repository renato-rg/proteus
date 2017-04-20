import React from 'react'

const Tabs = ({ tabs, active, handler }) => {
    return (
        <div className='tabs'>
            {tabs.map( (title, index) =>
                <div key={index}
                    className={active==index?'activeTab':''}
                    onClick={e => {
                        e.preventDefault()
                        handler(index)}
                    }>
                    {title}
                </div>
            )}
        </div>
    )
}

export default Tabs
