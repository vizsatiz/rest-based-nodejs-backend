var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var tasks = require('./tasks.js');
var user = require('./users.js');
var bids = require('./bids.js');
var config = require('../config/serverconfig.js');
var basicAuth = require('../middlewares/basicauth.js');

/*
 * Routes that can be accessed by any one
 */
 // creating a user or registering
router.post('/register/user',basicAuth.basicauth,user.create);
router.get('/register/user/:username',basicAuth.basicauth,user.getUserByName);// Authenticate
router.post('/authenticate',basicAuth.basicauth,auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/task', tasks.getAll);
router.get('/api/v1/task/:id', tasks.getOne);
router.post('/api/v1/task/', tasks.create);
router.post('/api/v1/task/:id', tasks.promote);
router.put('/api/v1/task/:id', tasks.update);
router.delete('/api/v1/task/:id', tasks.delete);

// Bids Apis

router.get('/api/v1/bids',bids.getAll);
router.get('/api/v1/bids/:id',bids.getOne);
router.post('/api/v1/bids',bids.create);
router.put('/api/v1/bids/:id',bids.update);
router.delete('/api/v1/bids/:id',bids.delete);
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router;