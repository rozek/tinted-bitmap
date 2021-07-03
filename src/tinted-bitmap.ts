//----------------------------------------------------------------------------//
//        tinted-bitmap - creates a tinted copy of a given HTML image         //
//----------------------------------------------------------------------------//

  import {
    throwError,
    expectInstanceOf,expectColor
  } from 'javascript-interface-library'

  function tintedBitmap (
    Bitmap:HTMLImageElement, TintColor:string
  ):HTMLImageElement {
    expectInstanceOf('bitmap',Bitmap, HTMLImageElement,'HTML image element')
    expectColor ('tint color',TintColor)

    if (! Bitmap.complete) throwError(
      'InvalidArgument: the given bitmap has not yet been completely loaded'
    )

    let Canvas = document.createElement('canvas')
      Canvas.width  = Bitmap.width
      Canvas.height = Bitmap.height
    let Context = Canvas.getContext('2d') as CanvasRenderingContext2D
      Context.drawImage(Bitmap,0,0)

      Context.globalCompositeOperation = 'destination-atop'

      Context.fillStyle = TintColor
      Context.fillRect(0,0, Bitmap.width,Bitmap.height)
    let Result = document.createElement('img')
      Result.src = Canvas.toDataURL('image/png')
    return Result
  }

  export default tintedBitmap

