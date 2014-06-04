// DataSources
define(
  [
    'module'
    ,'require'
    ,'utils'
    ,'jQuery'
  ],
  function (
    module
    ,require
    ,utils
    ,jquery
  ) {
  
    function DataSource() {

      this.onChange = function() {
        // Parse arguments.
        var args = utils.args( arguments );
        var callback = args[0],
          args = args.slice( 1 );
        if ( !callback )
          throw new Error( "Undefined callback argument." );
        if ( args.length )
          throw new Error( "Subscribing an event with arguments isn't supported yet." );
        // Bind to change events.
        $(this).on( 'change', callback );
      };

    }

    function Collection( list ) {
      /*
       *  Collection represents a json document of the following
       *  structure:
       *
       *  [ {id:d,...}, {id:d,...}, ... ].
       *
       *  So it is a list of objects of some model kept
       *  and edited locally in the browser. Syncronization
       *  with a server may be added later.
       *
       *
       */
      
      DataSource.apply( this, arguments );
      
      this.list = list;

      this.readAll = function() {
        return this.list;
      };

      this.append = function( object ) {
        this.list.push( object );
        $(this).trigger( 'change' );
        return this;
      };

    };
    
    function idToObjectMap( identifiedList ) {
    
      DataSource.apply( this, arguments );
    
      this.map = {};
    
      var self = this;
      identifiedList.forEach(
        function( item ) {
          self.map[item.id] = item;
        }
      );
      
      this.update = function( identifiableItem ) {
        this.map[identifiableItem.id] = identifiableItem;
        $(this).trigger( 'change' );
      }
      
      this.readAll = function() {
        var map = this.map;
        return Object.keys( map ).map( function( item ) { return map[item] } );
      };

    }

    var exports = {
      Collection: Collection,
      idToObjectMap: idToObjectMap,
    }

    return exports;

  }
);