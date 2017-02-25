"use strict";

const { Debug, yaClass } = require( "js-utils" );
let _ = require( "underscore" );
let Backbone = require( "backbone" );

// Define class ShadowModel
let ShadowModel = function(){
    // Don't call Backbone.Model's constructor since we just want to shadow it.
    // ShadowModel.__super__.constructor.apply(this,arguments);
    this.initialize.apply( this, arguments );

    // Put your constructor code here or in initialize()
};

function createForwardMethods(){
    return _.reduce( arguments, function( methods, methodName ){
        methods[ methodName ] = function(){
            return this.mModel[ methodName ].apply( this.mModel, arguments );
        };
        return methods;
    }, {});
}

function createForbiddenMethods(){
    return _.reduce( arguments, function( methods, methodName ){
        methods[ methodName ] = function(){
            throw new Error( "ShadowModel." + methodName + " should not be used" );
        };
        return methods;
    }, {});
}

let forwardMethods = createForwardMethods(
        "get", "set", "has", "toJSON", "previous", "previousAttributes", "hasChanged",
        "escape", "matches", "unset", "changedAttributes", "destroy", "isNew",
        "isValid", "keys", "values", "pairs", "invert", "pick", "omit", "chain", "isEmpty" );

let forbiddenMethods = createForbiddenMethods( "sync", "fetch", "url", "parse", "clone" );

yaClass( ShadowModel ).inherit( Backbone.Model ).extend( forwardMethods, forbiddenMethods, {
    initialize : function( pBackboneModel, options ){
        Debug.assert( pBackboneModel instanceof Backbone.Model );
        this.mModel = pBackboneModel;
        this.cid = this.mModel.cid;
        this.id = this.mModel.id;

        // Private API, but used by Epoxy
        this.attributes = this.mModel.attributes;

        this.mContainer = null;
        this.mIdEventName = "change:" + this.mModel.idAttribute;
        if( _.has( options, "collection" ) ){
            Debug.assert( "trigger" in options.collection );
            Debug.assert( _.isFunction( options.collection.trigger ) );
            this.mContainer = options.collection;
        }
        this.listenTo( pBackboneModel, "all", this.onModelEvent );
    },

    getId : function(){
        return this.mModel.id;
    },

    getCid : function(){
        return this.mModel.cid;
    },

    getContainer : function(){
        // FIXME: need to consider more important problem
        return this.mContainer || this.mModel.collection;
    },

    trigger : function( pEventName, pModel, value ){
        // update id with latest
        if( pEventName === this.mIdEventName ){
            this.id = value;
        }

        Backbone.Events.trigger.apply( this, arguments );
        if( !_.isNull( this.mContainer ) ){
            this.mContainer.trigger.apply( this.mContainer, arguments );
        }
    },

    onModelEvent : function(){
        // Forward events
        arguments[ 1 ] = this;
        this.trigger.apply( this, arguments );
    },

    save : function( key, val, options ){
        let ret = this.mModel.save( key, val, options );

        // FIXME: Resync attributes, maybe delayed in event handle. However, since api user should not direct access attributes, it should not be a big problem. For Epoxy.View, it only use them in addSourceToBinding(), it will not affect by this potencial issue.
        this.attributes = this.mModel.attributes;
        return ret;
    },

    getModel : function(){
        return this.mModel;
    },
});

module.exports = ShadowModel;
