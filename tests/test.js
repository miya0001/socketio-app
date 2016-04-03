var should = require('should');
var io     = require('socket.io-client');
var server = require('../app');

describe("Simple Chat",function(){

  it('Force disconnect',function(done){
    // Send a message
    var client1 = io.connect('http://localhost:3000', {
      transports: ['websocket'],
      'force new connection': true
    });
    client1.on('connect', function(){
      done();
    });
  });

  it('Should get username and message',function(done){
    // Send a message
    var client1 = io.connect('http://localhost:3000', {
      transports: ['websocket'],
      'force new connection': true,
      query: "app=1234"
    });
    client1.on('connect', function(){
      client1.emit('push', {
        username: 'John',
        message: 'Hello World'
      });
    });

    // Get a message
    var client2 = io.connect('http://localhost:3000', {
      transports: ['websocket'],
      'force new connection': true,
      query: "app=1234"
    });
    client2.on('connect', function(){
      client2.on('join', function(data){
        data.should.equal('1234');
      });
      client2.on('push', function(data){
        data.should.have.property('username', 'John');
        data.should.have.property('message', 'Hello World');
        client2.disconnect();
        done();
      });
    });
  });

  // it('Another room can not get data',function(done){
  //
  // });
});
