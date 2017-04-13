import Show from './show/show-controller.js';

let FooterApp = ( function () {
  let API = {
    show( Layout ) {
      new FooterApp.Show.Controller( {
        region: Layout.getRegion( 'footer' )
      } );
    }
  };

  let App = Mn.Object.extend( {
    start( Layout ) {
      API.show( Layout );
    }
  } );

  return new App();
} )();

FooterApp.Show = Show;

module.exports = FooterApp;