import View from "./../../../base-classes/class-view.js"

let compiled = require( './templates/header.html' );

let Header = View.extend( {
	tagName: 'header',
	template: compiled
} );

export default Header;