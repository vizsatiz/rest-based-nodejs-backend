var expect = require('chai').expect;
var request = require('superagent');
var assert = require('assert');
var config = require('../config/serverconfig.js');
var User = require('../models/usermodel.js');

describe('The test to authenticate and test operations of user entity', function () {
  describe('Create a user and authenticate with that user', function () {    
    var record_id;
    it('Create/register user', function () {
        request.post('http://localhost:3000/register/user')
            .type('application/json')
            .auth(config.basicauth.username, config.basicauth.password)
            .send({
                name:'vishnu',
                username: 'satis.vishnu@gmail.com',
                password:'clooney@123'
            })
            .end(function(res,err){
                assert.exist(res);
                assert.equal(res.status,200);
                assert.exist(res.id);
                if(err)
                    throw err;
                record_id = res.id;
                request.post('http://localhost:3000/authenticate')
                    .type('application/json')
                    .auth(config.basicauth.username, config.basicauth.password)
                    .send({
                        username: 'satis.vishnu@gmail.com',
                        password:'clooney@123'
                    })
                    .end(function(res){
                        assert.exist(res);
                        assert.equal(res.status,200);
                        assert.exist(res.id);
                        expect(res.token).to.exist;
                        User.findByIdAndRemove(record_id, function(err) {
                          if (err) throw err;
                          // we have deleted the user
                          console.log("Tests Completed and user deleted ");
                        });
                        done();
                    });
            });
    });
  });  
});