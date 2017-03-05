window.appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
    },
    template: `
    <style type="text/css">
        .livre-de-contas{
            color: green;
        }
        .com-contas{
            color: red;
        }
        .sem-contas {
            color: gray;
        }
    </style>

<h1>{{ title }}</h1>
<h3 class="{{statusCssClass}}">{{ status }}</h3>
<menu-component></menu-component>
<router-view></router-view>
`,
    data: function () {
        return {
            title: "Contas a pagar",
            statusCssClass: 'sem-contas'
        }
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].bills;
            var count = 0;
            if (bills.length == 0) {
                this.statusCssClass = 'sem-contas';
                return 'Nenhuma conta cadastrada';
            }
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.statusCssClass = !count ? 'livre-de-contas' : 'com-contas';
            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
        }
    }
});