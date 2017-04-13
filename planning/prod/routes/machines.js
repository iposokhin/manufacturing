const express = require( 'express' ),
      mongoose = require( 'mongoose' ),
      schemas = require( './../db/schemas.js' ),
      router = express.Router(),
      validation = require( './../validation/schemas.js' );

let machineModel = mongoose.model( 'Machine', schemas.machine );

router.get( '/', ( req, res ) => {
  return machineModel
    .find()
    .populate( 'availableOperations', 'name' )
    .exec( ( err, result ) => {
      if ( err ) return handleError( err );
      res.send( result );
    } )
} );

router.get( "/:id", ( req, res ) => {
  let id = req.params.id;
  return machineModel
    .findById( id )
    .populate( 'availableOperations', '_id' )
    .exec( ( err, result ) => {
      if ( err ) return handleError( err );
      res.send( result );      
    } );
} );

router.post( "/", ( req, res ) => {
  req.checkBody( validation.machinesSchema );

  req.getValidationResult().then( ( resultOfValidation ) => {
    if ( resultOfValidation.isEmpty() ) {
      let machine = new machineModel( {
          name: req.body.name,
          inventaryNumber: req.body.inventaryNumber,
          availableOperations: req.body.availableOperations
      } );
    
      machine.save( ( err ) => {
        if ( !err ) {
          return res.send( machine );
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

  return machineModel.findById( id, ( err, result ) => {  
    return result.remove( ( err ) => {
      if( !err ) {
        return res.end();
      } else {
        return console.log( err );
      }
    } );
  } );
} );

router.put( "/:id", ( req, res ) => {
  req.checkBody( validation.machinesSchema );

  req.getValidationResult().then( ( resultOfValidation ) => {
    if ( resultOfValidation.isEmpty() ) {
      let id = req.params.id;
      return machineModel.findById( id, ( err, result ) => {
        result.name = req.body.name;
        result.inventaryNumber = req.body.inventaryNumber;
        result.availableOperations = req.body.availableOperations;
        
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

module.exports = router;