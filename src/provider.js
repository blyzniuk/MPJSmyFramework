import Scope from './scope.js';
import Compiler from './compiler.js';
import crossroads from 'crossroads';

const Provider = {
    _cache: {
        $rootScope: new Scope(),
    },
    _providers: {},
    get(name, locals) {
        if (this._cache[name]) {
            return this._cache[name];
        }
        const provider = this._providers[name];
        if (!provider || typeof provider !== 'function') {
            return null;
        }
        return (this._cache[name] = this.invoke(provider, locals));
    },
    directive(name, fn) {
        this._register(`${name}Directive`, fn);
    },
    controller(name, fn) {
        this._register(`${name}Controller`, () => fn);
    },
    service(name, fn) {
        this._register(name, fn);
    },
    annotate(fn) {
        const res = fn.toString()
            .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
            .match(/\((.*?)\)/);
        if (res && res[1]) {
            return res[1].split(',').map((d) => {
                return d.trim();
            });
        }
        return [];
    },
    invoke(fn, locals = {}) {
        const deps = this.annotate(fn).map((s) => {
            return locals[s] || this.get(s, locals);
        }, this);
        return fn.apply(null, deps);
    },
    _register(name, service) {
        this._providers[name] = service;
    },
    route(route, tpl, controller) {
        const newRoute = crossroads.addRoute(route);
        newRoute.matched.add(() => {
            const view = document.getElementById('mvc-view');
            view.innerHTML = tpl;

            const ctrl = this.get(`${controller}Controller`);
            const scope = this._cache.$rootScope.$new();
            this.invoke(ctrl, { $scope: scope });
            Compiler.compile(view, scope);
        });
    },
};

export default Provider;
