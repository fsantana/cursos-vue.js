<template>
    <div class="section">
        <div class="container">
            <h4>{{ title }}</h4>
            <div class="row">
                <div class="col s7">
                    <div class="card z-depth-2 {{statusCssClass}} white-text">
                        <div class="card-content">
                            <p class="card-title"><i class="material-icons">account_balance</i></p>
                            <h5>{{ statusDisplayText }} ({{ totalToPay | numberFormat}})</h5>
                        </div>
                    </div>
                </div>
                <div class="col s5">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title"><i class="material-icons">payment</i></p>
                            <p class="card-title"></p>    <h5>{{ totalPayed | numberFormat}}</h5>
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
    import {BillPayResource} from '../resources';
    export default {
        data() {
            return {
                title: "Contas a Pagar",
                statusCssClass: 'sem-contas',
                statusDisplayText: 'Nenhuma conta cadastrada',
                totalToPay: 0,
                totalPayed: 0
            }
        },
        created(){
            this.updateStatus()
        },
        methods: {
            updateStatus(){
                BillPayResource.query().then((response) => {
                    let bills = response.data;
                    let count = 0;
                    this.totalToPay = 0;
                    this.totalPayed = 0;
                    if (bills.length == 0) {
                        this.statusCssClass = 'grey';
                        this.statusDisplayText = 'Nenhuma conta cadastrada';
                    }
                    for (let i in bills) {
                        if (!bills[i].done) {
                            count++;
                            this.totalToPay += bills[i].value;
                        } else {
                            this.totalPayed += bills[i].value;
                        }
                    }

                    this.statusCssClass = !count ? 'green' : 'red';
                    this.statusDisplayText = !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
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