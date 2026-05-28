import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useImageUpload } from "../hooks/useImageUpload";

import uploadSong from "/uploadSong.png";

type Props = {
  onImageSelect?: (file: File) => void;
};

export const ImageUpload = ({ onImageSelect }: Props) => {
  const { image, preview, onDrop } = useImageUpload();

  useEffect(() => {
    if (image && onImageSelect) {
      onImageSelect(image);
    }
  }, [image, onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <div
      {...getRootProps()}

      className={`w-[350px] h-[250px] p-4 border-2 border-dashed bg-white/5 text-white  ${preview ? "border-green-300/70 " : "border-white"} rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer`}
    >
      <input {...getInputProps()} />

      {preview ? (
        <>
          <img
            src={preview}
            alt="imagen subida"
            className="w-[200px] rounded-xl"
          />
        </>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <img className="w-16 h-16" src={uploadSong} alt="uploadSong" />
          <div className="flex flex-col items-center text-center gap-1">
            <span className="text-base">
              Seleccione o arrastre su imagen aqui
            </span>
            <span className="text-xs text-gray-500">png jpg jpeg</span>
          </div>
        </>
      )}
    </div>
  );
};
