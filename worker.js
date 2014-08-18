//var process = require('child_process');

//var SerialPort = require('serialport').SerialPort

var functions = {
  'set-coords': setCoords,
  'hold-feed': holdFeed,
  'cycle-start': cycleStart,
  'cycle-stop': cycleStop,
  'gcode': gcode
}

process.on('message', function(data) {
  //console.log('data: ' + data)

  //process.send({type: 'all', message: data})

  var command = data.message.command;
  var args = data.message.args;

  if (functions[command]) {
    functions[command](args)
  }
})

function setCoords(coords) {
  // simulate delay
  setTimeout(function() {
    process.send({type: 'coord-update', message: {z: coords.z}})
  }, 1000)
}

function holdFeed() {
  //machine.send('!')
  process.send({type: 'feed-held', message: {}})
}

function cycleStart() {
  //machine.send('~')
  process.send({type: 'cycle-started', message: {}})
}

function cycleStop() {
  //machine.send('ctrl-x')
  process.send({type: 'cycle-stopped', message: {}})
}

function gcode(message) {
  //machine.send(message)
  process.send({type: 'log', message: message})
}


setInterval(function(){ 
  //<Idle,MPos:5.529,0.560,7.000,WPos:1.529,-5.440,-0.000>

  var input = "<Idle,MPos:5.529,0.560,7.000,WPos:1.529,-5.440,-0.000>"

  //machine.send('?')

  input = input.slice(1, -1)
  input = input.split(',')

  var status = input[0];
  var mpos_x = input[1].split(':')[1];
  var mpos_y = input[2];
  var mpos_z = input[3];
  var wpos_x = input[4].split(':')[1];
  var wpos_y = input[5];
  var wpos_z = input[6];

  process.send({
    type: 'all',
    message: {
      x: mpos_x,
      y: mpos_y,
      z: mpos_z,
    }
  })

}, 500)
