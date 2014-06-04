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
      object = typeof object === 'undefined' ? [] : object;
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

    /*
     * Used to leave marks or template holes where
     * component's dom must be later inserted.
     * Args:
     *  ifWrapped -- true if to preserve div box wrapper around component's dom.
     */
    Utils.prototype.insertDomMark = function( domId, ifWrapped ) {
      var ifWrapped = Boolean(ifWrapped) ? ifWrapped : false;
      return '<div data-template_dom_id="'+ domId +'" data-template_dom_if_wrapped="'+ ifWrapped +'">Loading...</div>';
    };

    Utils.prototype.renderToHTML = function( templateString, context ) {
      var context = context || {};
      context = $.extend( { utils: this }, context );
      return _.template( templateString, context );
    };

    return new Utils();
  }
);