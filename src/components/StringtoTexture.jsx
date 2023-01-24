import * as THREE from 'three'

export default function StringtoTexture(string, backgroundColor) {
    // Create a canvas element
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
  
    // Set the canvas size
    canvas.width = 1024;
    canvas.height = 1024;

    // Fill the background with the specified color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw the string on the canvas
    ctx.fillStyle = "#000000";
    ctx.font = "480px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(string, canvas.width / 2, canvas.height / 2);
  
    // Create an image object from the canvas
    let img = new Image();
    img.src = canvas.toDataURL();
  
    // Create a texture object from the image
    let texture = new THREE.Texture(img);
    texture.needsUpdate = true;
  
    return texture;
  }
  