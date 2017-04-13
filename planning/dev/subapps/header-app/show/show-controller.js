import BaseController from "./../../../base-classes/class-controller.js";
import Header from './show-view.js';

let Show = {
	Header	
};

let Controller = BaseController.extend( {
  initialize() {
    let view = this.getShowView();
    this.show( view );
  },

  getShowView() {
    return new Show.Header();
  }
} );

Show.Controller = Controller;

export default Show;