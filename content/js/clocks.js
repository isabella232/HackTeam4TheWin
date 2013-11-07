(function ($, kendo, moment) {
	"use strict";

	var officeData = new kendo.data.DataSource({
		transport: {
			read: "data/offices.json"
		}
	});

	var timelineData = new kendo.data.DataSource({
		data: []
	});

	var generateTimelineData = function () {
		var data = [];
		var offices = officeData.view();
		var numOffices = offices.length;
		var office;
		var momentForDay;

		for(var i = 0; i < numOffices; i++) {
			office = offices[i];
			momentForDay = moment(this.get("selectedTime")).tz(timezone).add("days", -8);

			for(var dayIdx = -7; dayIdx <= 30; dayIdx++) {
				momentForDay.add("days", 1);
				data.push({
					name: office.name,
					day: dayIdx,
					offset: momentForDay.zone() / 60
				});
			}
		}

		timelineData.data(data);
	};

	var viewModel = kendo.observable({
		selectedTime: moment().toDate(),
		offices: officeData,

		selectedDay: function () {
			return kendo.toString(this.get("selectedTime"), "D");
		},

		calcTime: function (data) {
			var timezone = data.get("timezone");
			if(timezone) {
				return moment(this.get("selectedTime")).tz(timezone).format("h:mm a z");
			}
			return "";
		}
	});

	kendo.bind($("body"), viewModel);
})(window.jQuery, window.kendo, window.moment);