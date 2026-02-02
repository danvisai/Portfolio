import React, { useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityGame = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: '/Unity-Build/Build/portfolio.loader.js',
    dataUrl: '/Unity-Build/Build/portfolio.data',
    frameworkUrl: '/Unity-Build/Build/portfolio.framework.js',
    codeUrl: '/Unity-Build/Build/portfolio.wasm',
  });

  const handleFullscreen = () => {
    requestFullscreen(true);
    setIsFullscreen(true);
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div className="unity-game-container">
      <div className="game-wrapper">
        {!hasStarted && isLoaded && (
          <div className="start-overlay" onClick={handleStart}>
            <div className="start-content">
              <h2>🎮 Click to Start Game</h2>
              <p>Click anywhere to begin</p>
            </div>
          </div>
        )}
        
        {!isLoaded && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-bar">
                <div 
                  className="loading-fill"
                  style={{ width: `${loadingProgression * 100}%` }}
                />
              </div>
              <p>{Math.round(loadingProgression * 100)}% Loaded</p>
            </div>
          </div>
        )}
        
        <Unity 
          unityProvider={unityProvider}
          style={{
            width: '100%',
            height: '100%',
            visibility: isLoaded ? 'visible' : 'hidden',
          }}
        />
        
        {isLoaded && !isFullscreen && hasStarted && (
          <button className="fullscreen-btn" onClick={handleFullscreen}>
            ⛶ Fullscreen
          </button>
        )}
      </div>

      <style jsx>{`
        .unity-game-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .game-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          z-index: 10;
        }

        .start-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.85);
          z-index: 15;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .start-overlay:hover {
          background: rgba(0, 0, 0, 0.75);
        }

        .start-content {
          text-align: center;
          color: white;
        }

        .start-content h2 {
          font-size: 32px;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .start-content p {
          font-size: 18px;
          opacity: 0.8;
        }

        .loading-content {
          text-align: center;
          color: white;
        }

        .loading-bar {
          width: 300px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .loading-fill {
          height: 100%;
          background: white;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .loading-content p {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .fullscreen-btn {
          position: absolute;
          bottom: 16px;
          right: 16px;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
          z-index: 5;
        }

        .fullscreen-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .unity-game-container {
            padding: 12px;
          }

          .game-wrapper {
            aspect-ratio: 4 / 3;
          }

          .loading-bar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default UnityGame;