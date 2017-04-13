import View from "./../base-classes/class-view.js";

let Layout = View.extend( {
  el: '#planningAPP',
  regions: {
    header: '#header-region',
    main: '#main-region',
    footer: '#footer-region'
  },
} );

export default new Layout();
