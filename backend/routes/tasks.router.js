const router = require('express').Router();

const {
    getTasks,
    postTasks,
    completeTasks,
    updateTasks,
    deleteTasks
} = require('../controllers/tasks.controllers')

router.get('/tasks', getTasks);
router.post('/tasks', postTasks);
router.put('/completarTarea/:id', completeTasks);
router.put('/tasks/:id', updateTasks)
router.delete('/tasks/:id', deleteTasks);

module.exports = router;
