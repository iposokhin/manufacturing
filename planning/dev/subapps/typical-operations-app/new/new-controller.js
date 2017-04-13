import BaseController from "./../../../base-classes/class-controller.js";
import New from "./new-view.js";

let Controller = BaseController.extend( {
  initialize( options ) {
    this.region = options.region;
  	let typicalOperation = PlanningAPP.channel.request( 'new:typical-operation:entity' );

    this.listenTo( typicalOperation, 'created', () => {
      PlanningAPP.channel.trigger( 'typical-operation:created', typicalOperation );
    } );

    let newView = this.getNewView( typicalOperation );

    let formView = PlanningAPP.channel.request( 'form:wrapper', newView );

    this.listenTo( newView, 'form:cancel', () => this.region.reset() );

    this.show( formView );
  },

  getNewView( typicalOperation ) {
    return new New.TypicalOperation( {
      model: typicalOperation
    } );
  }
} );

New.Controller = Controller;

export default New;