'use strict';

window.billComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n\n    <ul id="nav-mobile" class="side-nav">\n        <li v-for="o in menus">\n            <a v-link="{name: o.routeName}">{{o.name}}</a>\n        </li> \n    </ul>\n\n    <div class="navbar-fixed">\n        <nav>\n        \n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse" >\n                    <i class="material-icons">menu</i>\n                </a>\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="o in menus">\n                    <a v-link="{name: o.routeName}">{{o.name}}</a>\n                    </li> \n                </ul>\n                \n            </div>\n        </nav>\n    </div>\n    <modal></modal>\n        <router-view></router-view>\n        ',
    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.button-dropdown').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "Dashboard", routeName: 'bill-dashboard' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
});