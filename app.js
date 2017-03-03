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
            this.$dispatch('change-activedView', id)
            // this.$root.children[0].activedView = id; navengando do componente principal até os filhos
            if (id == 1) {
                this.$dispatch('change-formType', 'insert');
            }
        }
    }
});

var billListComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color: blue;
        }
        .nao-pago{
            color: orange;
        }
        .sem-contas {
            color: gray;
        }
    </style>
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
        </table>`,
    data: function () {
        return {
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
    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedView', 1);
            this.$dispatch('change-formType', 'update');
        },
        deleteBill: function (bill) {
            if (confirm('Deseja excluir a conta de ' + bill.name + ' com vencimento em ' + bill.date_due + ' ?')) {
                this.bills.$remove(bill);
            }
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});


var billCreateComponent = Vue.extend({
    template: `
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
`,
    data: function () {
        return {
            formType: 'insert',
            billNames: [
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina',
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            },
        }
    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$dispatch('new-bill', this.bill);
            }
            // cria um novo objeto para não ficar vinculado ao da listagem,
            // senão você acaba editando sempre o mesmo objeto.
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.$dispatch('change-activedView', 0);
        },
    },
    events: {
        'change-formType': function (formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bill = bill;
        }
    }
});


var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
    <style type="text/css">
        .livre-de-contas{
            color: green;
        }
        .com-contas{
            color: red;
        }
        .sem-contas {
            color: gray;
        }
    </style>

<h1>{{ title }}</h1>
<h3 class="{{statusCssClass}}">{{ status }}</h3>
<menu-component></menu-component>

<div v-show="activedView == 0">
    <bill-list-component v-ref:bill-list-component></bill-list-component>
</div>
<!-- <div  v-else> poderia utilzar assim para else -->
<div  v-show="activedView == 1">
   <bill-create-component></bill-create-component>
</div>`,
    data: function () {
        return {
            title: "Contas a pagar",
            statusCssClass: 'sem-contas',
            activedView: 0
        }
    },
    computed: {
        status: function () {
            var bills = this.$refs.billListComponent.bills;
            var count = 0;
            if (bills.length == 0) {
                this.statusCssClass = 'sem-contas';
                return 'Nenhuma conta cadastrada';
            }
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.statusCssClass = !count ? 'livre-de-contas' : 'com-contas';
            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
        }
    },
    events: {
        'change-activedView': function (activedView) {
            this.activedView = activedView;
        },
        'change-formType': function (formType) {
            this.$broadcast('change-formType', formType);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        }
    }
});
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",

});
