"use strict";

window.billDashboardComponent = Vue.extend({
    template: "\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col l2 hide-on-small-and-down\"></div>\n            <div class=\"col s6 l4\">\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas Recebidas\n                        </div>\n                        {{received | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas Pagas\n                        </div>\n                        {{paid | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Saldo Atual\n                        </div>\n                        {{received-paid | numberFormat}}\n                    </div>\n                </div>\n            </div>\n            <div class=\"col s6 l4\">\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas A Receber\n                        </div>\n                        {{to_receive | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas A Pagar\n                        </div>\n                        {{to_pay | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Saldo Futuro\n                        </div>\n                        {{received-paid+to_receive-to_pay | numberFormat}}\n                    </div>\n                </div>\n            </div>\n            <div class=\"col l2 hide-on-small-and-down\"></div>\n        </div>\n    </div>\n  \n",
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