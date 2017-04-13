import View from "./../../base-classes/class-view.js";

let compiledForm = require( "./templates/form.html" );

let FormWrapper = View.extend( {
  tagName: 'form',
  id: 'form',
  template: compiledForm,

  attributes() {
    return {
      'data-type': this.getFormDataType(),
      'class': this.options.config.formType
    };
  },

  regions: {
    content: '#form-content-region'
  },

  ui: {
    submit: 'button[name=primary]',
    cancel: 'button[name=cancel]'
  },

  triggers: {
    'click @ui.submit': 'form:submit',
    'click @ui.cancel': 'form:cancel'
  },

  modelEvents: {
    'change:_errors': 'changeErrors'
  },

  serializeData() {
    return {
      footer: this.options.config.footer,
      buttons: this.options.buttons.toJSON(),
      title: this.getFormTitle()
    }
  },

  onRender() {
    this.focusOnFirstInput();
  },

  focusOnFirstInput() {
    if( this.options.config.focusOnFirstInput ) {
      _.defer( () => {
        this.$( '*:input:visible:enabled:first' ).focus();
      } );
    }
  },

  getFormDataType() {
    if ( this.model.isNew() ) {
      return 'new';
    } else {
      return 'edit';
    }
  },

  getFormTitle() {
    if ( this.model.isNew() ) {
      return 'Creating';
    } else {
      return 'Editing';
    }
  },

  changeErrors( model, errors, options ) {
    if ( this.options.config.errors ) {
      if ( _.isEmpty( errors ) ) {
        this.removeErrors();
      } else {
        this.addErrors( errors );
      }
    }
  },

  addErrors( errors = {} ) {
    for( let error in errors ) {
      this.addError( errors[ error ] );
    }
  },

  addError( error ) {
    let el = this.$( `[ name=${ error.param } ]` );
    let p = $( '<p>' ).text( error.msg );
    el.after( p ).closest( 'div.form-group' ).addClass( 'error' );
  },

  removeErrors() {
    this.$( '.error' ).removeClass( 'error' ).find( 'p' ).remove();
  }
} );

export default FormWrapper;