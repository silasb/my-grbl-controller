// app.jsx

// mousetrap does not support UMD support so we can't use the full case name.
//
var mousetrap = require('mousetrap');

Mousetrap.bind('alt+x', function() {
  console.log('alt/option-x')
})

Mousetrap.bind('up', function() {
  console.log('up')
})

Mousetrap.bind('down', function() {
  console.log('down')
})

Mousetrap.bind('left', function() {
  console.log('left')
})

Mousetrap.bind('right', function() {
  console.log('right')
})

Mousetrap.bind('pageup', function() {
  console.log('pageup')
})

Mousetrap.bind('pagedown', function() {
  console.log('pagedown')
})

//var serialPort = require('serialport').SerialPort
