import React from 'react'
import fs from 'fs'
import {nativeImage, remote} from 'electron'


class LoadImage extends React.Component {

    constructor(props) {
        super(props)
        this.onClick = ev => {
            ev.preventDefault()
            const filePaths = remote.dialog.showOpenDialog({
                title: 'title',
                properties: ['openFile'],
                filters: [{name: 'Images', extensions: ['png', 'jpg', 'jpeg']}]
            })
            if (filePaths===undefined) return
            fs.readFile(filePaths[0], 'base64', (err, imageBase64) => {
                if (!err) {
                    const image = nativeImage
                                .createFromBuffer(new Buffer(imageBase64, 'base64'))
                                .resize({height: 16, width: 16})
                    this.props.onChange({target: {value: 'data:image/png;base64,'+image.toPNG().toString('base64')}})
                }
            })
        }
    }

    render() {
        const rest = Object.assign({}, this.props)
        delete rest.value
        delete rest.onChange
        return (
            <div {...rest} onClick={this.onClick}>
                <img ref={el => this.el = el}
                        src={this.props.value}        
                />
            </div>
        )
    }
}


export default LoadImage
