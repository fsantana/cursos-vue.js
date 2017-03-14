/*Vue.filter('doneLabel', function (value) {
 return value == 0 ? 'Não' : 'Sim';
 });*/
Vue.filter('doneLabel', (value) => value == 0 ? "Não" : "Sim");
//Two-way filters
Vue.filter('numberFormat', {
    read(value, format = 'pt-BR', currency = 'BRL'){ //mostar a informação na view
        let number = 0;
        if (value && typeof value != undefined) {
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        /*es5
         return new Number(number).toLocaleString('pt-BR',
         {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'BRL'
         });
         */
        //es6
        let options  = {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
        };

        if(currency ){
            options.style = 'currency';
            options.currency = currency;
        }

        let moeda = new Intl.NumberFormat(format,options);

        return moeda.format(number);

    },
    write(value){ // vai pegar da view e converter para armazenar no modelo
        let number= 0;
        if(value.length > 0){
            //R$80,99  80,99 80.99
            number = value.replace(/[^\d,]/g,'') //retira o que não é numero ou virgula
                  .replace(/\,/g,'.');
            number = isNaN(number) ? 0 : parseFloat(number);

        }

        return number;
    }
});
Vue.filter('dateFormat', {
    read(value, format = 'pt-BR'){ //mostar a informação na view
        if(value && value != undefined){
            if(!(value instanceof Date)){
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                let dateString = dateRegex ? dateRegex[0] : dateRegex;
                if(dateString){
                    value = new Date(dateString+"T03:00:00");
                }else{
                    return value;
                }
            }
            //es5
            //return value.toLocaleString('pt-BR').split(' ')[0]; //o split divide em um array contendo a data e a hora

            //es6
            return new Intl.DateTimeFormat(format).format(value).split(' ')[0];
        }
        return value;

    },
    write(value){ // vai pegar da view e converter para armazenar no modelo
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-') + 'T03:00:00');
            if(!isNaN(date.getTime())){
                return date;
            }
        }
        return value;
    }
});
Vue.filter('upper', {
    read(value){ //mostar a informação na view
        if(value && value != undefined){
            return  value.toUpperCase();
        }
        return value;

    },
    write(value){ // vai pegar da view e converter para armazenar no modelo
        if(value && value != undefined){
            return  value.toLowerCase();
        }
        return value;
    }
});