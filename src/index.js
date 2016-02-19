import framework from './framework.js';

exports.init = () => {
    console.log('init');
    document.addEventListener('DOMContentLoaded', () => framework.Compiler.bootstrap());
    return framework;
};
