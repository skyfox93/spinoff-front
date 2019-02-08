function initEditor(editorC, stackBlurImage,postPhoto,existingImg) {
  var saveBtn = editorC.querySelector('#saveBtn');
  var sharp = editorC.querySelector('#sharpen');
  var erase = editorC.querySelector('#resize');
  var wrapEl = editorC.querySelector('#wrap');
  var el = editorC.querySelector('#c');
  var el2 = editorC.querySelector('#c2');
  var el3 = editorC.querySelector('#c3');
  var el4 = editorC.querySelector('#c4');
  var bottombar = editorC.querySelector('#bottombar');
  var ctx = el.getContext('2d');
  var ctx2 = el2.getContext('2d');
  var ctx3 = el3.getContext('2d');
  var ctx4 = el4.getContext('2d');
  var size;
  var color = editorC.querySelector('#color');

  var boost = editorC.querySelector('#boost');
  var boost2 = editorC.querySelector('#boost2');
  var image = editorC.querySelector('#image');

  var imageObj = new Image();
  imageObj.crossOrigin = "Anonymous";
  if (existingImg){imageObj.src = image.src;}

  var brsize = editorC.querySelector('#brsize');
  var brstrength = editorC.querySelector('#brstrength');


  function handleFileSelect(evt) {
    var file = evt.target.files[0];
    imageObj.src = window.URL.createObjectURL(file);
  }

  editorC.querySelector('#file').addEventListener('change', handleFileSelect, false);



  function performClick(node) {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, false);
    node.dispatchEvent(evt);
  }

  editorC.querySelector('#open').addEventListener('click', function(e) {
    performClick(editorC.querySelector('#file'));
    e.preventDefault();
  });


/////
  imageObj.onload = function() {

    // DEFINE ELEMENTS
    var blurCanvas = editorC.querySelector('#blurCanvas');
    // if theres an exiting Img, load it.
    var context = blurCanvas.getContext('2d');
    var ratio = imageObj.height / imageObj.width;
    blurCanvas.width = 500;
    blurCanvas.height = 500 * ratio;

    el.height = 500 * ratio;
    el2.height = 500 * ratio;
    el3.height = 500 * ratio;
    el4.height = 500 * ratio;
    wrapEl.style.width = blurCanvas.width + 100;
    wrapEl.style.height = blurCanvas.height + 200;
    var canvas3 = editorC.querySelector('#canvas3');

    var tempCanvas = editorC.querySelector('#tempCanvas');
    var context2 = tempCanvas.getContext('2d');
    var context3 = canvas3.getContext('2d');

    var imageData;
    image.style.display = "inline";
    canvas3.style.display = "block";
    el.style.display = "block";
    el2.style.display = "block";
    el3.style.display = "block";
    el4.style.display = "block";
    // IMAGE FILTERS

    var greyscale = function() {
      for (var i = 0; i < imageData.data.length; i += 4) {

        var brightness = Math.sqrt(imageData.data[i] * imageData.data[i] * 0.241 + 0.69 * imageData.data[i + 1] * imageData.data[i + 1] + 0.068 * imageData.data[i + 2] * imageData.data[i + 2]);
        imageData.data[i] = brightness;
        imageData.data[i + 1] = brightness
        imageData.data[i + 2] = brightness;
      }
    }



    var inprocess = 0;

    function adjust() {
      if (inprocess === 1) {
        return;
      }
      inprocess = 1;
      image.style.display = "none";
      // START WITH ALTERED IMAGE and COMBINE IT WITH ORIGINAL TO SHARPEN
      context3.globalCompositeOperation = "source-over";
      context3.drawImage(imageObj, 0, 0, canvas3.width, canvas3.height);
      context3.globalCompositeOperation = "overlay";
      context3.globalAlpha = 1;
      context3.drawImage(blurCanvas, 0, 0, canvas3.width, canvas3.height);
      context3.globalAlpha = 0.7;
      context3.drawImage(imageObj, 0, 0, canvas3.width, canvas3.height);
      context3.globalAlpha = 0.5;
      context3.drawImage(blurCanvas, 0, 0, canvas3.width, canvas3.height);
      context3.globalAlpha = 0.3;
      context3.drawImage(imageObj, 0, 0, canvas3.width, canvas3.height);

      context3.globalAlpha = 1;
      context3.globalCompositeOperation = "color";
      context3.drawImage(imageObj, 0, 0, canvas3.width, canvas3.height);
      context.globalCompositeOperation = "source-over";
      context3.globalAlpha = 1;
      // KEEP ONLY THE PLACES MARKED WITH THE MASK
      context3.globalCompositeOperation = 'destination-in';
      context3.drawImage(el, 0, 0, canvas3.width, canvas3.height);
      context3.globalCompositeOperation = 'destination-atop';
      context3.drawImage(imageObj, 0, 0, canvas3.width, canvas3.height);
      context3.globalCompositeOperation = "source-over";
      context3.globalCompositeOperation = 'source-over';
      if (boost.checked) {
        detailsBTN.style.backgroundColor = "red";
      } else {
        detailsBTN.style.backgroundColor = "lightgrey";
      }

      // COPY TO TEMP CANVAS BEFORE PROCEEDING
      context2.drawImage(canvas3, 0, 0, tempCanvas.width, tempCanvas.height);
      context3.globalAlpha = 1;
      if (sharp.checked) {
        SharpenBTN.style.backgroundColor = "green";
      } else {
        SharpenBTN.style.backgroundColor = "lightgrey";
      }
      // SCREEN THE IMAGE TO MATCH THE LIGHTEN FILTER
      context3.globalCompositeOperation = "overlay";
      context3.fillStyle = "white";
      context3.globalAlpha = 0.5;
      context3.fillRect(0, 0, canvas3.width, canvas3.height);


      context3.globalCompositeOperation = 'source-over';
      context3.globalAlpha = 1;
      // COPY TO TEMP CANVAS

      // KEEP ONLY CHANGES IN THE SAME PLACE AS THE MASK
      context3.globalCompositeOperation = 'destination-in';
      context3.drawImage(el2, 0, 0, canvas3.width, canvas3.height);
      context3.globalCompositeOperation = 'destination-atop';
      context3.drawImage(tempCanvas, 0, 0, canvas3.width, canvas3.height);
      //COLOR-BURN
      context3.globalAlpha = 0.8;
      context3.globalCompositeOperation = 'color';
      //context3.drawImage(el3, 0, 0, canvas3.width, canvas3.height);
      context3.globalCompositeOperation = 'color';
      context3.drawImage(el3, 0, 0, canvas3.width, canvas3.height);
      // REPLACE WITH ORIGNAL DEPENDING ON EFFECT STRENGTH SLIDER
      context3.globalAlpha = 1 - brstrength.value / 10;

      context3.globalCompositeOperation = "source-over";
      context3.drawImage(imageObj, 0, 0, canvas3.width, canvas3.height);
      context3.globalAlpha = 1;


      /*
      if (erase.checked) {canvas3.width=tempCanvas.width;canvas3.height=tempCanvas.height;context3.drawImage(tempCanvas,0,0);} else {
      canvas.width=tempCanvas.width/2;canvas.height=tempCanvas.height/2;
      context.drawImage(tempCanvas,0,0,canvas.width,canvas.height);
      canvas3.width=canvas.width/2;canvas3.height=canvas.height/2;
      context3.drawImage(canvas,0,0,canvas3.width,canvas3.height);

      }
      */
      setTimeout(function() {
        inprocess = 0;
      }, 50);



      canvas3.style.display = "block";

    }
    var inprocess1 = 0;

    function load() {
      image.style.display = "none;"
      context2.globalCompositeOperation = "source-over";
      // RESIZE IMAGE
      tempCanvas.width = imageObj.naturalWidth / 2;
      tempCanvas.height = imageObj.naturalHeight / 2;
      blurCanvas.width = imageObj.naturalWidth / 2;
      blurCanvas.height = imageObj.naturalHeight / 2;
      context2.drawImage(imageObj, 0, 0, tempCanvas.width, tempCanvas.height);
      context.drawImage(tempCanvas, 0, 0, blurCanvas.width, blurCanvas.height);
      // INITIALIZE CANVASES
      tempCanvas.width = blurCanvas.width;
      tempCanvas.height = blurCanvas.height;
      canvas3.height = blurCanvas.height;
      canvas3.width = blurCanvas.width;
      // PROCESS IMAGE
      imageData = context.getImageData(0, 0, blurCanvas.width, blurCanvas.height);
      greyscale();
      context.putImageData(imageData, 0, 0);
      stackBlurImage('blurCanvas', 15, editorC);
      // invert the blurred image
      context.globalCompositeOperation = "difference";
      context.fillStyle = "white";
      context.fillRect(0, 0, blurCanvas.width, blurCanvas.height);

      // initialize the drawing canvases
      ctx2.fillStyle = "green";
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, el.width, el.height)
      el.style.opacity = 0;
      el2.style.opacity = 0;
      el3.style.opacity = 0;
      ctx3.fillStyle = "black";
      adjust();
      setTimeout(function() {
        inprocess1 = 0;
      }, 300);
    }
    function removeListeners(){

    }
    var saveimage = function() {
      postPhoto(canvas3.toDataURL("image/jpeg", 1.0),removeListeners)
      image.style.display = "inline";
      canvas3.style.display = "none";
      el.style.display = "none";
      el2.style.display = "none";
      el3.style.display = "none";
      el4.style.display = "none";
    }
    saveBtn.addEventListener('click', saveimage);

    /// FUNCTIONS FOR DRAWING
    function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    function angleBetween(point1, point2) {
      return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }


    ctx.lineJoin = ctx.lineCap = 'round';
    var isDrawing, lastPoint;
    let size = 80;
    //USING GLOBAL VARIABLES isDrawing and lastPoint
    // CONTROL MASK DRAWING
    el.ontouchmove = function(e) {
      if (e.targetTouches.length == 1) {
        e.preventDefault();

        var currentPoint = {
          x: e.targetTouches[0].pageX - rect.left,
          y: e.targetTouches[0].pageY - rect.top
        };
        var dist = distanceBetween(lastPoint, currentPoint);
        var angle = angleBetween(lastPoint, currentPoint);

        if (dist > size / 10) {

           var x = lastPoint.x + (Math.sin(angle) * size / 4);
           var y = lastPoint.y + (Math.cos(angle) * size / 4);

          var radgrad2 = ctx2.createRadialGradient(x, y, 10, x, y, size / 2);
          radgrad2.addColorStop(0, 'rgba(255,255,255,1)');
          radgrad2.addColorStop(0.5, 'rgba(255,255,255,0.3)');
          radgrad2.addColorStop(1, 'rgba(0,255,0,0)');

          var radgrad = ctx.createRadialGradient(x, y, 10, x, y, size / 2);
          radgrad.addColorStop(0, 'rgba(255,0,0,1)');
          radgrad.addColorStop(0.5, 'rgba(255,0,0,0.3)');
          radgrad.addColorStop(1, 'rgba(255,0,0,0)');

          var radgrad3 = ctx3.createRadialGradient(x, y, 10, x, y, size / 2);
          radgrad3.addColorStop(0, 'rgba(0,0,0,1)');
          radgrad3.addColorStop(0.5, 'rgba(0,0,0,0)');
          radgrad3.addColorStop(1, 'rgba(255,0,0,0)');
          ctx.fillStyle = radgrad;
          ctx2.fillStyle = radgrad2;
          ctx3.fillStyle = radgrad3;
          if (erase.checked) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx2.globalCompositeOperation = 'destination-out';
            ctx3.globalCompositeOperation = 'destination-out';
          }
          ctx4.fillStyle = color.value;
          if (boost.checked) {
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
          }
          if (sharp.checked) {
            ctx2.fillRect(x - size / 2, y - size / 2, size, size);
          }
          if (boost2.checked) {
            ctx4.fillRect(x - size / 2, y - size / 2, size * 0.75, size * 0.75);
            ctx3.fillRect(x - size / 2, y - size / 2, size, size);
            ctx3.globalCompositeOperation = "source-in";
            ctx3.drawImage(el4, 0, 0, el3.width, el.height);
            ctx3.globalCompositeOperation = "source-over";
          }
          lastPoint = currentPoint;
        }

      };
    }

    function showMask(e) {

      if (boost2.checked) {
        el.style.opacity = 0;
        el2.style.opacity = 0;
        el3.style.opacity = 0.7;
      } else {
        if (sharp.checked) {
          el.style.opacity = 0
          el2.style.opacity = 0.7;
        }
        if (boost.checked) {
          el.style.opacity = 0.7
          el2.style.opacity = 0;
        }
      }
      size = brsize.value;
      isDrawing = true;
      lastPoint = {
        x: e.pageX - rect.left,
        y: e.pageY - rect.top
      }
    }
    const rect = el.getBoundingClientRect();
    el.onmousedown = showMask;
    el.ontouchstart = showMask;

    el.onmousemove = function(e) {
      if (!isDrawing) return;
      console.log(rect.top)
      var currentPoint = {
        x: e.pageX -rect.left,
        y: e.pageY -rect.top
      };
      var dist = distanceBetween(lastPoint, currentPoint);
      var angle = angleBetween(lastPoint, currentPoint);

      if (dist > size /10) {

        var x = lastPoint.x + (Math.sin(angle) * size /10);
      var y = lastPoint.y + (Math.cos(angle) * size / 10);

        var radgrad2 = ctx2.createRadialGradient(x, y, size/4, x, y, size / 2);
        radgrad2.addColorStop(0, 'rgba(0,255,0,1)');
        radgrad2.addColorStop(1, 'rgba(0,255,0,0)');

        var radgrad = ctx.createRadialGradient(x, y, size/4, x, y, size / 2);
        radgrad.addColorStop(0, 'rgba(255,0,0,1)');
        radgrad.addColorStop(1, 'rgba(255,0,0,0)');

        function convertHex(hex, opacity) {
          hex = hex.replace('#', '');
        let  r = parseInt(hex.substring(0, 2), 16);
        let  g = parseInt(hex.substring(2, 4), 16);
        let  b = parseInt(hex.substring(4, 6), 16);

          let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
          return result;
        }

        var radgrad3 = ctx3.createRadialGradient(x, y, size/16, x, y, size / 2);
        radgrad3.addColorStop(0, `${color.value}`);
        radgrad3.addColorStop(1, `${convertHex(color.value,0)}`);
        ctx.fillStyle = radgrad;
        ctx2.fillStyle = radgrad2;
        ctx3.fillStyle = radgrad3;
        if (erase.checked) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx2.globalCompositeOperation = 'destination-out';
          ctx3.globalCompositeOperation = 'destination-out';
        }
        //ctx4.fillStyle=color.value;
        if (boost.checked) {
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
        if (sharp.checked) {
          ctx2.fillRect(x - size / 2, y - size / 2, size, size);
        }
        if (boost2.checked) {
          ctx4.fillRect(x - size / 2, y - size / 2, size, size);
          ctx3.fillRect(x - size / 2, y - size / 2, size, size);
          //ctx3.globalCompositeOperation="source-in";
          //ctx3.drawImage(el4,0,0,el3.width,el.height);
          ctx3.globalCompositeOperation = "source-over";
        }
        lastPoint = currentPoint;
        adjust()
      }


    };

    document.onkeypress = function(event) {
      if (event.keyCode == 93) {
        brsize.value += 10
      };
      if (event.keyCode == 91) {
        brsize.value -= 10
      };
      if (size < 11) {
        size = 10;
      }
    }
    el.onmouseup = function() {
      el.style.opacity = 0;
      el2.style.opacity = 0;
      el3.style.opacity = 0;
      adjust();
      isDrawing = false;
      ctx.globalCompositeOperation = 'source-over';
      ctx2.globalCompositeOperation = 'source-over';
      ctx3.globalCompositeOperation = 'source-over';
    };

    el.ontouchend = function() {
      adjust();
      el.style.opacity = 0;
      el2.style.opacity = 0;
      el3.style.opacity = 0;
      isDrawing = false;
      ctx.globalCompositeOperation = 'source-over';
      ctx2.globalCompositeOperation = 'source-over';
      ctx3.globalCompositeOperation = 'source-over';
    };

    function fillMask() {
      if (sharp.checked) {
        ctx2.fillStyle = "green";
        ctx2.fillRect(0, 0, el2.width, el2.height);
      }
      if (boost.checked) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, el.width, el.height);
      }
      if (boost2.checked) {
        ctx3.fillStyle = color.value;
        ctx3.fillRect(0, 0, el.width, el.height);
        ctx4.fillStyle = color.value;
        ctx4.fillRect(0, 0, el.width, el.height);
      }
      adjust();
    }

    function clearMask() {
      if (sharp.checked) {
        ctx2.clearRect(0, 0, el2.width, el2.height);
      }
      if (boost.checked) {
        ctx.clearRect(0, 0, el.width, el.height);
      }
      if (boost2.checked) {
        ctx3.clearRect(0, 0, el.width, el.height);
      }
      adjust();
    }

    var SharpenBTN = editorC.querySelector('#sharpenonly');
    var detailsBTN = editorC.querySelector('#details');
    var eraseBTN = editorC.querySelector('#eraseBTN');
    var colorBurnBTN = editorC.querySelector('#colorBurn');


    detailsBTN.onclick = function() {
      boost.checked = true;
      boost2.checked = false;
      sharp.checked = false;
      detailsBTN.style.backgroundColor = "red";
      SharpenBTN.style.backgroundColor = "grey";
      colorBurnBTN.style.backgroundColor = "grey";
      adjust();
    }


    SharpenBTN.onclick = function() {
      sharp.checked = true;
      boost.checked = false;
      boost2.checked = false;
      SharpenBTN.style.backgroundColor = "green";
      detailsBTN.style.backgroundColor = "grey";
      colorBurnBTN.style.backgroundColor = "grey";
    }

    colorBurnBTN.onclick = function() {
      boost2.checked = true;
      boost.checked = false;
      colorBurnBTN.style.backgroundColor = "lightBlue";
      sharp.checked = false;
      erase.checked = false;
      SharpenBTN.style.backgroundColor = "lightgrey";
      detailsBTN.style.backgroundColor = "lightgrey";
    }

    editorC.querySelector('#fill').addEventListener('click', fillMask);
    editorC.querySelector('#clear').addEventListener('click', clearMask);
    var eraser = 0;

    eraseBTN.onclick = function() {
      if (eraser === 0) {
        erase.checked = true;
        eraseBTN.style.backgroundColor = 'yellow';
        eraser = 1;
      } else {
        eraseBTN.style.backgroundColor = 'grey';
        erase.checked = false;
        eraser = 0;
      }
    }
    brstrength.addEventListener('input', adjust)

    load();
    adjust();
  }
////////
  editorC.querySelector('#dismiss').addEventListener('click', function() {
    editorC.querySelector('#guide').classList.toggle("hide"); console.log('hide');
  });
  editorC.querySelector('#help').addEventListener('click', function() {
    editorC.querySelector('#guide').classList.toggle("hide");
  });
}
export default initEditor