/*Vue.filter('doneLabel', function (value) {
 return value == 0 ? 'Não' : 'Sim';
 });*/
Vue.filter('doneLabel', (value) => value == 0 ? "Não" : "Sim");