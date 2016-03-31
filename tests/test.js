var should = require('should');
var io     = require('socket.io-client');
var server = require('../app');

var socketURL = 'http://localhost:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe("Chat Server",function(){

  it('Should broadcast new user once they connect',function(done){
    var client = io.connect(socketURL, options);

    client.on('connect', function(){
      client.on('user', function(data){
        data.name.should.equal("John");
        client.disconnect();
        done();
      });
    });
  });
});
