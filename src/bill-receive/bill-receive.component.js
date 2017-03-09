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

<h2>{{ title }}</h2>
<h3 class="{{statusCssClass}}">{{ statusDisplayText }}</h3>
<menu-component></menu-component>
<router-view></router-view>
`,
    data() {
        return {
            title: "Contas a Receber",
            statusCssClass: 'sem-contas',
            statusDisplayText: 'Nenhuma conta cadastrada'
        }
    },
    created(){
        this.updateStatus()
    },methods: {
        updateStatus(){
            BillReceiveResource.query().then((response) => {
                let bills = response.data;
                let count = 0;
                if (bills.length == 0) {
                    this.statusCssClass = 'sem-contas';
                    this.statusDisplayText =  'Nenhuma conta cadastrada';
                }
                for (let i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }

                this.statusCssClass = !count ? 'livre-de-contas' : 'com-contas';
                this.statusDisplayText = !count ? 'Nenhuma conta a receber' : 'Existem ' + count + ' a receber';
            })
        }
    },
    events: {
        'change-status'(){
            this.updateStatus();
        }
    }
});