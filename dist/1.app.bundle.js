webpackJsonp([1],{

/***/ 18:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n<div class="section">\n    <div class="container">\n        <h4>{{ title }}</h4>\n        <div class="row">\n            <div class="col s7">\n                <div class="card z-depth-2 {{statusCssClass}} white-text">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">account_balance</i> </p>    \n                        <h5>{{ statusDisplayText }} ({{ totalToPay | numberFormat}})</h5>\n                    </div>\n                </div>\n             </div>\n             <div class="col s5">\n                <div class="card z-depth-2">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">payment</i> </p>   \n                        <p class="card-title"></p>    <h5>{{ totalPayed | numberFormat}}</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="divider"></div>\n<router-view></router-view>\n',
	    data: function data() {
	        return {
	            title: "Contas a pagar",
	            statusCssClass: 'sem-contas',
	            statusDisplayText: 'Nenhuma conta cadastrada',
	            totalToPay: 0,
	            totalPayed: 0
	        };
	    },
	    created: function created() {
	        this.updateStatus();
	    },

	    methods: {
	        updateStatus: function updateStatus() {
	            var _this = this;

	            BillPayResource.query().then(function (response) {
	                var bills = response.data;
	                var count = 0;
	                _this.totalToPay = 0;
	                _this.totalPayed = 0;
	                if (bills.length == 0) {
	                    _this.statusCssClass = 'grey';
	                    _this.statusDisplayText = 'Nenhuma conta cadastrada';
	                }
	                for (var i in bills) {
	                    if (!bills[i].done) {
	                        count++;
	                        _this.totalToPay += bills[i].value;
	                    } else {
	                        _this.totalPayed += bills[i].value;
	                    }
	                }

	                _this.statusCssClass = !count ? 'green' : 'red';
	                _this.statusDisplayText = !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
	            });
	        }
	    },
	    events: {
	        'change-status': function changeStatus() {
	            this.updateStatus();
	        }
	    }
	};

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n    <div class="section">\n            <div class="container">\n                <div class="row">\n                    <div class="col s7">\n                        <h5>Contas a pagar</h5>\n                    </div>\n                    <div class="col s5">\n                       <h5><a class="waves-effect waves-light btn right" v-link="{ name: \'bill-pay.create\'}"><i class="material-icons left">add</i>Adicionar</a></h5>\n                    </div>\n                </div>\n                <div class="row">\n                    <table class="bordered highlight responsive-table">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xE3o</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <!-- <tr v-for="o in bills"> para fazer for sem o indice -->\n                        <tr v-for="(index,o) in bills  | orderBy \'date_due\'">\n                            <td>{{index+1}}</td>\n                            <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                            <td>{{o.name | upper}}</td>\n                            <td class="right-align">{{o.value | numberFormat \'pt-br\' \'BRL\'}}</td>\n                        <td class="center-align" :class="{\'green-text\' : o.done , \'red-text\': !o.done}">\n                            <i v-if="o.done" class="material-icons" title="Sim">done</i>\n                            <i v-else class="material-icons" title="N\xE3o">clear</i>\n                        </td>\n                            <td>\n                                <a href="#" v-link="{name : \'bill-pay.update\', params: {id: o.id}}"><i class="material-icons teal-text" title="Editar">edit</i></a>\n                                <a href="#" @click.prevent="deleteBill(o)"><i class="material-icons red-text lighten-5" title="Excluir">delete</i></a>\n                \n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n    </div>\n    ',
	    data: function data() {
	        return {
	            bills: []
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillPayResource.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },

	    methods: {
	        deleteBill: function deleteBill(bill) {
	            var _this2 = this;

	            if (confirm('Deseja excluir a conta de ' + bill.name + ' com vencimento em ' + bill.date_due + ' ?')) {
	                BillPayResource.delete({ id: bill.id }).then(function (response) {
	                    _this2.bills.$remove(bill);
	                    _this2.$dispatch('change-status');
	                });
	            }
	        }
	    }
	};

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var billPayNames = ['Conta de Luz', 'Conta de Água', 'Conta de Telefone', 'Supermercado', 'Cartão de Crédito', 'Empréstimo', 'Gasolina'];
	var Bill = __webpack_require__(21);
	module.exports = {
	    template: '\n<div class="section">\n    <div class="container">\n        <h5 v-if="this.formType == \'insert\'">Nova Conta</h5>\n        <h5 v-else>Editar Conta</h5>\n        <div class="row">\n            <form name="form" @submit.prevent="submit">\n                <div class="row">\n                    <div class="col s6">\n                        <label>Vencimento</label>\n                        <input type="text" v-model="bill.date_due | dateFormat" placeholder="Informe a data"/>\n                    </div>\n                    <div class="col s6">\n                        <label>Valor</label>\n                        <input type="text" v-model="bill.value | numberFormat"/>\n                    </div>\n                    \n                </div>\n                <div class="row">\n                    <div class="col s8">\n                        <label>Nome</label>\n                        <select v-model="bill.name" id="name" class="browser-default">\n                            <option value="" disabled selected>Escolha uma op\xE7\xE3o</option>\n                            <option v-for="o in billNames" :value="o">{{o | upper}}</option>\n                        </select>\n                    </div>\n                    <div class="input-field col s4">\n                    \n                        <input type="checkbox" v-model="bill.done" id="pago" class="filled-in"/>\n                        <label for="pago">Pago?</label>\n                    </div>\n                </div>\n       \n                <div class="row">\n                    <div class="col s12 ">\n                        <button class="btn right" type="submit">Enviar</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n',
	    data: function data() {
	        return {
	            formType: 'insert',
	            billNames: billPayNames,
	            bill: new Bill()
	        };
	    },
	    created: function created() {
	        if (this.$route.name == 'bill-pay.update') {
	            this.formType = 'update';
	            this.getBill(this.$route.params.id);
	        }
	    },

	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toObject();

	            if (this.formType == 'insert') {
	                BillPayResource.save({}, data).then(function (response) {
	                    _this.$dispatch('change-status');
	                    Materialize.toast('Conta criada com sucesso!', 4000);
	                    _this.$router.go({ name: 'bill-pay.list' });
	                });
	            } else {
	                BillPayResource.update({ id: this.bill.id }, data).then(function (response) {
	                    _this.$dispatch('change-status');
	                    Materialize.toast('Conta alterada com sucesso!', 4000);
	                    _this.$router.go({ name: 'bill-pay.list' });
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            BillPayResource.get({ id: id }).then(function (response) {
	                _this2.bill = new Bill(response.data);
	            });
	        },
	        getDateDue: function getDateDue(date_due) {
	            //converte data para poder enviar para api pois o objeto date do javascript na versade é um datetime
	            var dateDueObject = date_due;
	            if (!(date_due instanceof Date)) {
	                var _dateDueObject = new Date(date_due.split('/').reverse().join('-') + 'T03:00:00');
	            }
	            return dateDueObject.toISOString().split('T')[0];
	        }
	    }
	};

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	    function Bill() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Bill);

	        this.date_due = '';
	        this.name = '';
	        this.value = 0;
	        this.done = false;
	        Object.assign(this, data); // atribui ao  objeto os valores passados pelo ojeto data
	    }

	    _createClass(Bill, [{
	        key: 'toObject',
	        value: function toObject() {
	            //tratamento para funcionar na edição, pois o objeto contem a data em formato do banco
	            var date_due = typeof this.date_due === 'string' && this.date_due.length == '10' ? this.date_due : this.date_due.toISOString().substring(0, 10);
	            return {
	                date_due: date_due,
	                name: this.name,
	                value: parseFloat(this.value),
	                done: this.done
	            };
	        }
	    }]);

	    return Bill;
	}();

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n<div class="section">\n    <div class="container">\n        <h4>{{ title }}</h4>\n        <div class="row">\n            <div class="col s7">\n                <div class="card z-depth-2 {{statusCssClass}} white-text">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">account_balance</i> </p>    \n                        <h5>{{ statusDisplayText }} ({{ totalToReceive | numberFormat}})</h5>\n                    </div>\n                </div>\n             </div>\n             <div class="col s5">\n                <div class="card z-depth-2">\n                    <div class="card-content">\n                        <p class="card-title"><i class="material-icons">payment</i> </p>   \n                        <p class="card-title"></p>    <h5>{{ totalReceived | numberFormat}}</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="divider"></div>\n<router-view></router-view>\n',
	    data: function data() {
	        return {
	            title: "Contas a Receber",
	            statusCssClass: 'sem-contas',
	            statusDisplayText: 'Nenhuma conta cadastrada',
	            totalToReceive: 0,
	            totalReceived: 0
	        };
	    },
	    created: function created() {
	        this.updateStatus();
	    },
	    methods: {
	        updateStatus: function updateStatus() {
	            var _this = this;

	            BillReceiveResource.query().then(function (response) {
	                var bills = response.data;
	                var count = 0;
	                _this.totalToReceive = 0;
	                _this.totalReceived = 0;
	                if (bills.length == 0) {
	                    _this.statusCssClass = 'grey';
	                    _this.statusDisplayText = 'Nenhuma conta cadastrada';
	                }
	                for (var i in bills) {
	                    if (!bills[i].done) {
	                        count++;
	                        _this.totalToReceive += bills[i].value;
	                    } else {
	                        _this.totalReceived += bills[i].value;
	                    }
	                }

	                _this.statusCssClass = !count ? 'green' : 'blue';
	                _this.statusDisplayText = !count ? 'Nenhuma conta a receber' : 'Existem ' + count + ' a receber';
	            });
	        }
	    },
	    events: {
	        'change-status': function changeStatus() {
	            this.updateStatus();
	        }
	    }
	};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(24);
	module.exports = {
	    components: {
	        'modal': modalComponent
	    },
	    template: '\n    <div class="section">\n        <div class="container">\n            <div class="row">\n                <div class="col s7">\n                    <h5>Contas a receber</h5>\n                </div>\n                <div class="col s5">\n                   <h5><a class="waves-effect waves-light btn right" v-link="{ name: \'bill-receive.create\'}"><i class="material-icons left">add</i>Adicionar</a></h5>\n                </div>\n            </div>\n            <div class="row">\n                <table class="bordered highlight responsive-table z-depth-3">\n                    <thead>\n                    <tr class="center-align">\n                        <th>#</th>\n                        <th>Recebimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Recebido?</th>\n                        <th>A\xE7\xE3o</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <!-- <tr v-for="o in bills"> para fazer for sem o indice -->\n                    <tr v-for="(index,o) in bills | orderBy \'date_due\'">\n                        <td>{{index+1}}</td>\n                        <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                        <td>{{o.name | upper}}</td>\n                        <td class="right-align">{{o.value | numberFormat \'pt-br\' \'BRL\'}}</td>\n                        <td class="center-align" :class="{\'green-text\' : o.done , \'blue-text\': !o.done}">\n                            <i v-if="o.done" class="material-icons" title="Sim">done</i>\n                            <i v-else class="material-icons" title="N\xE3o">clear</i>\n                        </td>\n                        <td class="center-align">\n                            <a href="#" v-link="{name : \'bill-receive.update\', params: {id: o.id}}"><i class="material-icons teal-text" title="Editar">edit</i></a>\n                            <a href="#" @click.prevent="openModalDelete(o)"><i class="material-icons red-text lighten-5" title="Excluir">delete</i></a>\n            \n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            <p>Nome: <trong>{{billToDelete.name | upper}}</trong></p>\n            <p>Valor: <trong>{{billToDelete.value | numberFormat}}</trong></p>\n            <p>Data de Vencimento: <trong>{{billToDelete.date_due | dateFormat}}</trong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n    \n',
	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillReceiveResource.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },

	    methods: {
	        deleteBill: function deleteBill() {
	            var _this2 = this;

	            BillReceiveResource.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta excluída com sucesso!', 4000);
	                _this2.$dispatch('change-status');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {
	            this.billToDelete = bill;
	            $('#modal-delete').modal('open');
	        }
	    }
	};

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n        <div :id="modal.id" class="modal">\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n            <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n        </div>\n   \n',
	    props: {
	        modal: {
	            type: Object,
	            default: function _default() {
	                return {
	                    id: ''
	                };
	            }
	        }

	    },
	    ready: function ready() {
	        var id = this.modal.id;
	        $(document).ready(function () {
	            $('#' + id).modal();
	        });
	    }
	};

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var billReceiveNames = ['Salário', 'Bonificação', 'Extras'];
	var Bill = __webpack_require__(21);
	module.exports = {
	    template: '\n<div class="section">\n    <div class="container">\n        <h5 v-if="this.formType == \'insert\'">Nova Conta</h5>\n        <h5 v-else>Editar Conta</h5>\n        <div class="row">\n            <form name="form" @submit.prevent="submit">\n                <div class="row">\n                    <div class="col s6">\n                        <label>Vencimento</label>\n                        <input type="text" v-model="bill.date_due | dateFormat" placeholder="Informe a data"/>\n                    </div>\n                    <div class="col s6">\n                        <label>Valor</label>\n                        <input type="text" v-model="bill.value | numberFormat"/>\n                    </div>\n                    \n                </div>\n                <div class="row">\n                    <div class="col s8">\n                        <label>Nome</label>\n                        <select v-model="bill.name" id="name" class="browser-default">\n                            <option value="" disabled selected>Escolha uma op\xE7\xE3o</option>\n                            <option v-for="o in billNames" :value="o">{{o | upper}}</option>\n                        </select>\n                    </div>\n                    <div class="input-field col s4">\n                    \n                        <input type="checkbox" v-model="bill.done" id="recebido" class="filled-in"/>\n                        <label for="recebido">Recebido?</label>\n                    </div>\n                </div>\n       \n                <div class="row">\n                    <div class="col s12 ">\n                        <button class="btn right" type="submit">Enviar</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n',
	    data: function data() {
	        return {
	            formType: 'insert',
	            billNames: billReceiveNames,
	            bill: new Bill()
	        };
	    },

	    created: function created() {
	        if (this.$route.name == 'bill-receive.update') {
	            this.formType = 'update';
	            this.getBill(this.$route.params.id);
	        }
	    },
	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toObject();

	            if (this.formType == 'insert') {
	                BillReceiveResource.save({}, data).then(function (response) {
	                    _this.$dispatch('change-status');
	                    Materialize.toast('Conta criada com sucesso!', 4000);
	                    _this.$router.go({ name: 'bill-receive.list' });
	                });
	            } else {
	                BillReceiveResource.update({ id: this.bill.id }, data).then(function (response) {
	                    _this.$dispatch('change-status');
	                    Materialize.toast('Conta alterada com sucesso!', 4000);
	                    _this.$router.go({ name: 'bill-receive.list' });
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            BillReceiveResource.get({ id: id }).then(function (response) {
	                _this2.bill = new Bill(response.data);
	            });
	        },
	        getDateDue: function getDateDue(date_due) {
	            //converte data para poder enviar para api pois o objeto date do javascript na versade é um datetime
	            var dateDueObject = date_due;
	            if (!(date_due instanceof Date)) {
	                var _dateDueObject = new Date(date_due.split('/').reverse().join('-') + 'T03:00:00');
	            }
	            return dateDueObject.toISOString().split('T')[0];
	        }
	    }
	};

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(24);
	module.exports = {
	    components: {
	        'modal': modalComponent
	    },
	    template: '\n\n    <ul id="nav-mobile" class="side-nav">\n        <li v-for="o in menus">\n            <a v-link="{name: o.routeName}">{{o.name}}</a>\n        </li> \n    </ul>\n\n    <div class="navbar-fixed">\n        <nav>\n        \n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse" >\n                    <i class="material-icons">menu</i>\n                </a>\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="o in menus">\n                    <a v-link="{name: o.routeName}">{{o.name}}</a>\n                    </li> \n                </ul>\n                \n            </div>\n        </nav>\n    </div>\n    <modal></modal>\n        <router-view></router-view>\n        ',
	    ready: function ready() {
	        $('.button-collapse').sideNav();
	        $('.button-dropdown').dropdown();
	    },
	    data: function data() {
	        return {
	            menus: [{ name: "Dashboard", routeName: 'bill-dashboard' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
	        };
	    }
	};

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	    template: "\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col l2 hide-on-small-and-down\"></div>\n            <div class=\"col s6 l4\">\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas Recebidas\n                        </div>\n                        {{received | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas Pagas\n                        </div>\n                        {{paid | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Saldo Atual\n                        </div>\n                        {{received-paid | numberFormat}}\n                    </div>\n                </div>\n            </div>\n            <div class=\"col s6 l4\">\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas A Receber\n                        </div>\n                        {{to_receive | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Contas A Pagar\n                        </div>\n                        {{to_pay | numberFormat}}\n                    </div>\n                </div>\n                <div class=\"dashboard-card\">\n                    <div class=\"card-content\">\n                        <div class=\"card-title\">\n                            Saldo Futuro\n                        </div>\n                        {{received-paid+to_receive-to_pay | numberFormat}}\n                    </div>\n                </div>\n            </div>\n            <div class=\"col l2 hide-on-small-and-down\"></div>\n        </div>\n    </div>\n  \n",
	    data: function data() {
	        return {
	            to_pay: 0,
	            paid: 0,
	            to_receive: 0,
	            received: 0
	        };
	    },
	    created: function created() {
	        this.updateValues();
	    },

	    methods: {
	        updateValues: function updateValues() {
	            var _this = this;

	            BillPayResource.totalPaid().then(function (response) {
	                _this.paid = response.data.paid;
	            });
	            BillPayResource.totalToPay().then(function (response) {
	                _this.to_pay = response.data.to_pay;
	            });
	            BillReceiveResource.totalReceived().then(function (response) {
	                _this.received = response.data.received;
	            });
	            BillReceiveResource.totalToReceive().then(function (response) {
	                _this.to_receive = response.data.to_receive;
	            });
	        }
	    }

	};

/***/ })

});