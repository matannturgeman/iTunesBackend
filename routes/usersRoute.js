const ObjectId = require('mongodb').ObjectID;
const mongoService = require('../services/mongoService')

module.exports = app => {
    app.post('/loginById', async (req, res) => {
        const { id } = req.body
        const db = await mongoService.connect()
        const model = await db.collection('users')
        model.findOne({ _id: ObjectId(id) }, (err, data) => {
            console.log('data', data, 'input', { id: ObjectId(id) })
            if (err) res.json({ error: 'failed' })
            else if (!data) res.json({ error: 'user-not-found' })
            else res.json(data)
        })
    })
    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        const db = await mongoService.connect()
        const model = await db.collection('users')
        model.findOne({ email, password }, (err, data) => {
            if (err) res.json({ error: 'failed' })
            else if (!data) res.json({ error: 'user-not-found' })
            else res.json({ success: true, user: data })
        })
    })

    app.post('/sign-up', async (req, res) => {
        const { email, password } = req.body
        console.log('email', email)
        const db = await mongoService.connect()
        const model = await db.collection('users')
        model.findOne({ email }, (err, data) => {
            if (err) res.json({ error: 'failed' })
            else if (data) res.json({ error: 'user-exist' })
            else addUser()
        })

        const addUser = async () => {
            const db = await mongoService.connect()
            const model = await db.collection('users')
            console.log('add new user')
            model.insertOne({ email, password }, (err, data) => {
                if (err) res.json({ error: 'failed' })
                else res.json({ success: true, user: data.ops[0] })
            })
        }
    })
}