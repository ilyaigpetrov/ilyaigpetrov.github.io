// MainView
define(
  [
    'module',
    'require',
    'utils',
    'jQuery',
    'Components/Commons/ViewComponent/AMD.js',
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
    ViewComponent,
    mainTemplate,
    mainBehaviourJS,
    _,
    productsTileView,
    productsListView,
    productsEditsView
  ) {

    function MainComponent() {}
    var component = new ViewComponent( module, 'main.css', mainBehaviourJS, mainTemplate );
    MainComponent.base = component;

    $.extend(
      MainComponent.prototype,
      component,
      {

        renderTo$DOM: function( context ) {
          var context = context || {};
          var productsSource = context[ 'productsSource' ];
          var reactiveContext = { productsSource: productsSource };
          var ptdom = productsTileView.renderTo$DOM( context, reactiveContext );
          var pldom = productsListView.renderTo$DOM( context, reactiveContext );          
          $.extend( context, { productsTileDOM: ptdom, productsListDOM: pldom } );
          var main$DOM = MainComponent.base.renderTo$DOM.call( this, context );
          return main$DOM;
        },
  
        applyStyles: function() {
          productsTileView.applyStyles();
          productsListView.applyStyles();
          MainComponent.base.applyStyles.call( this ); // So children can't override parent's styles.
        },
  
        activateBehaviour: function() {
          MainComponent.base.activateBehaviour.call( this ); // So children can use parent's effects.
          productsTileView.activateBehaviour();
          productsListView.activateBehaviour();
        },
        
      }
    );

    return new MainComponent();
  }
);

