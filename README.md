ios-image-modifier
==================

Utilidad para renombrar imágenes para retina display en iOS.

Basádo en las recomendaciones del sitio de Apple Developer [App Launch (Default) Images](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/App-RelatedResources/App-RelatedResources.html#//apple_ref/doc/uid/TP40007072-CH6-SW12)

## Example

    var iim = require('ios-image-modifier');

    var params = {};
    params.scale = "@2x";
    params.orientation = "-Landscape";
    params.device = '~ipad';

    iim.rename( '/Users/paulomcnally/Documents/bitbucket/iosProject/Resources/img', params );


## Params
    orientation:
        -PortraitUpsideDown
        -LandscapeLeft
        -LandscapeRight
        -Portrait
        -Landscape
    
    scale:
        @2x
    
    device:
        ~ipad
        ~iphone
