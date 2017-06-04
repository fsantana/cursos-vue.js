'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Two-way filters
Vue.filter('numberFormat', {
    read: function read(value) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';
        var currency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'BRL';
        //mostar a informação na view
        var number = 0;

        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) != undefined) {
            var numberRegex = value.toString().match(/-*\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        /*number = value.toString();*/
        /*es5
         return new Number(number).toLocaleString('pt-BR',
         {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'BRL'
         });
         */
        //es6
        var options = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        if (currency) {
            options.style = 'currency';
            options.currency = currency;
        }

        var moeda = new Intl.NumberFormat(format, options);

        return moeda.format(number);
    },
    write: function write(value) {
        // vai pegar da view e converter para armazenar no modelo
        var number = 0;
        if (value.length > 0) {
            //R$80,99  80,99 80.99
            number = value.replace(/[^\d,]/g, '') //retira o que não é numero ou virgula
            .replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});
Vue.filter('dateFormat', {
    read: function read(value) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';
        //mostar a informação na view
        if (value && value != undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            //es5
            //return value.toLocaleString('pt-BR').split(' ')[0]; //o split divide em um array contendo a data e a hora

            //es6
            return new Intl.DateTimeFormat(format).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        // vai pegar da view e converter para armazenar no modelo
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + 'T03:00:00');
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});
Vue.filter('upper', {
    read: function read(value) {
        //mostar a informação na view
        if (value && value != undefined) {
            return value.toUpperCase();
        }
        return value;
    },
    write: function write(value) {
        // vai pegar da view e converter para armazenar no modelo
        if (value && value != undefined) {
            return value.toLowerCase();
        }
        return value;
    }
});