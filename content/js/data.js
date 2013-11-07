(function (global) {
    var app = global.app = global.app || {},
        kendo = global.kendo;
    
    app.data = {};
    
    app.data.locations = new kendo.data.DataSource({
        type: 'everlive',
        transport: {
            typeName: 'Locations'
        },
        schema: {
            model: { id: Everlive.idField }
        },
        autoSync: true,
        serverFiltering: true
    });
})(window);