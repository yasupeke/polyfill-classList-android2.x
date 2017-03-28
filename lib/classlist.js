if (!Element.classList) {
    var ElementTokenList_1 = (function () {
        function ElementTokenList_1(elem) {
            var className = elem.className;
            var classes = className.split(' ');
            this._elem = elem;
            this._classes = [];
            for (var i = 0, cls = void 0; cls = classes[i]; ++i) {
                this._classes.push(cls);
            }
        }
        Object.defineProperty(ElementTokenList_1.prototype, "length", {
            get: function () {
                return this._classes.length;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ElementTokenList_1.prototype.add = function () {
            var tokens = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tokens[_i] = arguments[_i];
            }
            if (!tokens || tokens.length === 0) {
                return;
            }
            for (var i = 0, token = void 0; token = tokens[i]; ++i) {
                if (!this.contains(token)) {
                    this._classes.push(token);
                }
            }
            this.updateClassName();
        };
        ElementTokenList_1.prototype.contains = function (token) {
            this.validateToken(token);
            return this._classes.indexOf(token) >= 0;
        };
        ElementTokenList_1.prototype.item = function (index) {
            return this._classes[index];
        };
        ElementTokenList_1.prototype.remove = function () {
            var tokens = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tokens[_i] = arguments[_i];
            }
            if (!tokens || tokens.length === 0) {
                return;
            }
            for (var i = 0, token = void 0; token = tokens[i]; ++i) {
                var idx = this._classes.indexOf(token);
                if (idx >= 0) {
                    this._classes.splice(idx, 1);
                }
            }
            this.updateClassName();
        };
        ElementTokenList_1.prototype.toggle = function (token, force) {
            if (this.contains(token)) {
                if (force === true) {
                    return true;
                }
                this.remove(token);
                return false;
            }
            else {
                if (force === false) {
                    return false;
                }
                this.add(token);
                return true;
            }
        };
        ElementTokenList_1.prototype.toString = function () {
            return this._classes.join(' ');
        };
        ElementTokenList_1.prototype.validateToken = function (token) {
            if (!token || new RegExp(' ').test(token)) {
                throw new Error('Token must not be empty or contain whitespace.');
            }
        };
        ElementTokenList_1.prototype.updateClassName = function () {
            this._elem.className = this.toString();
        };
        return ElementTokenList_1;
    }());
    Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
            return new ElementTokenList_1(this);
        }
    });
}
