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

var React = require('react')

var GCodeViewer = React.createClass({
  render: function() {
    var styles = {
      width: this.props.width,
      height: this.props.height
    };

    return <div>
      <textarea style={styles} ></textarea>
    </div>
  }
})

//React.renderComponent(<GCodeViewer width={600} height={400} />, document.body)

var MachineManager = React.createClass({
  componentDidMount: function() {
    console.log('mounted')

    var $this = this;

    Mousetrap.bind('alt+r', function(e) {
      $this.handleCycleStart()
    }) 
    Mousetrap.bind('alt+s', function(e) {
      $this.handleStop()
    }) 
    Mousetrap.bind('space', function(e) {
      $this.handleHoldFeed()
    }) 
  },

  componentWillUnmount: function() {
    // unbind mousetrap stuff
    Mousetrap.unbind('alt+r');
    Mousetrap.unbind('alt+s');
    Mousetrap.unbind('space');
  },

  handleCycleStart: function() {
    worker.send('~')
    console.log('cycle start')
  },

  handleStop: function() {
    worker.send('ctrl+x')
    console.log('stop')
  },

  handleHoldFeed: function() {
    worker.send('!')
    console.log('hold feed')
  },

  render: function() {
    return <div>
      machine
      <button onClick={this.handleCycleStart}>Cycle Start &lt;Alt-R&gt;</button>
      <button onClick={this.handleHoldFeed}>Hold Feed &lt;Spc&gt;</button>
      <button onClick={this.handleStop}>Stop &lt;Als-S&gt;</button>
    </div>
  }
})

//React.renderComponent(<MachineManager />, document.body);

var MachineCoordinates = React.createClass({
  componentDidMount: function() {
    console.log('mounted')

    var $this = this;

    msgBus.bind('all', function(message) {
      //console.log(message)
      $this.setState(message)
    })
  },

  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      z: 0
    }
  },

  render: function() {
    return <div>
      x: <input type="text" ref="x_axis" readOnly={true} value={this.state.x} />
      y: <input type="text" ref="y_axis" readOnly={true} value={this.state.y} />
      z: <input type="text" ref="z_axis" readOnly={true} value={this.state.z} />
    </div>
  }
})

React.renderComponent(<MachineCoordinates />, document.body);

//var serialPort = require('serialport').SerialPort
