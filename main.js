var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 75.95, done: true},
                {date_due: '21/08/2016', name: 'Conta de Água', value: 22.50, done: true},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value: 75.60, done: true},
                {date_due: '23/08/2016', name: 'Supermercado', value: 225.99, done: true},
                {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1267.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 100.00, done: true},
                {date_due: '26/08/2016', name: 'Gasolina', value: 130.25, done: true}
            ],
            billsReceive: [
                {date_due: '20/08/2016', name: 'Salário', value: 5000.00, done: true},
                {date_due: '21/08/2016', name: 'Bonificação', value: 300.00, done: false},
            ]
        }
    }
});

var router = new VueRouter();

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/':{
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create':{
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update':{
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
            '*':{ //wildcard
                component: billPayListComponent
            }
        }
    },

    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/':{
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create':{
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update':{
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
            '*':{ //wildcard
                component: billReceiveListComponent
            }
        }
    },

    'dashboard':{
        name:'bill-dashboard',
        component: billDashboardComponent
    },
    '*':{
        component: billDashboardComponent
    }


})

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

 router.redirect(
 {
 '*' : '/dashboard'
 }
 )
