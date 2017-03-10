window.billPayCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due | dateFormat"/>
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in billNames" :value="o">{{o}}</option>
        </select>
        <br/><br/>
        <label>Valor:</label>
        <input type="text" v-model="bill.value | numberFormat"/>
        <br/><br/>
        <label>Paga:</label>
        <input type="checkbox" v-model="bill.done"/>
        <br/><br/>
        <input type="submit" value="Enviar">
    </form>
`,
    data() {
        return {
            formType: 'insert',
            billNames: billPayNames,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
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

            //copia o objeto alterando a data com o metodo getDateDuo
            let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});

            if (this.formType == 'insert') {
                BillPayResource.save({}, data).then((response) => {
                    this.$dispatch('change-status');
                    this.$router.go({name: 'bill-pay.list'});
                })
            } else {
                BillPayResource.update({id: data.id}, data).then((response) => {
                    this.$dispatch('change-status');
                    this.$router.go({name: 'bill-pay.list'});
                })
            }


        },
        getBill(id){
            BillPayResource.get({id: id}).then((response) => {
                this.bill = response.data;
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
});