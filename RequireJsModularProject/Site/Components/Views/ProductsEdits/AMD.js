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
    'Components/Commons/ViewComponent/AMD.js',
    'text!./main.html',
    'underscore',
    'Components/Libs/Reveal/AMD.js'
  ],
  function (
    module
    ,utils
    ,jquery
    ,ViewComponent
    ,mainTemplate
    ,_
    ,RevealAMD
  ) {

    var mainBehaviourJS = '';
  
    var theComponent = new ViewComponent(
      module
      ,'main.css'
      ,mainBehaviourJS
      ,mainTemplate
    );
    
    /*
     * This component's instance can be shared between other components.
     * It requires editable items to have html representation attached
     * to the dom. Editable items can be shared between multiple components.
     * Its instance must be rendered and attached to the dom only once
     * after all editable items are regestered by dependant components.
     */

    ViewComponent.prototype.registerproductsSourceForEdit = function( productsSource ) {
      
      this.__sources = this.__sources || [];
      var ifRegistered = this.__sources.indexOf( productsSource ) != -1;
      if( !ifRegistered ) {
        this.__sources.push( productsSource );
        var $dom = this.renderTo$DOM( { productsSource: productsSource }, { productsSource: productsSource } );
        $('body').append( $dom );
        this.applyStyles();
        this.activateBehaviour();        
      }

    }
  
    return theComponent;
  }
);