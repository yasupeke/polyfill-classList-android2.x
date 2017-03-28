if (!(Element as any).classList) {
    class ElementTokenList {
        private _elem: Element;
        private _classes: string[];

        constructor(elem: Element) {
            const className = elem.className;
            const classes = className.split(' ');
            this._elem = elem;
            this._classes = [];
            for (let i = 0, cls: string; cls = classes[i]; ++i) {
                this._classes.push(cls);
            }
        }

        get length(): number {
            return this._classes.length;
        };

        public add(...tokens: string[]): void {
            if (!tokens || tokens.length === 0) {
                return;
            }
            for (let i = 0, token: string; token = tokens[i]; ++i) {
                if (!this.contains(token)) {
                    this._classes.push(token);
                }
            }
            this.updateClassName();
        }

        public contains(token: string): boolean {
            this.validateToken(token);
            return this._classes.indexOf(token) >= 0;
        }

        public item(index: number): string {
            return this._classes[index];
        }

        public remove(...tokens: string[]): void {
            if (!tokens || tokens.length === 0) {
                return;
            }
            for (let i = 0, token: string; token = tokens[i]; ++i) {
                const idx = this._classes.indexOf(token);
                if (idx >= 0) {
                    this._classes.splice(idx, 1);
                }
            }
            this.updateClassName();
        }

        public toggle(token: string, force?: boolean): boolean {
            if (this.contains(token)) {
                if (force === true) {
                    return true;
                }
                this.remove(token);
                return false;
            } else {
                if (force === false) {
                    return false;
                }
                this.add(token);
                return true;
            }
        }

        public toString(): string {
            return this._classes.join(' ');
        }

        private validateToken(token: string): void {
            if (!token || new RegExp(' ').test(token)) {
                throw new Error('Token must not be empty or contain whitespace.');
            }
        }

        private updateClassName(): void {
            this._elem.className = this.toString();
        }
    }

    Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
            return new ElementTokenList(this);
        }
    })
}
