export default (model) => {
	console.log("Inserting mock data for scheduled_events");
	model.bulkCreate([
		{
			title: "Miley's recital",
			start_dt: new Date('2016-10-19 18:00:00-05:00'),
			end_dt: new Date('2016-10-19 19:00:00-05:00'),
			category: "music",
			description: "Miley is going to play piano and do some twerking",
			featured_bl: true
		},
		{
			title: "Trump's inauguration",
			start_dt: new Date('2017-01-20 15:00:00-05:00'),
			end_dt: new Date('2017-01-20 15:00:00-05:00'),
			category: "politics",
			description: "Donald Trump will officially become POTUS",
			featured_bl: false
		},
		{
			title: "José's summer vacation",
			start_dt: new Date('2017-06-01 12:00:00-05:00'),
			end_dt: new Date('2017-08-31 11:59:59-05:00'),
			category: "politics",
			description: "José will be traveling to Honduras for summer vacation",
			featured_bl: false
		}
	]);
};