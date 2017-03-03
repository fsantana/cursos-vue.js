
Vue.filter('doneLabel', function (value) {
    return value == 0 ? 'Não Paga' : 'Paga';
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar Contas"}, {id: 1, name: "Criar Contas"}
        ],
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
        ],
    },
    computed: {
        status: function () {
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
            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if(id == 1){
                this.formType = 'insert';
            }
        },
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
