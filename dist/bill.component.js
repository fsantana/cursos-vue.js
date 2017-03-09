"use strict";

window.billComponent = Vue.extend({
    template: "\n        <h1>Contas a Pagar e Receber</h1>\n        <nav>\n            <ul>\n                <li v-for=\"o in menus\">\n                    <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                </li> \n            </ul>\n        </nav>\n        <router-view></router-view>\n        ",
    data: function data() {
        return {
            menus: [{ name: "Dashboard", routeName: 'bill-dashboard' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
});