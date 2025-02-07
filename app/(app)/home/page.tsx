"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { getCldVideoUrl } from "next-cloudinary"
import axios from 'axios'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos")
      if (Array.isArray(response.data)) {
        setVideos(response.data)
      } else {
        throw new Error(" Unexpected response format");

      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch videos")

    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    })
  }, [])

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_8:max_seg_4:min_seg_dur_1"]
    })
  }, [])


  const handleDownload = useCallback(async (url: string, title: string) => {
    try {
      console.log(`Downloading: ${title}`);
      const videoUrl = getPreviewVideoUrl(url);
      url = videoUrl;
      // Fetch the video as a Blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `${title}.mp4`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Download started");
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, []);


  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={() => handleDownload(video.publicId, video.title)}
              />
            ))
          }
        </div>
      )}
    </div>
  );
}

export default Home