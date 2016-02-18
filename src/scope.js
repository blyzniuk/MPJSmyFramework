export default class Scope {
    constructor(parent) {
        this.$$watchers = [];
        this.$$children = [];
        this.$parent = parent;
    }

    $watch(exp, fn) {
        this.$$watchers.push({
            exp,
            fn,
            last: JSON.parse(JSON.stringify(this.$eval(exp))),
        });
    }

    $eval(exp) {
        if (typeof exp !== 'function') {
            try {
                return eval(`this.${exp}`);
            } catch (e) {
                return '';
            }
        }
        return exp.call(this);
    }

    $new() {
        const obj = new Scope(this);
        this.$$children.push(obj);
        return obj;
    }

    $destroy() {
        const pc = this.$parent.$$children;
        pc.splice(pc.indexOf(this), 1);
    }

    $digest() {
        let dirty;
        let current;

        do {
            dirty = false;
            this.$$watchers.forEach(watcher => {
                current = this.$eval(watcher.exp);
                if (JSON.stringify(watcher.last) !== JSON.stringify(current)) {
                    watcher.last = JSON.parse(JSON.stringify(current));
                    dirty = true;
                    watcher.fn(current);
                }
            });
        } while (dirty);

        this.$$children.forEach(child => child.$digest());
    }
}
