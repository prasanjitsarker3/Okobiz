/* eslint-disable react/prop-types */
import { useState } from "react";
import { Upload } from "lucide-react";
const SignatureUploader = ({ register, errors }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="">
      <label className="block text-gray-700 mb-2">Signature Image</label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="signatureImage"
          className="flex items-center justify-between w-full px-4 py-3 border-2 border-dashed border-[#28D08A] rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <Upload className="w-6 h-6 text-gray-500" />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Signature Preview"
              className="h-6 w-12 ml-2"
            />
          ) : (
            <span className="ml-2 text-gray-500">No image</span>
          )}
          <input
            id="signatureImage"
            type="file"
            className="hidden"
            {...register("signatureImage", {
              required: "Signature image is required",
              onChange: handleImageUpload,
            })}
          />
        </label>
      </div>
      {errors.signatureImage && (
        <p className="text-red-500 mt-2">{errors.signatureImage.message}</p>
      )}
    </div>
  );
};

export default SignatureUploader;
