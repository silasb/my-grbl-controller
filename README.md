# gach3

A controller for GRBL that is similar to Mach3

# Development

	npm install

	npm install -g node-pre-gyp
	npm install -g nw-gyp
	cd node_modules/serialport
	node-pre-gyp rebuild --runtime=node-webkit --target=0.10.0

In another terminal

	gulp

To start the application run:

	node_modules/.bin/nodewebkit
