import { FC, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { loadImage } from "../../lib/ImageLoader";
import LoadingBar from "../LoadingBar";

interface Props {
  source: string;
  width: number;
  height: number;
  zoom: number;
  rotation: number;
  position: { x: number; y: number };
  setArea: React.Dispatch<React.SetStateAction<Area | null>>;
  onZoomChange(zoomValue: number): void;
  onRotationChange(rotationValue: number): void;
  onCropComplete(image: Blob): void;
  onCropChange(position: { x: number; y: number }): void;
  // onCropComplete(croppedArea: Area, croppedAreaPixels: Area): void;
}

const ImageCropper: FC<Props> = ({
  source,
  height,
  width,
  zoom,
  rotation,
  position,
  setArea,
  onCropComplete,
  onZoomChange,
  onCropChange,
  onRotationChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const desiredWidth = width;
  const desiredHeight = height;

  const handleCrop = (_: Area, croppedAreaPixels: Area) => {
    setArea(croppedAreaPixels);
    // ... existing code ...
  };

  const calculateSize = async () => {
    setLoading(true);
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const { width, height, orientation } = await loadImage(
      source,
      containerRect.width * (9 / 16),
      containerRect.height * (9 / 16)
    );

    const isPortrait = orientation === "portrait";

    setSize({ width, height: isPortrait ? width : height });
    setLoading(false);
  };

  useEffect(() => {
    // this calculation will decide the size of our canvas so that we can have the non destructive UI
    calculateSize();
  }, [source, containerRef]);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      ref={containerRef}
    >
      {loading ? (
        <LoadingBar />
      ) : (
        <div
          // className="relative mx-auto"
          style={{ width: size.width, height: size.height }}
        >
          <Cropper
            image={source}
            crop={position}
            zoom={zoom}
            aspect={1}
            showGrid={true}
            rotation={rotation}
            onZoomChange={onZoomChange}
            onCropChange={onCropChange}
            onRotationChange={onRotationChange}
            onCropComplete={handleCrop}
            // restrictPosition={false}
            // cropSize={{ width: 500, height: 500 }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
