'use strict';

window.billPayCreateComponent = Vue.extend({
    template: '\n    <form name="form" @submit.prevent="submit">\n        <label>Vencimento:</label>\n        <input type="text" v-model="bill.date_due"/>\n        <br><br>\n        <label>Nome:</label>\n        <select v-model="bill.name">\n            <option v-for="o in billNames" :value="o">{{o}}</option>\n        </select>\n        <br/><br/>\n        <label>Valor:</label>\n        <input type="text" v-model="bill.value"/>\n        <br/><br/>\n        <label>Paga:</label>\n        <input type="checkbox" v-model="bill.done"/>\n        <br/><br/>\n        <input type="submit" value="Enviar">\n    </form>\n',
    data: function data() {
        return {
            formType: 'insert',
            billNames: billPayNames,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
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

            if (this.formType == 'insert') {
                BillPayResource.save({}, this.bill).then(function (response) {
                    _this.$dispatch('change-status');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                BillPayResource.update({ id: this.bill.id }, this.bill).then(function (response) {
                    _this.$dispatch('change-status');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillPayResource.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
            });
        }
    }
});