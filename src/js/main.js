import './bootstrap';
import BillPayComponent from './bill-pay/Bill-Pay.vue';
import BillPayListComponent from './bill-pay/Bill-Pay-List.vue';
import BillPayCreateComponent from './bill-pay/Bill-Pay-Create.vue';
import BillReceiveComponent from './bill-receive/Bill-Receive.vue';
import BillReceiveListComponent from './bill-receive/Bill-Receive-List.vue';
import BillReceiveCreateComponent from './bill-receive/Bill-Receive-Create.vue';
import BillComponent from './Bill.vue';
import BillDashboardComponent from './Bill-Dashboard.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();

router.map({
    '/bill-pays': {
        component: BillPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: BillPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: BillPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: BillPayCreateComponent
            },
            '*': { //wildcard
                component: BillPayListComponent
            }
        }
    },

    '/bill-receives': {
        component: BillReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: BillReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: BillReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: BillReceiveCreateComponent
            },
            '*': { //wildcard
                component: BillReceiveListComponent
            }
        }
    },
    'dashboard': {
        name: 'bill-dashboard',
        component: BillDashboardComponent
    },
    /*  '*':{
     component: billDashboardComponent
     }*/
})

router.start({
    components: {
        'bill-component': BillComponent
    }
}, '#app')

/*
 router.redirect(
 {
 '*' : '/dashboard'
 }
 )*/