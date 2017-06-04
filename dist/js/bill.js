'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bill = function () {
    function Bill() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Bill);

        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data); // atribui ao  objeto os valores passados pelo ojeto data
    }

    _createClass(Bill, [{
        key: 'toObject',
        value: function toObject() {
            //tratamento para funcionar na edição, pois o objeto contem a data em formato do banco
            var date_due = typeof this.date_due === 'string' && this.date_due.length == '10' ? this.date_due : this.date_due.toISOString().substring(0, 10);
            return {
                date_due: date_due,
                name: this.name,
                value: parseFloat(this.value),
                done: this.done
            };
        }
    }]);

    return Bill;
}();