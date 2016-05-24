define([
    'Atem-MOM/project/Project'
  , 'Atem-IO/io/staticBrowserREST'
  , 'Atem-IO/io/InMemory'

  , 'Atem-MOM/rendering/basics'
  , 'Atem-MOM-Toolkit/dataTransformationCaches/DrawPointsProvider'

  , 'Atem-Pen-Case/pens/PointToSegmentPen'
  , 'Atem-Pen-Case/pens/SVGPen'
  , 'Atem-Pen-Case/pens/RecordingPointPen'
  , 'Atem-Pen-Case/pens/BoundsPen'
  , 'Atem-MOM/MOM/Glyph'
],
function (
    Project
  , ioREST
  , InMemory

  , renderingBasics
  , DrawPointsProvider

  , PointToSegmentPen
  , SVGPen
  , RecordingPointPen
  , BoundsPen
  , Glyph
) {
    "use strict";
    function main(exports) {

        var projectDir = 'project'
          , drawPointsOutlineProvider = new DrawPointsProvider(renderingBasics.outlinesRenderer)
          , io = new InMemory()
          // InMemory is its own event emitter
          //, fsEvents = io
          // BUT, we don't use fsEvents currently (see also MOM/project/Project)
          , cpsLibIoMounts = [
                // add more of these configuration objects to include more
                // libraries each object yields in a call to MountingIO.mount
                // the keys correlate with the argument names of MountingIO
                // however, Project does some augmentation.
                {
                    io: ioREST
                  , mountPoint: 'lib/MOM'
                  , pathOffset: 'lib/bower_components/Atem-MOM/lib/cpsLib'
                }
              , {
                    io: ioREST
                  , mountPoint: 'lib/metapolator'
                  , pathOffset: 'lib/bower_components/metapolator-cpsLib/lib'
                }
            ]
          , project = new Project(io, projectDir, undefined, cpsLibIoMounts)
          ;

        // We load a boilerplate project that can be used to bring
        // cutom CPS and also other presets into the environment.
        io.mkDir(false, 'project');
        // Doing this all sync for this case, because its ease. We may
        // change that when we know more about the interaction with our
        // environment.
        ioREST.copyRecursive(false, 'project', io, projectDir);
        project.load(false);
        project.openSession(false);

        // TODO: the API should eventually be defined in its own module.
        /**
         * This is basically the identity function, no outline transformation
         * will happen.
         */
        function drawGlyph(json, pen) {
            var data = JSON.parse(json)
              , pointPen = pen.addPoint && typeof pen.addPoint === 'function'
                                ? pen
                                : new PointToSegmentPen(pen)
              , glyph = new Glyph()
              , outlineProvider
              , univers = project.controller.rootNode.getChild(0)
              , master = univers.getById('base-default')
              ;

            glyph.loadTree(data);
            master.add(glyph);

            // could use callback to get notified when the outline changed
            outlineProvider = drawPointsOutlineProvider.get(glyph);//  , callback, firstArgOfCallback);
            outlineProvider.value.drawPoints(pointPen);
            // cleanup again
            // NOTE: we could also keep the state across several requests
            // it would involve more book keeping by Glyphs though. But then
            // Glyphs could for example have its own sliders etc. directly
            // linked to an existing state.

            outlineProvider.destroy();
            master.remove(glyph);
        }

        /**
         * This is meant for debugging/adhoc testing. In a browser console
         * this can be called and an SVG will be appended to the body.
         * It has no direct use for Glyphs!
         */
        function drawGlyphToDocument(json) {
            /* global document:true */
            var svgns = 'http://www.w3.org/2000/svg'
              , path = document.createElementNS(svgns, 'path')
              , pen = new RecordingPointPen()
              , svgPen = new SVGPen(path, {})
              , boundsPen = new BoundsPen({})
              , svg, bounds
              ;
            drawGlyph(json, pen);
            pen.drawPoints(new PointToSegmentPen(svgPen));
            pen.drawPoints(new PointToSegmentPen(boundsPen));
            bounds = boundsPen.getBounds();
            // >>>  [9.999999999999998, -9, 528, 670]
            svg = document.createElementNS(svgns, 'svg');
            svg.setAttribute('viewBox', [0, 0, bounds[2], bounds[3]].join(' '))
            svg.style.overflow = 'visible';
            svg.style.width = '50%';
            svg.style.margin = '5%';
            path.setAttribute('transform', 'scale(1, -1) translate(0, '+(-bounds[3])+')');
            svg.appendChild(path);
            document.body.appendChild(svg);
        }

        // export
        exports.drawGlyph = drawGlyph;
        exports.drawGlyphToDocument = drawGlyphToDocument;

        return true;
    }
    return main;
});
