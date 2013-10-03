'use strict';
angular.module('<%= appname %>.service', [])
.factory('<%= name %>Model', function () {
    var _value;

    return {
        set: function (value) {
            if (_value !== value) {
                var _old = _value;
                _value = value;
                this.changed.dispatch({
                    old: _old,
                    new: _value
                });
            }
        },

        get: function () {
            return _value;
        },

        changed: new signals.Signal()
    };
});
