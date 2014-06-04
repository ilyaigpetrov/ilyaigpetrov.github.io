// Common Utils
define(
  ['module', 'require', 'utils'],
  function ( selfModule, selfRequire, utils ) {

    var Component = function( viewTemplate, module, styles, mainBehaviourJS ) {
      this.utils = utils;
      if( !viewTemplate )
        throw new Error("Copmonent with empty template was tried to be created which is prohibited.");
      this.template = viewTemplate;
      this.module = module;
      this.styles = styles;
      this.behaviour = mainBehaviourJS;
      return this;
    };

    Component.prototype = {
      renderToHTML: function( context ) {
        return this.utils.renderToHTML( this.template, context );
      },

      applyStyles: function () {
        this.utils.applyStylesOfModule( this.module, this.styles );
      },

      activateBehaviour: function() {
        eval( this.behaviour );
      },
      
      /*chargeWithDataSources: function( dataSources ) {
      
        this.dataSources = this.dataSources || {};
        var self = this;
        Object.keys(dataSources).forEach(
          function( key ) {
            self.dataSources[key] = dataSources[key];
          }
        );
        
      },

      assureDataSources: function( requirementsList ) {

        var self = this;
        var errors = requirementsList.filter(
          function( key ) {
            if ( !self.dataSources.hasOwnProperty( key ) )
              return "Requirement '"+key+"' wasn't provided.";
            return false;
          }
        );
        if( errors )
          throw new Error( "Requirements on data sources of a Component are not met. Details:\n"+errors.join('\n') );

      },*/
      
    };

    Component.prototype.castView = function( context ) {
      var HTML = this.renderToHTML( context );
      this.applyStyles();
      //$().ready( function() { // This `ready` block may be useless. UPD: Doesn't work for `this` isn't preserved. TODO: figure out.
        this.activateBehaviour();
      //});
      return HTML;
    }
    
    return Component;
  }
);