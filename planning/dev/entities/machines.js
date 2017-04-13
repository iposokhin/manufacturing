import Model from "./../base-classes/class-model.js";
import Collection from "./../base-classes/class-collection.js";

let MachinEntities = ( function() {
  let Machine = Model.extend( {
    idAttribute: '_id',
    urlRoot: 'api/machines'
  } );

  let Machines = Collection.extend( {
    model: Machine,
    url: 'api/machines'
  } );

  let API = {
    getMachines() {
      return new Promise( ( resolve, reject ) => {
        let machines = new Machines();
        machines.fetch( { reset: true } ).then( ( response ) => {
          resolve( machines );
        } );
      } );
    },

    getMachine( id ) {
      return new Promise( ( resolve, reject ) => {
        let machine = new Machine( { _id: id } );
        machine.fetch().then( ( response ) => {
          resolve( machine );
        } );
      } );
    },

    newMachine() {
      return new Machine();
    }
  };

  PlanningAPP.channel.reply( 'machine:entities', API.getMachines );

  PlanningAPP.channel.reply( 'machine:entity', ( id ) => {
    return API.getMachine( id );
  } );

  PlanningAPP.channel.reply( 'new:machine:entity', () => {
    return API.newMachine();
  } );

  return { Machine, Machines };
} )();

export default MachinEntities;