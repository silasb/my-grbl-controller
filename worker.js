//var process = require('child_process');

//var SerialPort = require('serialport').SerialPort

process.on('message', function(data) {
  //console.log('data: ' + data)

  process.send({type: 'all', message: data})
})

setInterval(function(){ 
  //console.log(process)
  //process.send({foo: 'hello'})
  //process.send({type: 'all', message: {foo: 'hello'}})


  process.send({
    type: 'all',
    message: {
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    }
  })
}, 1000)
