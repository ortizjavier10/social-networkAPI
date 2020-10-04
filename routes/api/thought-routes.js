const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
    .route('/')
    .get(getAllThoughts);

// /api/thought/:userId
router
    .route('/:userId')
    .post(addThought);
    
// /api/thought/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

// /api/thought/:userId/:ThoughtId
router  
    .route('/:userId/:thoughtid')
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions/:reactionId')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;