let mongoose = require( 'mongoose' );

let typicalOperation = mongoose.Schema( {
  name: String,
  duration: Number
} );

let machine = mongoose.Schema( {
  name: String,
  inventaryNumber: Number,
  availableOperations: [ { type: mongoose.Schema.Types.ObjectId, ref: 'TypicalOperation' } ]
} );

module.exports = {
  typicalOperation,
  machine
};