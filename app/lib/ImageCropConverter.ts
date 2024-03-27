import { Area } from "react-easy-crop";

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = degreesToRadians(rotation);

  return {
    boxWidth:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    boxHeight:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export function getCroppedImage(
  src: string,
  area: Area,
  rotation: number,
  desiredWidth: number,
  desiredHeight: number
): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        // set the size for canvas

        const { boxWidth, boxHeight } = rotateSize(
          image.width,
          image.height,
          rotation
        );

        const rotRad = degreesToRadians(rotation);
        canvas.width = boxWidth;
        canvas.height = boxHeight;

        ctx.translate(boxWidth / 2, boxHeight / 2);
        ctx.rotate(rotRad);
        ctx.translate(-image.width / 2, -image.height / 2);

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(image, 0, 0);

        const croppedCanvas = document.createElement("canvas");
        const croppedCtx = croppedCanvas.getContext("2d");

        if (!croppedCtx) return;

        const { x, y, width, height } = area!;

        croppedCanvas.width = desiredWidth;
        croppedCanvas.height = desiredHeight;
        croppedCtx.drawImage(
          canvas,
          x,
          y,
          width,
          height,
          0,
          0,
          desiredWidth,
          desiredHeight
        );

        croppedCanvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob from canvas"));
          }
        }, "image/png");
      };
      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      image.src = src;
    } catch (error) {
      reject(error);
    }
  });
}
