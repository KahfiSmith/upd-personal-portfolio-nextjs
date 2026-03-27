type SiteIconProps = {
  size: number;
};

export function SiteIcon({ size }: SiteIconProps) {
  const badgeSize = Math.round(size * 0.62);
  const letterSize = Math.round(size * 0.34);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgb(10 34 64) 0%, rgb(21 91 173) 52%, rgb(96 165 250) 100%)",
      }}
    >
      <div
        style={{
          width: badgeSize,
          height: badgeSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: Math.round(size * 0.22),
          border: `${Math.max(4, Math.round(size * 0.02))}px solid rgba(255,255,255,0.22)`,
          background: "rgba(255,255,255,0.08)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
          color: "white",
          fontSize: letterSize,
          fontWeight: 800,
          letterSpacing: `-${Math.max(1, Math.round(size * 0.02))}px`,
        }}
      >
        K
      </div>
    </div>
  );
}
