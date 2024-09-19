import { useForm } from "react-hook-form";
import SignatureUploader from "../UtlisFunction/SignatureUploader";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import ProfileUploader from "../UtlisFunction/ProfileUploader";
import { imgUrlCreate } from "../UtlisFunction/imageSendImgDB";
import { postCardData } from "../UtlisFunction/generateCard";
import { useState } from "react";
import CardDownload from "./CardDownload";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const profileImage = await imgUrlCreate(data.profileImage[0]);
      const signatureImage = await imgUrlCreate(data.signatureImage[0]);
      const cardData = {
        name: data.name,
        fatherName: data.fatherName,
        motherName: data.motherName,
        birthDate: data.birthDate,
        bloodGroup: data.bloodGroup,
        address: data.address,
        profileImage: profileImage,
        signatureImage: signatureImage,
      };
      const res = await postCardData(cardData);
      if (res?.success === true) {
        setData(res?.data);
      } else {
        console.log("Error", res?.message);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full container mx-auto">
      {data ? (
        <CardDownload data={data} />
      ) : (
        <div className=" mx-auto p-6 bg-[#F7F7F7]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4">
              <FormInput
                label="Name"
                name="name"
                register={register}
                errors={errors}
                isRequired={true}
              />
              <FormInput
                label="Father Name"
                name="fatherName"
                register={register}
                errors={errors}
                isRequired={true}
              />
              <FormInput
                label="Mother Name"
                name="motherName"
                register={register}
                errors={errors}
                isRequired={true}
              />
              <FormInput
                label="Date of Birth"
                name="birthDate"
                type="date"
                register={register}
                errors={errors}
                isRequired={true}
              />
              <FormInput
                label="Blood Group"
                name="bloodGroup"
                register={register}
                errors={errors}
                isRequired={true}
              />

              <FormTextarea
                label="Address"
                name="address"
                type="textarea"
                register={register}
                errors={errors}
                isRequired={true}
              />

              <ProfileUploader register={register} errors={errors} />
              <SignatureUploader register={register} errors={errors} />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className={`w-full p-2 rounded bg-[#28D08A] text-white flex items-center justify-center ${
                  isLoading ? "bg-blue-300 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Submit Information"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
