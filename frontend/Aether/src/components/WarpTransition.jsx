import { useEffect, useRef } from 'react'

function WarpTransition({ destination, navigate }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const stars = []
    const NUM_STARS = 800

    let speed = 0.8
    let targetSpeed = 0.8
    let animationFrame

    // --------------------------------------------------
    // CREATE STARFIELD
    // --------------------------------------------------

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
      })
    }

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    // --------------------------------------------------
    // ANIMATION
    // --------------------------------------------------

    const animate = () => {
      // Smooth acceleration
      speed += (targetSpeed - speed) * 0.07

      // Very dark background
      ctx.fillStyle = 'rgba(1, 0, 10, 0.55)'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Maximum distance from center
      const maxDistance = Math.sqrt(
        Math.pow(width / 2, 2) +
        Math.pow(height / 2, 2)
      )

      for (let i = 0; i < NUM_STARS; i++) {
        const star = stars[i]

        star.z -= speed

        // Recycle star
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2
          star.y = (Math.random() - 0.5) * height * 2
          star.z = width
          star.pz = width
        }

        const k = 140 / star.z

        const px = star.x * k + cx
        const py = star.y * k + cy

        if (
          px >= 0 &&
          px <= width &&
          py >= 0 &&
          py <= height
        ) {
          const pk = 140 / star.pz

          const prevX = star.x * pk + cx
          const prevY = star.y * pk + cy

          star.pz = star.z

          // ----------------------------------------------
          // DISTANCE FROM CENTER
          // ----------------------------------------------

          const distanceFromCenter = Math.sqrt(
            Math.pow(px - cx, 2) +
            Math.pow(py - cy, 2)
          )

          /*
           * 1 = center
           * 0 = edge
           *
           * This makes the center bright
           * and the outer space extremely dim.
           */
          const centerFactor = Math.max(
            0.08,
            1 - distanceFromCenter / maxDistance
          )

          const intensity = Math.min(
            1,
            Math.max(0.08, 1 - star.z / width)
          )

          // ----------------------------------------------
          // DRAW STAR
          // ----------------------------------------------

          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(px, py)

          if (speed > 10) {
            // Brightness increases toward center
            const alpha =
              intensity *
              centerFactor *
              0.9

            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`

            ctx.lineWidth =
              intensity *
              (1.2 + centerFactor * 3.2)
          } else {
            // Purple stars are much dimmer
            const alpha =
              intensity *
              centerFactor *
              0.3

            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`

            ctx.lineWidth =
              intensity *
              (0.8 + centerFactor * 1.2)
          }

          ctx.stroke()
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // --------------------------------------------------
    // START WARP
    // --------------------------------------------------

    const warpTimer = setTimeout(() => {
      targetSpeed = 45
    }, 100)

    // --------------------------------------------------
    // SLOW DOWN AFTER WARP
    // --------------------------------------------------

    const landingTimer = setTimeout(() => {
      targetSpeed = 1.2

      setTimeout(() => {
        navigate(destination)
      }, 500)
    }, 1700)

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      cancelAnimationFrame(animationFrame)

      clearTimeout(warpTimer)
      clearTimeout(landingTimer)

      window.removeEventListener(
        'resize',
        handleResize
      )
    }
  }, [destination, navigate])

  return (
    <div className="aether-warp">

      {/* =================================================
          STARFIELD
      ================================================= */}

      <canvas
        ref={canvasRef}
        className="aether-warp-canvas"
      />

      {/* =================================================
          DARK SPACE + BRIGHT CENTER
      ================================================= */}

      <div className="aether-warp-overlay" />

      {/* =================================================
          CENTER AETHER CORE
      ================================================= */}

      <div className="aether-warp-content">

        {/* Outer glow */}
        <div className="aether-core-glow" />

        {/* Core */}
        <div className="aether-warp-orb">

          <div className="aether-warp-orb-inner">
            A
          </div>

        </div>

        {/* AETHER */}
        <div className="aether-warp-title">
          AETHER
        </div>

        {/* Status */}
        <div className="aether-warp-status">

          <span className="status-dot" />

          IDENTITY VERIFIED

        </div>

        {/* Loading dots */}
        <div className="aether-warp-loading">

          <span />
          <span />
          <span />

        </div>

      </div>

      {/* =================================================
          STYLES
      ================================================= */}

      <style>{`

        /* ================================================
           MAIN CONTAINER
        ================================================ */

        .aether-warp {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;

          background: #01000a;

          font-family: Inter, sans-serif;
        }


        /* ================================================
           CANVAS
        ================================================ */

        .aether-warp-canvas {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          display: block;
        }


        /* ================================================
           DARK SPACE VIGNETTE

           The edges are almost black.
           The center stays bright.
        ================================================ */

        .aether-warp-overlay {
          position: absolute;
          inset: 0;

          pointer-events: none;

          z-index: 1;

          background:

            /* Bright central portal */
            radial-gradient(
              circle at center,

              rgba(34, 211, 238, 0.20) 0%,

              rgba(124, 58, 237, 0.15) 7%,

              rgba(34, 211, 238, 0.06) 15%,

              transparent 27%
            ),

            /* Dark transition */
            radial-gradient(
              circle at center,

              transparent 20%,

              rgba(3, 0, 20, 0.35) 40%,

              rgba(1, 0, 10, 0.78) 68%,

              rgba(0, 0, 5, 0.96) 100%
            );
        }


        /* ================================================
           CENTER CONTENT
        ================================================ */

        .aether-warp-content {
          position: absolute;

          inset: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          z-index: 3;

          pointer-events: none;
        }


        /* ================================================
           CORE OUTER GLOW
        ================================================ */

        .aether-core-glow {
          position: absolute;

          width: 260px;
          height: 260px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,

              rgba(34, 211, 238, 0.16) 0%,

              rgba(124, 58, 237, 0.10) 30%,

              transparent 70%
            );

          filter: blur(25px);

          animation:
            coreGlow 1.4s
            ease-in-out
            infinite;
        }


        /* ================================================
           AETHER CORE
        ================================================ */

        .aether-warp-orb {
          position: relative;

          width: 82px;
          height: 82px;

          border-radius: 50%;

          padding: 1px;

          background:
            linear-gradient(
              135deg,
              #a78bfa,
              #22d3ee
            );

          box-shadow:

            0 0 15px
            rgba(34, 211, 238, 0.9),

            0 0 40px
            rgba(34, 211, 238, 0.6),

            0 0 90px
            rgba(124, 58, 237, 0.5),

            0 0 170px
            rgba(124, 58, 237, 0.25);

          animation:
            warpOrb 1.2s
            ease-in-out
            infinite;
        }


        /* ================================================
           INNER CORE
        ================================================ */

        .aether-warp-orb-inner {
          width: 100%;
          height: 100%;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle at center,

              #17203a 0%,

              #070015 45%,

              #02000b 100%
            );

          color: white;

          font-size: 28px;

          font-weight: 900;

          letter-spacing: 2px;

          text-shadow:
            0 0 15px
            rgba(34, 211, 238, 0.8);
        }


        /* ================================================
           AETHER TITLE
        ================================================ */

        .aether-warp-title {
          margin-top: 22px;

          font-size: 32px;

          font-weight: 900;

          letter-spacing: 9px;

          background:
            linear-gradient(
              135deg,
              #a78bfa,
              #22d3ee
            );

          -webkit-background-clip: text;

          -webkit-text-fill-color: transparent;

          text-shadow:
            0 0 25px
            rgba(34, 211, 238, 0.25);

          animation:
            titleGlow 1.5s
            ease-in-out
            infinite;
        }


        /* ================================================
           STATUS
        ================================================ */

        .aether-warp-status {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-top: 12px;

          color:
            rgba(255, 255, 255, 0.55);

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 3px;
        }


        /* ================================================
           STATUS DOT
        ================================================ */

        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #22d3ee;

          box-shadow:

            0 0 8px #22d3ee,

            0 0 18px #22d3ee,

            0 0 30px
            rgba(34, 211, 238, 0.5);

          animation:
            statusPulse
            0.8s
            infinite;
        }


        /* ================================================
           LOADING DOTS
        ================================================ */

        .aether-warp-loading {
          display: flex;

          gap: 5px;

          margin-top: 20px;
        }


        .aether-warp-loading span {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #22d3ee;

          box-shadow:
            0 0 8px
            rgba(34, 211, 238, 0.8);

          animation:
            loadingPulse
            0.8s
            infinite;
        }


        .aether-warp-loading span:nth-child(2) {
          animation-delay: 0.15s;
        }


        .aether-warp-loading span:nth-child(3) {
          animation-delay: 0.3s;
        }


        /* ================================================
           CORE ANIMATION
        ================================================ */

        @keyframes warpOrb {

          0%,
          100% {
            transform:
              scale(1);

            filter:
              brightness(1);
          }

          50% {
            transform:
              scale(1.10);

            filter:
              brightness(1.3);
          }

        }


        @keyframes coreGlow {

          0%,
          100% {
            transform:
              scale(0.9);

            opacity:
              0.6;
          }

          50% {
            transform:
              scale(1.2);

            opacity:
              1;
          }

        }


        @keyframes titleGlow {

          0%,
          100% {
            filter:
              brightness(0.9);
          }

          50% {
            filter:
              brightness(1.3);
          }

        }


        @keyframes statusPulse {

          0%,
          100% {
            opacity: 0.35;

            transform:
              scale(0.8);
          }

          50% {
            opacity: 1;

            transform:
              scale(1.25);
          }

        }


        @keyframes loadingPulse {

          0%,
          100% {
            opacity: 0.2;

            transform:
              translateY(0);
          }

          50% {
            opacity: 1;

            transform:
              translateY(-4px);
          }

        }


        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 600px) {

          .aether-warp-orb {
            width: 68px;
            height: 68px;
          }

          .aether-warp-title {
            font-size: 26px;
            letter-spacing: 7px;
          }

          .aether-warp-status {
            font-size: 9px;
            letter-spacing: 2px;
          }

        }

      `}</style>
    </div>
  )
}

export default WarpTransition