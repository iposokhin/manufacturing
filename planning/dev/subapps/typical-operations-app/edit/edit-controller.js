import BaseController from "./../../../base-classes/class-controller.js";
import Edit from "./edit-view.js"

let Controller = BaseController.extend( {
	initialize( options ) {
    let id = options.id
		let typicalOperation = PlanningAPP.channel.request( 'typical-operation:entity', id )
			.then( ( response ) => {
        this.listenTo( response, 'updated', () => {
          PlanningAPP.channel.trigger( 'typical-operation:updated', response );
        } );

				this.layout = this.getEditLayout( response );
        
        this.listenTo( this.layout, 'render', () => {
          this.formRegion( response );
          this.titleRegion( response );
        } );

				this.show( this.layout );
			} );
	},

  titleRegion( typicalOperation ) {
    let titleView = this.getTitleView( typicalOperation );
    this.layout.showChildView( 'title', titleView );
  },

  getTitleView( typicalOperation ) {
    return new Edit.Title( {
      model: typicalOperation
    } );
  },

	getEditView( typicalOperation ) {
		return new Edit.TypicalOperation( {
			model: typicalOperation
		} );
	},

  getEditLayout( typicalOperation ) {
    return new Edit.Layout( {
      model: typicalOperation
    } );
  },

  formRegion( typicalOperation ) {
    let editView = this.getEditView( typicalOperation );
    
    this.listenTo( editView, 'form:cancel', () => {
      PlanningAPP.channel.trigger( 'typical-operation:cancelled', typicalOperation );
    } );

    let formView = PlanningAPP.channel.request( 'form:wrapper', editView );
    this.layout.showChildView( 'form', formView );
  }
} );

Edit.Controller = Controller;

export default Edit;