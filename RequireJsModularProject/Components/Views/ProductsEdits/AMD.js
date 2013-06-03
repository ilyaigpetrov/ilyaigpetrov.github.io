/* ProductsEditsView
 *
 * This View can be shared by other dependant views.
 * This View is a some kind of singleton:
 *  its HTML should be rendered and attached to
 *  document only once on initialization and
 *  afterwards reattached on changes in products
 *  source.
 *
 */
define(
  [
    'module',
    'utils',
    'jQuery',
    'Components/Commons/Component/AMD.js',
    'text!./main.html',
    'text!./main.js',
    'underscore',
    'Components/Libs/Reveal/AMD.js'
  ],
  function ( module, utils, jquery, Component, mainTemplate, mainBehaviourJS, _, RevealAMD ) {

    var theComponent = new Component(
      mainTemplate,
      module,
      'main.css',
      mainBehaviourJS
    );
    
    theComponent.registerProductsForEdit = function( products ) {
    
      this.products = products;
    
      var productsEdits = this.products.map(
        function( item ) {
          var _context = $.extend( context, { product: item } );
          return theComponent.castView( _context );
        }
      );
      var productsEditsAsHTML = productsEdits.join('\n\n');
      var context = $.extend( context, { productsEdits: productsEditsAsHTML } );
    
      // var r = Component.renderToHTML.call( this, context );
      //var hiddenEdits = theComponent.renderToHtml( context );
      //document.body.appendChild()
    }
  
    return theComponent;
  }
);