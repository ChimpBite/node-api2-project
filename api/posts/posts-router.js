// implement your posts router here
const express = require('express');
const router = express.Router();
const Post = require('./posts-model');

// POSTS ENDPOINTS
// GET /api/posts
router.get("/", async (req, res) =>{
   await Post.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

// GET /api/posts/:id
router.get("/:id", async (req, res) =>{
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    await Post.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        }
    })
})

// POST /api/posts
router.post('/', async(req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } 
    
    await Post.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

//PUT /api/posts/:id
router.put("/:id", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    await Post.update(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be modified."
            })
        })
})

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
    await Post.remove(req.params.id)
        .then((post) => {
            if (post) {
                res.status(202).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specific ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The post could not be removed :("
            })
        })
})

// GET /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
    await Post.findPostComments(req.params.id)
        .then((posts) => {
            if (!posts) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(posts)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router;