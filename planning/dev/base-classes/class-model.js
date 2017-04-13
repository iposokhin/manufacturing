class Model extends Bb.Model {

  destroy( data, options = {} ) {
    _.defaults( options, {
      wait: true
    } );

    this.set( {
      _destroy: true
    } );

    super.destroy( data, options );
  }

  isDestroyed() {
    return this.get( '_destroy' );
  }

  save( data, options = {} ) {
    let isNew = this.isNew();

    _.defaults( options, {
      wait: true,

      success: _.bind( this.saveSuccess, this, isNew ),
      error: _.bind( this.saveError, this )
    } );

    this.unset( '_errors' );
    super.save( data, options );
  }

  saveSuccess( isNew ) {
    if ( isNew ) {
      this.trigger( 'created', this );
    } else {
      this.trigger( 'updated', this );
    }
  }

  saveError( model, xhr, options ) {
    if ( xhr.status != 400 && xhr.status != 500 ) {
      this.set( {
        _errors: JSON.parse( xhr.responseText )
      } );
    }
  }
}

export default Model