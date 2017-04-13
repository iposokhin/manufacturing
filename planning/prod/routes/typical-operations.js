const express = require( 'express' ),
      mongoose = require( 'mongoose' ),
      schemas = require( './../db/schemas.js' ),
      router = express.Router(),
      validation = require( './../validation/schemas.js' );

let typicalOperationModel = mongoose.model( 'TypicalOperation', schemas.typicalOperation );

router.get( "/", ( req, res ) => {
  return typicalOperationModel.find( ( err, result ) => {
    if ( !err ) {
      return res.send( result );
    } else {
      return console.log( err );
    }
  } );
} );

router.get( "/:id", ( req, res ) => {
  let id = req.params.id;
  return typicalOperationModel.findById( id, ( err, result ) => {
    if( !err ) {
      return res.send( result );
    } else {
      return console.log( err );
    }
  } );
} );

router.put( "/:id", ( req, res ) => {
  req.checkBody( validation.typicalOperationSchema );

  req.getValidationResult().then( ( resultOfValidation ) => {
    if ( resultOfValidation.isEmpty() ) {
      let id = req.params.id;
      return typicalOperationModel.findById( id, ( err, result ) => {
        result.name = req.body.name;
        result.duration = req.body.duration;
        
        return result.save( ( err ) => {
          if( !err ) {
            return res.send( result );
          } else {
            return console.log( err );
          }
        } );
      } );
    } else {
    
      return res.status( 422 ).send( resultOfValidation.mapped() );
    }
  } );
} );

router.post( "/", ( req, res ) => {
  req.checkBody( validation.typicalOperationSchema );

  req.getValidationResult().then( ( resultOfValidation ) => {
    if ( resultOfValidation.isEmpty() ) {
      let typicalOperation = new typicalOperationModel( {
        name: req.body.name,
        duration: req.body.duration
      } );
    
      typicalOperation.save( ( err ) => {
        if ( !err ) {
          return res.send( typicalOperation );
        } else {
          return console.log( err );
        }
      } );
    } else {
      return res.status( 422 ).send( resultOfValidation.mapped() );
    }
  } );
} );

router.delete( "/:id", ( req, res) => {
  let id = req.params.id;

  return typicalOperationModel.findById( id, ( err, result ) => {  
    return result.remove( ( err ) => {
      if( !err ) {
        return res.end();
      } else {
        return console.log( err );
      }
    } );
  } );
} );

module.exports = router;