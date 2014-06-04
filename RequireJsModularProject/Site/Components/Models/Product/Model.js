function ProductModel( productJson ) {

  this.id = 'number';
  this.name = 'string';
  this.desc = 'string';
  this.picture = 'string';
  this.price = 'number';
  
  var self = this;
  
  function fixJson( productJson ) {
  
    var pj = productJson;
    
    var errors = Object.keys( pj ).map(
      function( key ) {
        var ifHas = self.hasOwnProperty( key );
        if ( !ifHas )
          return "There is no property '"+key+"' in ProductModel.";
        var pjt = typeof( pj[key] );
        var ifTypeEq = pjt == self[key];
        if ( !ifTypeEq )
          return "Property '"+key+"' must be of type '"+self[key]+"', not '"+pjt+"'.";
        var ifError = false;
        return ifError;
      }
    );
    
    errors = errors.filter( utils.identity );
    if ( errors.length ) {
      return {
        ifValid: false,
        course: "Object doesn't conform to the ProductModel. Reasons:\n"+errors.join(' ')
      };
    }
    
    if ( !pj.name )
      pj.name = 'Unnamed';
    if ( !pj.picture )
      pj.picture = 'http://';

    return {
      ifValid: true,
      fixed: pj
    };
  };

  var fixation = fixJson( productJson );
  
  if (fixation['ifValid']) {
    return fixation['fixed'];
  }
  throw new Error( fixation['course'] );
}
