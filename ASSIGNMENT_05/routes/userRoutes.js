const express=require('express');
const { registrationRender, registerUser,activateAccount, loginRender, loginUser, defaultPage, dashboard, logout, downloadSingleFile, changePasswordRender, changePassword, forgotPasswordRender } = require('../controllers/userController');
const router = express.Router();

router.get("/",defaultPage);
router.get("/register",registrationRender);
router.post("/registeruser",registerUser);
router.get("/activateaccount/:id",activateAccount);
router.get("/login",loginRender);
router.post("/login",loginUser);
router.get("/dashboard",dashboard);
router.get("/logout",logout);
router.get("/downloadsinglefile",downloadSingleFile)
router.get("/changepassword",changePasswordRender);
router.post("/changepassword",changePassword);
router.get("/forgotpassword",forgotPasswordRender);



module.exports=router;