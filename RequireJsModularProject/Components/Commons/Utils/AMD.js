// Common Utils
define(
  ['module', 'require'],
  function ( selfModule, selfRequire ) {

    var Utils = function() {};

    Utils.prototype.identity = function( value ) { return value };

    Utils.prototype.args = function( arguments ) {
      var args = [];
      for( var i=0; i < arguments.length; ++i ) { args.push( arguments[i] ); }
      return args;
    };

    Utils.prototype.lexCompareBy = function( prop ) {
      return function(a,b){ return a[prop].localeCompare(b[prop]); };
    };

    Utils.prototype.numCompareBy = function( prop ) {
      return function(a,b){ return a[prop] - b[prop]; };
    };

    Utils.prototype.appendCssLink = function( cssUrl ) {
      // Append a css <link> to the <head>.
      var link = document.createElement( 'link' );
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = cssUrl;
      document.getElementsByTagName( 'head' )[0].appendChild( link );
    };
  
    Utils.prototype.getModulesAbsolutePath = function( module ) {
      return module.uri.match( /(.*)AMD.js(?:\?.*)?$/ )[1];
    };

    Utils.prototype.listify = function( object ) {
      return object instanceof Array? object : [ object ];
    };

    Utils.prototype.applyStyles = function( listOfUrls ) {
      var self = this;
      this.listify( listOfUrls ).forEach( function( url ) {
        self.appendCssLink( url );
      } );
    };

    Utils.prototype.applyStylesOfModule = function( module, listOfUrls ) {
      var urlArgs = requirejs.s.contexts._.config.urlArgs; // Private API of RequireJS is used. PRIVATE:
      var path = this.getModulesAbsolutePath( module );
      var abs = this.listify(listOfUrls).map( function(url) { return path+url+'?'+urlArgs } );
      this.applyStyles( abs );
    };

    Utils.prototype.renderToHTML = function( templateString, context ) {
      var context = context || {};
      //console.log( templateString );
      context = $.extend( { utils: this }, context );
      return _.template( templateString, context );
    };

    Utils.prototype.embedView = function( view, container, context ) {

      var HTML = view.renderToHTML( context );
      container.innerHTML = HTML;
      view.applyStyles();
      
      // I wander if the code below might work not as
      // expected. The changes above are dynamic, they
      // occure after DOM is loaded so weather they trigger
      // the ready event below is not clear. You can
      // be just lucky that code below is executed
      // actually after DOM is rerendered. TODO:
      $().ready( function() {
        view.activateBehaviour();
      });

    };
    
    return new Utils();
  }
);


