let is = require( './is' );
let Core = require( './core' );
let extension = require( './extension' );
let Stylesheet = require( './stylesheet' );

var baseNodeShapes = require('./extensions/renderer/base/node-shapes').nodeShapes;
var math = require('./math');
var styleProperties = require('./style/properties');
var sbgn = require( './sbgn' );

let cytoscape = function( options ){ // jshint ignore:line
  // if no options specified, use default
  if( options === undefined ){
    options = {};
  }

  // create instance
  if( is.plainObject( options ) ){
    return new Core( options );
  }

  // allow for registration of extensions
  else if( is.string( options ) ){
    return extension.apply( extension, arguments );
  }
};

// e.g. cytoscape.use( require('cytoscape-foo'), bar )
cytoscape.use = function( ext ){
  let args = Array.prototype.slice.call( arguments, 1 ); // args to pass to ext

  args.unshift( cytoscape ); // cytoscape is first arg to ext

  ext.apply( null, args );

  return this;
};

// replaced by build system
cytoscape.version = require('./version');

// expose public apis (mostly for extensions)
cytoscape.stylesheet = cytoscape.Stylesheet = Stylesheet;

// expose these api's for sbgnviz
cytoscape.baseNodeShapes = baseNodeShapes;
cytoscape.math = math;
cytoscape.styleProperties = styleProperties;
cytoscape.sbgn = sbgn;

module.exports = cytoscape;
