import BaseController from "./../../base-classes/class-controller.js";
import FormWrapper from "./form-view.js";

let Controller = BaseController.extend( {
  initialize( options = {} ) {
    this.contentView = options.view;
    this.formLayout = this.getFormLayout( options.config );

    this.listenTo( this.formLayout, 'render', this.getFormContent );
    this.listenTo( this.formLayout, 'form:submit', this.formSubmit );
    this.listenTo( this.formLayout, 'form:cancel', this.formCancel );
  },

  formCancel() {
    this.contentView.triggerMethod( 'form:cancel' );
  },

  formSubmit() {
    let data = Syphon.serialize( this.formLayout );


    if ( this.contentView.triggerMethod( 'form:submit', data ) !== false ) {
      let model = this.contentView.model;
      this.processFormSubmit( model, data );
    }
  },

  processFormSubmit( model, data ) {
    model.save( data );
  },

  getFormContent() {
    this.options.region = this.formLayout.getRegion( 'content' );
    this.show( this.contentView );
  },

  getFormLayout( options = {} ) {
    let config = this.getDefaultConfig( _.result( this.contentView, 'form' ) );
    let buttons = this.getButtons( config.buttons );

    return new Form.FormWrapper( {
      config: config,
      model: this.contentView.model,
      buttons: buttons
    } );
  },

  getDefaultConfig( config = {} ) {
    let defaultConfig = _.defaults( config, {
      footer: true,
      focusOnFirstInput: true,
      formType: "form-horizontal",
      errors: true
    } );
    return defaultConfig;
  },

  getButtons( buttons = {} ) {
    return PlanningAPP.channel.request( 'form:button:entities', buttons, this.contentView.model );
  }
} );

PlanningAPP.channel.reply( 'form:wrapper', ( contentView, options = {} ) => {
  if ( !contentView.model ) {
    throw new Error( 'No model found inside of form\'s contentView' );
  }

  let formController = new Controller( {
    view: contentView,
    config: options
  } );
  return formController.formLayout;
} );

let Form = {
  Controller,
  FormWrapper
};

module.exports = Form;