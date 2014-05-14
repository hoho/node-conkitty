var should = require('should');
var nodeConkitty = require('../index.js');
require('mocha');


describe('node-conkitty:', function() {
    it('Compile templates', function(done) {
        should.not.exist(nodeConkitty.$C.tpl.template1);
        should.not.exist(nodeConkitty.$C.tpl.template2);
        should.not.exist(nodeConkitty.$C._tpl['ololo::piupiu']);
        nodeConkitty.compile(['./test/test1.ctpl', './test/test2.ctpl']);
        should.exist(nodeConkitty.$C.tpl.template1);
        should.exist(nodeConkitty.$C.tpl.template2);
        should.exist(nodeConkitty.$C._tpl['ololo::piupiu']);
        done();
    });

    it('Load compiled templates', function(done) {
        should.not.exist(nodeConkitty.$C.tpl.template3);
        nodeConkitty.loadCompiled('./test/test3.compiled');
        should.exist(nodeConkitty.$C.tpl.template3);
        done();
    });

    it('Apply template', function(done) {
        var ret;

        ret = nodeConkitty.applyTemplate('template1', 'beau', 'tiful');
        should.exist(ret);
        ret.should.equal('<div id="greeting">Hello <span>beautiful</span> world</div>');

        ret = nodeConkitty.applyTemplate('template1', 123, 345);
        should.exist(ret);
        ret.should.equal('<div id="greeting">Hello <span>468</span> world</div>');

        ret = nodeConkitty.applyTemplate('template2');
        should.exist(ret);
        ret.should.equal('<ul><li><em>yep</em>11</li><li><em>yep</em>22</li><li><em>yep</em>33</li></ul><strong>!</strong>');

        ret = nodeConkitty.applyTemplate('template3');
        should.exist(ret);
        ret.should.equal('<em><strong><span>piu</span></strong></em>');

        done();
    });

    it('Apply template, get DOM', function(done) {
        var ret = nodeConkitty.applyTemplateDOM('template1', 'beau', 'tiful');

        should.exist(ret);
        should.exist(ret.nodeType);
        ret.nodeType.should.equal(11);
        should.exist(ret.firstChild);
        should.exist(ret.firstChild.innerHTML);
        ret.firstChild.innerHTML.should.equal('Hello <span>beautiful</span> world');

        done();
    });
});
