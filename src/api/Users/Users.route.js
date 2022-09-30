const router = require('express').Router();
const userController = require('./Users.controller');

router.route('/').get(userController.list);
router.route('/:userId').get(userController.show);
router.route('/').post(userController.create);
router.route('/:userId').put(userController.update);
router.route('/:userId').delete(userController.destroy);

module.exports = router;
