window.billReceiveListComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color: blue;
        }
        .nao-recebido{
            color: orange;
        }
    </style>
        <table border="1" cellpadding="5">
            <thead>
            <tr>
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
                <td>{{o.value | numberFormat 'pt-br' 'BRL'}}</td>
                <td  :class="{'pago' : o.done , 'nao-pago': !o.done}">
                    {{o.done | doneLabel }}
                </td>
                <td>
                    <a href="#" v-link="{name : 'bill-receive.update', params: {id: o.id}}">Editar</a>
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
    
                </td>
            </tr>
            </tbody>
        </table>`,
    data() {
        return {
            bills: []
        }
    },
    created() {
        BillReceiveResource.query().then((response)=>{
            this.bills = response.data;
        })
    },
    methods: {

        deleteBill(bill) {
            if (confirm('Deseja excluir a conta de ' + bill.name + ' com recebimento em ' + bill.date_due + ' ?')) {
                BillReceiveResource.delete({id: bill.id}).then((response)=>{
                    this.bills.$remove(bill);
                    this.$dispatch('change-status');
                });
            }
        }
    }
});