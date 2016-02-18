import Provider from './provider.js';
import Compiler from './compiler.js';
import mvcBind from './directives/mvc-bind.js';
import mvcClick from './directives/mvc-click.js';
import mvcController from './directives/mvc-controller.js';
import mvcModel from './directives/mvc-model.js';
import mvcRepeat from './directives/mvc-repeat.js';

document.addEventListener('DOMContentLoaded', () => Compiler.bootstrap());
window.framework = {
    Provider,
    Compiler,
};

Provider.directive('mvc-bind', mvcBind);
Provider.directive('mvc-click', mvcClick);
Provider.directive('mvc-controller', mvcController);
Provider.directive('mvc-model', mvcModel);
Provider.directive('mvc-repeat', mvcRepeat);

export default window.framework;
