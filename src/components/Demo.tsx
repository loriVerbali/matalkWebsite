import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { analytics } from "../utils/analytics";
import { Button } from "./ui/button";
// Placeholder images - replace with actual images when available
const robotDog1 = "/images/verbiFlying.png";
const robotDog2 = "/images/verbiFlyingRight.png";
const playfulRobotDog = "/images/verbiBall.png";

interface DemoProps {
  onNavigate?: (destination: string) => void;
}

export function Demo({ onNavigate }: DemoProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Video controls
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        analytics.trackInteraction("Video Paused", {
          media_type: "video",
          current_time: videoCurrentTime,
          duration: videoDuration,
          progress_percentage: videoProgress,
        });
      } else {
        videoRef.current.play();
        analytics.trackInteraction("Video Played", {
          media_type: "video",
          current_time: videoCurrentTime,
          duration: videoDuration,
          progress_percentage: videoProgress,
        });
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);

      analytics.trackInteraction("Video Mute Toggled", {
        media_type: "video",
        is_muted: !isVideoMuted,
        current_time: videoCurrentTime,
      });
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setVideoProgress(0);
      setVideoCurrentTime(0);
      if (isVideoPlaying) {
        setIsVideoPlaying(false);
        videoRef.current.pause();
      }

      analytics.trackInteraction("Video Reset", {
        media_type: "video",
        previous_time: videoCurrentTime,
        duration: videoDuration,
      });
    }
  };

  // Audio controls
  const toggleAudioPlay = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        analytics.trackInteraction("Audio Paused", {
          media_type: "audio",
          current_time: audioCurrentTime,
          duration: audioDuration,
          progress_percentage: audioProgress,
        });
      } else {
        audioRef.current.play();
        analytics.trackInteraction("Audio Played", {
          media_type: "audio",
          current_time: audioCurrentTime,
          duration: audioDuration,
          progress_percentage: audioProgress,
        });
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const toggleAudioMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isAudioMuted;
      setIsAudioMuted(!isAudioMuted);

      analytics.trackInteraction("Audio Mute Toggled", {
        media_type: "audio",
        is_muted: !isAudioMuted,
        current_time: audioCurrentTime,
      });
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setAudioProgress(0);
      setAudioCurrentTime(0);
      if (isAudioPlaying) {
        setIsAudioPlaying(false);
        audioRef.current.pause();
      }

      analytics.trackInteraction("Audio Reset", {
        media_type: "audio",
        previous_time: audioCurrentTime,
        duration: audioDuration,
      });
    }
  };

  // Progress handlers
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
      setVideoCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
      setAudioCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
    }
  };

  const handleVideoProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * videoDuration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleAudioProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audioDuration;
      audioRef.current.currentTime = newTime;
    }
  };

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section
      id="demo-section"
      className="mobile-section-padding lg:py-28 bg-lavender-50 relative overflow-hidden mobile-no-overflow"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/30 via-transparent to-blue-100/40"></div>

      {/* Subtle geometric patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
          className="w-full h-full"
        ></div>
      </div>

      <div className="max-w-6xl mx-auto mobile-container relative">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h2 mb-4 text-slate-900"
          >
            See Matalk AI in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lead text-slate-600 max-w-3xl mx-auto"
          >
            Watch our demo to see how Matalk AI transforms AAC communication,
            and listen to our product overview podcast.{" "}
            <button
              onClick={() => {
                analytics.trackInteraction("Demo Playground Link Clicked", {
                  source: "demo_section",
                  destination: "playground",
                });
                // Navigate to playground using the same navigation system
                if (onNavigate) {
                  onNavigate("taste-of-matalk-ai");
                }
              }}
              className="text-violet-600 hover:text-violet-700 font-semibold underline transition-colors cursor-pointer"
            >
              Or try out the Playground
            </button>
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 lg:items-stretch mb-8 sm:mb-12 lg:mb-16">
          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 flex flex-col"
          >
            <div className="glass-card bg-white/90 backdrop-blur-lg border border-purple-100/50 shadow-xl flex-1 flex flex-col">
              <h3 className="h3 mb-3 sm:mb-4 text-slate-900">Watch the Demo</h3>
              <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
                See how Matalk AI makes AAC communication natural and intuitive
                for children with speech challenges.
              </p>

              {/* Video Player */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] sm:aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onEnded={() => setIsVideoPlaying(false)}
                    playsInline
                  >
                    <source
                      src="https://pub-478619cacb0f41448d8ea23825356593.r2.dev/Ma-Talk%20AI%20demo%20-%20for%20website%20(1).mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video Controls - Below the video */}
                <div className="bg-slate-100 rounded-lg p-3 sm:p-4">
                  {/* Progress Bar */}
                  <div
                    className="w-full h-2 bg-slate-300 rounded-full mb-3 cursor-pointer touch-target"
                    onClick={handleVideoProgressClick}
                  >
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-200"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={toggleVideoPlay}
                        className="text-slate-700 hover:text-violet-600 transition-colors touch-target"
                      >
                        {isVideoPlaying ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                      </button>

                      <button
                        onClick={resetVideo}
                        className="text-slate-700 hover:text-violet-600 transition-colors touch-target"
                      >
                        <RotateCcw size={18} />
                      </button>

                      <button
                        onClick={toggleVideoMute}
                        className="text-slate-700 hover:text-violet-600 transition-colors touch-target"
                      >
                        {isVideoMuted ? (
                          <VolumeX size={18} />
                        ) : (
                          <Volume2 size={18} />
                        )}
                      </button>
                    </div>

                    <div className="text-slate-600 text-xs sm:text-sm font-medium">
                      {formatTime(videoCurrentTime)} /{" "}
                      {formatTime(videoDuration)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Podcast Audio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 sm:space-y-6 flex flex-col"
          >
            <div className="glass-card bg-white/90 backdrop-blur-lg border border-blue-100/50 shadow-xl flex-1 flex flex-col">
              <h3 className="h3 mb-3 sm:mb-4 text-slate-900">
                Product Overview Podcast
              </h3>
              <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Listen to our comprehensive product overview that covers
                Verbali's mission, features, and impact.
              </p>

              {/* Audio Player */}
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-violet-100/50 flex-1 flex flex-col justify-center">
                <audio
                  ref={audioRef}
                  onTimeUpdate={handleAudioTimeUpdate}
                  onLoadedMetadata={handleAudioLoadedMetadata}
                  onEnded={() => setIsAudioPlaying(false)}
                  className="hidden"
                >
                  <source
                    src="https://pub-478619cacb0f41448d8ea23825356593.r2.dev/Ma-Talk%20AI_%20A%20Pilot%20Guide%20for%20Augmentative%20Communication.wav"
                    type="audio/wav"
                  />
                  Your browser does not support the audio element.
                </audio>

                {/* Audio Controls */}
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div
                    className="w-full h-3 bg-white/60 rounded-full cursor-pointer touch-target"
                    onClick={handleAudioProgressClick}
                  >
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-200"
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={toggleAudioPlay}
                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors shadow-lg touch-target"
                      >
                        {isAudioPlaying ? (
                          <Pause size={18} />
                        ) : (
                          <Play size={18} />
                        )}
                      </button>

                      <button
                        onClick={resetAudio}
                        className="text-violet-600 hover:text-violet-700 transition-colors touch-target"
                      >
                        <RotateCcw size={18} />
                      </button>

                      <button
                        onClick={toggleAudioMute}
                        className="text-violet-600 hover:text-violet-700 transition-colors touch-target"
                      >
                        {isAudioMuted ? (
                          <VolumeX size={18} />
                        ) : (
                          <Volume2 size={18} />
                        )}
                      </button>
                    </div>

                    <div className="text-slate-600 text-xs sm:text-sm font-medium">
                      {formatTime(audioCurrentTime)} /{" "}
                      {formatTime(audioDuration)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/60 rounded-lg border border-white/50">
                <p className="text-xs sm:text-sm text-slate-600">
                  <strong>🎧 Episode Length:</strong> Comprehensive overview
                  covering all aspects of Verbali
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  <strong>🎯 Perfect for:</strong> Parents, caregivers,
                  therapists, and educators
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="glass-card bg-white/80 backdrop-blur-lg border border-violet-100/50 shadow-xl max-w-2xl mx-auto">
            <h3 className="h3 mb-4 text-slate-900">Ready to Get Started?</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base">
              Join thousands of families already using Verbali to unlock natural
              communication.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Matalk AI on the App Store"
              >
                <img
                  src="/images/black.svg"
                  alt="Download on the App Store"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
              <button
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Matalk AI on Google Play"
              >
                <img
                  src="/images/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Robot Dog - Centered and Safe Positioning */}
        <motion.div
          className="sm:hidden flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <img
            src={playfulRobotDog}
            alt="Matalk AI companion"
            className="w-16 h-16 object-contain drop-shadow-lg opacity-80"
          />
        </motion.div>
      </div>

      {/* Desktop Robot Dog Corner Companions - Hidden on Mobile with responsive positioning */}
      {/* Top-left robot dog */}
      <motion.div
        className="hidden lg:block absolute top-8 left-8 z-20"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 3, 0, -3, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={robotDog2}
          alt="Matalk AI companion"
          className="w-20 h-20 lg:w-24 lg:h-24 object-contain drop-shadow-xl hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100"
        />
      </motion.div>

      {/* Top-right robot dog */}
      <motion.div
        className="hidden lg:block absolute top-8 right-8 z-20"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -2, 0, 2, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <img
          src={robotDog1}
          alt="Matalk AI companion"
          className="w-20 h-20 lg:w-24 lg:h-24 object-contain drop-shadow-xl hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100"
        />
      </motion.div>

      {/* Bottom-left robot dog - Desktop only */}
      <div className="hidden lg:block absolute -bottom-2 left-8 z-30">
        <img
          src={playfulRobotDog}
          alt="Matalk AI companion playing"
          className="w-24 h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl transition-all duration-300 opacity-95 hover:opacity-100"
        />
      </div>

      {/* Floating decoration elements - Responsive sizing and positioning */}
      <div className="absolute top-20 sm:top-24 lg:top-32 right-8 sm:right-12 lg:right-16 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-purple-200/40 rounded-full blur-lg opacity-60"></div>
      <div className="absolute bottom-20 sm:bottom-32 lg:bottom-40 left-8 sm:left-12 lg:left-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-blue-200/30 rounded-full blur-xl opacity-50"></div>
    </section>
  );
}
