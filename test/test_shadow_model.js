/* jshint expr:true, plusplus:false*/
/* global describe, it */
"use strict";

const { Debug, Logger } = require( "js-utils" );
const expect = require( "chai" ).expect;
const { ShadowModel } = require( "../backbone.shadow" );
const Backbone = require( "backbone" );
const Sinon = require( "sinon" );
const _ = require( "underscore" );

describe( "ShadowModel", function(){
    it( "must initialize with a model argument", function(){
        expect( function(){ return new ShadowModel( new Backbone.Model() ); }).not.to.throw( Debug.AssertError );
    });

    it( "assert failed without a model argument", function(){
        Logger.toggleSlient();

        expect( function(){ return new ShadowModel(); }).to.throw( Debug.AssertError );
        Logger.toggleSlient();
    });

    var testForward = function( pMethodName, args, ret, notTestArgs ){
        var fakeModel = new Backbone.Model();
        fakeModel[ pMethodName ] = Sinon.stub().returns( ret );

        if( !_.isArray( args ) ){
            args = [args];
        }

        var shadowModel = new ShadowModel( fakeModel );
        expect( shadowModel[ pMethodName ].apply( shadowModel, args ) ).to.eql( ret );
        expect( fakeModel[ pMethodName ].calledOnce ).to.be.true;
        expect( fakeModel[ pMethodName ].calledOn( fakeModel ) ).to.be.true;
        if( !notTestArgs ){
            expect( fakeModel[ pMethodName ].args[ 0 ] ).to.be.eql( args );
        }
    };

    var forwardMethodNames = ["get", "set", "has", "toJSON", "previous", "previousAttributes", "hasChanged",
        "escape", "matches", "unset", "changedAttributes", "destroy", "isNew",
        "isValid", "keys", "values", "pairs", "invert", "pick", "omit", "chain", "isEmpty"];

    var generateArgsArray = function(){
        var ret = [];
        for( var i = 0; i < 10; ++i ){
            ret.push( Math.random() );
        }
        return ret;
    };

    var generateRet = function(){
        return Math.random();
    };

    var generateForwardTestCase = function(){
        return _.reduce( forwardMethodNames, function( memo, methodName ){
            memo.push( [methodName, generateArgsArray(), generateRet(), true] );
            return memo;
        }, [] );
    };

    it( "forwards set/get/save etc to underly model", function(){
        _.each( [
                ["set", ["parent_id", 2, undefined], 1],
                ["get", 10, "okya"],
                ["save", ["parent_id", 1, undefined], null],
        ], function( listOfCall ){
            // eslint-disable-next-line no-invalid-this
            testForward.apply( this, listOfCall );
        });

        _.each( generateForwardTestCase(), function( listOfCall ){
            // eslint-disable-next-line no-invalid-this
            testForward.apply( this, listOfCall );
        });
    });
});
