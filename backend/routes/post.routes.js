const express = require("express");
const { setPosts, getPosts, editPost, deletePost, likePost, dislikePost } = require("../controllers/post.controller");
const router = express.Router();

const app = express();

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);
router.patch("/dislike-post/:id", dislikePost)


module.exports = router;