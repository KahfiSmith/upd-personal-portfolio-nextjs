"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { dataSkills } from "@/data/skills";

export default function SkillsMarque() {
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const row1 = row1Ref.current!;
    const row2 = row2Ref.current!;
    if (!row1 || !row2) return;

    // ====== CONFIG ======
    const SPEED_TOP = 200; // px/s
    const SPEED_BOTTOM = 200; // px/s (sedikit beda -> rasa paralaks)
    const FOLLOW_SCROLL = true; // auto reverse by scroll
    const LERP1 = 0.18; // smoothing top
    const LERP2 = 0.12; // smoothing bottom
    const DATA_KEY = "marqueeOriginal";
    // ====================

    // Pastikan child tidak punya margin horizontal; pakai gap di container (sudah OK).
    // WhiteSpace nowrap sudah diset via tailwind di JSX.

    function prepareRow(row: HTMLElement, viewport: number): number {
      if (!(row as any).dataset[DATA_KEY]) {
        (row as any).dataset[DATA_KEY] = row.innerHTML;
      }
      const baseHtml = String((row as any).dataset[DATA_KEY] || "").trim();
      if (!baseHtml) return 0;

      // Ukur satu sequence (tanpa duplikasi)
      const measurer = document.createElement(row.tagName.toLowerCase());
      measurer.className = row.className;
      Object.assign(measurer.style, {
        position: "absolute",
        left: "-999999px",
        top: "-999999px",
        visibility: "hidden",
        whiteSpace: "nowrap",
      } as CSSStyleDeclaration);
      measurer.innerHTML = baseHtml;
      document.body.appendChild(measurer);
      const singleWidth = measurer.scrollWidth || 0;
      document.body.removeChild(measurer);
      if (!singleWidth) return 0;

      // Buat 1 grup cukup lebar melampaui viewport, lalu gandakan → 2 grup identik
      const repeats = Math.max(1, Math.ceil(viewport / singleWidth) + 1);
      const groupHtml = baseHtml.repeat(repeats);
      const desired = groupHtml + groupHtml;
      if (row.innerHTML !== desired) row.innerHTML = desired;

      return singleWidth * repeats; // lebar SATU grup
    }

    const waitForImages = async (el: HTMLElement) => {
      const imgs = Array.from(el.querySelectorAll("img")) as HTMLImageElement[];
      if (!imgs.length) return;
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          // @ts-ignore
          if (img.decode) return img.decode().catch(() => {});
          return new Promise<void>((res) => {
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          });
        })
      );
    };

    // Siapkan konten
    let w1 = prepareRow(row1, window.innerWidth);
    let w2 = prepareRow(row2, window.innerWidth);

    // Tunggu gambar (anti selisih lebar yang bikin patah), lalu re-prepare
    (async () => {
      await waitForImages(row1);
      await waitForImages(row2);
      w1 = prepareRow(row1, window.innerWidth);
      w2 = prepareRow(row2, window.innerWidth);
    })();

    row1.style.willChange = "transform";
    row2.style.willChange = "transform";
    row1.style.backfaceVisibility = "hidden";
    row2.style.backfaceVisibility = "hidden";
    try {
      gsap.ticker.fps(60);
    } catch {}

    // Phase (0..w). x = -phase → gerak kanan→kiri saat dir>0
    let phase1 = 0;
    let phase2 = 0;

    // Arah halus (lerp dari target)
    let dirTarget = 1; // 1 = scroll turun → maju (kanan→kiri); -1 = scroll naik → balik
    let dirSmooth1 = 1;
    let dirSmooth2 = 1;

    let lastTime = performance.now();

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const roundPx = (v: number) => Math.round(v * dpr) / dpr;

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(0.001, Math.min(0.05, (now - lastTime) / 1000));
      lastTime = now;

      // Jika width belum terisi, baca dari DOM (ingat: total scrollWidth = 2 * w)
      if (!w1) w1 = (row1.scrollWidth || 0) / 2;
      if (!w2) w2 = (row2.scrollWidth || 0) / 2;
      if (!w1 || !w2) return;

      // Smooth arah
      if (FOLLOW_SCROLL) {
        dirSmooth1 += (dirTarget - dirSmooth1) * LERP1;
        dirSmooth2 += (dirTarget - dirSmooth2) * LERP2;
      }

      // Update phase: dir>0 → kanan→kiri (phase tambah), dir<0 → balik
      phase1 = (((phase1 + SPEED_TOP * dirSmooth1 * dt) % w1) + w1) % w1;
      phase2 = (((phase2 + SPEED_BOTTOM * dirSmooth2 * dt) % w2) + w2) % w2;

      // Terapkan transform (x = -phase) dan rounding DPM supaya seam tidak “patah”
      gsap.set(row1, { x: roundPx(-phase1), y: 0, z: 0, force3D: true });
      gsap.set(row2, { x: roundPx(-phase2), y: 0, z: 0, force3D: true });
    };

    gsap.ticker.add(tick);

    // === Event arah berdasarkan scroll / wheel / touch ===
    if (FOLLOW_SCROLL) {
      let lastScrollY = window.pageYOffset;

      const onScroll = () => {
        const y = window.pageYOffset;
        const dy = y - lastScrollY;
        lastScrollY = y;
        if (Math.abs(dy) < 1) return;
        dirTarget = dy > 0 ? 1 : -1;
      };

      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 1) return;
        dirTarget = e.deltaY > 0 ? 1 : -1;
      };

      let touchY = 0;
      const onTouchStart = (e: TouchEvent) => {
        touchY = e.touches[0]?.clientY ?? 0;
      };
      const onTouchMove = (e: TouchEvent) => {
        const cy = e.touches[0]?.clientY ?? 0;
        const dy = cy - touchY; // swipe up (dy<0) → scroll down → dir = +1
        if (Math.abs(dy) < 1) return;
        dirTarget = dy < 0 ? 1 : -1;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("wheel", onWheel as any, { passive: true });
      window.addEventListener("touchstart", onTouchStart as any, {
        passive: true,
      });
      window.addEventListener("touchmove", onTouchMove as any, {
        passive: true,
      });

      // Bersih-bersih
      const cleanupScroll = () => {
        window.removeEventListener("scroll", onScroll as any);
        window.removeEventListener("wheel", onWheel as any);
        window.removeEventListener("touchstart", onTouchStart as any);
        window.removeEventListener("touchmove", onTouchMove as any);
      };
      // simpan untuk dipanggil saat unmount
      (cleanupScroll as any)._ = true;
      (SkillsMarque as any)._cleanupScroll = cleanupScroll;
    }

    // === Resize & intrinsic width changes (late image/font) ===
    let resizeRaf = 0 as unknown as number;
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(async () => {
        const prevW1 = w1 || 1;
        const prevW2 = w2 || 1;
        await waitForImages(row1);
        await waitForImages(row2);
        w1 = prepareRow(row1, window.innerWidth);
        w2 = prepareRow(row2, window.innerWidth);
        if (w1) phase1 = ((phase1 / prevW1) * w1) % w1;
        if (w2) phase2 = ((phase2 / prevW2) * w2) % w2;
        resizeRaf = 0 as unknown as number;
      }) as unknown as number;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const ro1 = new ResizeObserver(() => {
      const half = (row1.scrollWidth || 0) / 2;
      if (!half) return;
      if (!w1) {
        w1 = half;
        return;
      }
      if (Math.abs(half - w1) > 0.5) {
        phase1 = ((phase1 / w1) * half) % half;
        w1 = half;
      }
    });
    const ro2 = new ResizeObserver(() => {
      const half = (row2.scrollWidth || 0) / 2;
      if (!half) return;
      if (!w2) {
        w2 = half;
        return;
      }
      if (Math.abs(half - w2) > 0.5) {
        phase2 = ((phase2 / w2) * half) % half;
        w2 = half;
      }
    });
    try {
      ro1.observe(row1);
      ro2.observe(row2);
    } catch {}

    return () => {
      try {
        gsap.ticker.remove(tick);
      } catch {}
      window.removeEventListener("resize", onResize as any);
      try {
        ro1.disconnect();
        ro2.disconnect();
      } catch {}
      const c = (SkillsMarque as any)._cleanupScroll;
      if (c && c._) c();
    };
  }, []);

  return (
    <section className="my-12 md:my-20 relative overflow-x-hidden overflow-y-visible pt-16 md:pt-24">
      <div className="relative py-16 md:py-20 overflow-visible">
        <div
          className="w-full max-w-none bg-charcoal text-cream px-6 py-8 md:px-10 md:py-12 overflow-x-hidden overflow-y-visible shadow-lg ring-1 ring-white/10 -rotate-6 origin-center relative z-20 mb-8 translate-y-2 md:translate-y-3"
          style={{ width: "calc(100% + 16rem)", marginLeft: "-8rem" }}
        >
          <div className="relative select-none overflow-x-hidden overflow-y-visible">
            <div
              ref={row1Ref}
              data-skills-row="1"
              className="flex gap-8 whitespace-nowrap will-change-transform py-4"
            >
              {dataSkills.map((s, i) => (
                <img
                  key={`row1-${s.label}-${i}`}
                  src={s.imgSrc}
                  alt={s.label}
                  className="block shrink-0 w-12 h-12 md:w-14 md:h-14 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="w-full bg-charcoal text-cream px-6 py-8 md:px-10 md:py-12 overflow-x-hidden shadow-lg ring-1 ring-white/10 relative z-10 -mt-6">
          <div className="relative select-none overflow-x-hidden">
            <div
              ref={row2Ref}
              data-skills-row="2"
              className="flex gap-8 whitespace-nowrap will-change-transform py-4"
            >
              {dataSkills.map((s, i) => (
                <img
                  key={`row2-${s.label}-${i}`}
                  src={s.imgSrc}
                  alt={s.label}
                  className="block shrink-0 w-12 h-12 md:w-14 md:h-14 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
