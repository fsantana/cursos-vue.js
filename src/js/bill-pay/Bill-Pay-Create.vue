<template>
    <div class="section">
        <div class="container">
            <h5 v-if="this.formType == 'insert'">Nova Conta</h5>
            <h5 v-else>Editar Conta</h5>
            <div class="row">
                <form name="form" @submit.prevent="submit">
                    <div class="row">
                        <div class="col s6">
                            <label>Vencimento</label>
                            <input type="text" v-model="bill.date_due | dateFormat" placeholder="Informe a data"/>
                        </div>
                        <div class="col s6">
                            <label>Valor</label>
                            <input type="text" v-model="bill.value | numberFormat"/>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col s8">
                            <label>Nome</label>
                            <select v-model="bill.name" id="name" class="browser-default">
                                <option value="" disabled selected>Escolha uma opção</option>
                                <option v-for="o in billNames" :value="o">{{o | upper}}</option>
                            </select>
                        </div>
                        <div class="input-field col s4">

                            <input type="checkbox" v-model="bill.done" id="pago" class="filled-in"/>
                            <label for="pago">Pago?</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col s12 ">
                            <button class="btn right" type="submit">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import {BillPayResource} from '../resources';
    import {Bill} from '../bill';
    const billPayNames = [
        'Conta de Luz',
        'Conta de Água',
        'Conta de Telefone',
        'Supermercado',
        'Cartão de Crédito',
        'Empréstimo',
        'Gasolina',
    ];
    export default {
        data() {
            return {
                formType: 'insert',
                billNames: billPayNames,
                bill: new Bill()
            }
        },
        created() {
            if (this.$route.name == 'bill-pay.update') {
                this.formType = 'update';
                this.getBill(this.$route.params.id);
            }
        },
        methods: {
            submit() {

                let data = this.bill.toObject();

                if (this.formType == 'insert') {
                    BillPayResource.save({}, data).then((response) => {
                        this.$dispatch('change-status');
                        alert('Conta criada com sucesso!');
                        this.$router.go({name: 'bill-pay.list'});
                    })
                } else {
                    BillPayResource.update({id: this.bill.id}, data).then((response) => {
                        this.$dispatch('change-status');
                        alert('Conta alterada com sucesso!');
                        this.$router.go({name: 'bill-pay.list'});
                    })
                }
            },
            getBill(id){
                BillPayResource.get({id: id}).then((response) => {
                    this.bill = new Bill(response.data);
                })
            },
            getDateDue(date_due){
                //converte data para poder enviar para api pois o objeto date do javascript na versade é um datetime
                let dateDueObject = date_due;
                if (!(date_due instanceof Date)) {
                    let dateDueObject = new Date(date_due.split('/').reverse().join('-') + 'T03:00:00');
                }
                return dateDueObject.toISOString().split('T')[0];
            }
        }
    }
</script>
