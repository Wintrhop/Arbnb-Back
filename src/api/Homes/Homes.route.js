const router = require("express").Router();
const homesController = require("./Homes.controller");
const {auth} = require('../Utils/auth')

router.route("/").get(homesController.list)
router.route("/:homeId").get(homesController.show)
router.route("/").post(auth,homesController.create)

router.route("/:homeId").put(homesController.update)
router.route("/:homeId").delete(homesController.destroy)

module.exports = router;