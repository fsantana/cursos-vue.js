window.billReceiveCreateComponent = Vue.extend({
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
        <label>Recebido:</label>
        <input type="checkbox" v-model="bill.done"/>
        <br/><br/>
        <input type="submit" value="Enviar">
    </form>
`,
    data: function () {
        return {
            formType: 'insert',
            billNames: [
                'Salário',
                'Bonificação',
                'Extras',
            ],
            bill: {
                date_receive: '',
                name: '',
                value: 0,
                done: false
            },
            bills: this.$root.$children[0].billsReceive,
        }
    },
    created: function () {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }
            this.bill = {
                date_receive: '',
                name: '',
                value: 0,
                done: false
            };

            this.$router.go({name: 'bill-receive.list'});

        },
        getBill: function(index){
            this.bill = this.bills[index];
        }
    }
});