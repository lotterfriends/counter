(function() {

	'use strict';

	var default_options =  {
		start_value: 0,
		digits: 7
	}


	var Cls = function(className) {
		this.className = className;
	};

	Cls.prototype.class = function() {
		return ['.', this.className].join('');
	};

	Cls.prototype.toString = function() {
		return this.className;
	};

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	function closest(el, selector) {
		var matchesFn;

		// find vendor prefix
		['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
			if (typeof document.body[fn] == 'function') {
				matchesFn = fn;
				return true;
			}
			return false;
		})

		// traverse parents
		while (el !== null) {
			parent = el.parentElement;
			if (parent !== null && parent[matchesFn](selector)) {
				return parent;
			}
			el = parent;
		}

		return null;
	};

	function hasClass(element, cls) {
		if (typeof element.classList === 'object') {
			element.classList.contains(cls);
		} else {
			var regex;
			regex = new RegExp(cls, 'i');
			return element.className.match(regex);
		}
	};

	function removeClass(element, cls) {
		if (typeof element.classList === 'object') {
			element.classList.remove(cls);
		} else {
			element.className = element.className.replace(cls, '');
		}
	};

	function addClass(element, cls) {
		if (!hasClass(element, cls)) {
			if (typeof element.classList === 'object') {
				element.classList.add(cls);
			} else {
				var currentClassNames = null;
				if (!hasClass(className)) {
					currentClassNames = element.className.replace(/^\s+|\s+$/g, '');
					element.className = currentClassNames + ' ' + className;
				}
			}
		}
		return element;
	}


	function Counter(target, options) {
		this.target = document.querySelector(target);

		// merge options
		this.options = default_options;
		for (var i in options) {
			if (options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}

		this.init();
		this.countToZero();
	}


	Counter.prototype.init = function() { 

		var _this = this;

		var padValue = pad(this.options.start_value, this.options.digits);
		var padArray = padValue.split('');

		padArray.forEach(function(value, index) {
			var digetHolder = document.createElement('p');
			addClass(digetHolder, 'analog-clock-diget');
			digetHolder.dataset.acdValue = value;
			digetHolder.dataset.acdIndex = index;

			var oldValue = document.createElement('span');
			addClass(oldValue, 'analog-clock-diget-old');
			var oldValueSpan = document.createElement('span');
			oldValueSpan.appendChild(document.createTextNode(value));
			oldValue.appendChild(oldValueSpan);
			
			var newValue = document.createElement('span');
			addClass(newValue, 'analog-clock-diget-new');
			var newValueSpan = document.createElement('span');
			newValueSpan.appendChild(document.createTextNode(value));
			newValue.appendChild(newValueSpan);
			
			digetHolder.appendChild(oldValue);
			digetHolder.appendChild(newValue);

			_this.target.appendChild(digetHolder);

		});

		_this.target.dataset.acdValue = this.options.start_value;
	};

	Counter.countToZero = function() {
		var _this = this;
		window.setTimeout(function() {

		}, 1000);
	};


	window.Counter = Counter;

}).call(this);

var counter = new Counter('.hier-rein', {
	start_value: 3894 
});
