var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar Contas" }, {id: 1, name: "Criar Contas" }
        ],
        activedView : 0,
        bills: [
            {date_due: '20/08/2016', name: 'Conta de Luz', value: 75.95, done:1},
            {date_due: '21/08/2016', name: 'Conta de Água', value: 22.50, done:0},
            {date_due: '22/08/2016', name: 'Conta de Telefone', value: 75.60, done:0},
            {date_due: '23/08/2016', name: 'Supermercado', value: 225.99, done:0},
            {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1267.99, done:0},
            {date_due: '25/08/2016', name: 'Empréstimo', value: 100.00, done:0},
            {date_due: '26/08/2016', name: 'Gasolina', value: 130.25, done:0}
        ],
    },
    computed: {
        status: function(){
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return !count ? 'Nenhum conta a pagar' : 'Existem '+count+' a serem pagas';
        }
    },
    methods: {
        showView: function(id){
            this.activedView = id;
        }
    }

})