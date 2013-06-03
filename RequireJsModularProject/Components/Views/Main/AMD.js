// MainView
define(
  [
    'module',
    'require',
    'utils',
    'jQuery',
    'Components/Commons/Component/AMD.js',
    'text!./main.html',
    'text!./main.js',
    'underscore',
    'Components/Views/ProductsTile/AMD.js',
    'Components/Views/ProductsList/AMD.js',
    'Components/Views/ProductsEdits/AMD.js',
  ],
  function (
    module,
    require,
    utils,
    jquery,
    Component,
    mainTemplate,
    mainBehaviourJS,
    _,
    ProductsTileView,
    ProductsListView,
    ProductsEdits
  ) {

    function MainComponent() {}
    MainComponent.base = Component.prototype;
    
    /* Requirements
    var requiredDataSources = [
      'productsIdMapSource'
    ];*/
    
    var component = new Component( mainTemplate, module, 'main.css', mainBehaviourJS );
    
    MainComponent.prototype = $().extend(
      component,
      {

        /*assureDataSources: function() {
          MainComponent.base.assureDataSources.call( this, requiredDataSources );
        },*/

        renderToHTML: function( context ) {
          var context = context || {};
          context['products'] = context['productsSource'].readAll();
          
          var pt = ProductsTileView.renderToHTML( context );
          var pl = ProductsListView.renderToHTML( context );
          $.extend( context, { ProductsTile: pt, ProductsList: pl } );
          return MainComponent.base.renderToHTML.call( this, context );
        },
  
        applyStyles: function() {
          ProductsTileView.applyStyles();
          ProductsListView.applyStyles();
          MainComponent.base.applyStyles.call( this ); // So children can't override parent's styles.
        },
  
        activateBehaviour: function() {
          MainComponent.base.activateBehaviour.call( this ); // So children can use parent's effects.
          ProductsTileView.activateBehaviour();
          ProductsListView.activateBehaviour();
        },

      }
    );

    return new MainComponent();
  }
);

