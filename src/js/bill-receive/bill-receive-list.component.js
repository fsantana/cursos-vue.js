let modalComponent = require('../modal.component');
module.exports = {
    components: {
        'modal':modalComponent
    },
    template: `
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col s7">
                    <h5>Contas a receber</h5>
                </div>
                <div class="col s5">
                   <h5><a class="waves-effect waves-light btn right" v-link="{ name: 'bill-receive.create'}"><i class="material-icons left">add</i>Adicionar</a></h5>
                </div>
            </div>
            <div class="row">
                <table class="bordered highlight responsive-table z-depth-3">
                    <thead>
                    <tr class="center-align">
                        <th>#</th>
                        <th>Recebimento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Recebido?</th>
                        <th>Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- <tr v-for="o in bills"> para fazer for sem o indice -->
                    <tr v-for="(index,o) in bills | orderBy 'date_due'">
                        <td>{{index+1}}</td>
                        <td>{{o.date_due | dateFormat 'pt-BR'}}</td>
                        <td>{{o.name | upper}}</td>
                        <td class="right-align">{{o.value | numberFormat 'pt-br' 'BRL'}}</td>
                        <td class="center-align" :class="{'green-text' : o.done , 'blue-text': !o.done}">
                            <i v-if="o.done" class="material-icons" title="Sim">done</i>
                            <i v-else class="material-icons" title="Não">clear</i>
                        </td>
                        <td class="center-align">
                            <a href="#" v-link="{name : 'bill-receive.update', params: {id: o.id}}"><i class="material-icons teal-text" title="Editar">edit</i></a>
                            <a href="#" @click.prevent="openModalDelete(o)"><i class="material-icons red-text lighten-5" title="Excluir">delete</i></a>
            
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Nome: <trong>{{billToDelete.name | upper}}</trong></p>
            <p>Valor: <trong>{{billToDelete.value | numberFormat}}</trong></p>
            <p>Data de Vencimento: <trong>{{billToDelete.date_due | dateFormat}}</trong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
    
`,
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        }
    },
    created() {
        BillReceiveResource.query().then((response)=>{
            this.bills = response.data;
        })

    },
    methods: {

        deleteBill() {

                BillReceiveResource.delete({id: this.billToDelete.id}).then((response)=>{
                    this.bills.$remove(this.billToDelete);
                    this.billToDelete = null;
                    Materialize.toast('Conta excluída com sucesso!',4000);
                    this.$dispatch('change-status');
                });

        },
        openModalDelete(bill){
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
}