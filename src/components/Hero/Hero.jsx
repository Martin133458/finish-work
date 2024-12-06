import React, { useState, useEffect } from 'react';
import s from './Hero.module.scss';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameObjects, setGameObjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const imageSources = [
    '/gameimg.gif',
    '/gameimg2.gif',
    '/gameimg3.gif',
    '/gameimg4.gif',
    '/gameimg5.gif',
    '/gameimg6.png',
    '/gameimg7.gif',
    '/gameimg8.png',
    '/gameimg9.png',
    '/gameimg10.png',
  ]; // Твои 10 картинок

  // Функция для начала игры
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimer(30);
    setGameObjects(generateGameObjects(imageSources)); // Генерация объектов только из твоих картинок
    setShowModal(false); // Закрыть модалку при начале новой игры
  };

  // Функция для окончания игры
  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
    }
    setGameObjects([]);
    setShowModal(true); // Показать модальное окно с результатами
  };

  // useEffect для сброса состояния при монтировании компонента
  useEffect(() => {
    setShowModal(false); // Сбрасываем состояние модалки при перезагрузке страницы
  }, []);

  useEffect(() => {
    if (isPlaying && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 || gameObjects.length === 0) { // Игра заканчивается, когда таймер или объекты заканчиваются
      endGame();
    }
  }, [isPlaying, timer, gameObjects]);

  // Функция для генерации объектов
  const generateGameObjects = (images) => {
    const gameAreaWidth = window.innerWidth * 0.8;
    const gameAreaHeight = window.innerHeight * 0.8;
    const startX = (window.innerWidth - gameAreaWidth) / 2;
    const startY = (window.innerHeight - gameAreaHeight) / 2;

    return images.map((src, index) => ({
      id: index,
      src,
      x: startX + Math.random() * gameAreaWidth,
      y: startY + Math.random() * gameAreaHeight,
      speedX: Math.random() * 5 - 2.5,
      speedY: Math.random() * 5 - 2.5,
    }));
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setGameObjects((prev) =>
          prev.map((obj) => ({
            ...obj,
            x: (obj.x + obj.speedX + window.innerWidth) % window.innerWidth,
            y: (obj.y + obj.speedY + window.innerHeight) % window.innerHeight,
          }))
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleObjectClick = (id) => {
    setGameObjects((prev) => prev.filter((obj) => obj.id !== id));
    setScore((prev) => prev + 1);

    if (gameObjects.length === 1) { // Если после клика остался последний объект
      endGame(); // Завершаем игру
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="container"
      style={{ cursor: isPlaying ? 'url(/cursor.png), auto' : 'auto' }} // Применяем кастомный курсор только во время игры
    >
      {!isPlaying ? (
        <div className={s.wrapper}>
          <img className={s.anal} src="/analogue.png" alt="" />
          <div className={s.text}>
            <p>
              A seriously{' '}
              <button className={s.playful_btn} onClick={startGame}>
                PLAYFUL
              </button>{' '}
              <span className={s.brand}>brand</span> and motion{' '}
              <img className={s.img} src="/strelks.svg" alt="" />
              <br />
              <br />
              <span className={s.studio}>studio</span> combining fresh-forward
              thinking <br />
              and beautifully crafted creative to help <br />
              brands build{' '}
              <img className={s.img} src="finger.svg" alt="" />
              fandom{' '}
              <span className={s.world}>
                worldwide <img className={s.orbit} src="orbit.gif" alt="" />{' '}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className={s.wrapper}>
          <div className={s.scoreBoard}>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <p>Time: {timer}s</p>
            <button onClick={endGame}>Exit</button>
          </div>
          <div className={s.gameArea}>
            {gameObjects.map((obj) => (
              <img
                key={obj.id}
                src={obj.src}
                alt={`game object ${obj.id}`}
                className={s.gameObject}
                style={{
                  left: obj.x,
                  top: obj.y,
                  position: 'absolute',
                }}
                onClick={() => handleObjectClick(obj.id)}
              />
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <p>Your score: {score}</p>
            <p>High Score: {highScore}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
