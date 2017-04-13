import BaseController from "./../../../base-classes/class-controller.js";
import Edit from "./edit-view.js"

let Controller = BaseController.extend( {
  initialize( options ) {
    let id = options.id

    let machine = PlanningAPP.channel.request( 'machine:entity', id );
    let operations = PlanningAPP.channel.request( 'typical-operations:entities' );

    Promise.all( [ machine, operations ] ).then( ( [ machine, operations ] ) => {
        this.listenTo( machine, 'updated', () => {
          PlanningAPP.channel.trigger( 'machine:updated', machine );
        } );

        this.layout = this.getEditLayout( machine );
        
        this.listenTo( this.layout, 'render', () => {
          this.formRegion( machine, operations );
          this.titleRegion( machine );
        } );

        this.show( this.layout );
      } );
  },

  titleRegion( machine ) {
    let titleView = this.getTitleView( machine );
    this.layout.showChildView( 'title', titleView );
  },

  getTitleView( machine ) {
    return new Edit.Title( {
      model: machine
    } );
  },

  getEditView( machine, operations ) {
    return new Edit.ContentLayout( {
      model: machine,
      operations: operations
    } );
  },

  getEditLayout( machine ) {
    return new Edit.Layout( {
      model: machine
    } );
  },

  formRegion( machine, operations ) {
    let editView = this.getEditView( machine, operations );
    
    this.listenTo( editView, 'form:cancel', () => {
      PlanningAPP.channel.trigger( 'machine:cancelled', machine );
    } );

    let formView = PlanningAPP.channel.request( 'form:wrapper', editView );
    this.layout.showChildView( 'form', formView );
  }
} );

Edit.Controller = Controller;

export default Edit;