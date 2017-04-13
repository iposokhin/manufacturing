import View from "./../../../base-classes/class-view.js";

let compiled = require( './templates/footer.html' );

let Footer = View.extend( {
  tagName: 'div',
  className: 'container',
  template: compiled
} );

export default Footer;