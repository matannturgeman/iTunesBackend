const ObjectId = require('mongodb').ObjectID;
const mongoService = require('../services/mongoService')

const updateUser = async variables => {
    if (!ObjectId.isValid(variables._id)) return null
    const { email, password } = variables
    const db = await mongoService.connect()
    const model = await db.collection('users')
    const result = await model.findOneAndUpdate(
        { _id: ObjectId(variables._id) },
        { $set: { email, password } }
    )
    return result
}

const deleteUser = async id => {
    const db = await mongoService.connect()
    const model = await db.collection('users')
    const result = await model.findOneAndDelete({ _id: ObjectId(id) })
    return result.value
}

const getUsers = async () => {
    const db = await mongoService.connect()
    const model = await db.collection('users')
    return model.find({}).toArray()
}

const getUserById = id => new Promise(async (resolve, reject) => {
    const db = await mongoService.connect()
    const model = await db.collection('users')
    if (!ObjectId.isValid(id)) resolve({ error: 'user-not-found' })
    model.findOne({ _id: ObjectId(id) }, (err, data) => {
        if (err) resolve({ error: 'failed' })
        else if (!data) resolve({ error: 'user-not-found' })
        else resolve(data)
    })
})

const login = variables => new Promise(async (resolve, reject) => {
    const { email, password } = variables
    const db = await mongoService.connect()
    const model = await db.collection('users')
    model.findOne({ email, password }, (err, data) => {
        if (err) resolve({ error: 'failed' })
        else if (!data) resolve({ error: 'user-not-found' })
        else resolve({ success: true, user: data })
    })
})

const signUp = variables => new Promise(async (resolve, reject) => {
    const { email, password } = variables
    const db = await mongoService.connect()
    const model = await db.collection('users')
    model.findOne({ email }, async (err, data) => {
        if (err) resolve({ error: 'failed' })
        else if (data) resolve({ error: 'user-exist' })
        else {
            const user = await addUser({ email, password })
            resolve(user)
        }
    })
})

const addUser = variables => new Promise(async (resolve, reject) => {
    const { email, password } = variables
    const db = await mongoService.connect()
    const model = await db.collection('users')
    model.insertOne({ email, password }, (err, data) => {
        if (err) resolve({ error: 'failed' })
        else resolve({ success: true, user: data.ops[0] })
    })
})

module.exports = {
    getUsers,
    getUserById,
    login,
    addUser,
    signUp,
    updateUser,
    deleteUser
}