// Wrapper to use concat.js in node.JS.

var hasWindow = 'window' in global,
    oldWindow = global.window;

var jsdom = require('jsdom');

global.window = jsdom.jsdom({
    html: '<!doctype html>',
    features: {
        FetchExternalResources: false,
        ProcessExternalResources: false
    }
}).parentWindow;

require(require.resolve('concat.js'));

module.exports = {
    $C: global.window.$C,
    window: global.window
};


if (hasWindow) {
    global.window = oldWindow;
} else {
    delete global.window;
}
