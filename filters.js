Vue.filter('doneLabel', function (value) {
    return value == 0 ? 'Não' : 'Sim';
});