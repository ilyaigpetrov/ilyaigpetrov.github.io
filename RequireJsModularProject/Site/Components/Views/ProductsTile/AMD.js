// ProductsTileView
define(
  [
    'module',
    'utils',
    'jQuery',
    'Components/Commons/ViewComponent/AMD.js',
    'text!./main.html',
    'text!./main.js',
    'underscore',
    'Components/Views/ProductsEdits/AMD.js',
  ],
  function (
    module
    ,utils
    ,jquery
    ,ViewComponent
    ,mainTemplate
    ,mainBehaviourJS
    ,_
    ,productEditView
  ) {

    return new ViewComponent(
      module
      ,'main.css'
      ,mainBehaviourJS
      ,mainTemplate
    );

  }
);

