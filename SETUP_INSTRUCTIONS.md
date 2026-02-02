# Unity Game Integration Setup

## Step 1: Install the Package

```bash
npm install react-unity-webgl
```

## Step 2: Add Your Unity Build Files

1. Create a `public/unity-build/` folder in your React project
2. Copy your entire Unity WebGL build folder into it
3. Your structure should look like:
   ```
   public/
   └── unity-build/
       ├── Build/
       │   ├── YourGameName.loader.js
       │   ├── YourGameName.data
       │   ├── YourGameName.framework.js
       │   └── YourGameName.wasm
       ├── TemplateData/
       └── index.html (you won't need this one)
   ```

## Step 3: Update the Component

In `UnityGame.jsx`, replace `YourGameName` with your actual build name:

```javascript
loaderUrl: '/unity-build/Build/YOUR_ACTUAL_BUILD_NAME.loader.js',
dataUrl: '/unity-build/Build/YOUR_ACTUAL_BUILD_NAME.data',
frameworkUrl: '/unity-build/Build/YOUR_ACTUAL_BUILD_NAME.framework.js',
codeUrl: '/unity-build/Build/YOUR_ACTUAL_BUILD_NAME.wasm',
```

## Step 4: Use in Your Portfolio

Import and use the component anywhere in your portfolio:

```javascript
import UnityGame from './components/UnityGame';

function Portfolio() {
  return (
    <div>
      <h1>My Unity Game</h1>
      <UnityGame />
    </div>
  );
}
```

## Features Included:
- ✅ Loading progress bar
- ✅ Fullscreen button
- ✅ Responsive design
- ✅ Mobile-friendly
- ✅ Clean, modern styling

## Troubleshooting:

**If the game doesn't load:**
- Check browser console for errors
- Verify file paths match your build names exactly
- Make sure all files are in `public/unity-build/Build/`
- Try clearing your browser cache

**Performance tips:**
- Unity WebGL works best on desktop browsers
- Consider adding a warning for mobile users if your game is resource-intensive
- You can compress your build files in Unity (File → Build Settings → Player Settings → Publishing Settings → Compression Format)

Good luck! 🎮
