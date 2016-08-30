# Teleop-example-with-socket-io
To use this example ou have to install : <br>
* ROS Bridge  
`sudo apt-get install ros-<rosdistro>-rosbridge-server`
* Node js <br> 
`sudo apt-get install curl` <br>
`curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -` <br>
`sudo apt-get install -y nodejs`<br>
* Socket.io version 0.9.16 <br>
(the app is incompatible with newer versions ) <br>
```sudo apt-get install npm``` <br>
`npm install socket.io@0.9.16` <br>
* Roslib <br>
`sudo npm install roslib` <br>
<br>
Now to run the server file you should : <br>
* Run roscore <br>
`roscore &` <br>
* Run the rosbridge server <br>
`roslaunch rosbridge_server rosbridge_websocket.launch` <br>
* Run the nodejs server script <br>
`node filename.js` <br>
then open : `http://<server_ip>:8080` on the browser
