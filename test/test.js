function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function register(email, pswd, repeat_pswd) {
    if (validateEmail(email)) {
        if ((pswd === repeat_pswd) &&
            (String(pswd).length >= 8) &&
            (String(repeat_pswd).length >= 8) &&
            (String(pswd).length <= 50) &&
            (String(repeat_pswd).length <= 50)) {
            return 'ok';
        } else {
            return 'password error';
        }
    } else {
        return 'email not valid';
    }
}


let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('server');
let expect = require("chai").expect;
let should = require("should");

let request = require("superagent");
let util = require("util");


describe('Testing registration validation', function () {
    it('Correct email and passwords. Should return ok', function () {
        assert.equal(register('a@gmail.com', 12345678, 12345678), 'ok');
    });
    it('Wrong email. Should return email not valid', function () {
        assert.equal(register('a@gmail', 12345678, 12345678), 'email not valid');
    });
    it('Wrong password. Should return password error', function () {
        assert.equal(register('a@gmail.com', 123478, 12345678), 'password error');
    });
});



chai.use(chaiHttp);

describe('API logout', function () {

    it('Should return 200', function (done) {
        chai.request('localhost:5000')
            .get('/logout_user')
            .end(function (err, res) {
                // res.should.have.status(200);
                expect(res.status).to.equal(200);
                done();
            });
    });

});