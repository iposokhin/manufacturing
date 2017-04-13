function loadSubApp() {
  let route = getRoute(),
      directory = getDirectoryName( route ),
      file = directory,
      appName = getAppName( file );
  PlanningAPP[ appName ] = require( `./../subapps/${ directory }/${ file }.js` );
  PlanningAPP[ appName ].start();
};

function getRoute() {
  return Bb.history.fragment;
};

function getDirectoryName( route ) {
  return route + '-app';
};

function getAppName( file ) {
  let appName = file
    .split( '-' )
    .map( ( el, index, array ) => {
      return el[ 0 ].toUpperCase() + el.slice( 1 );
    } )
    .join( '' );
  return appName;
};

export { loadSubApp };