"use strict";

window.billPayMenuComponent = Vue.extend({
    template: "\n        <nav>\n            <ul>\n                <li v-for=\"o in menus\">\n                    <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                </li> \n            </ul>\n        </nav>\n        ",
    data: function data() {
        return {
            menus: [{ name: "Listar Contas", routeName: 'bill-pay.list' }, { name: "Criar Contas", routeName: 'bill-pay.create' }]
        };
    }
});