// Some browsers may not respect hashtag: after
// refreshing the page hashtag's dom element may
// be not active.
// Fix this.
// And jump-scroll the window as an undesired effect.
if ( location.hash ) // Precludes infinite refresh.
  window.location = window.location.href; // No refresh for hash is not empty.
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