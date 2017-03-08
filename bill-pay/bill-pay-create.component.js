window.billPayCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due"/>
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in billNames" :value="o">{{o}}</option>
        </select>
        <br/><br/>
        <label>Valor:</label>
        <input type="text" v-model="bill.value"/>
        <br/><br/>
        <label>Paga:</label>
        <input type="checkbox" v-model="bill.done"/>
        <br/><br/>
        <input type="submit" value="Enviar">
    </form>
`,
    data: function () {
        return {
            formType: 'insert',
            billNames: [
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina',
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        }
    },
    created: function () {
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
            var self = this;

            if (this.formType == 'insert') {
                BillPayResource.save({},this.bill).then(function(response){
                  self.$dispatch('change-status');
                    self.$router.go({name: 'bill-pay.list'});
                })
            }else{
                BillPayResource.update({id: this.bill.id},this.bill).then(function(response){
                    self.$dispatch('change-status');
                    self.$router.go({name: 'bill-pay.list'});
                })
            }



        },
        getBill: function(id){
            var self = this;
            BillPayResource.get({id: id}).then(function (response) {
                self.bill = response.data;
            })
        }
    }
});