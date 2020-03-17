const { getUsers, getUserById, login, signUp, updateUser, deleteUser } = require('../services/userService')

module.exports = app => {
    app.get('/users', async (req, res) => {
        const data = await getUsers()
        res.json(data)
    })

    app.get('/user/:userId', async (req, res) => {
        const { userId } = req.params
        const data = await getUserById(userId)
        res.json(data)
    })

    app.post('/user', async (req, res) => {
        const { variables } = req.body
        const data = await updateUser(variables)
        res.json(data)
    })

    app.delete('/user/:userId', async (req, res) => {
        const { userId } = req.params
        const data = await deleteUser(userId)
        res.json(data)
    })

    app.post('/loginById', async (req, res) => {
        const { id } = req.body
        const data = await getUserById(id)
        res.json(data)
    })

    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        const data = await login({ email, password })
        res.json(data)
    })

    app.post('/sign-up', async (req, res) => {
        const { email, password } = req.body
        const data = await signUp({ email, password })
        res.json(data)
    })
}