export default function SimpleCurtainLoader() {
  return (
    <div
      id="simple-curtain-loader"
      className="fixed inset-0 z-[9999] overflow-hidden should-show bg-[#0b0b0b]"
    >
      <div className="curtain-top absolute top-0 left-0 w-full h-1/2 bg-neutral-950 z-10"></div>
      <div className="curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-neutral-950 z-10"></div>
      <div className="loader-center absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <div className="brand-container">
            <h1 className="brand-name text-7xl md:text-9xl font-semibold text-white mb-6 tracking-wider opacity-0">
              Kahfi Smith
            </h1>
            <p className="brand-subtitle text-neutral-300 text-xl md:text-2xl tracking-[0.3em] uppercase opacity-0">
              Portfolio
            </p>

            <div className="progress-container mt-12 opacity-0">
              <div className="progress-bar-container relative w-64 h-1 bg-neutral-700/30 rounded-full mx-auto mb-4">
                <div
                  className="progress-bar absolute top-0 left-0 h-full bg-white rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>

              <div className="progress-text text-white text-lg font-mono tracking-wider">
                <span className="progress-number">0</span>%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="decorative-bg absolute inset-0 z-0">
        <div
          className="grid-pattern absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="floating-orb absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}
