'use strict';

window.billReceiveComponent = Vue.extend({
    template: '\n<div class="section">\n    <div class="container">\n        <h4>{{ title }}</h4>\n        <div class="row">\n            <div class="col s7">\n                <div class="card z-depth-2 {{statusCssClass}} white-text">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">account_balance</i> </p>    \n                        <h5>{{ statusDisplayText }} ({{ totalToReceive | numberFormat}})</h5>\n                    </div>\n                </div>\n             </div>\n             <div class="col s5">\n                <div class="card z-depth-2">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">payment</i> </p>   \n                        <p class="card-title"></p>    <h5>{{ totalReceived | numberFormat}}</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="divider"></div>\n<router-view></router-view>\n',
    data: function data() {
        return {
            title: "Contas a Receber",
            statusCssClass: 'sem-contas',
            statusDisplayText: 'Nenhuma conta cadastrada',
            totalToReceive: 0,
            totalReceived: 0
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
                _this.totalToReceive = 0;
                _this.totalReceived = 0;
                if (bills.length == 0) {
                    _this.statusCssClass = 'grey';
                    _this.statusDisplayText = 'Nenhuma conta cadastrada';
                }
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                        _this.totalToReceive += bills[i].value;
                    } else {
                        _this.totalReceived += bills[i].value;
                    }
                }

                _this.statusCssClass = !count ? 'green' : 'blue';
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