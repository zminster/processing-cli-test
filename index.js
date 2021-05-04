const app = require('express')();
const { spawn } = require('child_process');

app.get("/run", (req, res) => {
	// run processing
	const processing = spawn('processing-java', ['--sketch=./test_sketch', '--run', req.query.thing]);
	let output = [];

	processing.stdout.on('data', (data) => {
		output.push(Buffer.from(data, 'base64').toString('utf8'));
	});

	// return results to user in the web page
	processing.on('close', (code) => {
		// parse out the results now that we have them all
		output.splice(output.length-2, 2);
		let joined = output.join();
		let splits = joined.split('\t');

		let outputObject = {};

		splits.forEach((tag) => {
			let obj = JSON.parse(tag);
			outputObject = { ...outputObject, ...obj };
		});

		res.end(""+outputObject.distance);
	});

});

app.listen(8080, () => { console.log("Server go vroom"); });