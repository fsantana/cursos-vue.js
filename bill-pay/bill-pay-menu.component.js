window.billPayMenuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a v-link="{name: o.routeName}">{{o.name}}</a>
                </li> 
            </ul>
        </nav>
        `,
    data: function () {
        return {
            menus: [
                {name: "Listar Contas", routeName:'bill-pay.list'},
                {name: "Criar Contas", routeName:'bill-pay.create'}
            ],
        }
    },
});
