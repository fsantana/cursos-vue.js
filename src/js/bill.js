export class Bill {
    constructor(data = {}){
        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data); // atribui ao  objeto os valores passados pelo ojeto data
    }

    toObject(){
        //tratamento para funcionar na edição, pois o objeto contem a data em formato do banco
        let date_due = (typeof this.date_due === 'string' && this.date_due.length == '10')
        ? this.date_due : this.date_due.toISOString().substring(0, 10);
        return {
            date_due: date_due,
            name: this.name,
            value: parseFloat(this.value),
            done: this.done
        }
    }
}