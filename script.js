(function() {

	'use strict';

	var default_options =  {
		startValue: 0,
		digits: 7,
		interval: 1000
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
		var _this = this;
		this.target = document.querySelector(target);
		// merge options
		this.options = default_options;
		for (var i in options) {
			if (options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}

		this.currentValue = this.options.startValue;
		this.init();
	}


	Counter.prototype.init = function() { 

		var _this = this;

		var padValue = pad(this.options.startValue, this.options.digits);
		var padArray = padValue.split('');

		padArray.forEach(function(value, index) {
			var digetHolder = document.createElement('p');
			addClass(digetHolder, 'analog-clock-diget');
			digetHolder.dataset.acdValue = value;
			digetHolder.dataset.acdIndex = index;

			var element1 = document.createElement('div');
			addClass(element1, 'analog-clock-diget-new');
			var element1Span = document.createElement('span');
			element1Span.appendChild(document.createTextNode(value));
			element1.appendChild(element1Span);
			
			var element2 = document.createElement('div');
			addClass(element2, 'analog-clock-diget-old');
			var element2Span = document.createElement('span');
			element2Span.appendChild(document.createTextNode(value));
			element2.appendChild(element2Span);

			
			digetHolder.appendChild(element1);
			digetHolder.appendChild(element2);


			_this.target.appendChild(digetHolder);

		});

		_this.target.dataset.acdValue = this.options.startValue;
	};

	Counter.prototype.changeDiget = function(element, value) {
		if (typeof element !== 'undefined') {
			var spans = element.querySelectorAll('span');
			for (var i = 0; i < spans.length; ++i) {
			  spans[i].innerHTML = value;
			}
			element.dataset.acdValue = value;
		}
	};

	Counter.prototype.changeNumber = function(targetNumber) {
		var targetNumberString	= targetNumber.toString();
		var startIndex = this.options.digits - targetNumberString.length;
		var digetArray = targetNumberString.split('');
		var digetCounter = 0;
		for (var i = 0; i < this.options.digits; i++) {
			var element = this.target.querySelector("[data-acd-index='" + i + "']");
			if (i < startIndex) {
				this.changeDiget(element, 0);
			} else {
				this.changeDiget(element, digetArray[digetCounter]);
				digetCounter++;
			}
		}
		this.currentValue = targetNumber;
	};

	Counter.prototype.countDown = function() {
		var _this = this;
		var countIntervalId = window.setInterval(function() {
			_this.changeNumber(_this.currentValue - 1);
			if (_this.currentValue === 0) {
				window.clearInterval(countIntervalId);
				return;
			}
		}, this.options.interval);
	};

	Counter.prototype.countUp = function() {
		var _this = this;
		var max = Math.pow(10, this.options.digits) - 1;
		var countIntervalId = window.setInterval(function() {
			_this.changeNumber(_this.currentValue + 1);
			if (_this.currentValue === max) {
				window.clearInterval(countIntervalId);
				return;
			}
		}, this.options.interval);
	};


	window.Counter = Counter;

}).call(this);

var counter = new Counter('.hier-rein', {
	startValue: 12
});

counter.countUp();
