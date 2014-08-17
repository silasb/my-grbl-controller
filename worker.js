//var process = require('child_process');

//var SerialPort = require('serialport').SerialPort

var functions = {
  'set-coords': setCoords,
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

setInterval(function(){ 
  //console.log(process)
  //process.send({foo: 'hello'})
  //process.send({type: 'all', message: {foo: 'hello'}})

  /*
    process.send({
    type: 'all',
    message: {
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    }
  })
  */
}, 1000)
