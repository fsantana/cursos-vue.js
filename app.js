
Vue.filter('doneLabel', function (value) {
    return value == 0 ? 'Não Paga' : 'Paga';
});
var menuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a href="#" @click.prevent="showView(o.id)">{{o.name}}</a>
                </li>
            </ul>
        </nav>
        `,
        data: function () {
            return {
                menus: [
                    {id: 0, name: "Listar Contas"}, {id: 1, name: "Criar Contas"}
                ],
            }
        },
         methods: {
             showView: function (id) {
                 this.$parent.activedView = id;
                 // this.$root.children[0].activedView = id; navengando do componente principal até os filhos
                 if (id == 1) {
                     this.$parent.formType = 'insert';
                 }
             }
         }
})
Vue.component('menu-component', menuComponent);
var appComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        .sem-contas {
            color: gray;
        }
    </style>

<h1>{{ title }}</h1>
<h3 class="{{statusCssClass}}">{{ status }}</h3>
<menu-component></menu-component>
<div v-if="activedView == 0">
    <table border="1" cellpadding="5">
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
        <tr v-for="(index,o) in bills">
            <td>{{index}}</td>
            <td>{{o.date_due}}</td>
            <td>{{o.name}}</td>
            <td>{{o.value | currency 'R$ '}}</td>
            <td  :class="{'pago' : o.done , 'nao-pago': !o.done}">
                {{o.done | doneLabel }}
            </td>
            <td>
                <a href="#" @click.prevent="loadBill(o)">Editar</a>
                <a href="#" @click.prevent="deleteBill(o)">Excluir</a>

            </td>
        </tr>
        </tbody>
    </table>
    <cite><b>shortcodes</b><br>
        v-on = @<br> v-bind = : <br> <br>Documentação para filtros : http://v1.vuejs.org/api/#Filters</cite>

</div>
<!-- <div  v-else> poderia utilzar assim para else -->
<div  v-if="activedView == 1">
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due"/>
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in billNames" :value="o">{{o}}</option>
        </select>
        <br/><br/>
        <label>Valor:</label>
        <input type="text" v-model="bill.value"/>
        <br/><br/>
        <label>Paga:</label>
        <input type="checkbox" v-model="bill.done"/>
        <br/><br/>
        <input type="submit" value="Enviar">
    </form>

</div>`,
    data: function(){
        return {
            title: "Contas a pagar",
            statusCssClass: 'sem-contas',
            activedView: 0,
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            },
            billNames: [
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina',
            ],
            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 75.95, done: true},
                {date_due: '21/08/2016', name: 'Conta de Água', value: 22.50, done: false},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value: 75.60, done: true},
                {date_due: '23/08/2016', name: 'Supermercado', value: 225.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1267.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 100.00, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 130.25, done: false}
            ]
        }
    },
    computed: {
        status: function() {
            var count = 0;
            if(this.bills.length == 0){
                this.statusCssClass = 'sem-contas';
                return 'Nenhuma conta cadastrada';
            }
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }

            this.statusCssClass = !count ? 'pago' : 'nao-pago';
            return !count ? 'Nenhum conta a pagar' : 'Existem ' + count + ' a serem pagas';
        }
    },
    methods: {
        submit: function() {
            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }
            // cria um novo objeto para não ficar vinculado ao da listagem,
            // senão você acaba editando sempre o mesmo objeto.
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.activedView = 0;
        },
        loadBill: function(o) {
            this.bill = o;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function(bill) {
            if(confirm('Deseja excluir a conta de '+bill.name+' com vencimento em '+bill.date_due+' ?')){
                this.bills.$remove(bill);
            }
        }
    }
});
Vue.component('app-component',appComponent);
var app = new Vue({
    el: "#app",

});
