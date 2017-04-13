import List from "./list/list-controller.js";
import New from "./new/new-controller.js";
import Edit from "./edit/edit-controller.js";

let TypicalOperationsApp = ( function() {
  
  let Router = Mn.AppRouter.extend( {
    appRoutes: {
      'typical-operations/edit/:id': 'edit',
      'typical-operations': 'list'
    }
  } );

  let API = {
    list() {
      new TypicalOperationsApp.List.Controller();
    },
    
    new( region ) {
      new TypicalOperationsApp.New.Controller( {
        region: region
      } )
    },

    edit( id ) {
      new TypicalOperationsApp.Edit.Controller( {
        id: id
      } );
    }
  };

  PlanningAPP.channel.on( 'new:typical-operation', ( region ) => {
    return API.new( region );
  } );

  PlanningAPP.channel.on( 'typical-operation:clicked', ( typicalOperation ) => {
    Bb.history.navigate( '#/typical-operations/edit/' + typicalOperation.id );
  } );

  PlanningAPP.channel.on( 'typical-operation:cancelled \
                           typical-operation:updated \
                           typical-operation:created',
    ( typicalOperation ) => {
      Bb.history.navigate( '#/typical-operations', {
        trigger: true,
        replace: true
      } );
    }
  );

  let App = Mn.Object.extend( {
    start() {
      new Router( {
        controller: API
      } );

      Bb.history.navigate( '#/typical-operations', { trigger: true, replace: true } );
    }
  } );

  return new App();
} )();

TypicalOperationsApp.List = List;
TypicalOperationsApp.New = New;
TypicalOperationsApp.Edit = Edit;

module.exports = TypicalOperationsApp;