// ProductsTile
define(
  [
    'module',
    'utils',
    'jQuery',
    'Components/Commons/Component/AMD.js',
    'text!./main.html',
    'text!./main.js',
    'underscore',
    'Components/Views/ProductsEdits/AMD.js',
  ],
  function ( module, utils, jquery, Component, mainTemplate, mainBehaviourJS, _ ) {

    return new Component(
      mainTemplate,
      module,
      'main.css',
      mainBehaviourJS
    );

  }
);

