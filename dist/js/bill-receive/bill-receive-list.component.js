'use strict';

window.billReceiveListComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n    <div class="section">\n        <div class="container">\n            <div class="row">\n                <div class="col s7">\n                    <h5>Contas a receber</h5>\n                </div>\n                <div class="col s5">\n                   <h5><a class="waves-effect waves-light btn right" v-link="{ name: \'bill-receive.create\'}"><i class="material-icons left">add</i>Adicionar</a></h5>\n                </div>\n            </div>\n            <div class="row">\n                <table class="bordered highlight responsive-table z-depth-3">\n                    <thead>\n                    <tr class="center-align">\n                        <th>#</th>\n                        <th>Recebimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Recebido?</th>\n                        <th>A\xE7\xE3o</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <!-- <tr v-for="o in bills"> para fazer for sem o indice -->\n                    <tr v-for="(index,o) in bills | orderBy \'date_due\'">\n                        <td>{{index+1}}</td>\n                        <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                        <td>{{o.name | upper}}</td>\n                        <td class="right-align">{{o.value | numberFormat \'pt-br\' \'BRL\'}}</td>\n                        <td class="center-align" :class="{\'green-text\' : o.done , \'blue-text\': !o.done}">\n                            <i v-if="o.done" class="material-icons" title="Sim">done</i>\n                            <i v-else class="material-icons" title="N\xE3o">clear</i>\n                        </td>\n                        <td class="center-align">\n                            <a href="#" v-link="{name : \'bill-receive.update\', params: {id: o.id}}"><i class="material-icons teal-text" title="Editar">edit</i></a>\n                            <a href="#" @click.prevent="openModalDelete(o)"><i class="material-icons red-text lighten-5" title="Excluir">delete</i></a>\n            \n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            <p>Nome: <trong>{{billToDelete.name | upper}}</trong></p>\n            <p>Valor: <trong>{{billToDelete.value | numberFormat}}</trong></p>\n            <p>Data de Vencimento: <trong>{{billToDelete.date_due | dateFormat}}</trong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n    \n',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        BillReceiveResource.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill() {
            var _this2 = this;

            BillReceiveResource.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                _this2.$dispatch('change-status');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});