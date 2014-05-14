/*!
 * node-conkitty, https://github.com/hoho/node-conkitty
 * (c) 2014 Marat Abdullin, MIT license
 */

'use strict';
var path = require('path');
var Conkitty = require('conkitty');
var concatjs = require(path.join(__dirname, 'node-concat.js')),
    $C = concatjs.$C,
    window = concatjs.window,
    document = window.document;


function loadJSForConcatJS(filename, code) {
    var has$C = '$C' in global,
        old$C = global.$C,
        hasWindow = 'window' in global,
        oldWindow = global.window;

    global.$C = $C;
    global.window = window;

    if (filename) {
        require(filename);
    } else {
        eval(code);
    }

    if (has$C) { global.$C = old$C; } else { delete global.$C; }
    if (hasWindow) { global.window = oldWindow; } else { delete global.window; }
}


function checkFilename(filename, stringOnly) {
    if (typeof filename === 'string') {
        return;
    }

    if (!stringOnly && (filename instanceof Array)) {
        return;
    }

    throw new Error('Wrong `filename` type (string' + (stringOnly ? '' : ' or array') + ' expected).');
}


loadJSForConcatJS(path.join(path.dirname(require.resolve('conkitty')), '_env.js'));


module.exports = {
    $C: $C,

    window: window,

    compile: function(filename) {
        checkFilename(filename);

        var conkitty = new Conkitty();

        if (filename instanceof Array) {
            for (var i = 0; i < filename.length; i++) {
                checkFilename(filename[i], true);
                conkitty.push(filename[i]);
            }
        } else {
            conkitty.push(filename);
        }

        conkitty.generate();

        var code = conkitty.getTemplatesCode();

        if (code) {
            loadJSForConcatJS(undefined, code);
        }
    },

    loadCompiled: function(filename) {
        checkFilename(filename);

        if (filename instanceof Array) {
            for (var i = 0; i < filename.length; i++) {
                checkFilename(filename[i], true);
                loadJSForConcatJS(filename[i]);
            }
        } else {
            loadJSForConcatJS(filename);
        }
    },

    applyTemplate: function(name) {
        var ret = document.createElement('div');
        $C.tpl[name].apply(ret, Array.prototype.slice.call(arguments, 1));
        return ret.innerHTML;
    },

    applyTemplateDOM: function(name) {
        return $C.tpl[name].apply(null, Array.prototype.slice.call(arguments, 1));
    }
};
