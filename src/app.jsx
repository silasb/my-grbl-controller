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
      <button className="btn btn-success" onClick={this.handleCycleStart}>Cycle Start &lt;Alt-R&gt;</button>
      <button className="btn btn-warning" onClick={this.handleHoldFeed}>Hold Feed &lt;Spc&gt;</button>
      <button className="btn btn-danger" onClick={this.handleStop}>Stop &lt;Alt-S&gt;</button>
    </div>
  }
})

React.renderComponent(<MachineManager />, document.getElementById('machine-manager'));

var MachineCoordinates = React.createClass({
  componentDidMount: function() {
    console.log('mounted')

    var $this = this;

    msgBus.bind('all', function(message) {
      //console.log(message)
      //$this.setState(message)
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

      <button className="btn">GOTO Z</button>
    </div>
  }
})


React.renderComponent(<MachineCoordinates />, document.getElementById('machine-coordinates'));

//var serialPort = require('serialport').SerialPort
