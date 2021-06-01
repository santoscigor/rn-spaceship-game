import React from 'react';
import Canvas from 'react-native-canvas';

const handleCanvas = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'purple';
  ctx.width = 500;
  ctx.height = 500;
  ctx.fillRect(0, 0, 100, 100);
}

export default function App() {
  return (
    <Canvas ref={handleCanvas}></Canvas>
  );
}

