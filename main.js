var mainComponent = Vue.extend({
    components: {
        'app-component' : appComponent
    },
    template: '<app-component></app-component>',
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
    }
});

var router = new VueRouter();

router.map({
    '/bills':{
        name: 'bill.list',
        component: billListComponent
    },
    '/bill/create':{
        name: 'bill.create',
        component: billCreateComponent
    },
    '/bill/:index/update':{
        name: 'bill.update',
        component: billCreateComponent
    },
    '*':{ //wildcard
        component: billListComponent
    }
})

router.start({
    components: {
        'main-component' : mainComponent
    }
},'#app');

router.redirect(
    {
        '*' : '/bills'
    }
)
