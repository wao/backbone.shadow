/* jshint eqeqeq:false, eqnull:true */
"use strict";

const Backbone = require( "backbone" );

const BaseModel = Backbone.Model.extend({
    set : function( key, val, options ){
      if ( key == null ){
          return this;
      }

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      // eslint-disable-next-line underscore/prefer-underscore-typecheck
      if ( typeof key === "object" ){
        attrs = key;
        options = val;
      } else {
        ( attrs = {})[ key ] = val;
      }

      options = options || {};

      // Run validation.
      if ( !this._validate( attrs, options ) ){
          return false;
      }

      // Update the `id`.
      if ( this.idAttribute in attrs ){
          this.trigger( "change_id", this.get( this.idAttribute ), this );
      }

      return BaseModel.__super__.set.apply( this, arguments );
    },
});

module.exports = {
    BaseModel,
};
