var expect = require('chai').expect;
var request = require('superagent');

describe('The test to authenticate and test crud operations of user', function () {
  describe('Create a auth  call and get the auth token', function () {
    it('Authenticate', function () {
        request.post('/login')
            .type('application/json')
            .send({username: "dgv",password:"efmrkd"})
            .end(function(res){
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.token).to.exist;
                done();
        })
    });
  });
});