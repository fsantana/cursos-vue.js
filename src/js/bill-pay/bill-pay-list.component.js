module.exports = {
    template: `
    <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col s7">
                        <h5>Contas a pagar</h5>
                    </div>
                    <div class="col s5">
                       <h5><a class="waves-effect waves-light btn right" v-link="{ name: 'bill-pay.create'}"><i class="material-icons left">add</i>Adicionar</a></h5>
                    </div>
                </div>
                <div class="row">
                    <table class="bordered highlight responsive-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Vencimento</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Paga?</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- <tr v-for="o in bills"> para fazer for sem o indice -->
                        <tr v-for="(index,o) in bills  | orderBy 'date_due'">
                            <td>{{index+1}}</td>
                            <td>{{o.date_due | dateFormat 'pt-BR'}}</td>
                            <td>{{o.name | upper}}</td>
                            <td class="right-align">{{o.value | numberFormat 'pt-br' 'BRL'}}</td>
                        <td class="center-align" :class="{'green-text' : o.done , 'red-text': !o.done}">
                            <i v-if="o.done" class="material-icons" title="Sim">done</i>
                            <i v-else class="material-icons" title="Não">clear</i>
                        </td>
                            <td>
                                <a href="#" v-link="{name : 'bill-pay.update', params: {id: o.id}}"><i class="material-icons teal-text" title="Editar">edit</i></a>
                                <a href="#" @click.prevent="deleteBill(o)"><i class="material-icons red-text lighten-5" title="Excluir">delete</i></a>
                
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
    </div>
    `,
    data() {
        return {
            bills: []
        }
    },
    created() {
        BillPayResource.query().then((response)=> {
            this.bills = response.data;
        })
    },
    methods: {

        deleteBill(bill) {
            if (confirm('Deseja excluir a conta de ' + bill.name + ' com vencimento em ' + bill.date_due + ' ?')) {
                BillPayResource.delete({id: bill.id}).then((response)=>{
                    this.bills.$remove(bill);
                    this.$dispatch('change-status');
                });
            }
        }
    }
}