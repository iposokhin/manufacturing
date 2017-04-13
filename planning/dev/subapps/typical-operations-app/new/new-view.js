import View from "./../../../base-classes/class-view.js";

let compiledNew = require( "./templates/new.html" );

let TypicalOperation = View.extend( {
  template: compiledNew,

  form: {
    footer: true,
    focusOnFirstInput: true,
    formType: "form-horizontal",
    buttons: {
      primary: 'Create',
      cancel: 'Cancel'
    },
  }
} );

let New = {
  TypicalOperation
};

export default New;

