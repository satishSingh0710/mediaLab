"use client"

import React, { useEffect, useState, useRef } from 'react'
import { CldImage } from 'next-cloudinary';

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};


type SocialFormat = keyof typeof socialFormats;


function SocialShare() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const file = e.target.files?.[0];
      if (!file) {
        console.error("No file provided");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error: any) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Something went wrong in uploading the image file");
      }
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      {/* <div>SocialShare</div> */}
    </>
  )
}

export default SocialShare