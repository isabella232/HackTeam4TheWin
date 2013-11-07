(function (global) {
    var app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.Everlive = new Everlive('bYaBPhnS1u6B9ejS');
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    }, false);
})(window);