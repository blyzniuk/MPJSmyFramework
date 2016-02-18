import Provider from './provider.js';
import crossroads from 'crossroads';
import hasher from 'hasher';

const Compiler = {
    bootstrap() {
        this.compile(document.body, Provider.get('$rootScope'));
        function parseHash(newHash) {
            crossroads.parse(newHash);
        }

        hasher.initialized.add(parseHash);

        hasher.changed.add(parseHash);
        hasher.init();
    },
    compile(el, scope) {
        const dirs = this._getElDirectives(el);
        let dir;
        let scopeCreated;
        dirs.forEach((d) => {
            dir = Provider.get(`${d.name}Directive`);
            if (dir.scope && !scopeCreated) {
                scope = scope.$new();
                scopeCreated = true;
            }
            dir.link(el, scope, d.value);
        });
        Array.prototype.slice.call(el.children).forEach((c) => {
            this.compile(c, scope);
        }, this);
    },
    _getElDirectives(el) {
        const attrs = el.attributes;
        const result = [];
        for (let i = 0; i < attrs.length; i++) {
            if (Provider.get(`${attrs[i].name}Directive`)) {
                result.push({
                    name: attrs[i].name,
                    value: attrs[i].value,
                });
            }
        }
        return result;
    },
};

export default Compiler;
