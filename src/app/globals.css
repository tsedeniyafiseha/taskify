@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #6b7280;
  --border: #e5e7eb;
  --card: #f9fafb;
  --accent: #7c3aed;
  --purple-glow: rgba(124, 58, 237, 0.2);
}

* {
  box-sizing: border-box;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #7c3aed, #6d28d9);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #6d28d9, #5b21b6);
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(124, 58, 237, 0.1);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Gradient text - Purple */
.gradient-text {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Colorful gradient text */
.gradient-text-colorful {
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 25%, #f97316 50%, #eab308 75%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Rainbow animated gradient text */
.gradient-text-animated {
  background: linear-gradient(90deg, #7c3aed, #ec4899, #f97316, #eab308, #22c55e, #7c3aed);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 4s linear infinite;
}

@keyframes gradient-flow {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Purple glow */
.purple-glow {
  box-shadow: 0 0 40px rgba(124, 58, 237, 0.2);
}

.purple-glow-strong {
  box-shadow: 0 0 60px rgba(124, 58, 237, 0.3);
}

/* Animated gradient background */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #f8fafc, #f3e8ff, #ede9fe, #f8fafc);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.float {
  animation: float 6s ease-in-out infinite;
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.2); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.4); }
}

.pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Smooth transitions */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover lift */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
}

/* Purple mesh gradient */
.mesh-gradient {
  background: 
    radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.05) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(168, 85, 247, 0.05) 0px, transparent 50%);
}
