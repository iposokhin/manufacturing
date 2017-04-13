import "./app-pre-definitions/manifest.js";

import Layout from "./app-pre-definitions/layout.js";
import { loadSubApp } from "./app-pre-definitions/loader.js";

window.PlanningAPP = ( () => {
  let API = {
    load() {
      loadSubApp();
    }
  };

  let Router = Mn.AppRouter.extend( {
    appRoutes: {
      'typical-operations': 'load',
      'machines': 'load'
    }
  } );

  let App = Mn.Application.extend( {

    initialize() {
      this.channel = Bb.Radio.channel( 'bus' );

      this.channel.reply( 'register:instance', ( instance, id ) => {
        this.register( instance, id );
      } );

      this.channel.reply( 'unregister:instance', ( instance, id ) => {
        this.unregister( instance, id );
      } );
    },

    onStart() {
      this.Entities = require( "./app-pre-definitions/entities.js" );
      this.Components = {
        Form: require( "./components/form/form-controller.js" )
      };

      if ( Bb.history ) {
        Bb.history.start();
        new Router( {
          controller: API
        } );
        Bb.history.navigate( '#/typical-operations', { trigger: true } );
      }
    },

    onBeforeStart() {
      this.Layout = Layout;

      this.HeaderApp = require( "./subapps/header-app/header-app.js" );
      this.HeaderApp.start( this.Layout );

      this.FooterApp = require( "./subapps/footer-app/footer-app.js" );
      this.FooterApp.start( this.Layout );

      this.channel.reply( 'default:region', () => {
        return this.Layout.getRegion( 'main' );
      } );
    }
  } );
  
  return new App();
} )();

PlanningAPP.start();