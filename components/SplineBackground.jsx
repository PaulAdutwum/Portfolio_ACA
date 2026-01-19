import React, { Suspense, lazy } from 'react';

// Lazy load Spline to improve initial load time
const Spline = lazy(() => import('@splinetool/react-spline'));

// Loading fallback with animated gradient
const LoadingFallback = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] animate-pulse flex items-center justify-center">
        <div className="text-[#00d4ff] text-lg font-light">Loading 3D Scene...</div>
    </div>
);

// Spline 3D Background Component
// You can create your own scene at https://spline.design and replace the scene URL
const SplineBackground = ({ 
    scene = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode", // Default abstract scene
    className = '',
    fallbackGradient = true 
}) => {
    return (
        <div className={`fixed inset-0 z-0 ${className}`}>
            <Suspense fallback={fallbackGradient ? <LoadingFallback /> : null}>
                <Spline
                    scene={scene}
                    style={{ width: '100%', height: '100%' }}
                />
            </Suspense>
        </div>
    );
};

export default SplineBackground;


