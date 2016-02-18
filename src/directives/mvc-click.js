export default () => {
    return {
        scope: false,
        link: (el, scope, exp) => {
            el.onclick = () => {
                scope.$eval(exp);
                scope.$digest();
            };
        },
    };
};
