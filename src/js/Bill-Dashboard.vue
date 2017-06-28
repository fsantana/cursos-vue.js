<template>
    <div class="container">
        <div class="row">
            <div class="col l2 hide-on-small-and-down"></div>
            <div class="col s6 l4">
                <div class="dashboard-card">
                    <div class="card-content">
                        <div class="card-title">
                            Contas Recebidas
                        </div>
                        {{received | numberFormat}}
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-content">
                        <div class="card-title">
                            Contas Pagas
                        </div>
                        {{paid | numberFormat}}
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-content">
                        <div class="card-title">
                            Saldo Atual
                        </div>
                        {{received - paid | numberFormat}}
                    </div>
                </div>
            </div>
            <div class="col s6 l4">
                <div class="dashboard-card">
                    <div class="card-content">
                        <div class="card-title">
                            Contas A Receber
                        </div>
                        {{to_receive | numberFormat}}
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-content">
                        <div class="card-title">
                            Contas A Pagar
                        </div>
                        {{to_pay | numberFormat}}
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-content">
                        <div class="card-title">
                            Saldo Futuro
                        </div>
                        {{received - paid + to_receive - to_pay | numberFormat}}
                    </div>
                </div>
            </div>
            <div class="col l2 hide-on-small-and-down"></div>
        </div>
    </div>
</template>
<script>
    import {BillPayResource} from './resources';
    import {BillReceiveResource} from './resources';
    export default {
        data() {
            return {
                to_pay: 0,
                paid: 0,
                to_receive: 0,
                received: 0,
            }
        },
        created(){
            this.updateValues()
        },
        methods: {
            updateValues(){
                BillPayResource.totalPaid().then((response) => {
                    this.paid = response.data.paid;
                });
                BillPayResource.totalToPay().then((response) => {
                    this.to_pay = response.data.to_pay;
                });
                BillReceiveResource.totalReceived().then((response) => {
                    this.received = response.data.received;
                });
                BillReceiveResource.totalToReceive().then((response) => {
                    this.to_receive = response.data.to_receive;
                });
            }
        },

    }
</script>