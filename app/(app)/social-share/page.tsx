"use client";

import React, { useEffect, useState, useRef } from "react";
import { CldImage } from "next-cloudinary";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080 },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350 },
  "Twitter Post (16:9)": { width: 1200, height: 675 },
  "Twitter Header (3:1)": { width: 1500, height: 500 },
  "Facebook Cover (205:78)": { width: 820, height: 312 },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if(!cloudinaryPublicId) return;
    setIsTransforming(true);
    const timeoutId = setTimeout(() => {
      setIsTransforming(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [selectedFormat, cloudinaryPublicId])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
       
      console.log(response); 
      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUploadedImage(data.downloadUrl);
      setCloudinaryPublicId(data.publicId);
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!uploadedImage) return;

    const response = await fetch(imageRef.current?.src || uploadedImage);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Social Media Image Resizer
        </h2>

        <div className="space-y-6">
          {/* Upload Input */}
          <div className="form-control">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full text-gray-700 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleUpload}
            />
          </div>

          {/* Format Selector */}
          <div className="form-control">
            <select
              className="select select-bordered select-primary w-full transition-all duration-200 hover:select-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
            >
              <option disabled>Pick your preferred size</option>
              {Object.keys(socialFormats).map((format) => (
                <option key={format}>{format}</option>
              ))}
            </select>
          </div>

          {/* ✅ Always Show Image Box but Change Content Based on State */}
          <div className="relative w-full h-[350px] bg-gray-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Loader while Uploading or Transforming */}
            {(isUploading || isTransforming) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <div className="text-center space-y-2">
                  <span className={`loading ${isUploading ? "loading-spinner text-blue-600" : "loading-infinity text-primary"}`} />
                  <p className="text-gray-600 font-medium animate-pulse">
                    {isUploading ? "Uploading..." : "Transforming..."}
                  </p>
                </div>
              </div>
            )}

            {/* Show Image if Available */}
            {cloudinaryPublicId && !isTransforming && !isUploading ? (
              <CldImage
                width={socialFormats[selectedFormat].width}
                height={socialFormats[selectedFormat].height}
                src={cloudinaryPublicId}
                alt="Uploaded Image"
                crop="fill"
                gravity="auto"
                className="object-contain w-full h-full p-2 rounded-xl"
                ref={imageRef}
                onLoad={() => setIsTransforming(false)}
              />
            ) : !isUploading && !isTransforming ? (
              <p className="text-gray-500 text-lg">Upload an image to preview</p>
            ) : null}
          </div>

          {/* Download Button */}
          <button
            className="btn btn-primary w-full flex items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105"
            onClick={handleDownload}
            disabled={!uploadedImage || isUploading || isTransforming}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {isUploading ? "Uploading..." : isTransforming ? "Processing..." : "Download Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
