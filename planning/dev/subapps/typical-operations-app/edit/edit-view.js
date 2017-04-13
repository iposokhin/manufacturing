import View from "./../../../base-classes/class-view.js";

let compiledLayout = require( "./templates/edit-layout.html" ),
    compiledFormContent = require( "./templates/edit-form-content.html" ),
    compiledTitle = require( "./templates/edit-title.html" );

let Layout = View.extend( {
  tagName: 'div',
  className: 'container',
	template: compiledLayout,
  regions: {
    title: '#title-region',
    form: '#form-region'
  }
} );

let Title = View.extend( {
  tagName: 'div',
  className: 'row',
  template: compiledTitle,
} );

let TypicalOperation = View.extend( {
  form: {
    footer: true,
    focusOnFirstInput: true,
    formType: "form-horizontal",
    buttons: {
      primary: 'Update',
      cancel: 'Cancel'
    }
  },

  template: compiledFormContent,

  onFormSubmit( data ) {
    
  }
} );

let Edit = {
	Layout,
  TypicalOperation,
  Title
};

export default Edit;