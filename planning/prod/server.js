'use strict';

const application_root = __dirname,
      express = require( 'express' ),
      path = require( 'path' ),
      bodyParser = require( 'body-parser' ),
      methodOverride = require( 'method-override' ),
      expressValidator = require('express-validator'),
      errorHandler = require( 'errorhandler' ),
      mongoose = require( 'mongoose' ),
      typicalOperationRouter = require( './routes/typical-operations.js' ),
      machineRouter = require( './routes/machines.js' );

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/planningDB' );

let app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( methodOverride() );
app.use( expressValidator() );
app.use( express.static( path.join( application_root, 'public/' ) ) );
app.use( errorHandler( { dumpExceptions: true, showStack: true } ) );

app.use( '/api/typical-operations', typicalOperationRouter );
app.use( '/api/machines', machineRouter );

const port = 1310;
app.listen( port );