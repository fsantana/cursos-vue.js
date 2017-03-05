window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent,
    },
    template: `
    <style type="text/css">
        .livre-de-contas{
            color: green;
        }
        .com-contas{
            color: blue;
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
            title: "Contas a Receber",
            statusCssClass: 'sem-contas'
        }
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billsReceive;
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
            return !count ? 'Nenhuma conta a receber' : 'Existem ' + count + ' a receber';
        }
    }
});