# Atem MOM Glyphs Integration
Make the Metapolator Object Model available in the Glyphs font editor.


## The rough idea goes like this:

 * Glyphs can include "Websites" as a widget via Cocoa.
 * It is possible to interact with the JavaScript on these websites. I.e.
   Glyphs can call public APIs on on the website.
 * For the beginning, we want to be able to send a glyph in a JSON format
   as produced by serializing with MOM-Glyph.dumpTree and receive in return
   the outline of that Glyph.
 * We don't now yet the format to transport the outline. Returning a simple
   array-of-arrays pen protocol serialization will be the initial return value.
   Other formats are possible, maybe also drawing to a pen provided by Glyphs.
 * Later, we want to be able to do CPS transformations on the initial glyph
   and return the result of these transformation as an outline. This will
   require some more work on the side of the plugin to provide a usable API.

## Implementation Question

 * For the planned interaction no dependency to the DOM is required.
   *Can we have a direct JavaScript-Cocoa binding without a web browser in between?*
   This should greatly reduce the startup time, because browsers are heavy.
