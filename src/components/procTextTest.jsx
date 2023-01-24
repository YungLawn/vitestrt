import * as THREE from 'three'

export default function StringtoTexture(string) {
    // Create a canvas element
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
  
    // Set the canvas size
    canvas.width = 256;
    canvas.height = 256;
  
    // Draw the string on the canvas
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
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
  