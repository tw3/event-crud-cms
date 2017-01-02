export default (sequelize, DataTypes) => {
	return sequelize.define('scheduled_event', {
		title: {
			type: DataTypes.STRING
		},
		start_dt: {
			type: DataTypes.DATE
		},
		end_dt: {
			type: DataTypes.DATE
		},
		category: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		},
		featured_bl: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		// disable the modification of tablenames; By default, sequelize will automatically
		// transform all passed model names (first parameter of define) into plural.
		// if you don't want that, set the following
		//freezeTableName: true,

		// don't use camelcase for automatically added attributes but underscore style
		// so updatedAt will be updated_at
		underscored: true,

		// define the table's name
		//tableName: 'public.scheduled_events'
	});
};