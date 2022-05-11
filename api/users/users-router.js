const express = require("express");
const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require("./users-model");
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const posts = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res) => {
  const users = get().then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  const user = getById(req.params.id).then((user) => {
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  });
});

// RETURN THE USER OBJECT
// this needs a middleware to verify user id
router.post("/", (req, res) => {
  console.log(req);
  res.json(req.body);
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", validateUserId, (req, res) => {
  remove(req.params.id).then((result) => {
    res.status(200).json(req.user);
  });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  getUserPosts(req.params.id).then((posts) => {
    res.status(200).json(posts);
  });

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;
