export default () => {
    return {
        scope: false,
        link: (el, scope, exp) => {
            el.innerHTML = scope.$eval(exp);
            scope.$watch(exp, val => {
                el.innerHTML = val;
            });
        },
    };
};
