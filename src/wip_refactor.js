
function initEditor(editorC, stackBlurImage,postPhoto,existingImg,enableLoader) {


  const blendEffects = {

    mask: ({editingCanvas, editingContext, originalCanvas, blendCanvas}) => { 
      // KEEP ONLY THE PLACES MARKED WITH THE MASK
      editingContext.globalCompositeOperation = 'destination-in';
      editingContext.drawImage(blendCanvas, 0, 0, editingCanvas.width, editingCanvas.height);
      editingContext.globalCompositeOperation = 'destination-atop';
      editingContext.drawImage(originalCanvas, 0, 0, editingCanvas.width, editingCanvas.height);
      //  clean up 
      editingContext.globalCompositeOperation ='source-over'
    },
    
    tint: ({editingCanvas,editingContext, blendCanvas, opacity}) => {
      // apply a tint to the canvas        
      editingContext.globalAlpha = opacity
      editingContext.globalCompositeOperation ='color';
      editingContext.drawImage(blendCanvas, 0, 0, editingCanvas.width, editingCanvas.height);
      
      //cleanUp
      editingContext.globalCompositeOperation ='source-over';
      editingContext.globalAlpha =1 
    },
  
    brightness: ({editingCanvas, editingContext, blendColor, opacity}) => {
      editingContext.globalCompositeOperation = "overlay";
      editingContext.fillStyle = blendColor
      editingContext.globalAlpha =opacity ;
      editingContext.fillRect(0, 0, editingCanvas.width, editingCanvas.height);
  
      // clean up
      editingContext.globalCompositeOperation = 'source-over';
      editingContext.globalAlpha = 1;
    },
  
    unsharp: ({editingCanvas, originalCanvas, editingContext, blendCanvas, greyScaleCanvas, opacity}) => {
        // this method uses a blured "negative", combines it with a position to produce an unsharp effect
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(sourceImage, 0, 0, destinationCanvas.width, destinationCanvas.height);
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 1;
        ctx.drawImage(blurCanvas, 0, 0, destinationCanvas.width, destinationCanvas.height);
  
        // we've now selectively lost global contrast, lets restore it
        ctx.globalAlpha = 0.7;
        ctx.drawImage(greyScaleCanvas, 0, 0, destinationCanvas.width, destinationCanvas.height);
  
        // revert based on effect strength
        ctx.globalAlpha = 1 - opacity
        ctx.globalCompositeOperation = 'source-over' 
        ctx.drawImage(sourceImage, destinationCanvas.width, destinationCanvas.height)
        //clean up
        ctx.globalAlpha = 1
    }
  }
}
class EffectMask {
    // an effectMask bound to the editing canvas instance

    constructor(type, editingCanvas, editingContext){
        this.editingCanvas = editingCanvas
        this.editingContext =editingContext
        this.originalCanvas =originalCanvas,
        this.originalContext = originalContext
        this.maskCanvas = inializeMask(type)
        this.maskContext = maskContext[type]
   
    }

    additionalInit() {
      return 
      // child classes will implement this
    }

    initializeMask = (container) => {
      let mask = document.createElement('canvas')
      const ratio = originalCanvas.height / originalCanvas.width;
      mask.width = 750
      mask.height = 750 * ratio
      mask.className = 'blending-mask'
      this.additionalInit()
    }    

    applyEffects () {
      applyUnsharp({
        sourceImage: this.originalCanvas,
        destinationCanvas: this.tempCanvas,
        ctx: this.tempCanvas.getContext('2d'),
        blurCanvas: this.blurCanvas,
        greyScaleCanvas: this.greyScaleCanvas,
        strength: this.state.unsharpStrength
      });
      // apply the mask to restore the parts we don't want to change
      applyMask(editingCanvas, mainCanvas, editingContext, unsharpMask);


      // maintain an "original" for the next round
      mainContext.drawImage(editingCanvas, 0,0, mainCanvas.width, mainCanvas.height);
      applyBrightness(alertedCanvas, editingContext, this.state.brightness.effectStrength, opacity);
      applyMask(editingCanvas, mainCanvas, editingContext, brightnessMask);
      // maintain an "original" for the next round
      mainContext.drawImage(editingCanvas, 0,0, mainCanvas.width, mainCanvas.height);
      applyTint(editingCanvas, tintCanvas, editingContext, this.state.tintEffectStrength);
      applyMask(editingCanvas, mainCanvas, editingContext, tintMask);
      // maintain an "original" for the next round
      mainContext.drawImage(editingCanvas, 0,0, mainCanvas.width, mainCanvas.height);
    }
}

