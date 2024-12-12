import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export function AudioPlayer({ audioUrl, onEnded, onPlay, onPause }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      onEnded?.();
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
        onEnded?.();
      });
    };
  }, [onEnded]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audioRef.current.duration;

    audioRef.current.currentTime = time;
    setProgress(percentage);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 p-4 shadow-lg backdrop-blur dark:bg-gray-900/95">
      <audio ref={audioRef} src={audioUrl} />

      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="rounded-full bg-primary-500 p-3 text-white hover:bg-primary-600"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>

          <div className="flex items-center space-x-2">
            <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <SkipBack className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="flex-1 cursor-pointer px-4"
          onClick={seek}
        >
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}