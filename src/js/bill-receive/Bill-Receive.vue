<template>
    <div class="section">
        <div class="container">
            <h4>{{ title }}</h4>
            <div class="row">
                <div class="col s7">
                    <div class="card z-depth-2 {{statusCssClass}} white-text">
                        <div class="card-content">
                            <p class="card-title"><i class="material-icons">account_balance</i></p>
                            <h5>{{ statusDisplayText }} ({{ totalToReceive | numberFormat}})</h5>
                        </div>
                    </div>
                </div>
                <div class="col s5">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title"><i class="material-icons">payment</i></p>
                            <p class="card-title"></p>    <h5>{{ totalReceived | numberFormat}}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <router-view></router-view>
</template>
<script>
    import {BillReceiveResource} from '../resources';
    export default {
        data() {
            return {
                title: "Contas a Receber",
                statusCssClass: 'sem-contas',
                statusDisplayText: 'Nenhuma conta cadastrada',
                totalToReceive: 0,
                totalReceived: 0
            }
        },
        created(){
            this.updateStatus()
        }, methods: {
            updateStatus(){
                BillReceiveResource.query().then((response) => {
                    let bills = response.data;
                    let count = 0;
                    this.totalToReceive = 0;
                    this.totalReceived = 0;
                    if (bills.length == 0) {
                        this.statusCssClass = 'grey';
                        this.statusDisplayText = 'Nenhuma conta cadastrada';
                    }
                    for (let i in bills) {
                        if (!bills[i].done) {
                            count++;
                            this.totalToReceive += bills[i].value;
                        } else {
                            this.totalReceived += bills[i].value;
                        }
                    }

                    this.statusCssClass = !count ? 'green' : 'blue';
                    this.statusDisplayText = !count ? 'Nenhuma conta a receber' : 'Existem ' + count + ' a receber';
                })
            }
        },
        events: {
            'change-status'(){
                this.updateStatus();
            }
        }
    }
</script>