var should = require('should');
var io     = require('socket.io-client');
var server = require('../app');

var socketURL = 'http://localhost:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe("Simple Chat",function(){

  it('Should get username and message',function(done){
    // Send a message
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(){
      client1.emit('post', {
        username: 'John',
        message: 'Hello World'
      });
    });

    // Get a message
    var client2 = io.connect(socketURL, options);
    client2.on('connect', function(){
      client2.on('post', function(data){
        data.username.should.equal("John");
        data.message.should.equal("Hello World");
        client2.disconnect();
        done();
      });
    });
  });
});
