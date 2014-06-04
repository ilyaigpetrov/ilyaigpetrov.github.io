// MainView
define(
  [
    'utils',
    'text!Components/Models/Product/Model.js'
  ],
  function ( utils, ProductModelJS ) {
    eval( ProductModelJS );
    return ProductModel;
  }
);

