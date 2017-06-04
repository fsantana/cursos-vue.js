'use strict';

window.billPayComponent = Vue.extend({
    template: '\n<div class="section">\n    <div class="container">\n        <h4>{{ title }}</h4>\n        <div class="row">\n            <div class="col s7">\n                <div class="card z-depth-2 {{statusCssClass}} white-text">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">account_balance</i> </p>    \n                        <h5>{{ statusDisplayText }} ({{ totalToPay | numberFormat}})</h5>\n                    </div>\n                </div>\n             </div>\n             <div class="col s5">\n                <div class="card z-depth-2">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">payment</i> </p>   \n                        <p class="card-title"></p>    <h5>{{ totalPayed | numberFormat}}</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="divider"></div>\n<router-view></router-view>\n',
    data: function data() {
        return {
            title: "Contas a pagar",
            statusCssClass: 'sem-contas',
            statusDisplayText: 'Nenhuma conta cadastrada',
            totalToPay: 0,
            totalPayed: 0
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
                _this.totalToPay = 0;
                _this.totalPayed = 0;
                if (bills.length == 0) {
                    _this.statusCssClass = 'grey';
                    _this.statusDisplayText = 'Nenhuma conta cadastrada';
                }
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                        _this.totalToPay += bills[i].value;
                    } else {
                        _this.totalPayed += bills[i].value;
                    }
                }

                _this.statusCssClass = !count ? 'green' : 'red';
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