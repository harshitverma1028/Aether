function AetherOrb({ listening }) {

  return (

    <div
      className={`
      fixed
      bottom-8
      right-8
      z-50

      w-10
      h-10

      rounded-full

      flex
      items-center
      justify-center

      transition-all
      duration-500

      ${
        listening

          ? `
          bg-linear-to-br
          from-cyan-400
          via-blue-500
          to-indigo-600

          scale-110

          animate-pulse

          shadow-[0_0_40px_rgba(34,211,238,0.8)]
          `

          : `
          bg-linear-to-br
          from-slate-800
          via-slate-900
          to-black

          shadow-[0_0_25px_rgba(15,23,42,0.9)]
          `
      }
      `}
    >

      {/* Listening Label */}

      {
        listening && (

          <div
            className='absolute -top-14 whitespace-nowrap bg-slate-900/95 backdrop-blur-lg border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg'
          >
            Aether Listening...
          </div>

        )
      }

      {/* AI Core */}

      <div
        className={`
        rounded-full

        ${
          listening

            ? `
            w-10
            h-10

            bg-linear-to-r
            from-cyan-200
            via-white
            to-cyan-200

            animate-spin

            shadow-[0_0_30px_rgba(255,255,255,0.8)]
            `

            : `
            w-6
            h-6

            bg-linear-to-r
            from-cyan-400
            via-blue-500
            to-indigo-600
            `
        }
        `}
      />

    </div>

  )
}

export default AetherOrb