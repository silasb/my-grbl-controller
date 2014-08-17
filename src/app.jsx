// app.jsx

// mousetrap does not support UMD support so we can't use the full case name.
//
var mousetrap = require('mousetrap');

Mousetrap.bind('i', function() {
  nodeRequire('nw.gui').Window.get().showDevTools();
})

Mousetrap.bind('r', function() {
  nodeRequire('nw.gui').Window.get().reload();
})

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
    return <form role="form">
      <textarea className="form-control" disabled readonly rows={this.props.rows} cols={this.props.cols}></textarea>
    </form>
  }
})

React.renderComponent(<GCodeViewer rows={10} cols={4} />, document.getElementById('gcode-viewer'))

var MachineManager = React.createClass({
  getInitialState: function() {
    return {
      feed_held: false,
      cycle_started: false
    }
  },

  componentDidMount: function() {
    console.log('mounted')

    var $this = this;

    msgBus.bind('feed-held', function() {
      $this.setState({feed_held: true})
    })
    msgBus.bind('cycle-stopped', function() {
      $this.setState({cycle_started: false})
    })
    msgBus.bind('cycle-started', function() {
      $this.setState({cycle_started: true})
    })

    Mousetrap.bind('alt+r', function(e) {
      $this.handleCycStart()
    }) 
    Mousetrap.bind('alt+s', function(e) {
      //if (!$this.state.)
      $this.handleStop()
    }) 
    Mousetrap.bind('space', function(e) {
      if (!$this.state.feed_held)
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
    msgBus.send('worker', {command: 'cycle-start', message: {}})
    //worker.send('~')
    console.log('cycle start')
  },

  handleStop: function() {
    msgBus.send('worker', {command: 'cycle-stop', message: {}})
    console.log('stop')
  },

  handleHoldFeed: function() {
    msgBus.send('worker', {command: 'hold-feed', message: {}})
    console.log('hold feed')
  },

  render: function() {
    return <div>
      machine
      <button className="btn btn-success" onClick={this.handleCycleStart} disabled={this.state.cycle_started}>Cycle Start &lt;Alt-R&gt;</button>
      <button className="btn btn-warning" onClick={this.handleHoldFeed} disabled={this.state.feed_held}>Hold Feed &lt;Spc&gt;</button>
      <button className="btn btn-danger" onClick={this.handleStop} disabled={!this.state.cycle_started}>Stop &lt;Alt-S&gt;</button>
    </div>
  }
})

React.renderComponent(<MachineManager />, document.getElementById('machine-manager'));

var MachineCoordinates = React.createClass({
  componentDidMount: function() {
    console.log('mounted')

    var $this = this;

    msgBus.bind('coord-update', function(message) {
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

  handleGotoZ: function() {
    var new_z = prompt("New Z");

    msgBus.send('worker', {command: 'set-coords', args: {z: new_z}})
    //this.setState({z: new_z})
  },

  render: function() {
    return <div>
      <form className="form-horizontal" role="form">
        <div className="form-group">
          <label htmlFor="" className="col-sm-1 control-label">X:</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" ref="x_axis" readOnly={true} value={this.state.x} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="" className="col-sm-1 control-label">Y:</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" ref="y_axis" readOnly={true} value={this.state.y} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="" className="col-sm-1 control-label">Z:</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" ref="z_axis" readOnly={true} value={this.state.z} />
          </div>
        </div>
      </form>

      <button className="btn" onClick={this.handleGotoZ}>GOTO Z</button>
    </div>
  }
})


React.renderComponent(<MachineCoordinates />, document.getElementById('machine-coordinates'));

//var serialPort = require('serialport').SerialPort
