'use strict';

window.billPayComponent = Vue.extend({
    template: '\n    <style type="text/css">\n        .livre-de-contas{\n            color: blue;\n        }\n        .com-contas{\n            color: red;\n        }\n        .sem-contas {\n            color: gray;\n        }\n    </style>\n\n<h2>{{ title }}</h2>\n<h3 class="{{statusCssClass}}">{{ statusDisplayText }}</h3>\n<router-view></router-view>\n',
    data: function data() {
        return {
            title: "Contas a pagar",
            statusCssClass: 'sem-contas',
            statusDisplayText: 'Nenhuma conta cadastrada'
        };
    },
    created: function created() {
        this.updateStatus();
    },

    methods: {
        updateStatus: function updateStatus() {
            var _this = this;

            BillPayResource.query().then(function (response) {
                var bills = response.data;
                var count = 0;
                if (bills.length == 0) {
                    _this.statusCssClass = 'sem-contas';
                    _this.statusDisplayText = 'Nenhuma conta cadastrada';
                }
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }

                _this.statusCssClass = !count ? 'livre-de-contas' : 'com-contas';
                _this.statusDisplayText = !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
            });
        }
    },
    events: {
        'change-status': function changeStatus() {
            this.updateStatus();
        }
    }
});