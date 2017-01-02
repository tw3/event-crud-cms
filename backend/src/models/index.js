import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/event_db');
let models = {};

sequelize.sync({force: false});

fs.readdirSync(__dirname)
	.filter(function(file) {
		return (file.endsWith(".js")) && (file !== "index.js");
	})
	.forEach(function(file) {
		const fullPath = path.join(__dirname, file);
		console.log("Importing table settings found in " + fullPath);
		const model = sequelize.import(fullPath);
		//console.log("model.name = " + model.name);
		models[model.name] = model;
	});

Object.keys(models).forEach(function(modelName) {
	if ("associate" in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

// Load any mock data
function dynLoadModules(filepath) {
	fs.lstat(filepath, function(err, stat) {
		if (stat.isDirectory()) {
			// we have a directory: do a tree walk
			fs.readdir(filepath, function(err, files) {
				let f;
				const l = files.length;
				for (var i = 0; i < l; i++) {
					f = path.join(filepath, files[i]);
					dynLoadModules(f);
				}
			});
		} else {
			//console.log("dynLoadModules: filepath = " + filepath);
			// we have a file: load it
			const modelName = path.basename(filepath, '.js');
			//console.log("dynLoadModules: modelName = " + modelName);
			const model = models[modelName];
			if (model != null) {
				console.log("Adding mock data found in " + filepath);
				let defineCall = require(filepath);
				if (typeof defineCall === 'object') {
					// Babel/ES6 module compatability
					defineCall = defineCall.default;
				}
				//console.log("defineCall = " + defineCall);
				//console.log("model = " + model);
				defineCall(model);
			}
		}
	});
}
console.log("\n");
var mockDataDir = path.join(__dirname, 'mockdata');
//dynLoadModules(mockDataDir);


export default models;