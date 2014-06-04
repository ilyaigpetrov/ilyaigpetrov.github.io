// ProductsListView
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
    
    var component = new ViewComponent(
      module
      ,'main.css'
      ,mainBehaviourJS
      ,mainTemplate
    );

    function ProductsListComponent() {};
    ProductsListComponent.prototype = component;
    ProductsListComponent.base = component;

    var plist = Object.create(
      ProductsListComponent.prototype,
      {
        renderTo$DOM:
        {
          value: function( context, reactiveDataSourcesContext ) {
          
            var reactiveDataSourcesContext = reactiveDataSourcesContext || {};
            
            var productsSource = reactiveDataSourcesContext[ 'productsSource' ];
            productEditView.registerproductsSourceForEdit( productsSource );
            var $dom = ProductsListComponent.base.renderTo$DOM.call( this, context, reactiveDataSourcesContext );
            return $dom;
          }
        }
      }
    );

    return plist; 

  }
);