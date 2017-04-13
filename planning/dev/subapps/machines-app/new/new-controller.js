import BaseController from "./../../../base-classes/class-controller.js";
import New from "./new-view.js";

let Controller = BaseController.extend( {
  initialize( options ) {
    this.region = options.region;

    let machine = PlanningAPP.channel.request( 'new:machine:entity' );
    let operations = PlanningAPP.channel.request( 'typical-operations:entities' );

    Promise.all( [ machine, operations ] ).then( ( [ machine, operations ] ) => {
      this.listenTo( machine, 'created', () => {
        PlanningAPP.channel.trigger( 'machine:created', machine );
      } );
  
      let newView = this.getNewView( machine, operations );
      let formView = PlanningAPP.channel.request( 'form:wrapper', newView );
  
      this.listenTo( newView, 'form:cancel', () => this.region.reset() );
      this.show( formView );
    } );
  },

  getNewView( machine, operations ) {
    return new New.Layout( {
      model: machine,
      operations: operations
    } );
  }
} );

New.Controller = Controller;

export default New;