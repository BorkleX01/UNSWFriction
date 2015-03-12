/*global requirejs */
requirejs.config({
    'shim': {
        'jquery': {
            'exports': '$'
        },
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        'sinon': {
            'exports': 'sinon'
        }
    },
    'paths': {
        'text': '../../../bower_components/requirejs-text/text',
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'underscore': '../../../bower_components/underscore/underscore',
        'backbone': '../../../bower_components/backbone/backbone',

        'check': "../../../bower_components/check-js/check.min",
        'sinon': '../../../test/libs/sinon-1.7.3',

        'templates': "../templates",

        'sim-common': '../../../bower_components/common/app/scripts/sim-common',

        //Mocking paths for Simcapi
        'api/snapshot/Transporter': '../../../bower_components/simcapi/app/scripts/api/snapshot/Transporter',
        'api/snapshot/Controller': '../../../bower_components/simcapi/app/scripts/api/snapshot/Controller',
        'api/snapshot/SimCapiHandler': '../../../bower_components/simcapi/app/scripts/api/snapshot/SimCapiHandler',
        'api/snapshot/SimCapiMessage': '../../../bower_components/simcapi/app/scripts/api/snapshot/SimCapiMessage',
        'api/snapshot/SimCapiValue': '../../../bower_components/simcapi/app/scripts/api/snapshot/SimCapiValue',
        'api/snapshot/util/uuid': '../../../bower_components/simcapi/app/scripts/api/snapshot/util/uuid',

        'api/snapshot/adapters/BackboneAdapter': '../../../bower_components/simcapi/app/scripts/api/snapshot/adapters/BackboneAdapter',
        'api/snapshot/adapters/CapiAdapter': '../../../bower_components/simcapi/app/scripts/api/snapshot/adapters/CapiAdapter'

    }
});