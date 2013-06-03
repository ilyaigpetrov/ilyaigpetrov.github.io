//Application
require(
  // Configurations.
  {
    baseUrl: '../',
    urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {
      text:   'Components/Libs/RequireJS/plugins/text',
      json:   'Components/Libs/RequireJS/plugins/json',
      jQuery: 'Components/Libs/jQuery/jquery',
      utils:  'Components/Commons/Utils/AMD',
      underscore: 'Components/Libs/Underscore/underscore',
    },
    shim: {
      'underscore': {
        exports: '_',
      },
    },
  },
  // Dependencies.
  [
    'utils',
    'Components/Views/Main/AMD.js',
    'json!/Assets/data/products.json',
    'Components/Models/Product/AMD.js',
    'Components/Commons/DataSources/AMD.js'
  ],
  // The entry point.
  function( utils, mainView, productObjects, ProductModel, DataSources ) {
  
    console.log('Dependencies loaded, application started.');

    var validProducts = productObjects.map(
      function( product ) {
        try {
          return new ProductModel( product );
        } catch(e) {
          console.log('Malformed product was received. Explore errors below.');
          console.dir(e);
          // TODO: Inform interested parts about malformed input.
          return false;
        };
      }
    );
    var validProducts = validProducts.filter( utils.identity );
    window.eventedIdToProductMap = new DataSources.idToObjectMap( validProducts ); // DEBUG:

    /*mainView.chargeWithDataSources(
      {
        productsIdMapSource: eventedIdToProductMap,
      }
    );*/
    
    function redrawProducts() {
      var context = {
        productsSource: eventedIdToProductMap,
      };
      utils.embedView( mainView, document.body, context );
    }

    eventedIdToProductMap.onChange(
      function(event) {
        redrawProducts();
      }
    );

    $(eventedIdToProductMap).trigger('change');

  }
);