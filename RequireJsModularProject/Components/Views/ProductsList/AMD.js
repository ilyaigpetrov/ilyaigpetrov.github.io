// ProductsListView
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
  function (
    module
    ,utils
    ,jquery
    ,Component
    ,mainTemplate
    ,mainBehaviourJS
    ,_
    ,ProductEditView
  ) {

    function ProductsListComponent() {};
    ProductsListComponent.base = Component.prototype;
    
    var component = new Component(
      mainTemplate,
      module,
      'main.css',
      mainBehaviourJS
    );

    ProductsListComponent.prototype = component;

    ProductsListComponent.prototype.renderToHTML = function( context ) {

      var context = context || {};
      var productsSource = context['productsSource'];

      /*
      var productsEdits = products.map(
        function( item ) {
          var _context = $.extend( context, { product: item } );
          return ProductEditView.castView( _context );
        }
      );
      var productsEditsAsHTML = productsEdits.join('\n\n');
      var context = $.extend( context, { productsEdits: productsEditsAsHTML } );
      */
      
      return ProductsListComponent.base.renderToHTML.call( this, context );

    };

    return new ProductsListComponent();

  }
);