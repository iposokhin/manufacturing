import View from "./../../../base-classes/class-view.js";

let compiledLayout = require( "./templates/layout.html" ),
    compiledOption = require( "./templates/option.html" );

let Layout = View.extend( {
  template: compiledLayout,

  form: {
    footer: true,
    focusOnFirstInput: true,
    formType: "form-horizontal",
    buttons: {
      primary: 'Create',
      cancel: 'Cancel'
    },
  },

  regions: {
    'select-operation' : {
      el: 'select',
      replaceElement: true
    }
  },

  onRender() {
    this.showChildView( 'select-operation', new Select( {
      collection: this.options.operations
    } ) );
  }
} );

let Select = View.extend( {
  tagName: 'select',
  attributes: {
    'name': 'availableOperations',
    'id': 'availableOperations',
    'data-placeholder': 'Choose an operations',
    'multiple': 'multiple',
    'size': 10
  },
  template: compiledOption,

  onAttach() {
    this.$( 'select' ).end().chosen( {
      no_results_text: "Sorry, not found"
    } );
  }
} );

let New = {
  Layout
};

export default New;

