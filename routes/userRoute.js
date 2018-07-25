const apiController = require('./../controllers/userController');
const app = require('./../app').app;
const path        = require('path');
const multer      = require('multer');

const storage   = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/files');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
        console.log("fieldname",file.fieldname)
        console.log("path",path.extname(file.originalname))
    }
});

var upload = multer({ storage : storage});

app.post('/api/signup',apiController.register);

app.post('/api/login',apiController.login);

app.post('/api/user-details',apiController.userDetails);

app.post('/api/user-detail',apiController.userDetail);

app.post('/api/forget-password',apiController.forgetPassword);

app.post('/api/user-coin',apiController.currentCoin);

app.post('/api/user-profile-upload',upload.single('image'),apiController.profileUpload);

app.post('/api/keep-alive',apiController.keepAlive);