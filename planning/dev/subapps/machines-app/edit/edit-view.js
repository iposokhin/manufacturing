import View from "./../../../base-classes/class-view.js";

let compiledLayout = require( "./templates/edit-layout.html" ),
    compiledFormContent = require( "./templates/edit-form-content.html" ),
    compiledTitle = require( "./templates/edit-title.html" ),
    compiledOption = require( "./templates/option.html" );

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

let ContentLayout = View.extend( {
  form: {
    footer: true,
    focusOnFirstInput: true,
    formType: "form-horizontal",
    buttons: {
      primary: 'Update',
      cancel: 'Cancel'
    }
  },

  regions: {
    'select-operation': {
      el: 'select',
      replaceElement: true
    }
  },

  onRender() {
    this.showChildView( 'select-operation', new Select( {
      allOperations: this.options.operations.toJSON(),
      alreadySelected: this.model.get('availableOperations')
    } ) );
  },

  template: compiledFormContent,
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

  serializeData() {
    return {
      allOperations: this.options.allOperations,
      alreadySelected: this.options.alreadySelected
    }
  },

  onAttach() {
    this.$( 'select' ).end().chosen( {
      no_results_text: "Sorry, not found"
    } );
  }
} );

let Edit = {
  Layout,
  ContentLayout,
  Title
};

export default Edit;