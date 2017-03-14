window.billComponent = Vue.extend({
    template: `
        <h1>Contas a Pagar e Receber</h1>
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a v-link="{name: o.routeName}">{{o.name}}</a>
                </li> 
            </ul>
        </nav>
        <router-view></router-view>
        `,
    data() {
        return {
            menus: [
                {name: "Dashboard", routeName:'bill-dashboard'},
                {name: "Contas a Pagar", routeName:'bill-pay.list'},
                {name: "Contas a Receber", routeName:'bill-receive.list'}
            ],
        }
    },

});