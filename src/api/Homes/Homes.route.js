const router = require("express").Router();
const homesController = require("./Homes.controller");
const {auth} = require('../Utils/auth')

router.route("/").get(homesController.list)
router.route("/:homeId").get(homesController.show)
router.route("/").post(auth,homesController.create)

router.route("/:homeId").put(auth,homesController.update)
router.route("/:homeId").delete(auth,homesController.destroy)

module.exports = router;