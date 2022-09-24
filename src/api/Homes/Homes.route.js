const router = require("express").Router();
const homesController = require("./Homes.controller");

router.route("/").get(homesController.list)
router.route("/:homeId").get(homesController.show)
router.route("/").post(homesController.create)
router.route("/:homeId").put(homesController.update)
router.route("/:homeId").delete(homesController.destroy)

module.exports = router;