import List from "./list/list-controller.js";
import New from "./new/new-controller.js";
import Edit from "./edit/edit-controller.js";

let MachinesApp = ( function() {
  
  let Router = Mn.AppRouter.extend( {
    appRoutes: {
      'machines/edit/:id': 'edit',
      'machines': 'list'
    }
  } );

  let API = {
    list() {
      new MachinesApp.List.Controller();
    },

    new( region ) {
      new MachinesApp.New.Controller( {
        region: region
      } );
    },

    edit( id ) {
      new MachinesApp.Edit.Controller( {
        id: id
      } );
    }
  };

  PlanningAPP.channel.on( 'new:machine', ( region ) => {
    return API.new( region );
  } );

  PlanningAPP.channel.on( 'machine:clicked', ( machine ) => {
    Bb.history.navigate( '#/machines/edit/' + machine.id );
  } );

  PlanningAPP.channel.on( 'machine:cancelled \
                           machine:updated \
                           machine:created',
    ( machine ) => {
      Bb.history.navigate( '#/machines', {
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

      Bb.history.navigate( '#/machines', { trigger: true, replace: true } );
    }
  } );

  return new App();
} )();

MachinesApp.List = List;
MachinesApp.New = New;
MachinesApp.Edit = Edit;

module.exports = MachinesApp;