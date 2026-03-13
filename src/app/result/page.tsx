"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface ResultLevel {
  range: [number, number];
  label: string;
  sublabel: string;
  emoji: string;
  color: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  message: string;
  tips: string[];
  resources: { name: string; contact: string; emoji: string }[];
}

const resultLevels: ResultLevel[] = [
  {
    range: [0, 30],
    label: "Butuh Perhatian Segera",
    sublabel: "Level Keamanan: Kritis",
    emoji: "🌧️",
    color: "#C4534A",
    accentColor: "#E8827A",
    bgGradient: "linear-gradient(145deg, rgba(232,130,122,0.15) 0%, rgba(251,247,240,1) 60%)",
    description:
      "Hasil kuesionermu menunjukkan bahwa kamu mungkin sedang berada dalam situasi yang cukup berat. Rasa aman adalah hak dasarmu, dan kamu berhak mendapatkan dukungan.",
    message:
      "Kamu tidak harus menanggung semuanya sendirian. Ada orang-orang yang mau mendengar dan membantumu.",
    tips: [
      "Hubungi layanan bantuan darurat jika kamu merasa dalam bahaya",
      "Ceritakan situasimu kepada seseorang yang kamu percaya",
      "Kamu berhak mendapatkan rasa aman — jangan ragu mencari pertolongan",
      "Simpan nomor hotline penting di ponselmu",
    ],
    resources: [
      { name: "Hotline KDRT Kemensos", contact: "021-500-454", emoji: "📞" },
      { name: "Komnas Perempuan", contact: "021-390-3963", emoji: "📞" },
      { name: "Crisis Center KPPPA", contact: "1500-454", emoji: "🆘" },
    ],
  },
  {
    range: [31, 50],
    label: "Dalam Proses Pemulihan",
    sublabel: "Level Keamanan: Waspada",
    emoji: "🌤️",
    color: "#C4855A",
    accentColor: "#D4A574",
    bgGradient: "linear-gradient(145deg, rgba(220,165,100,0.12) 0%, rgba(251,247,240,1) 60%)",
    description:
      "Ada beberapa area dalam hidupmu yang masih membutuhkan perhatian. Kamu sudah menunjukkan ketangguhan, dan langkah kecil menuju rasa aman itu bermakna.",
    message:
      "Setiap langkah kecil yang kamu ambil adalah bentuk keberanian. Kamu sudah membuktikan bahwa kamu kuat.",
    tips: [
      "Identifikasi satu orang yang bisa kamu percaya untuk berbagi cerita",
      "Pelajari hak-hakmu sebagai perempuan — pengetahuan adalah kekuatan",
      "Batasi interaksi dengan orang-orang yang membuatmu tidak nyaman",
      "Cari komunitas atau kelompok dukungan perempuan",
    ],
    resources: [
      { name: "LBH APIK Jakarta", contact: "021-788-41580", emoji: "⚖️" },
      { name: "Yayasan Pulih", contact: "021-788-42580", emoji: "💚" },
      { name: "Hotline Into The Light", contact: "119 ext 8", emoji: "🌟" },
    ],
  },
  {
    range: [51, 70],
    label: "Cukup Aman, Terus Bertumbuh",
    sublabel: "Level Keamanan: Stabil",
    emoji: "🌿",
    color: "#5E8050",
    accentColor: "#87A878",
    bgGradient: "linear-gradient(145deg, rgba(135,168,120,0.15) 0%, rgba(251,247,240,1) 60%)",
    description:
      "Kamu berada di posisi yang cukup stabil. Ada fondasi keamanan yang sudah terbangun, meski masih ada ruang untuk tumbuh lebih kuat lagi.",
    message:
      "Kamu telah membangun fondasi yang baik. Teruslah memperkuat dirimu dan orang-orang di sekitarmu.",
    tips: [
      "Perkuat jaringan dukunganmu — lebih banyak teman yang bisa dipercaya",
      "Pelajari lebih dalam tentang hak-hak perempuan di Indonesia",
      "Bantu perempuan lain yang mungkin membutuhkan dukunganmu",
      "Tetap setia pada batasan-batasan sehat yang sudah kamu bangun",
    ],
    resources: [
      { name: "Komnas HAM", contact: "komnas.go.id", emoji: "🏛️" },
      { name: "SAPA Indonesia", contact: "sapa.or.id", emoji: "🌸" },
      { name: "Forum Perempuan", contact: "021-789-3000", emoji: "💬" },
    ],
  },
  {
    range: [71, 85],
    label: "Kuat & Berdaya",
    sublabel: "Level Keamanan: Baik",
    emoji: "🌸",
    color: "#4A7040",
    accentColor: "#87A878",
    bgGradient: "linear-gradient(145deg, rgba(135,168,120,0.18) 0%, rgba(240,248,235,0.8) 40%, rgba(251,247,240,1) 100%)",
    description:
      "Kamu menunjukkan tingkat rasa aman yang baik di berbagai aspek kehidupan. Dukungan sosialmu kuat dan kamu memiliki kesadaran diri yang tinggi.",
    message:
      "Kamu adalah perempuan yang berdaya. Bagikan energi positifmu kepada perempuan lain yang masih dalam perjalanan.",
    tips: [
      "Jadilah mentor atau teman yang mendukung perempuan lain",
      "Terus tingkatkan literasi hukum dan advokasi perempuan",
      "Jaga wellbeing mental dan fisikmu dengan konsisten",
      "Gunakan suaramu untuk memperjuangkan ruang aman bersama",
    ],
    resources: [
      { name: "Become a Volunteer", contact: "komnas-perempuan.go.id", emoji: "🤝" },
      { name: "Komunitas Perempuan", contact: "sapa.or.id", emoji: "🌱" },
      { name: "Kowani", contact: "kowani.or.id", emoji: "🌺" },
    ],
  },
  {
    range: [86, 100],
    label: "Perempuan Kuat & Aman",
    sublabel: "Level Keamanan: Sangat Baik",
    emoji: "✨",
    color: "#3A6030",
    accentColor: "#5E8050",
    bgGradient: "linear-gradient(145deg, rgba(94,128,80,0.2) 0%, rgba(168,192,154,0.12) 40%, rgba(251,247,240,1) 100%)",
    description:
      "Luar biasa! Kamu memiliki tingkat rasa aman yang sangat tinggi. Fondasi yang kamu bangun — dari rumah, relasi, hingga kesadaran hukum — sangat kuat.",
    message:
      "Kamu adalah inspirasi. Kekuatanmu nyata, dan duniamu lebih aman karena kamu ada di dalamnya.",
    tips: [
      "Teruslah menjadi teladan keamanan dan ketangguhan bagi perempuan lain",
      "Aktif dalam advokasi kebijakan perlindungan perempuan dan anak",
      "Bagikan pengetahuanmu tentang hak perempuan di komunitasmu",
      "Jadilah suara bagi mereka yang belum bisa bersuara",
    ],
    resources: [
      { name: "Volunteer Komnas Perempuan", contact: "komnas-perempuan.go.id", emoji: "🌟" },
      { name: "Advocacy Network", contact: "lbhapik.or.id", emoji: "⚖️" },
      { name: "Share Your Story", contact: "sapa.or.id", emoji: "💚" },
    ],
  },
];

function getResult(score: number): ResultLevel {
  return (
    resultLevels.find(
      (r) => score >= r.range[0] && score <= r.range[1]
    ) || resultLevels[2]
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const scoreParam = searchParams.get("score");
  const score = scoreParam ? parseInt(scoreParam) : 50;
  const result = getResult(score);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Animated score counter
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = score / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [visible, score]);

  const circumference = 2 * Math.PI * 54;
  const dash = (score / 100) * circumference;

  return (
    <div style={{
      minHeight: "100vh",
      background: result.bgGradient,
      fontFamily: "var(--font-body)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background organic */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-15%",
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          borderRadius: "60% 40% 70% 30%",
          background: `radial-gradient(ellipse, ${result.color}18 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-10%",
          width: "45vw", height: "45vw", maxWidth: 550, maxHeight: 550,
          borderRadius: "40% 60% 30% 70%",
          background: "radial-gradient(ellipse, rgba(232,180,184,0.1) 0%, transparent 70%)",
        }} />
      </div>

      {/* Sticky header */}
      <header style={{
        padding: "1.5rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(251,247,240,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(135,168,120,0.12)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--font-display)", fontSize: "1rem",
            color: "var(--sage-dark)", fontWeight: 500,
          }}
        >
          🌿 Ruang Aman
        </button>
        <button
          onClick={() => router.push("/quiz")}
          style={{
            padding: "0.5rem 1.2rem",
            background: "transparent",
            border: "1px solid rgba(135,168,120,0.3)",
            borderRadius: 999, cursor: "pointer",
            fontSize: "0.8rem", color: "var(--sage-dark)",
            fontFamily: "var(--font-body)", fontWeight: 400,
            transition: "all 0.2s ease",
          }}
        >
          Ulangi Kuesioner
        </button>
      </header>

      <main style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "3rem 1.5rem 5rem",
        position: "relative", zIndex: 2,
      }}>
        {/* Hero result card */}
        <div style={{
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          marginBottom: "3rem",
        }}>
          {/* Score circle */}
          <div style={{
            display: "inline-flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative", marginBottom: "2rem",
          }}>
            <svg width={128} height={128} style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx={64} cy={64} r={54}
                fill="none"
                stroke="rgba(135,168,120,0.15)"
                strokeWidth={8}
              />
              <circle
                cx={64} cy={64} r={54}
                fill="none"
                stroke={result.accentColor}
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                style={{ transition: "stroke-dasharray 1.5s ease 0.3s" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "2rem" }}>{result.emoji}</span>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700,
                color: result.color, lineHeight: 1,
              }}>
                {displayScore}%
              </span>
            </div>
          </div>

          {/* Level badge */}
          <div style={{
            display: "inline-block",
            background: `${result.color}18`,
            border: `1px solid ${result.color}35`,
            borderRadius: 999, padding: "0.35rem 1rem",
            fontSize: "0.75rem", color: result.color, fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: "1.2rem",
          }}>
            {result.sublabel}
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-dark)",
            lineHeight: 1.2, marginBottom: "1.2rem",
          }}>
            {result.label}
          </h1>

          <p style={{
            fontSize: "1rem", color: "var(--text-medium)",
            maxWidth: 560, margin: "0 auto 1.5rem",
            lineHeight: 1.8,
          }}>
            {result.description}
          </p>

          {/* Personal message */}
          <div style={{
            background: "rgba(251,247,240,0.8)",
            border: `1px solid ${result.color}25`,
            borderRadius: 16, padding: "1.5rem 2rem",
            maxWidth: 540, margin: "0 auto",
            backdropFilter: "blur(8px)",
          }}>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "1.05rem", color: "var(--text-dark)", lineHeight: 1.6,
            }}>
              "{result.message}"
            </p>
          </div>
        </div>

        {/* Tips section */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.3s",
          marginBottom: "2.5rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem", fontWeight: 600,
            color: "var(--text-dark)", marginBottom: "1.2rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            🌱 Langkah untuk Kamu
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}>
            {result.tips.map((tip, i) => (
              <div key={i} style={{
                background: "rgba(251,247,240,0.85)",
                border: "1px solid rgba(135,168,120,0.2)",
                borderRadius: 16, padding: "1.2rem 1.5rem",
                display: "flex", gap: "0.85rem", alignItems: "flex-start",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 28px ${result.color}14`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${result.accentColor}40`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(135,168,120,0.2)";
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: `${result.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: result.color,
                  fontFamily: "var(--font-display)",
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: "0.87rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.5s",
          marginBottom: "3rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600,
            color: "var(--text-dark)", marginBottom: "1.2rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            📞 Sumber Bantuan
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {result.resources.map((res, i) => (
              <div key={i} style={{
                background: "rgba(251,247,240,0.85)",
                border: "1px solid rgba(135,168,120,0.2)",
                borderRadius: 16, padding: "1.3rem",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 24px rgba(94,128,80,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{res.emoji}</div>
                <div style={{ fontWeight: 500, fontSize: "0.88rem", color: "var(--text-dark)", marginBottom: "0.3rem" }}>
                  {res.name}
                </div>
                <div style={{ fontSize: "0.82rem", color: result.color, fontWeight: 500 }}>
                  {res.contact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transition: "all 0.8s ease 0.7s",
        }}>
          <button
            onClick={() => router.push("/quiz")}
            style={{
              padding: "0.95rem 2.2rem",
              background: `linear-gradient(135deg, ${result.color}, ${result.accentColor})`,
              color: "white", border: "none", borderRadius: 999,
              cursor: "pointer", fontSize: "0.95rem",
              fontFamily: "var(--font-body)", fontWeight: 500,
              boxShadow: `0 8px 24px ${result.color}30`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 14px 32px ${result.color}40`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px ${result.color}30`;
            }}
          >
            🔄 Coba Lagi
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "0.9rem 2rem",
              background: "transparent",
              color: "var(--text-medium)",
              border: "1.5px solid rgba(135,168,120,0.3)",
              borderRadius: 999, cursor: "pointer",
              fontSize: "0.92rem", fontFamily: "var(--font-body)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(135,168,120,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            🏠 Kembali ke Awal
          </button>
        </div>

        {/* Bottom note */}
        <p style={{
          textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)",
          marginTop: "3rem", lineHeight: 1.7,
        }}>
          Hasil ini bukan diagnosis medis atau profesional.<br />
          Ini adalah gambaran awal untuk membantu pemahamanmu.
          Jika kamu merasa membutuhkan bantuan lebih,<br />
          jangan ragu untuk menghubungi profesional.
        </p>
      </main>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--cream)", fontFamily: "var(--font-display)", color: "var(--sage-dark)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", animation: "floatSlow 2s ease-in-out infinite", marginBottom: "1rem" }}>🌿</div>
          <p>Menganalisis jawabanmu...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
