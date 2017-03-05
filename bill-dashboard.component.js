window.billDashboardComponent = Vue.extend({
    template: `
    <div style="float: left;">
    <dl>
    <dt>Contas Recebidas</dt>
    <dd>{{received | currency 'R$ '}}</dd>
    <dt>Contas Pagas</dt>
    <dd>{{paid | currency 'R$ '}}</dd>
    <dt>Saldo Atual</dt>
    <dd>{{received-paid | currency 'R$ '}}</dd>
    </dl>
    </div>
    <div  style="float: left; margin-left: 10px;">
    <dl>
    <dt>Contas A Receber</dt>
    <dd>{{to_receive | currency 'R$ '}}</dd>
    <dt>Contas A Pagar</dt>
    <dd>{{to_pay | currency 'R$ '}}</dd>
    <dt>Saldo Futuro</dt>
    <dd>{{received-paid+to_receive-to_pay | currency 'R$ '}}</dd>
    </dl>
</div>
    
   
`,
    data: function () {
        return {
            billsReceive : this.$root.$children[0].billsReceive,
            billsPay : this.$root.$children[0].billsPay,
        }
    },
    computed: {
        received: function(){
            var received = 0;
            for (var i in this.billsReceive) {
                if (this.billsReceive[i].done) {
                    received += this.billsReceive[i].value;
                }
            }
            return received
        },
        paid: function(){
            var paid = 0;
            for (var i in this.billsPay) {
                if (this.billsPay[i].done) {
                    paid += this.billsPay[i].value;
                }
            }
            return paid;
        },
        to_receive: function(){
            var to_receive = 0;
            for (var i in this.billsReceive) {
                if (!this.billsReceive[i].done) {
                    to_receive += this.billsReceive[i].value;
                }
            }
            return to_receive
        },
        to_pay: function(){
            var to_pay = 0;
            for (var i in this.billsPay) {
                if (!this.billsPay[i].done) {
                    to_pay += this.billsPay[i].value;
                }
            }
            return to_pay;
        },
    }
});