'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: '\n    <style type="text/css">\n        .livre-de-contas{\n            color: green;\n        }\n        .com-contas{\n            color: blue;\n        }\n        .sem-contas {\n            color: gray;\n        }\n    </style>\n\n<h2>{{ title }}</h2>\n<h3 class="{{statusCssClass}}">{{ statusDisplayText }}</h3>\n<menu-component></menu-component>\n<router-view></router-view>\n',
    data: function data() {
        return {
            title: "Contas a Receber",
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

            BillReceiveResource.query().then(function (response) {
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
                _this.statusDisplayText = !count ? 'Nenhuma conta a receber' : 'Existem ' + count + ' a receber';
            });
        }
    },
    events: {
        'change-status': function changeStatus() {
            this.updateStatus();
        }
    }
});