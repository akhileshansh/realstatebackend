const { Store, getall } = require("../controller/UserController");

const router=require("express").Router();

router.post('/',Store);
router.get('/',getall);

module.exports=router