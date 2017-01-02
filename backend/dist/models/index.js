'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || "development";
var sequelize = new _sequelize2.default('postgres://postgres:password@localhost:5432/event_db');
var models = {};

sequelize.sync({ force: false });

_fs2.default.readdirSync(__dirname).filter(function (file) {
	return file.endsWith(".js") && file !== "index.js";
}).forEach(function (file) {
	var fullPath = _path2.default.join(__dirname, file);
	console.log("Importing table settings found in " + fullPath);
	var model = sequelize.import(fullPath);
	//console.log("model.name = " + model.name);
	models[model.name] = model;
});

Object.keys(models).forEach(function (modelName) {
	if ("associate" in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = _sequelize2.default;

// Load any mock data
function dynLoadModules(filepath) {
	_fs2.default.lstat(filepath, function (err, stat) {
		if (stat.isDirectory()) {
			// we have a directory: do a tree walk
			_fs2.default.readdir(filepath, function (err, files) {
				var f = void 0;
				var l = files.length;
				for (var i = 0; i < l; i++) {
					f = _path2.default.join(filepath, files[i]);
					dynLoadModules(f);
				}
			});
		} else {
			//console.log("dynLoadModules: filepath = " + filepath);
			// we have a file: load it
			var modelName = _path2.default.basename(filepath, '.js');
			//console.log("dynLoadModules: modelName = " + modelName);
			var model = models[modelName];
			if (model != null) {
				console.log("Adding mock data found in " + filepath);
				var defineCall = require(filepath);
				if ((typeof defineCall === 'undefined' ? 'undefined' : _typeof(defineCall)) === 'object') {
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
var mockDataDir = _path2.default.join(__dirname, 'mockdata');
//dynLoadModules(mockDataDir);


exports.default = models;
//# sourceMappingURL=index.js.map