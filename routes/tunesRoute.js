
const fetch = require('node-fetch')
const { SEARCH_QUERY_URL } = require('../urls/urls.json')

const SEARCH_LIMIT = 25

module.exports = app => {
    app.post('/tunes', (req, res) => {
        let { query = '' } = req.body
        query = query.replace(' ', '+')
        fetch(`${SEARCH_QUERY_URL}${query}&limit=${SEARCH_LIMIT}`)
            .then(res => res.json())
            .then(data =>  res.json(data))
            .catch(err => res.status(500).end())
    })
}