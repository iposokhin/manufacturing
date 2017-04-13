import View from "./../../../base-classes/class-view.js";
import CollectionView from "./../../../base-classes/class-collection-view.js";

let compiledLayout = require( "./templates/list-layout.html" ),
    compiledTitle = require( "./templates/title.html" ),
    comliledPanel = require( "./templates/panel.html" ),
    compiledContent = require( "./templates/content.html" ),
    compiledRow = require( "./templates/row.html" ),
    compiledEmpty = require( "./templates/empty.html" );

let Layout = View.extend( {
  tagName: 'div',
  className: 'container',
  template: compiledLayout,

  regions: {
  	title: '#title-region',
  	panel: '#panel-region',
  	new: '#new-region',
  	content: '#content-region'
  }
} );

let Title = View.extend( {
  tagName: 'div',
  id: 'page-title',
  template: compiledTitle
} );

let Panel = View.extend( {
  tagName: 'div',
  id: 'control-panel',
  template: comliledPanel,

  triggers: {
    'click #create': 'create:typical-operation:button:clicked'
  }
} );

let ContentRow = View.extend( {
  tagName: 'tr',
  className: 'dataRow',
  template: compiledRow,

  ui: {
    delete: '.delete'
  },

  triggers: {
    'click @ui.delete': 'typical-operation:delete:clicked',
    'click': 'typical-operation:clicked'
  }
} );

let NoContent = View.extend( {
  tagName: 'tr',
  template: compiledEmpty
} );

let TableBody = CollectionView.extend( {
  tagName: 'tbody',
  childView: ContentRow,
  emptyView: NoContent
} );

let ContentTable = View.extend( {
  tagName: 'table',
  className: 'table content-table table-hover',
  template: compiledContent,

  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },

  onRender() {
    this.showChildView( 'body', new TableBody( {
      collection: this.collection
    } ) );
  }
} );

let List = {
  Layout,
  Title,
  Panel,
  ContentTable
};

export default List;