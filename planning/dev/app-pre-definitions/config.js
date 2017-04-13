_.extend( Mn.Application.prototype, {

  register( instance, id ) {
    if( !this._registry ) {
      this._registry = {};
    }
    this._registry[ id ] = instance;
    // console.info( 'registry', this._registry[ id ] );
  },

  unregister( instance, id ) {
    // console.info( 'unregistry', this._registry[ id ] );
    delete this._registry[ id ];
  }
} )