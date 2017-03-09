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
    data() {
        return {
            to_pay : 0,
            paid : 0,
            to_receive : 0,
            received : 0,
        }
    },
    created(){
        this.updateValues()
    },
    methods: {
        updateValues(){
            BillPayResource.totalPaid().then((response)=>{
                this.paid =  response.data.paid;
            })
            BillPayResource.totalToPay().then((response)=>{
                this.to_pay =  response.data.to_pay;
            })
            BillReceiveResource.totalReceived().then((response)=>{
                this.received =  response.data.received;
            })
            BillReceiveResource.totalToReceive().then((response)=>{
                this.to_receive =  response.data.to_receive;
            })
        }
    },

});