window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent,
    },
    template: `
    <style type="text/css">
        .livre-de-contas{
            color: blue;
        }
        .com-contas{
            color: red;
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
    data: function () {
        return {
            title: "Contas a pagar",
            statusCssClass: 'sem-contas',
            statusDisplayText: 'Nenhuma conta cadastrada'
        }
    },
    created: function (){
        this.updateStatus()
    },
    methods: {
        updateStatus(){
            var self = this;
            BillPayResource.query().then(function (response){
                var bills = response.data;
                var count = 0;
                if (bills.length == 0) {
                    self.statusCssClass = 'sem-contas';
                    self.statusDisplayText =  'Nenhuma conta cadastrada';
                }
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }

                self.statusCssClass = !count ? 'livre-de-contas' : 'com-contas';
                self.statusDisplayText = !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
            })
        }
    },
    events: {
        'change-status': function(){
            this.updateStatus();
        }
    }
});