'use strict';
var Cesium = require('cesium');
var addPipelineExtras = require('../../lib/addPipelineExtras');
var removePipelineExtras = require('../../lib/removePipelineExtras');

var WebGLConstants = Cesium.WebGLConstants;

describe('removePipelineExtras', function() {
    it('removes pipeline extras', function() {
        var gltf = {
            buffers: [
                {
                    byteLength: 100
                }
            ],
            extensions: {
                KHR_techniques_webgl: {
                    shaders: [
                        {
                            type: WebGLConstants.VERTEX_SHADER,
                            uri: 'data:,'
                        }
                    ]
                }
            },
            images: [
                {
                    extras: {
                        compressedImage3DTiles: {
                            s3tc: {
                                uri: 'data:,'
                            },
                            etc1: {
                                uri: 'data:,'
                            }
                        }
                    }
                }
            ]
        };
        var gltfWithExtrasRemoved = removePipelineExtras(addPipelineExtras(gltf));
        expect(gltfWithExtrasRemoved.buffers[0].extras).toBeUndefined();
        expect(gltfWithExtrasRemoved.extensions.KHR_techniques_webgl.shaders[0].extras).toBeUndefined();
        expect(gltfWithExtrasRemoved.images[0].extras._pipeline).toBeUndefined();
        expect(gltfWithExtrasRemoved.images[0].extras.compressedImage3DTiles.s3tc.extras).toBeUndefined();
        expect(gltfWithExtrasRemoved.images[0].extras.compressedImage3DTiles.etc1.extras).toBeUndefined();
        expect(gltfWithExtrasRemoved.extras).toBeUndefined();
    });
});
