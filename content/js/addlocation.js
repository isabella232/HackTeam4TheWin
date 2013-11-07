(function (global) {
    var app = global.app = global.app || {},
        kendo = global.kendo;
    
    app.addLocationViewModel = kendo.observable({
        addLocation: function () {
            var description = document.getElementById("locationDescription").value;

            app.application.showLoading();

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    app.data.locations.add({
                        Description: description,
                        Coordinates: new Everlive.GeoPoint(parseFloat(position.coords.longitude, 10), parseFloat(position.coords.latitude, 10))
                    });

                    app.application.hideLoading();
                },
                function (error) {
                    app.application.hideLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );
        }
    });
})(window);