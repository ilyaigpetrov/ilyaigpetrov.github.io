// ViewComponent Class
define(
  [
    'module'
    ,'require'
    ,'utils'
    ,'Components/Libs/WatchJS/watch'
  ],
  function (
    selfModule
    ,selfRequire
    ,utils
  ) {

    var ViewComponent = function( module, styles, behaviour, viewTemplate ) {

      this.utils = utils;
      this.module = module;
      this.styles = styles;
      this.behaviour = behaviour;
      if( viewTemplate )
        this.template = viewTemplate;

      /*
       * Args:
       *  reactiveDataSources
       *    Optional
       *    Is data sources, changes to which make all rendered DOMs to rerender.
       */
      this.renderTo$DOM = function( context, reactiveDataSourcesContext ) {

        var self = this;
        function __render() {
          var html = self.utils.renderToHTML( self.template, context );
          var $dom = $( html );
          var domMarks = $('[data-template_dom_id]', $dom);
          domMarks.each(
            function( index ) {
              var mark = domMarks.get( index );
              var domId = mark.dataset['template_dom_id'];
              var ifWrapped = 'true' === mark.dataset['template_dom_if_wrapped'];
              if( !ifWrapped )
                $( mark ).replaceWith( context[ domId ] );
              else
                $( mark ).append( context[ domId ] );
            }
          );
          return $dom;
        }
        
        var $dom = __render();

        var reactiveDataSourcesContext = reactiveDataSourcesContext || {};
        for( var name in reactiveDataSourcesContext) {
            var reactiveDataSource = reactiveDataSourcesContext[ name ];
            reactiveDataSource.onChange(
              function() {
                $new = __render();
                $dom.replaceWith( $new );
              }
            );
        };

        return $dom;
      };

      this.applyStyles = function() {
        this.utils.applyStylesOfModule( this.module, this.styles );
      };

      this.activateBehaviour = function() {
        eval( this.behaviour );
      };
      
      /*
       * The purpose of this function is to fully
       * activate and engage a component.
       */
      this.embedInto = function( container, context ) {
        var $dom = this.renderTo$DOM( context );
        $(container).append( $dom );
        this.applyStyles();
        this.activateBehaviour();
      };

      return this;
    };

    return ViewComponent;
    
  }
);