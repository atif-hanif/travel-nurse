window.addDashes = function addDashess(g) {
    var h = /(\D+)/g,
        npc = '',
        nxy = '',
        last4 = '',
		last = '';
    g.value = g.value.replace(h, '');
    npc = g.value.substr(0, 4);
    nxy = g.value.substr(4, 4);
    last4 = g.value.substr(8, 4);
	last = g.value.substr(12, 4);
    g.value = npc + ' ' + nxy + ' ' + last4 + ' ' + last;
}

// var card = document.querySelector('#cardno');
// card.addEventListener('keyup', function(e) {
// 	if (event.key != 'Backspace' && (card.value.length === 4 || card.value.length === 9 || card.value.length === 14)) {
//   		card.value += ' ';
//   	}
// 	if(card.value.length == 19)
// 	{

// 		update(card.value);

// 	}
// });

$('#cardno').bind('keypress', function (event) {
    var regexcn = new RegExp("^[0-9\b]+$");
    var keycn = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcn.test(keycn)) {
       event.preventDefault();
       return false;
    }
});

$("#cardForm").validate();

// function validateCreditCardNumber(cardNumber) {
	
// 	cardNumber = cardNumber.split(' ').join("");
// 	if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
// 		return false;
// 	}
// 	var carray = new Array();
// 	for (var i = 0; i < cardNumber.length; i++) {
// 		carray[carray.length] = cardNumber.charCodeAt(i) - 48;
// 	}
// 	carray.reverse();
// 	var sum = 0;
// 	for (var i = 0; i < carray.length; i++) {
// 		var tmp = carray[i];
// 		if ((i % 2) != 0) {
// 			tmp *= 2;
// 			if (tmp > 9) {
// 				tmp -= 9;
// 			}
// 		}
// 		sum += tmp;
// 	}
// 	return ((sum % 10) == 0);
// }

// function cardType(cardNumber) { // returns card type; should not rely on this for checking if a card is valid
// 	cardNumber = cardNumber.split(' ').join("");
//     var o = {
//         electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
//         maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
//         dankort: /^(5019)\d+$/,
//         interpayment: /^(636)\d+$/,
//         unionpay: /^(62|88)\d+$/,
//         visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
//         mastercard: /^5[1-5][0-9]{14}$/,
//         amex: /^3[47][0-9]{13}$/,
//         diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
//         discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
//         jcb: /^(?:2131|1800|35\d{3})\d{11}$/
//     }
//     for(var k in o) {
//         if(o[k].test(cardNumber)) {
//             return k;
// 		}
//     }
// 	return null;
// }

// function update(cardNumber) {
// 	var cardtype = document.getElementById("cardtype");
// 	//var valid = document.getElementById("valid");
// 	if(validateCreditCardNumber(cardNumber)) {
		
// 		//valid.innerText = "Valid Card";
// 		cardtype.innerText = cardType(cardNumber);
// 		// img.src = (cardType(cardNumber) || "other") + "images/card/.png";
// 	}
// 	else {
// 		//valid.innerText = "InValid Card";
// 		//valid.style.color = "red";
// 		cardtype.innerText = cardType(cardNumber);
// 		//img.src = "images/card/other.png";
// 	}
// }

(function() {
    var $,
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };

    $ = jQuery;

    $.fn.validateCreditCard = function(callback, options) {
        var bind, card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, validate_number, _i, _len, _ref;
        card_types = [{
            name: 'amex',
            pattern: /^3[47][0-9]{13}$/,
            valid_length: [15]
        }, {
            name: 'visa',
            pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
            valid_length: [16]
        }, {
            name: 'mastercard',
            pattern: /^5[1-5][0-9]{14}$/,
            valid_length: [16]
        }, {
            name: 'discover',
            pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            valid_length: [16]
        }, {
            name: 'unionpay',
            pattern: /^(62|88)\d+$/,
			valid_length: [16]
        }];
        bind = false;
        if (callback) {
            if (typeof callback === 'object') {
                options = callback;
                bind = false;
                callback = null;
            } else if (typeof callback === 'function') {
                bind = true;
            }
        }
        if (options == null) {
            options = {};
        }
        if (options.accept == null) {
            options.accept = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = card_types.length; _i < _len; _i++) {
                    card = card_types[_i];
                    _results.push(card.name);
                }
                return _results;
            })();
        }
        _ref = options.accept;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            card_type = _ref[_i];
            if (__indexOf.call((function() {
                    var _j, _len1, _results;
                    _results = [];
                    for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                        card = card_types[_j];
                        _results.push(card.name);
                    }
                    return _results;
                })(), card_type) < 0) {
                throw "Credit card type '" + card_type + "' is not supported";
            }
        }
        get_card_type = function(number) {
            var _j, _len1, _ref1;
            _ref1 = (function() {
                var _k, _len1, _ref1, _results;
                _results = [];
                for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
                    card = card_types[_k];
                    if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
                        _results.push(card);
                    }
                }
                return _results;
            })();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                card_type = _ref1[_j];
                if (number.match(card_type.pattern)) {
                    return card_type;
                }
            }
            return null;
        };
        is_valid_luhn = function(number) {
            var digit, n, sum, _j, _len1, _ref1;
            sum = 0;
            _ref1 = number.split('').reverse();
            for (n = _j = 0, _len1 = _ref1.length; _j < _len1; n = ++_j) {
                digit = _ref1[n];
                digit = +digit;
                if (n % 2) {
                    digit *= 2;
                    if (digit < 10) {
                        sum += digit;
                    } else {
                        sum += digit - 9;
                    }
                } else {
                    sum += digit;
                }
            }
            return sum % 10 === 0;
        };
        is_valid_length = function(number, card_type) {
            var _ref1;
            return _ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0;
        };
        validate_number = (function(_this) {
            return function(number) {
                var length_valid, luhn_valid;
                card_type = get_card_type(number);
                luhn_valid = false;
                length_valid = false;
                if (card_type != null) {
                    luhn_valid = is_valid_luhn(number);
                    length_valid = is_valid_length(number, card_type);
                }
                return {
                    card_type: card_type,
                    valid: luhn_valid && length_valid,
                    luhn_valid: luhn_valid,
                    length_valid: length_valid
                };
            };
        })(this);
        validate = (function(_this) {
            return function() {
                var number;
                number = normalize($(_this).val());
                return validate_number(number);
            };
        })(this);
        normalize = function(number) {
            return number.replace(/[ -]/g, '');
        };
        if (!bind) {
            return validate();
        }
        this.on('input.jccv', (function(_this) {
            return function() {
                $(_this).off('keyup.jccv');
                return callback.call(_this, validate());
            };
        })(this));
        this.on('keyup.jccv', (function(_this) {
            return function() {
                return callback.call(_this, validate());
            };
        })(this));
        callback.call(this, validate());
        return this;
    };

}).call(this);
$(function() {
    $('.demo .numbers li').wrapInner('<a href="#"></a>').click(function(e) {
        e.preventDefault();
        $('.demo .numbers').slideUp(100);
        return $('#cardno').val($(this).text()).trigger('input');
    });
    $('body').click(function() {
        return $('.demo .numbers').slideUp(100);
    });
    $('.demo .numbers').click(function(e) {
        return e.stopPropagation();
    });
    $('#sample-numbers-trigger').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        return $('.demo .numbers').slideDown(100);
    });
    $('.demo .numbers').hide();
    $('.vertical.maestro').hide().css({
        opacity: 0
    });
    return $('#cardno').validateCreditCard(function(result) {
        $(this).removeClass();
        if (result.card_type == null) {
            $('.vertical.maestro').slideUp({
                duration: 200
            }).animate({
                opacity: 0
            }, {
                queue: false,
                duration: 200
            });
            return;
        }
        $(this).addClass(result.card_type.name);
        if (result.card_type.name === 'maestro') {
            $('.vertical.maestro').slideDown({
                duration: 200
            }).animate({
                opacity: 1
            }, {
                queue: false
            });
        } else {
            $('.vertical.maestro').slideUp({
                duration: 200
            }).animate({
                opacity: 0
            }, {
                queue: false,
                duration: 200
            });
        }
        if (result.valid) {
            return $(this).addClass('valid');
        } else {
            return $(this).removeClass('valid');
        }
    }, {
        accept: ['visa', 'amex', 'mastercard', 'unionpay', 'discover']
    });
});

$(document).ready(function(){

    $('#expiry_date').datepicker({
        format: 'mm/yy',
        autoclose: true,
        startView: "months", 
        minViewMode: "months"
    });
    
});