import Show from './show/show-controller.js';

let HeaderApp = ( function () {
  let API = {
    show( Layout ) {
      new HeaderApp.Show.Controller( {
        region: Layout.getRegion( 'header' )
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

HeaderApp.Show = Show;

module.exports = HeaderApp;