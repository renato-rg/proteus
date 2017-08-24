const madeja = require('./madeja.json')

const templates = template => {
    if (template === 'MADEJA')
        return madeja
    else
        return []
}

export default templates
