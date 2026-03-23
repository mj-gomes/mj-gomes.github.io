document.addEventListener("DOMContentLoaded", function () {
  console.log("Particle effect script loaded");
  function initParticleEffect() {
    function getConfig() {
      return {
        zIndex: -1,
        opacity: 1.0,
        color: "250,208,137",
        count: 150,
      };
    }

    function setupCanvas() {
      const canvas = document.createElement("canvas");
      const config = getConfig();
      const ctx = canvas.getContext("2d");

      canvas.id = "particle-canvas";
      canvas.style.cssText = `position:fixed;top:0;left:0;z-index:${config.zIndex};opacity:${config.opacity}`;
      document.body.appendChild(canvas);

      return {
        canvas: canvas,
        ctx: ctx,
        config: config,
      };
    }

    function resizeCanvas(canvas) {
      canvas.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      canvas.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    }

    function createParticles(ctx, config, canvas) {
      const particles = [];
      const random = Math.random;

      for (let i = 0; i < config.count; i++) {
        const x = random() * canvas.width;
        const y = random() * canvas.height;
        const xa = 0.5 * random() - 0.5;
        const ya = 0.5 * random() - 0.5;

        particles.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 6000,
        });
      }

      return particles;
    }

    function animateParticles(ctx, particles, canvas, cursor) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.xa;
        particle.y += particle.ya;

        particle.xa *= particle.x > canvas.width || particle.x < 0 ? -1 : 1;
        particle.ya *= particle.y > canvas.height || particle.y < 0 ? -1 : 1;

        ctx.fillRect(particle.x - 0.5, particle.y - 0.5, 1, 1);

        for (let j = index + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          if (otherParticle.x !== null && otherParticle.y !== null) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < otherParticle.max) {
              if (
                otherParticle === cursor &&
                distanceSquared >= otherParticle.max / 2
              ) {
                particle.x -= 0.03 * dx;
                particle.y -= 0.03 * dy;
              }

              const opacity =
                (otherParticle.max - distanceSquared) / otherParticle.max;
              ctx.beginPath();
              ctx.lineWidth = opacity / 2;
              ctx.strokeStyle = `rgba(${config.color},${opacity + 0.7})`;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        }
      });

      requestAnimationFrame(() =>
        animateParticles(ctx, particles, canvas, cursor),
      );
    }

    const { canvas, ctx, config } = setupCanvas();
    resizeCanvas(canvas);

    window.onresize = () => resizeCanvas(canvas);

    const cursor = { x: null, y: null, max: 20000 };
    const particles = createParticles(ctx, config, canvas);

    window.onmousemove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    window.onmouseout = () => {
      cursor.x = null;
      cursor.y = null;
    };

    setTimeout(() => {
      animateParticles(ctx, particles.concat([cursor]), canvas, cursor);
    }, 100);
  }

  initParticleEffect();
});
