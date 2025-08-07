import React, { useCallback, useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GlobalLoaderProps {
  isLoading?: boolean;
  progress?: number;
  message?: string;
  className?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  isLoading = true,
  progress,
  message = "Memuat...",
  className
}) => {
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const particlesInit: any = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig: any = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["hsl(4, 75%, 51%)", "hsl(117, 27%, 30%)", "hsl(4, 85%, 65%)"],
      },
      links: {
        color: "hsl(4, 75%, 51%)",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: 0.3,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
        },
      },
    },
    detectRetina: true,
  };

  // Simulate progress if not provided
  useEffect(() => {
    if (!isLoading) return;

    if (progress !== undefined) {
      setCurrentProgress(progress);
    } else {
      // Auto-increment progress simulation
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading, progress]);

  const particlesLoadedCallback = useCallback(async (container: Container | undefined) => {
    setParticlesLoaded(true);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background",
        "backdrop-blur-sm",
        className
      )}
    >
      {/* Particles Background */}
      <div className="absolute inset-0 opacity-60">
        <Particles
          id="globalLoaderParticles"
          options={particlesConfig}
          className="w-full h-full"
        />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 p-8">
        {/* Logo Container */}
        <div className="relative">
          {/* Logo Glow Effect */}
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />

          {/* Logo */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-primary/20 shadow-2xl">
            <img
              src="/logo-site.png"
              alt="Harapan Bagimu Negeri"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                // Fallback if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback Logo */}
            <div className="hidden absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">HN</span>
              </div>
            </div>
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-primary/50 rounded-full animate-spin" />
        </div>

        {/* Organization Name */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Harapan Bagimu Negeri
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Yayasan untuk Masa Depan Indonesia
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-64 md:w-80 space-y-4">
          {/* Progress Bar */}
          <div className="relative">
            <Progress
              value={currentProgress}
              className="h-2 bg-muted/50 backdrop-blur-sm"
            />
            <div className="absolute inset-0 h-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-pulse" />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{message}</span>
            <span className="text-primary font-medium">
              {Math.round(currentProgress)}%
            </span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center text-xs md:text-sm text-muted-foreground/80 max-w-md">
          "Bersama Kita Peduli, Bersama Kita Berbagi"
        </p>
      </div>

      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/60 pointer-events-none" />
    </div>
  );
};

export default GlobalLoader;
