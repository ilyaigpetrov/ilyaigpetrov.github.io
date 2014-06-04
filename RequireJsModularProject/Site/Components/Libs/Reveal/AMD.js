// Reveal
define(
  [
    'module',
    'require',
    'jQuery',
    'Components/Commons/ViewComponent/AMD.js',
    'utils',
    'text!./jquery.reveal.js',    
  ],
  function (
    module
    ,require
    ,jquery
    ,ViewComponent
    ,utils
    ,revealJS
  ) {
    // Keep it singleton, don't load this lib twice with no reason.
    
    var revealComponent = new ViewComponent(
      module,
      'reveal.css',
      revealJS
    );
    
    revealComponent.applyStyles();
    revealComponent.activateBehaviour(); // DOM is ready already, but dependants' renders are to be called later.

  }
);