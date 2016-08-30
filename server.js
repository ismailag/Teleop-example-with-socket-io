var http = require('http');
var fs = require('fs');
//start socket.io
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
var io = require('socket.io').listen(server);
server.listen(8080);
//start rosbridge
var ROSLIB = require('roslib');
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
})

//topic
var cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});
//twist object
var twist = new ROSLIB.Message({
linear : {
  x : 0.0,
  y : 0.0,
  z : 0.0
},
angular : {
  x : 0.0,
  y : 0.0,
  z : 0.0
}
});
//events callbacks
io.sockets.on('connection', function(socket) {  
    socket.emit('hello', {msg: 'welcome'});
   
    
socket.on('move1',function(val,vel) {
	
	vel=(vel-50)*0.02 ;	var x=vel/50 ;
	if (val<50 && vel>0)	
	{twist.angular.z=Math.min(vel,x*(50-val));
	twist.linear.x=Math.max(0,vel-x*(50-val));	
	}
	else if(vel>0 && val>=50)
	{twist.angular.z=-Math.max(0,vel-x*(100-val));
	twist.linear.x=Math.min(vel,x*(100-val));	
	}
	else if (vel<0  && val>=50)
	{twist.angular.z=-Math.min(0,vel-x*(100-val));
	twist.linear.x=Math.max(vel,x*(100-val));	
	}
	else
	{
	twist.angular.z=Math.max(vel,x*(50-val));
	twist.linear.x=Math.min(0,vel-x*(50-val));
	}
	cmdVel.publish(twist);twist.linear.x=0.0; twist.angular.z=0.0;
});

   
});

