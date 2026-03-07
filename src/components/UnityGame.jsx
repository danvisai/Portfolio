import React, { useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

const MobileMessage = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '340px',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    borderRadius: '16px',
    padding: '40px 24px',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }}>
    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎮</div>
    <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: '#9bbfd9' }}>
      Game Under Development for Mobile
    </h2>
    <p style={{ fontSize: '15px', opacity: 0.85, maxWidth: '320px', lineHeight: '1.7', marginBottom: '20px' }}>
      The 3D portfolio experience isn't quite ready for mobile yet — it's being optimized for smaller screens. For now, please open it on a <strong>desktop or laptop</strong> for the full experience!
    </p>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(155, 191, 217, 0.15)',
      border: '1px solid rgba(155, 191, 217, 0.3)',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      opacity: 0.9,
    }}>
      🖥️ &nbsp; Best viewed on PC
    </div>
  </div>
);

const UnityGame = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  if (isMobile) return <MobileMessage />;
  
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: `${process.env.PUBLIC_URL}/Build/portfolio.loader.js`,
    dataUrl: `${process.env.PUBLIC_URL}/Build/portfolio.data`,
    frameworkUrl: `${process.env.PUBLIC_URL}/Build/portfolio.framework.js`,
    codeUrl: `${process.env.PUBLIC_URL}/Build/portfolio.wasm`,
    streamingAssetsUrl: `${process.env.PUBLIC_URL}/StreamingAssets`,
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

      <style>{`
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
          background: linear-gradient(135deg, #4f708b 0%, #2f475d 100%);
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
