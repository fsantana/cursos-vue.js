window.billPayListComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color: blue;
        }
        .nao-pago{
            color: orange;
        }
    </style>
    <div class="container">
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
                    <td>{{o.value | numberFormat 'pt-br' 'BRL'}}</td>
                    <td  :class="{'pago' : o.done , 'nao-pago': !o.done}">
                        {{o.done | doneLabel }}
                    </td>
                    <td>
                        <a href="#" v-link="{name : 'bill-pay.update', params: {id: o.id}}">Editar</a>
                        <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
        
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
});