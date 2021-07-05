(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('javascript-interface-library')) :
    typeof define === 'function' && define.amd ? define(['exports', 'javascript-interface-library'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
        var current = global.tintedBitmap;
        var exports = global.tintedBitmap = {};
        factory(exports, global.JIL);
        exports.noConflict = function () { global.tintedBitmap = current; return exports; };
    }()));
}(this, (function (exports, javascriptInterfaceLibrary) { 'use strict';

    //----------------------------------------------------------------------------//
    /**** tintedBitmapAsURL ****/
    function tintedBitmapAsURL(Bitmap, TintColor) {
        javascriptInterfaceLibrary.expectInstanceOf('bitmap', Bitmap, HTMLImageElement, 'HTML image element');
        javascriptInterfaceLibrary.expectColor('tint color', TintColor);
        if (!Bitmap.complete)
            javascriptInterfaceLibrary.throwError('InvalidArgument: the given bitmap has not yet been completely loaded');
        var Canvas = document.createElement('canvas');
        Canvas.width = Bitmap.width;
        Canvas.height = Bitmap.height;
        var Context = Canvas.getContext('2d');
        Context.drawImage(Bitmap, 0, 0);
        Context.globalCompositeOperation = 'source-in';
        Context.fillStyle = TintColor;
        Context.fillRect(0, 0, Bitmap.width, Bitmap.height);
        return Canvas.toDataURL('image/png');
    }
    /**** tintedBitmap ****/
    function tintedBitmap(Bitmap, TintColor) {
        var Result = document.createElement('img');
        Result.src = tintedBitmapAsURL(Bitmap, TintColor);
        return Result;
    }

    exports.tintedBitmap = tintedBitmap;
    exports.tintedBitmapAsURL = tintedBitmapAsURL;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tinted-bitmap.js.map
