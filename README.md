# Atem MOM Glyphs Integration

Make the Metapolator Object Model available in the Glyphs font editor.


## The rough idea goes like this:

 * Glyphs can include "Websites" (using webkit) as a widget via Cocoa.
 * It is possible to interact with the JavaScript on these websites. I.e.
   Glyphs can call public APIs on on the website.
 * For the beginning, we want to be able to send a glyph in a JSON format
   as produced by serializing with MOM-Glyph.dumpTree and receive in return
   the outline of that Glyph.
 * We don't now yet the format to transport the outline. Returning a simple
   array-of-arrays pen protocol serialization will be the initial return value.
   Other formats are possible, maybe also drawing to a pen provided by Glyphs.
 * Later, we want to be able to do CPS transformations on the initial glyph
   and return the result of these transformations as an outline. This will
   require some more work on the side of the plugin to provide a usable API.

## Distribution/Releases

The distribiution of releases will happen via `gh-pages`.
The latest distribution is at [http://graphicore.github.io/Atem-MOM-Glyphs-Integration/dist/latest/](http://graphicore.github.io/Atem-MOM-Glyphs-Integration/dist/latest/)

To create a release for distribution run:


```
path/to/this/repository$ ./bin/build-static-deployment app/project.mp path/to/target-dir

```

Where `target-dir` will be created.

*Make sure to update all dependencies prior to a release.*

## Usage

After the page has loaded two new function have been added to the global namespace (that's to the `window` object):

* `void drawGlyph(json, pen)`
* `void drawGlyphToDocument(json)`

`drawGlyph` is intended as the initial minimal interface. It takes as argument
a `pen`, SegmentPen or PointPen. If a method `addPoint` is present it is considered
a PointPen, otherwise the SegmentPen interface will be used.

`drawGlyphToDocument` is intended as a quick and dirty way for testing and
debugging with json input and aquire feedback. If loaded in normal browser
window the following session in the developer console (press `F12` to open) should yield in the
drawing of a "b" in the browser window. This is not intended to be used
from within Glyphs.

```
> var glyphDataJson = '{"id":"b","properties":{"width":"558"},"attachment":{"name":"b","unicodes":[98]},"children":[["penstroke",{"id":"bowl","children":[["center",{"classes":["connection"],"properties":{"on":"Vector 291.5 2","in":"Vector 291.5 2","out":"Vector 355.5 2","inDir":"3.141592653589793"},"children":[{"properties":{"inDir":"2.378413055519063","outDirIntrinsic":"0","inTension":"1.0000100001000038","inLength":"10.609114216356602","outTension":"1.8796198700249982","outLength":"47"}},{"properties":{"onLength":"15.913830462839549","onDir":"-0.7631795980707292","inDir":"-0.7631795980707302","outDirIntrinsic":"0","inTension":"1.0000100001000038","inLength":"10.609114216356602","outTension":"1.5665566474264854","outLength":"81"}}]}],["center",{"classes":["vertical","right"],"properties":{"on":"Vector 452.5 230.5","in":"Vector 452.5 56.5","out":"Vector 452.5 386"},"children":[{"properties":{"inDirIntrinsic":"0","outDirIntrinsic":"0","inTension":"0.6851962421961029","inLength":"150","outTension":"0.698516804305661","outLength":"143"}},{"properties":{"onLength":"75.50165561098643","onDir":"-0.006622419742667827","inDirIntrinsic":"0","outDirIntrinsic":"0","inTension":"0.654172714739842","inLength":"198","outTension":"0.7682353819435923","outLength":"168"}}]}],["center",{"classes":["horizontal","top"],"properties":{"on":"Vector 308 461.5","in":"Vector 378 461.5","out":"Vector 270 461.5"},"children":[{"properties":{"inDirIntrinsic":"0","outDirIntrinsic":"0","inTension":"1.824332947584017","inLength":"47","outTension":"1.1274656698832546","outLength":"26"}},{"properties":{"onLength":"37.16517186829626","onDir":"0.5842712775809088","inDirIntrinsic":"0","outDirIntrinsic":"0","inTension":"1.2670905074094458","inLength":"93","outTension":"1.0213124565676048","outLength":"50"}}]}],["center",{"classes":["to-stem"],"properties":{"on":"Vector 210 409","in":"Vector 229.5 445","out":"Vector 210 409","outDir":"1.0743735733900148"},"children":[{"properties":{"inDirIntrinsic":"0.03277514440407581","outDir":"1.5707963267948966","inTension":"0.7811570515227101","inLength":"38.01315561749642","outTension":"1.0000100000999985","outLength":"9.999900000000025"}},{"properties":{"onLength":"15","onDir":"1.5707963267948966","inDirIntrinsic":"-0.028373018245225534","outDir":"-1.5707963267948966","inTension":"1.143557050893734","inLength":"43.9089968002003","outTension":"1.0000100000999985","outLength":"9.999900000000025"}}]}]]}],["contour",{"id":"C:terminal","children":[["p",{"classes":["bottom","inner"],"properties":{"on":"Vector 79 0","inDir":"-1.5707963267948966","inLength":"0","outDir":"1.5707963267948966","outLength":"41","in":"on"}}],["p",{"classes":["bridge"],"properties":{"on":"Vector 124 70","inDir":"0","inLength":"24","outDir":"0","outLength":"54"}}],["p",{"classes":["connection","lower"],"properties":{"on":"Vector 303 -9","inDir":"0","inLength":"94","outDir":"2.378413055519063","outLength":"10.609114216356602"}}],["p",{"classes":["connection","upper"],"properties":{"on":"Vector 280 13","inDir":"2.378413055519063","inLength":"10.609114216356602","outDir":"3.141592653589793","outLength":"47"}}],["p",{"classes":["top","right"],"properties":{"on":"Vector 210 156","inDir":"1.5707963267948966","inLength":"104","outDir":"3.141592653589793","outLength":"49.99950000000001"}}],["p",{"classes":["top","left"],"properties":{"on":"Vector 60 156","inDir":"3.141592653589793","inLength":"49.99950000000001","outDir":"-1.5707963267948966","outLength":"51.999480000000005"}}],["p",{"classes":["bottom","outer"],"properties":{"on":"Vector 60 0","inDir":"-1.5707963267948966","inLength":"51.999480000000005","outDir":"0","outLength":"6.333269999999999"}}],["p",{"classes":["bottom","inner"],"properties":{"on":"Vector 79 0","inDir":"0","inLength":"6.333269999999999","outDir":"3.141592653589793","outLength":"0","out":"on"}}]]}],["penstroke",{"id":"topSerif","children":[["center",{"classes":["right","top","no-serif"],"properties":{"on":"Vector 210 660","in":"Vector 210 660","out":"Vector 143.334 660","inDir":"0"},"children":[{"properties":{"inDir":"-1.5707963267948966","outDirIntrinsic":"0","inTension":"1.0000100000999927","inLength":"6.666600000000017","outTension":"1.000010000100001","outLength":"66.666"}},{"properties":{"onLength":"10","onDir":"1.5707963267948966","inDir":"1.5707963267948966","outDirIntrinsic":"0","inTension":"1.0000100000999927","inLength":"6.666600000000017","outTension":"1.000010000100001","outLength":"66.666"}}]}],["center",{"classes":["left","top","serif"],"properties":{"on":"Vector 10 660","in":"Vector 76.666 660","out":"Vector 10 660","outDir":"0"},"children":[{"properties":{"inDirIntrinsic":"0","outDir":"1.5707963267948966","inTension":"1.000010000100001","inLength":"66.666","outTension":"1.0000100000999927","outLength":"6.666600000000017"}},{"properties":{"onLength":"10","onDir":"1.5707963267948966","inDirIntrinsic":"0","outDir":"-1.5707963267948966","inTension":"1.000010000100001","inLength":"66.666","outTension":"1.0000100000999927","outLength":"6.666600000000017"}}]}]]}],["penstroke",{"id":"stem","children":[["center",{"classes":["bottom"],"properties":{"on":"Vector 135 156","in":"Vector 135 156","out":"Vector 135 323.99832000000004","inDir":"-1.5707963267948966"},"children":[{"properties":{"inDir":"3.141592653589793","outDirIntrinsic":"0","inTension":"1.0000100001000007","inLength":"49.99950000000001","outTension":"1.0000100001000007","outLength":"167.99832000000004"}},{"properties":{"onLength":"75","onDir":"0","inDir":"0","outDirIntrinsic":"0","inTension":"1.0000100001000007","inLength":"49.99950000000001","outTension":"1.0000100001000007","outLength":"167.99832000000004"}}]}],["center",{"classes":["top","left-left","right-right"],"properties":{"on":"Vector 135 660","in":"Vector 135 492.00167999999996","out":"Vector 135 660","outDir":"-1.5707963267948966"},"children":[{"properties":{"inDirIntrinsic":"0","outDir":"0","inTension":"1.0000100001000007","inLength":"167.99832000000004","outTension":"1.0000100001000007","outLength":"49.99950000000001"}},{"properties":{"onLength":"75","onDir":"0","inDirIntrinsic":"0","outDir":"3.141592653589793","inTension":"1.0000100001000007","inLength":"167.99832000000004","outTension":"1.0000100001000007","outLength":"49.99950000000001"}}]}]]}]]}'
> drawGlyphToDocument(glyphDataJson)
```

`drawGlyphToDocument` internally calls `drawGlyph` with the `json` argument.
