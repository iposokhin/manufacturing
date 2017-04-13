import BaseController from "./../../../base-classes/class-controller.js";
import List from "./list-view.js";

let Controller = BaseController.extend( {
  
  initialize() {

    let machines = PlanningAPP.channel.request( 'machine:entities' )
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

  getListLayout( machines ) {
    return new List.Layout( {
      collection: machines
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

    this.listenTo( panelView, 'create:machine:button:clicked', () => {
      this.newRegion();
    } );

    this.layout.showChildView( 'panel', panelView );
  },

  getPanelView() {
    return new List.Panel();
  },

  /* ================ NEW-REGION ================ */
  newRegion() {
    PlanningAPP.channel.trigger( 'new:machine', this.layout.getRegion( 'new' ) );
  },

  /* ================ CONTENT-REGION ================ */
  contentRegion( dataCollection ) {
    let contentView = this.getContentView( dataCollection );

    this.listenTo( contentView, 'childview:childview:machine:clicked', ( machine ) => {
      PlanningAPP.channel.trigger( 'machine:clicked', machine.model );
    } );

    this.listenTo( contentView, 'childview:childview:machine:delete:clicked', ( machine, args ) => {
      let model = machine.model;

      if ( confirm( `Are you sure you want to delete ${ model.get( 'name' ) }?` ) ) {
        return model.destroy();
      } else {
        return false
      }
    } );

    this.layout.showChildView( 'content', contentView );
  },

  getContentView( dataCollection) {
    return new List.ContentTable( {
      collection: dataCollection
    } );
  }

} );

List.Controller = Controller;

export default List;