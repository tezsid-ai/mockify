export function CinematicBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary electric blue glow — large, centered */}
      <div
        className="absolute animate-[glow-drift_16s_ease-in-out_infinite]"
        style={{
          top: "30%",
          left: "50%",
          width: "min(900px, 90vw)",
          height: "min(900px, 90vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      {/* Secondary cyan / sky-blue glow — offset top-right */}
      <div
        className="absolute animate-[glow-drift-alt_20s_ease-in-out_infinite]"
        style={{
          top: "20%",
          left: "58%",
          width: "min(680px, 75vw)",
          height: "min(680px, 75vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.05) 45%, transparent 70%)",
          filter: "blur(130px)",
        }}
      />

      {/* Tertiary subtle purple accent — offset bottom-left */}
      <div
        className="absolute animate-[glow-drift_14s_ease-in-out_infinite_reverse]"
        style={{
          top: "55%",
          left: "38%",
          width: "min(520px, 60vw)",
          height: "min(520px, 60vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
          filter: "blur(150px)",
        }}
      />

      {/* Deep ambient fill — very large, very subtle, adds depth */}
      <div
        className="absolute"
        style={{
          top: "40%",
          left: "50%",
          width: "min(1200px, 120vw)",
          height: "min(1200px, 120vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(30,64,175,0.08) 0%, transparent 60%)",
          filter: "blur(160px)",
        }}
      />
    </div>
  );
}
