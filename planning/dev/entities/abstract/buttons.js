import Model from "./../../base-classes/class-model.js";
import Collection from "./../../base-classes/class-collection.js";

let ButtonEntities = ( function() {
  let Button = Model.extend( {} ),
      Buttons = Collection.extend( {
        model: Button
      } );

  let API = {
    getFormButtons( buttons, model ) {
      buttons = this.getDefaultsButtons( buttons, model );

      let arr = [];

      arr.push( {
        type: 'button',
        name: 'primary',
        text: buttons.primary
      } );

      arr.push( {
        type: 'button',
        name: 'cancel',
        text: buttons.cancel
      } );

      let buttonsCollection = new Buttons( arr )
      return buttonsCollection;
    },

    getDefaultsButtons( buttons, model ) {
      return _.defaults( buttons, {
        primary: ( () =>  {
          if ( model.isNew() ) {
            return 'Create';
          } else {
            return 'Update';
          };
        } )(),

        cancel: 'Cancel'
      } );
    }
  };

  PlanningAPP.channel.reply( 'form:button:entities', ( buttons = {}, model ) => {
    return API.getFormButtons( buttons, model );
  } );

  return { Button, Buttons };
} )();

export default ButtonEntities;