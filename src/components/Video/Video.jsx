import React, { useRef, useState } from 'react';
import s from "./Video.module.scss"

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Состояние для отслеживания звука

  const handleToggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; // Переключение состояния звука
      setIsMuted(!isMuted); // Обновляем состояние
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        loop
        autoPlay
        muted={isMuted} // Привязываем звук к состоянию
        onClick={handleToggleSound} // Переключаем звук при клике
        
      >
        <source src="https://madebyanalogue.co.uk/wp-content/uploads/showreel.mp4" type="video/mp4" />
        
      </video>
      
    </div>
  );
};

export default VideoPlayer;