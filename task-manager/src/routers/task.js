const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, async (req, res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) =>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedArray = ['completed', 'description']
    const isValid = updates.every((update) => allowedArray.includes(update))

    if(!isValid){
        return res.status(404).send({error: 'Invalid anguments'})
    }

    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update] )
        await task.save()

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) =>{
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router