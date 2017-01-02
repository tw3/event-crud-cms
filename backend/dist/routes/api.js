'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// GET all events
router.get('/events', function (req, res, next) {
	_models2.default.scheduled_event.findAll().then(function (data) {
		res.send({
			success: true,
			data: data
		});
	}, function (data) {
		res.send({
			success: false,
			data: data
		});
	});
});

// GET one event/
router.get('/events/:id', function (req, res, next) {
	_models2.default.scheduled_event.findOne({
		where: { id: req.params.id }
	}).then(function (data) {
		res.send({
			success: true,
			data: data
		});
	}, function (data) {
		res.send({
			success: false,
			data: data
		});
	});
});

// PUT an update to one event
router.put('/events/:id', function (req, res, next) {
	_models2.default.scheduled_event.update(req.body, {
		where: { id: req.params.id }
	}).then(function (data) {
		res.send({
			success: true,
			data: data
		});
	}, function (data) {
		res.send({
			success: false,
			data: data
		});
	});
});

// POST a new event
router.post('/events', function (req, res, next) {
	_models2.default.scheduled_event.create(req.body).then(function (data) {
		res.send({
			success: true,
			data: data
		});
	}, function (data) {
		res.send({
			success: false,
			data: data
		});
	});
});

// DELETE an event
router.delete('/events/:id', function (req, res, next) {
	_models2.default.scheduled_event.destroy({
		where: { id: req.params.id }
	}).then(function (data) {
		res.send({
			success: true,
			data: data
		});
	}, function (data) {
		res.send({
			success: false,
			data: data
		});
	});
});

exports.default = router;
//# sourceMappingURL=api.js.map