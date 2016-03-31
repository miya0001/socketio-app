var should = require('should');
var io     = require('socket.io-client');
var server = require('../app');

var socketURL = 'http://localhost';

var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe("Chat Server",function(){

  it('Should broadcast new user once they connect',function(done){
    var client = io.connect(socketURL, options);

    client.on('test',function(data){
      data.hello.should.equal("world");
      client.disconnect();
      done();
    });
  });
});
