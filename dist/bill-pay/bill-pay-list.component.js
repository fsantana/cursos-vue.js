'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n    <style type="text/css">\n        .pago{\n            color: blue;\n        }\n        .nao-pago{\n            color: orange;\n        }\n    </style>\n        <table border="1" cellpadding="5">\n            <thead>\n            <tr>\n                <th>#</th>\n                <th>Vencimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Paga?</th>\n                <th>A\xE7\xE3o</th>\n            </tr>\n            </thead>\n            <tbody>\n            <!-- <tr v-for="o in bills"> para fazer for sem o indice -->\n            <tr v-for="(index,o) in bills">\n                <td>{{index}}</td>\n                <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                <td>{{o.name | upper}}</td>\n                <td>{{o.value | numberFormat \'pt-br\' \'BRL\'}}</td>\n                <td  :class="{\'pago\' : o.done , \'nao-pago\': !o.done}">\n                    {{o.done | doneLabel }}\n                </td>\n                <td>\n                    <a href="#" v-link="{name : \'bill-pay.update\', params: {id: o.id}}">Editar</a>\n                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n    \n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ',
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillPayResource.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm('Deseja excluir a conta de ' + bill.name + ' com vencimento em ' + bill.date_due + ' ?')) {
                BillPayResource.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-status');
                });
            }
        }
    }
});