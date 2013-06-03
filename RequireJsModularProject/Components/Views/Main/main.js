// Some browsers may not respect hashtag: after
// refreshing the page you can be got to the top,
// not to the element with corresponding id.
// Fix this.
if ( location.hash ) // Precludes infinite loop.
  window.location = window.location.href;
else
  location.hash = '#' + $( '.tab' ).first().attr( 'id' );

$(window).on(
  'hashchange'
  ,function(event) {
    event.preventDefault();
    //history.pushState( {}, '', this.location );
    return false;
  }
)