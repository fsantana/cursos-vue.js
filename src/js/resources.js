Vue.http.options.root = 'http://192.168.10.10:8000/api';

window.BillPayResource = Vue.resource('bills-pay{/id}',{},{
    totalToPay : {
        method: 'GET',
        url: 'bills-pay/total-to-pay'

    },
    totalPaid : {
        method: 'GET',
        url: 'bills-pay/total-paid'
    }
})

window.BillReceiveResource = Vue.resource('bills-receive{/id}',{},{
    totalToReceive : {
        method: 'GET',
        url: 'bills-receive/total-to-receive'

    },
    totalReceived : {
        method: 'GET',
        url: 'bills-receive/total-received'
    }
})

const  billPayNames = [
    'Conta de Luz',
    'Conta de Água',
    'Conta de Telefone',
    'Supermercado',
    'Cartão de Crédito',
    'Empréstimo',
    'Gasolina',
];

const billReceiveNames = ['Salário', 'Bonificação', 'Extras'];

