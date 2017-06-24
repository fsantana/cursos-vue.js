let modalComponent = require('./modal.component');
module.exports = {
    components: {
        'modal' : modalComponent
    },
    template: `

    <ul id="nav-mobile" class="side-nav">
        <li v-for="o in menus">
            <a v-link="{name: o.routeName}">{{o.name}}</a>
        </li> 
    </ul>

    <div class="navbar-fixed">
        <nav>
        
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo right">Contas</a>
                <a href="#" data-activates="nav-mobile" class="button-collapse" >
                    <i class="material-icons">menu</i>
                </a>
                <ul class="left hide-on-med-and-down">
                    <li v-for="o in menus">
                    <a v-link="{name: o.routeName}">{{o.name}}</a>
                    </li> 
                </ul>
                
            </div>
        </nav>
    </div>
    <modal></modal>
        <router-view></router-view>
        `,
    ready(){
        $('.button-collapse').sideNav();
        $('.button-dropdown').dropdown();
    },
    data() {
        return {
            menus: [
                {name: "Dashboard", routeName:'bill-dashboard'},
                { name: "Contas a Pagar", routeName:'bill-pay.list'},
                { name: "Contas a Receber", routeName:'bill-receive.list'}
            ]
        }
    },
}
