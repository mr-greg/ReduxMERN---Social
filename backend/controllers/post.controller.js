const PostModel = require('../models/post.model')


module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts)
}

module.exports.setPosts = async (req, res) => {
    if (!req.body.message) {
        res.status(400).json({ message : "Merci d'ajouter un message" })
    }
    if (!req.body.author) {
        res.status(400).json({ message: "Merci d'ajouter un auteur" })
    }

    const post = await PostModel.create({
        message: req.body.message,
        author: req.body.author
    })
    res.status(200).json(post)
}

module.exports.editPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    if (!post) {
        res.status(400).json({ message: "Ce post n'existe pas" })
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        post,
        req.body,
        // new: true autorise d'ajouter un nouvel objet dans notre objet si nécessaire lors de la modif (ajouter un nouvel élément en gros)
        {new: true}
    )

    res.status(200).json(updatePost)
}

module.exports.deletePost = async (req, res) => {
    const postId = req.params.id
    const post = await PostModel.findByIdAndDelete(req.params.id)

    if (!post) {
        res.status(400).json({ message: "Ce post n'existe pas" })
    }
    res.status(200).json("Message supprimé !" + postId)
}

// Likes
module.exports.likePost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.userId } },
            { new: true }
        ).then((data) => res.status(200).json(data))
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.dislikePost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.userId } },
            { new: true }
        ).then((data) => res.status(200).json(data))
    } catch (err) {
        res.status(400).json(err)
    }
}