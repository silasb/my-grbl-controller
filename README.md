# gach3

A controller for GRBL that is similar to Mach3

# Development

	npm install
	npm install -g gulp

	npm install -g node-pre-gyp
	npm install -g nw-gyp
	cd node_modules/serialport
	node-pre-gyp rebuild --runtime=node-webkit --target=0.10.0

This may be needed on Linux hosts:

	cd node_modules/serialport/build/serialport/v1.4.5/Release
	cp -R node-webkit-v0.10.0-linux-x64/ node-webkit-v14-linux-x64/

# Linux

libudev.so.0 issues

	cd node_modules/nodewebkit/nodewebkit
	sed -i 's/udev\.so\.0/udev.so.1/g' nw

In another terminal

	gulp

To start the application run:

	node_modules/.bin/nodewebkit
