const express = require('express');
const router = express.Router();

// router middlewares
router.use(express.static('public'));

// initialize database
const { populateAll, headerFooterData } = require('../controllers/helper');

// import controller
const { renderCreatePost, renderPost, getPostByUrl, incrementViews, getPagination,
        createPost, createReply, deleteContent, updateContent, addVoteToUser, upvote } = require('../controllers/postController');

router.get('/create', headerFooterData, renderCreatePost);

router.get('/:id', populateAll, getPostByUrl, incrementViews, getPagination, headerFooterData, renderPost);

router.post('/post', createPost);

router.post('/reply', createReply);

router.patch('/upvote', addVoteToUser, upvote);

router.patch('/edit', updateContent);

router.delete('/delete', deleteContent);

module.exports = router;