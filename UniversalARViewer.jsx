import React, { useState } from 'react';
import '@google/model-viewer';

/**
 * UniversalARViewer
 * A universal component for SM Trader covering Wearables, Edibles, and General Products.
 */
const UniversalARViewer = ({ product }) => {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'try-on'

  // product prop example:
  // {
  //   id: 1,
  //   name: "Men's Denim Jacket",
  //   category: "wearable", // wearable, edible, general
  //   glbUrl: "https://example.com/models/jacket.glb",
  //   usdzUrl: "https://example.com/models/jacket.usdz",
  //   posterUrl: "https://example.com/posters/jacket.jpg",
  //   price: "RS 4,500"
  // }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h2>
      <p className="text-lg text-emerald-600 font-semibold mb-4">{product.price}</p>

      {/* View Mode Toggle - Only display for wearables */}
      {product.category === 'wearable' && (
        <div className="flex space-x-2 mb-4 bg-gray-100 p-1 rounded-full">
          <button 
            onClick={() => setViewMode('3d')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${viewMode === '3d' ? 'bg-black text-white' : 'bg-transparent text-gray-700'}`}
          >
            3D Viewer
          </button>
          <button 
            onClick={() => setViewMode('try-on')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${viewMode === 'try-on' ? 'bg-black text-white' : 'bg-transparent text-gray-700'}`}
          >
            Virtual Try-On
          </button>
        </div>
      )}

      {/* 3D / AR Viewer */}
      {viewMode === '3d' || product.category !== 'wearable' ? (
        <div className="relative w-full h-[450px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <model-viewer
            src={product.glbUrl}
            ios-src={product.usdzUrl}
            poster={product.posterUrl}
            alt={`A 3D model of ${product.name}`}
            shadow-intensity="1"
            camera-controls
            auto-rotate
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image="neutral"
            style={{ width: '100%', height: '100%' }}
          >
            <button 
              slot="ar-button" 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-lg font-bold text-sm tracking-wide z-10 flex items-center justify-center border border-gray-300 active:bg-gray-100"
            >
              {product.category === 'edible' ? '🍽️ Place on Table (AR)' : '📦 View in your space (AR)'}
            </button>
          </model-viewer>
        </div>
      ) : (
        /* Virtual Try-On Placeholder (Mediapipe / 3DLOOK integration) */
        <div className="relative w-full h-[450px] bg-slate-900 rounded-lg overflow-hidden flex flex-col items-center justify-center">
           <p className="text-white text-center px-6 mb-4 z-10">
             <span className="text-xl font-bold mb-2 block">AI Body Tracking Active</span>
             <span className="text-sm text-gray-300">Please align your full body in the camera frame to try on the {product.name}</span>
           </p>
           {/* Camera feed overlay UI */}
           <div className="absolute border-2 border-dashed border-emerald-400 w-2/3 h-5/6 rounded-full opacity-60 animate-pulse"></div>
        </div>
      )}

      {/* Add to Cart Footer */}
      <div className="w-full mt-6">
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg">
          Add to Cart - {product.price}
        </button>
      </div>
    </div>
  );
};

export default UniversalARViewer;
