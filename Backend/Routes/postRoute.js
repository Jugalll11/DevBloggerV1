const {fetchAllPost, fetchSingularPost, addPost, SearchPost, addComment, fetchComments} = require('../Controllers/postController')
const express = require('express')
const router = require('express').Router();

router.use(express.json());
router.use(express.urlencoded());

router.post('/getPost', fetchSingularPost);
router.get('/getFeed', fetchAllPost);
router.post('/addPost', addPost);
router.post('/searchPost', SearchPost);
router.post('/addComment', addComment);
router.post('/fetchComments', fetchComments);

module.exports = router;