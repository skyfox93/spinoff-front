import { rgbToHex, toggleButtonGroupClasses } from "@mui/material";

function initEditor(editorC, stackBlurImage,postPhoto,existingImg,enableLoader) {

  const BasicOverlays = {

    applyColorOverlay: (canvas, context, overlayColor, blendMode, opacity) => {
      context.globalCompositeOperation = blendMode;
      context.fillStyle = overlayColor
      context.globalAlpha =opacity ;
      context.fillRect(0, 0, canvas.width, canvas.height);
      // clean up
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;
    },

    applyCanvasOverlay: (canvas, context, overlayCanvas, blendMode, opacity) => {
      context.globalCompositeOperation = blendMode;
      context.globalAlpha =opacity ;
      context.drawImage(overlayCanvas,canvas.width, canvas.height)

      // clean up
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;
    }
}

  const getBlendEffectFromMaskName = (maskName) =>{
    const maskType = maskName
    return blendEffects[maskType]
  } 

  const blendEffects = {
    // blend effects are built from combining basicOverlays

    effectMask: (editingCanvas, editingContext, originalCanvas, maskCanvas) => { 
      // "Undo" the portions of the effect that the user cleared with the eraser

      // By using "destination-in", we only keep places where the mask and edited image overlap
      BasicOverlays.applyCanvasOverlay(editingCanvas, editingContext, maskCanvas, 'destination-in', 1)
      // By adding clipped image "atop" the original image, the original is restored where the edited version is absent
      BasicOverlays.applyCanvasOverlay(editingCanvas, editingContext, originalCanvas, 'destination-atop', 1)
    },
    
    colorOver: ({editingCanvas, editingContext, maskCanvas}, {opacity}, ) => {
      // apply the color of the blend canvas to the editing canvas
      BasicOverlays.applyCanvasOverlay(editingCanvas, editingContext, blendCanvas, 'color', opacity)
    },
  
    brightness: ({editingCanvas, editingContext}, {opacity, brightness} ) => {
      const brightnessColor = `rgb(${brightness}, ${brightness}, ${brightness})`
      BasicOverlays.applyColorOverlay(canvas, context, brighnessColor , 'overlay', opacity)
    },
  
    unsharp: ({editingCanvas, editingContext, blurCanvas, greyScaleCanvas}, {opacity}) => {
      // by overlaying an inverted blured image with the original, this produces something similar to a "unsharp" effect
      BasicOverlays.applyCanvasOverlay(editingCanvas, editingContext, blurCanvas, "overlay", opacity)
      BasicOverlays.applyCanvasOverlay(editingCanvas, editingContext, greyScaleCanvas, "overlay", opacity * 0.7)
        // this method uses a blured "negative", combines it with a position to produce an unsharp effect
    }
  }
}

const imageRefs = {
  originalImage: null,
  mainCanvas: null,
  mainContext: null,
  workingCanvas: null,
}

class EffectMask {

      constructor(originalCanvas, editingCanvas, editingContext, canvasContainerRef) {
          this.canvases = {
            editingCanvas: editingCanvas,
            editingContext: editingContext,
            maskCanvas: this.initializeMaskCanvas()
          }
          this.canvasContainerRef = canvasContainerRef
      }

      initializeMaskCanvas = () => {
        maskCanvas = document.createElement('canvas')
        maskCanvas.width = canvasContainerRef.current.offsetWidth
        maskCanvas.height = canvasContainerRef.current.offsetHeight
        maskCanvas.style.height = '100%'
        maskCanvas.style.height = '100%'
        this.canvasContainerRef.appendChild(canvas)
        return maskCanvas
      }

      applyEffect = (effectType, settings) => {
        const effect = blendEffects[effectType]
        if (effect) {
          effect(this.canvases, settings)
        }
      }

      drawToCanvas(coordinates, color, opacity){

      }
}

class UnsharpMask extends EffectMask {

      constructor(){
        super(originalCanvas,editingCanvas, editingContext, canvasContainerRef)
      }

      initializeBlurCanvas = () => {
         return null
      }
}
