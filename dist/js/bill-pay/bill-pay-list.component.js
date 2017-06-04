'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n    <div class="section">\n            <div class="container">\n                <div class="row">\n                    <div class="col s7">\n                        <h5>Contas a pagar</h5>\n                    </div>\n                    <div class="col s5">\n                       <h5><a class="waves-effect waves-light btn right" v-link="{ name: \'bill-pay.create\'}"><i class="material-icons left">add</i>Adicionar</a></h5>\n                    </div>\n                </div>\n                <div class="row">\n                    <table class="bordered highlight responsive-table">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xE3o</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <!-- <tr v-for="o in bills"> para fazer for sem o indice -->\n                        <tr v-for="(index,o) in bills  | orderBy \'date_due\'">\n                            <td>{{index+1}}</td>\n                            <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                            <td>{{o.name | upper}}</td>\n                            <td class="right-align">{{o.value | numberFormat \'pt-br\' \'BRL\'}}</td>\n                        <td class="center-align" :class="{\'green-text\' : o.done , \'red-text\': !o.done}">\n                            <i v-if="o.done" class="material-icons" title="Sim">done</i>\n                            <i v-else class="material-icons" title="N\xE3o">clear</i>\n                        </td>\n                            <td>\n                                <a href="#" v-link="{name : \'bill-pay.update\', params: {id: o.id}}"><i class="material-icons teal-text" title="Editar">edit</i></a>\n                                <a href="#" @click.prevent="deleteBill(o)"><i class="material-icons red-text lighten-5" title="Excluir">delete</i></a>\n                \n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n    </div>\n    ',
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