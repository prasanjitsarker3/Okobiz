/* eslint-disable react/prop-types */

import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { usePDF } from "react-to-pdf";

const CardDownload = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  if (!data) {
    return null;
  }

  const handleNationalCardDownload = () => {
    let currentValue = localStorage.getItem("tk");
    if (!currentValue) {
      currentValue = 0;
    }
    const newValue = parseInt(Number(currentValue, 10)) + 4;
    localStorage.setItem("tk", newValue);
  };
  return (
    <motion.div
      ref={targetRef}
      className="md:w-1/3 w-full  mx-auto mt-8 p-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" relative">
        <div className=" relative h-72 w-full flex justify-center items-center bg-[#F7F7F7]">
          <div
            className=" h-24 mt-16 w-full flex justify-center items-center"
            style={{
              backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/National_emblem_of_Bangladesh.svg/2000px-National_emblem_of_Bangladesh.svg.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
        <div className=" absolute top-0 w-full">
          <div className=" flex items-center">
            <div className=" h-24 w-24">
              <img src="https://i.ibb.co.com/P1PdJRV/logo.png" alt="" />
            </div>
            <div className=" text-center">
              <h1>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</h1>
              <h1 className=" text-[#28D08A]">
                Government of the People Republic of Bangladesh
              </h1>
              <h1>
                <span className=" text-red-500">National ID Card</span> / জাতীয়
                পরিচয় পত্র
              </h1>
            </div>
          </div>
          <div className=" border border-b border-gray-200 w-full flex justify-center mt-2"></div>
          <div className=" flex px-8 gap-5 py-3 ">
            <div className=" space-y-2 pt-1">
              <div className=" h-20 w-24">
                <img
                  src={data?.result?.profileImage}
                  alt=""
                  className=" h-full w-full"
                />
              </div>
              <img
                src={data?.result?.signatureImage}
                alt=""
                className=" h-8 w-24"
              />
            </div>
            <div className=" text-slate-900  font-semibold  space-y-1 ">
              <h1>নাম: {data?.result?.name}</h1>
              <h1>পিতা: {data?.result?.fatherName}</h1>
              <h1>মাতার: {data?.result?.motherName}</h1>
              <h1>
                Date of Birth:{" "}
                <span className=" text-red-500">
                  {new Date(data?.result?.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </h1>

              <h1>
                ID NO:
                <span className=" text-red-500"> 00 {data?.nationId}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="h-72 w-full bg-[#F7F7F7] mt-2">
        <h1 className=" text-center text-sm p-3">
          এই কার্ডটি গনপ্রজাতন্ত্রী বাংলাদেশ সরকারের সম্পত্তি। কার্ডটি
          ব্যবহারকারী ব্যতীত অন্য কোথাও পাওয়া গেলে নিকটস্থ পোস্ট অফিসে জমা দেবার
          জন্য অনুরোধ করা হলো।
        </h1>
        <div className=" border border-b border-gray-200 w-full flex justify-center"></div>
        <div className=" p-4 space-y-2">
          <h1>ঠিকানা: {data?.result?.address}</h1>
          <h1>
            রক্তের গ্রুপ / Blood Group:{" "}
            <span className=" text-red-500">{data?.result?.bloodGroup}</span>
          </h1>
        </div>
        <div className=" border border-b border-gray-200 w-full flex justify-center"></div>
        <div className=" flex justify-between items-center px-4 text-sm pt-1 ">
          <h1>প্রদানকারী কর্তৃপক্ষের স্বাক্ষর</h1>
          <h1>
            প্রদানের তারিখ:{" "}
            {new Date(data?.result?.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h1>
        </div>

        <div className="mt-5">
          <div className="flex justify-center w-full ">
            <QRCodeSVG
              value={data?.result?.name}
              size={50}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              width={120}
              marginSize={0}
            />
          </div>
        </div>
      </div>
      <div className=" w-full mx-auto flex justify-center">
        <button
          onClick={() => {
            handleNationalCardDownload();
            toPDF();
          }}
          className="bg-[#28D08A] py-1 px-6 text-white mt-4 flex justify-center items-center gap-2"
        >
          Download Card <Download size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CardDownload;
