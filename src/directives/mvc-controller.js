import framework from './../framework';

export default () => {
    return {
        scope: true,
        link: (el, scope, exp) => {
            const ctrl = framework.Provider.get(`${exp}Controller`);
            framework.Provider.invoke(ctrl, { $scope: scope });
        },
    };
};
