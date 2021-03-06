'use strict';
var fsExtra = require('fs-extra');
var processGlb = require('../../lib/processGlb');

var glbPath = 'specs/data/2.0/box-textured-binary/box-textured-binary.glb';

describe('processGlb', function() {
    it('processGlb', function(done) {
        spyOn(console, 'log');
        var glb = fsExtra.readFileSync(glbPath);
        var options = {
            separate: true,
            stats: true
        };
        expect(processGlb(glb, options)
            .then(function(results) {
                expect(Buffer.isBuffer(results.glb)).toBe(true);
                expect(results.separateResources).toBeDefined();
                expect(console.log).toHaveBeenCalled();
            }), done).toResolve();
    });
});
