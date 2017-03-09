"use strict";

window.billDashboardComponent = Vue.extend({
    template: "\n    <div style=\"float: left;\">\n    <dl>\n    <dt>Contas Recebidas</dt>\n    <dd>{{received | currency 'R$ '}}</dd>\n    <dt>Contas Pagas</dt>\n    <dd>{{paid | currency 'R$ '}}</dd>\n    <dt>Saldo Atual</dt>\n    <dd>{{received-paid | currency 'R$ '}}</dd>\n    </dl>\n    </div>\n    <div  style=\"float: left; margin-left: 10px;\">\n    <dl>\n    <dt>Contas A Receber</dt>\n    <dd>{{to_receive | currency 'R$ '}}</dd>\n    <dt>Contas A Pagar</dt>\n    <dd>{{to_pay | currency 'R$ '}}</dd>\n    <dt>Saldo Futuro</dt>\n    <dd>{{received-paid+to_receive-to_pay | currency 'R$ '}}</dd>\n    </dl>\n</div>\n    \n   \n",
    data: function data() {
        return {
            to_pay: 0,
            paid: 0,
            to_receive: 0,
            received: 0
        };
    },
    created: function created() {
        this.updateValues();
    },

    methods: {
        updateValues: function updateValues() {
            var _this = this;

            BillPayResource.totalPaid().then(function (response) {
                _this.paid = response.data.paid;
            });
            BillPayResource.totalToPay().then(function (response) {
                _this.to_pay = response.data.to_pay;
            });
            BillReceiveResource.totalReceived().then(function (response) {
                _this.received = response.data.received;
            });
            BillReceiveResource.totalToReceive().then(function (response) {
                _this.to_receive = response.data.to_receive;
            });
        }
    }

});