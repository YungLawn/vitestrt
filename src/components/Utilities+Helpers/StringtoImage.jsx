export default function StringtoImage(element, backgroundColor, mass, num) {
    // Create a canvas element
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    const scale = 1;

    // Set the canvas size
    canvas.width = 1024 * scale;
    canvas.height = 1024 * scale;

    const elementTextSize = (550 * scale).toString()
    const elementMassNumSize = (300 * scale).toString()

    const widthCenter = canvas.width / 2
    const heightCenter = canvas.height / 2

    const font = ' Monospace'

    // Fill the background with the specified color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // init
    ctx.fillStyle = "#fff";
    ctx.height = 2
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    //draw text
    ctx.font = 'bold ' + elementTextSize + 'px' + font;
    ctx.fillText(element, widthCenter + widthCenter/6, heightCenter + heightCenter/10);
    ctx.font = 'bold ' + elementMassNumSize + 'px' + font;
    ctx.fillText(num, widthCenter - widthCenter/2, heightCenter + heightCenter/1.5);
    ctx.font = 'bold ' + elementMassNumSize + 'px' + font;
    ctx.fillText(mass, widthCenter, heightCenter - heightCenter/1.5);

    // Create an image object from the canvas
    let texture = new Image();
    texture.src = canvas.toDataURL();

    console.log('StingtoImage Ran')

    return texture.src;

  }
