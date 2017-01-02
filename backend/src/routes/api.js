import models from '../models';
import express from 'express';

let router = express.Router();

// GET all events
router.get('/events', function(req, res, next) {
	models.scheduled_event.findAll({
		order: [
			['featured_bl', 'DESC'],
			['id']
			]
	})
		.then(function(data) {
			res.send({
				success: true,
				data
			});
		}, function(data) {
			res.send({
				success: false,
				data
			});
		});
});

// GET one event/
router.get('/events/:id', function(req, res, next) {
	models.scheduled_event.findOne({
		where: {id: req.params.id}
	}).then(function(data) {
		res.send({
			success: true,
			data
		});
	}, function(data) {
		res.send({
			success: false,
			data
		});
	});
});

// PUT an update to one event
router.put('/events/:id', function(req, res, next) {
	models.scheduled_event.update(req.body, {
		where: {id: req.params.id}
	}).then(function(data) {
		res.send({
			success: true,
			data
		});
	}, function(data) {
		res.send({
			success: false,
			data
		});
	});
});

// POST a new event
router.post('/events', function(req, res, next) {
	models.scheduled_event.create(req.body)
		.then(function(data) {
			res.send({
				success: true,
				data
			});
		}, function(data) {
			res.send({
				success: false,
				data
			});
		});
});

// DELETE an event
router.delete('/events/:id', function(req, res, next) {
	models.scheduled_event.destroy({
		where: {id: req.params.id}
	}).then(function(data) {
		res.send({
			success: true,
			data
		});
	}, function(data) {
		res.send({
			success: false,
			data
		});
	});
});


export default router;

