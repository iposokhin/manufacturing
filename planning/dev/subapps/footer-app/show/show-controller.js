import BaseController from "./../../../base-classes/class-controller.js";
import Footer from './show-view.js';

let Show = {
  Footer 
};

let Controller = BaseController.extend( {
  initialize() {
    let view = this.getShowView();
    this.show( view );
  },

  getShowView() {
    return new Show.Footer();
  }
} );

Show.Controller = Controller;

export default Show;