import * as THREE from 'three'

export default function StringtoTexture(element, backgroundColor, mass, num) {
    // Create a canvas element
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
  
    // Set the canvas size
    canvas.width = 1024;
    canvas.height = 1024;

    let widthCenter = canvas.width / 2
    let heightCenter = canvas.height / 2

    // Fill the background with the specified color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw the string on the canvas
    ctx.fillStyle = "#000000";
    ctx.letterSpacing = "5px"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 550px Helvetica";
    ctx.fillText(element, widthCenter + widthCenter/4, heightCenter + heightCenter/10);
    ctx.font = "bold 300px Helvetica";
    ctx.fillText(num, widthCenter - widthCenter/1.75, heightCenter + heightCenter/1.5);
    ctx.font = "bold 300px Helvetica";
    ctx.fillText(mass, widthCenter, heightCenter - heightCenter/1.5);
  
    // Create an image object from the canvas
    let img = new Image();
    img.src = canvas.toDataURL();
  
    // Create a texture object from the image
    let texture = new THREE.Texture(img);
    texture.needsUpdate = true;
  
    return texture;
  }
  