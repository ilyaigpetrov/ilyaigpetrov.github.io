// Reveal
define(
  [
    'module',
    'require',
    'jQuery',
    'Components/Commons/Component/AMD.js',
    'utils',
    'text!./jquery.reveal.js',    
  ],
  function ( module, require, jquery, Component, utils, revealJS ) {

    var revealComponent = new Component(
      "No template. Don't render.",
      module,
      'reveal.css',
      revealJS
    );
    
    revealComponent.applyStyles();
    revealComponent.activateBehaviour(); // DOM is ready already, but dependants' render is to be called later.

  }
);

