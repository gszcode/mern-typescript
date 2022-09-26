import { RequestHandler } from "express";
import Video from "./Video";

export const createVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findOne({ url: req.body.url });
  if (videoFound)
    return res.status(301).json({ message: "The URL already exists" });

  const video = new Video(req.body);
  const savedVideo = await video.save();

  console.log(savedVideo);
  res.json(savedVideo);
};

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find();

    res.json(videos);
  } catch (error) {
    res.json(error);
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(204).json({ message: "The video not found" });

    res.json(video);
  } catch (error) {
    res.json(error);
  }
};

export const deleteVideo: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(204).json({ message: "The video not found" });

    res.json(video);
  } catch (error) {
    res.json(error);
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const videoUpdated = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(videoUpdated);
  } catch (error) {
    res.json(error);
  }
};
