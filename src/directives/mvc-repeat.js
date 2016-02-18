import framework from './../framework';

export default () => {
    return {
        scope: false,
        link: (el, scope, exp) => {
            let scopes = [];
            const parts = exp.split('in');
            const collectionName = parts[1].trim();
            const itemName = parts[0].trim();
            const parentNode = el.parentNode;

            function render(val) {
                const els = val;
                let currentNode;
                let s;
                while (parentNode.firstChild) {
                    parentNode.removeChild(parentNode.firstChild);
                }
                scopes.forEach((sc) => {
                    sc.$destroy();
                });
                scopes = [];
                els.forEach((value) => {
                    currentNode = el.cloneNode();
                    currentNode.removeAttribute('mvc-repeat');
                    currentNode.removeAttribute('mvc-scope');
                    s = scope.$new();
                    scopes.push(s);
                    s[itemName] = value;
                    framework.Compiler.compile(currentNode, s);
                    parentNode.appendChild(currentNode);
                });
            }

            scope.$watch(collectionName, render);
            render(scope.$eval(collectionName));
        },
    };
};
