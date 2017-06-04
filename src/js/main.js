let router = new VueRouter();

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
            '/:id/update':{
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
            '/:id/update':{
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
  /*  '*':{
        component: billDashboardComponent
    }*/
})

router.start({
    components: {
        'bill-component': billComponent
    }
}, '#app');
/*
 router.redirect(
 {
 '*' : '/dashboard'
 }
 )*/