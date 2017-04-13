import BaseController from "./../../../base-classes/class-controller.js";
import List from "./list-view.js";

let Controller = BaseController.extend( {
  
  initialize() {

    let typicalOperations = PlanningAPP.channel.request( 'typical-operations:entities' )
      .then( ( response ) => {
        this.layout = this.getListLayout( response );
    
        this.listenTo( this.layout, 'render', () => {
          this.titleRegion();
          this.panelRegion();
          this.contentRegion( response );
        } );
    
        this.show( this.layout );
      } );
  },

  getListLayout( typicalOperations ) {
    return new List.Layout( {
      collection: typicalOperations
    } );
  },

  /* ================ TITLE-REGION ================ */
  titleRegion() {
    let titleView = this.getTitleView();
    this.layout.showChildView( 'title', titleView );
  },

  getTitleView() {
    return new List.Title();
  },

  /* ================ PANEL-REGION ================ */
  panelRegion() {
    let panelView = this.getPanelView();

    this.listenTo( panelView, 'create:typical-operation:button:clicked', () => {
      this.newRegion();
    } );

    this.layout.showChildView( 'panel', panelView );
  },

  getPanelView() {
    return new List.Panel();
  },

  /* ================ NEW-REGION ================ */
  newRegion() {
    PlanningAPP.channel.trigger( 'new:typical-operation', this.layout.getRegion( 'new' ) );
  },

  /* ================ CONTENT-REGION ================ */
  contentRegion( dataCollection ) {
    let contentView = this.getContentView( dataCollection );

    this.listenTo( contentView, 'childview:childview:typical-operation:clicked', ( typicalOperation ) => {
      PlanningAPP.channel.trigger( 'typical-operation:clicked', typicalOperation.model );
    } );

    this.listenTo( contentView, 'childview:childview:typical-operation:delete:clicked', ( typicalOperation, args ) => {
      let model = typicalOperation.model;
      
        if ( confirm( `Are you sure you want to delete ${ model.get( 'name' ) }?` ) ) {
        return model.destroy();
      } else {
        return false
      }
    } );

    this.layout.showChildView( 'content', contentView );
  },

  getContentView( dataCollection ) {
    return new List.ContentTable( {
      collection: dataCollection
    } );
  }

} );

List.Controller = Controller;

export default List;