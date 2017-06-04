'use strict';

window.billPayCreateComponent = Vue.extend({
    template: '\n<div class="section">\n    <div class="container">\n        <h5 v-if="this.formType == \'insert\'">Nova Conta</h5>\n        <h5 v-else>Editar Conta</h5>\n        <div class="row">\n            <form name="form" @submit.prevent="submit">\n                <div class="row">\n                    <div class="col s6">\n                        <label>Vencimento</label>\n                        <input type="text" v-model="bill.date_due | dateFormat" placeholder="Informe a data"/>\n                    </div>\n                    <div class="col s6">\n                        <label>Valor</label>\n                        <input type="text" v-model="bill.value | numberFormat"/>\n                    </div>\n                    \n                </div>\n                <div class="row">\n                    <div class="col s8">\n                        <label>Nome</label>\n                        <select v-model="bill.name" id="name" class="browser-default">\n                            <option value="" disabled selected>Escolha uma op\xE7\xE3o</option>\n                            <option v-for="o in billNames" :value="o">{{o | upper}}</option>\n                        </select>\n                    </div>\n                    <div class="input-field col s4">\n                    \n                        <input type="checkbox" v-model="bill.done" id="pago" class="filled-in"/>\n                        <label for="pago">Pago?</label>\n                    </div>\n                </div>\n       \n                <div class="row">\n                    <div class="col s12 ">\n                        <button class="btn right" type="submit">Enviar</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n',
    data: function data() {
        return {
            formType: 'insert',
            billNames: billPayNames,
            bill: new Bill()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toObject();

            if (this.formType == 'insert') {
                BillPayResource.save({}, data).then(function (response) {
                    _this.$dispatch('change-status');
                    Materialize.toast('Conta criada com sucesso!', 4000);
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                BillPayResource.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-status');
                    Materialize.toast('Conta alterada com sucesso!', 4000);
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillPayResource.get({ id: id }).then(function (response) {
                _this2.bill = new Bill(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            //converte data para poder enviar para api pois o objeto date do javascript na versade é um datetime
            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                var _dateDueObject = new Date(date_due.split('/').reverse().join('-') + 'T03:00:00');
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
});