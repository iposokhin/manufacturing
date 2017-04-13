import Model from "./../base-classes/class-model.js";
import Collection from "./../base-classes/class-collection.js";

let TypicalOperationEntities = ( function() {

  let TypicalOperation = Model.extend( {
    idAttribute: "_id",
    urlRoot: 'api/typical-operations'
  } );

  let TypicalOperations = Collection.extend( {
    model: TypicalOperation,
    url: 'api/typical-operations'
  } );

  let API = {
    getTypicalOperations() {
      return new Promise( ( resolve, reject ) => {
        let typicalOperatons = new TypicalOperations();
        typicalOperatons.fetch( { reset: true } ).then( ( response) => {
          resolve( typicalOperatons );
        } );      
      } );  
    },

    getTypicalOperation( id ) {
      return new Promise( ( resolve, reject ) => {
        let typicalOperation = new TypicalOperation( { _id: id } );
        typicalOperation.fetch().then( ( response ) => {
          resolve( typicalOperation );
        } );
      } );
    },

    newTypicalOperation() {
      return new TypicalOperation();
    }
  };

  PlanningAPP.channel.reply( 'typical-operations:entities', API.getTypicalOperations );
  
  PlanningAPP.channel.reply( 'typical-operation:entity', ( id ) => {
    return API.getTypicalOperation( id );
  } );

  PlanningAPP.channel.reply( 'new:typical-operation:entity', () => {
    return API.newTypicalOperation();
  } );

  return { TypicalOperation, TypicalOperations }; 
} )();


export default TypicalOperationEntities;