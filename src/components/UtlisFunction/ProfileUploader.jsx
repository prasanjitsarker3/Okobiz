/* eslint-disable react/prop-types */
import { useState } from "react";
import { Upload } from "lucide-react";

const ProfileUploader = ({ register, errors }) => {
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
      <label className="block text-gray-700 mb-2">Profile Image</label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="profileImage"
          className="flex items-center justify-between w-full px-4 py-3 border-2 border-dashed border-[#28D08A] rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <Upload className="w-6 h-6 text-gray-500" />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="h-6 w-12 ml-2"
            />
          ) : (
            <span className="ml-2 text-gray-500">No image</span>
          )}
          <input
            id="profileImage"
            type="file"
            className="hidden"
            {...register("profileImage", {
              required: "Profile image is required",
              onChange: handleImageUpload,
            })}
          />
        </label>
      </div>
      {errors.profileImage && (
        <p className="text-red-500 mt-2">{errors.profileImage.message}</p>
      )}
    </div>
  );
};

export default ProfileUploader;
