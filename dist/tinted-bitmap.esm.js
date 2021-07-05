import { expectInstanceOf, expectColor, throwError } from 'javascript-interface-library';

//----------------------------------------------------------------------------//
/**** tintedBitmapAsURL ****/
function tintedBitmapAsURL(Bitmap, TintColor) {
    expectInstanceOf('bitmap', Bitmap, HTMLImageElement, 'HTML image element');
    expectColor('tint color', TintColor);
    if (!Bitmap.complete)
        throwError('InvalidArgument: the given bitmap has not yet been completely loaded');
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

export { tintedBitmap, tintedBitmapAsURL };
//# sourceMappingURL=tinted-bitmap.esm.js.map
