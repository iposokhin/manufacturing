class BaseController extends Mn.Object {
  constructor( options = {} ) {
    options.region = options.region || PlanningAPP.channel.request( 'default:region' );
    super( options );
    this._instance_id = _.uniqueId( 'controller' );
    PlanningAPP.channel.request( 'register:instance', this, this._instance_id ); 
  }

  destroy( ...args ) {
  	delete this.region;
  	delete this.options;
  	super.destroy( args );
    PlanningAPP.channel.request( 'unregister:instance', this, this._instance_id );
  }

  show( view ) {
    this.listenTo( view, 'destroy', this.destroy );
    this.options.region.show( view );
  }
}

export default BaseController;