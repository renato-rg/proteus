import React from 'react'

const DockLeft = ({size = '15px', style = {color: 'white'}}) => {
    const s = size.slice(0, -2)
    return <svg width={8*s/8} height={6*s/8}>
        <rect width={3*s/8} height={6*s/8} style={{fill: style.color}}/>
        <rect width={6*s/8} height={1*s/8} style={{fill: style.color}} x={2*s/8}/>
        <rect width={1*s/8} height={6*s/8} style={{fill: style.color}} x={7*s/8}/>
        <rect width={6*s/8} height={1*s/8} style={{fill: style.color}} x={2*s/8} y={5*s/8}/>
    </svg>
}

export default DockLeft
