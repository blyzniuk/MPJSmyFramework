import Provider from './provider.js';
import Compiler from './compiler.js';
import mvcBind from './directives/mvc-bind.js';
import mvcClick from './directives/mvc-click.js';
import mvcController from './directives/mvc-controller.js';
import mvcModel from './directives/mvc-model.js';
import mvcRepeat from './directives/mvc-repeat.js';

const framework = {
    Provider,
    Compiler,
};

framework.Provider.directive('mvc-bind', mvcBind);
framework.Provider.directive('mvc-click', mvcClick);
framework.Provider.directive('mvc-controller', mvcController);
framework.Provider.directive('mvc-model', mvcModel);
framework.Provider.directive('mvc-repeat', mvcRepeat);

export default framework;
