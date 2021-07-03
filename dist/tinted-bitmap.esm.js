//----------------------------------------------------------------------------//
//        tinted-bitmap - creates a tinted copy of a given HTML image         //
//----------------------------------------------------------------------------//
import { throwError, expectInstanceOf, expectColor } from 'javascript-interface-library';
/**** tintedBitmapAsURL ****/
export function tintedBitmapAsURL(Bitmap, TintColor) {
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
export function tintedBitmap(Bitmap, TintColor) {
    var Result = document.createElement('img');
    Result.src = tintedBitmapAsURL(Bitmap, TintColor);
    return Result;
}
