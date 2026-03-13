"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    category: "Keamanan Rumah",
    emoji: "🏠",
    text: "Seberapa kamu merasa aman dan nyaman bila berada di dalam rumah?",
    type: "scale", // 1=sangat tidak aman, 4=sangat aman
    reverse: false,
  },
  {
    id: 2,
    category: "Relasi Sosial",
    emoji: "💚",
    text: "Seberapa percaya kamu dengan teman yang selalu ada untuk mendengarkan keluh kesahmu?",
    type: "scale",
    reverse: false,
  },
  {
    id: 3,
    category: "Keamanan Rumah",
    emoji: "🚪",
    text: "Saat di rumah, apakah kamu ingin cepat pergi?",
    type: "scale",
    reverse: true, // lebih tinggi = lebih buruk
  },
  {
    id: 4,
    category: "Keamanan Rumah",
    emoji: "💬",
    text: "Seberapa mudah kamu merasa aman ketika bercerita tentang masalah pribadi ke orang rumah?",
    type: "scale",
    reverse: false,
  },
  {
    id: 5,
    category: "Pengakuan Diri",
    emoji: "🌟",
    text: "Apakah kamu merasa dihargai pendapatnya di rumah?",
    type: "scale",
    reverse: false,
  },
  {
    id: 6,
    category: "Kesehatan Mental",
    emoji: "😰",
    text: "Seberapa kamu merasa takut ketika akan menjalani kegiatan di setiap harinya?",
    type: "scale",
    reverse: true,
  },
  {
    id: 7,
    category: "Kesehatan Mental",
    emoji: "💪",
    text: "Apakah kamu merasa tingkat percaya diri kamu menurun?",
    type: "scale",
    reverse: true,
  },
  {
    id: 8,
    category: "Kesehatan Mental",
    emoji: "🌸",
    text: "Apakah kamu pernah memiliki rasa ingin menyakiti diri sendiri?",
    type: "scale",
    reverse: true,
    sensitive: true,
  },
  {
    id: 9,
    category: "Keamanan Lingkungan",
    emoji: "🛡️",
    text: "Apakah kamu pernah merasa mengalami pelecehan verbal atau non-verbal di lingkungan sekitarmu?",
    type: "scale",
    reverse: true,
    sensitive: true,
  },
  {
    id: 10,
    category: "Kepercayaan Sistem",
    emoji: "🗣️",
    text: "Apakah kamu pernah merasa takut untuk melapor atau bercerita karena khawatir tidak akan dipercaya dan didengar?",
    type: "scale",
    reverse: true,
  },
  {
    id: 11,
    category: "Kesadaran Diri",
    emoji: "✋",
    text: "Apakah kamu dapat memahami batasan sentuhan yang aman dan tidak aman?",
    type: "scale",
    reverse: false,
  },
  {
    id: 12,
    category: "Keamanan Lingkungan",
    emoji: "⚠️",
    text: "Seberapa sering kamu mendapatkan ancaman dari orang yang ada di lingkungan sekitarmu?",
    type: "scale",
    reverse: true,
  },
  {
    id: 13,
    category: "Perlindungan Hukum",
    emoji: "⚖️",
    text: "Apakah kamu merasa cukup adanya perlindungan hukum yang nyata?",
    type: "scale",
    reverse: false,
  },
  {
    id: 14,
    category: "Pemulihan Diri",
    emoji: "🌺",
    text: "Apakah kamu memiliki rasa dendam kepada orang yang menyakitimu?",
    type: "scale",
    reverse: true,
  },
  {
    id: 15,
    category: "Edukasi Hukum",
    emoji: "📚",
    text: "Apakah kamu merasa edukasi hukum tentang perlindungan perempuan dan anak sudah cukup disosialisasikan?",
    type: "scale",
    reverse: false,
  },
  {
    id: 16,
    category: "Kebijakan Publik",
    emoji: "📜",
    text: "Apakah kamu merasa perlu adanya peningkatan kebijakan hukum untuk menjamin rasa aman perempuan dan anak?",
    type: "scale",
    reverse: false,
  },
];

const scaleLabels: Record<number, string> = {
  1: "Tidak Sama Sekali",
  2: "Sedikit",
  3: "Cukup",
  4: "Sangat",
};

const scaleColors: Record<number, string> = {
  1: "rgba(232,181,181,0.6)",   // muted rose
  2: "rgba(232,210,160,0.6)",   // warm amber
  3: "rgba(168,192,154,0.5)",   // muted sage
  4: "rgba(94,128,80,0.7)",     // sage dark
};

const scaleSelectedColors: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: "rgba(220,120,120,0.15)", border: "#D4756B", text: "#8B4040" },
  2: { bg: "rgba(210,170,80,0.15)", border: "#C4975A", text: "#7A5A1A" },
  3: { bg: "rgba(135,168,120,0.18)", border: "#87A878", text: "#3E6835" },
  4: { bg: "rgba(94,128,80,0.2)", border: "#5E8050", text: "#2D5020" },
};

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const progressFilled = (Object.keys(answers).length / questions.length) * 100;

  useEffect(() => {
    setSelected(answers[q.id] ?? null);
  }, [current, answers, q.id]);

  const handleSelect = (val: number) => {
    setSelected(val);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);

    if (current === questions.length - 1) {
      // Calculate score and go to results
      const totalScore = questions.reduce((acc, question) => {
        const ans = newAnswers[question.id] ?? 0;
        return acc + (question.reverse ? (5 - ans) : ans);
      }, 0);
      const maxScore = questions.length * 4;
      const percentage = Math.round((totalScore / maxScore) * 100);
      router.push(`/result?score=${percentage}&answers=${encodeURIComponent(JSON.stringify(newAnswers))}`);
      return;
    }

    setDirection("forward");
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(c => c + 1);
      setTransitioning(false);
    }, 280);
  };

  const handleBack = () => {
    if (current === 0) return;
    setDirection("back");
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(c => c - 1);
      setTransitioning(false);
    }, 280);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, var(--cream) 0%, var(--sage-pale) 40%, var(--cream-dark) 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--font-body)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-15%",
          width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          background: "radial-gradient(ellipse, rgba(168,192,154,0.15) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-10%",
          width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
          borderRadius: "40% 60% 30% 70%",
          background: "radial-gradient(ellipse, rgba(232,180,184,0.12) 0%, transparent 70%)",
        }} />
      </div>

      {/* Header */}
      <header style={{
        padding: "1.5rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(251,247,240,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(135,168,120,0.15)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--font-display)", fontSize: "1rem",
            color: "var(--sage-dark)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem",
          }}
        >
          🌿 Ruang Aman
        </button>
        <div style={{
          fontSize: "0.82rem", color: "var(--text-muted)",
          fontWeight: 400, letterSpacing: "0.04em",
        }}>
          {current + 1} / {questions.length}
        </div>
      </header>

      {/* Progress bar */}
      <div style={{
        width: "100%", height: 3,
        background: "rgba(135,168,120,0.15)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          height: "100%",
          width: `${progressFilled + ((selected !== null ? 1 : 0) / questions.length * 100)}%`,
          background: "linear-gradient(to right, var(--sage-muted), var(--sage-dark))",
          transition: "width 0.4s ease",
          borderRadius: "0 999px 999px 0",
        }} />
      </div>

      {/* Main quiz content */}
      <main style={{
        flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "3rem 1.5rem",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          width: "100%", maxWidth: 680,
          opacity: transitioning ? 0 : 1,
          transform: transitioning
            ? direction === "forward" ? "translateX(-20px)" : "translateX(20px)"
            : "translateX(0)",
          transition: "all 0.28s ease",
        }}>
          {/* Question card */}
          <div style={{
            background: "rgba(251,247,240,0.85)",
            border: "1px solid rgba(135,168,120,0.2)",
            borderRadius: 28,
            padding: "clamp(2rem, 5vw, 3.5rem)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(94,128,80,0.08), 0 2px 8px rgba(94,128,80,0.05)",
          }}>
            {/* Category badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(135,168,120,0.12)",
              border: "1px solid rgba(135,168,120,0.22)",
              borderRadius: 999, padding: "0.3rem 0.9rem",
              fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 500,
              letterSpacing: "0.04em", marginBottom: "1.8rem",
            }}>
              <span>{q.emoji}</span>
              <span>{q.category}</span>
            </div>

            {/* Question number */}
            <div style={{
              fontSize: "0.75rem", color: "var(--text-muted)",
              letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: "0.6rem", fontWeight: 500,
            }}>
              Pertanyaan {current + 1}
            </div>

            {/* Question text */}
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "var(--text-dark)",
              lineHeight: 1.45,
              marginBottom: "2.5rem",
            }}>
              {q.text}
            </h2>

            {/* Sensitive question notice */}
            {q.sensitive && (
              <div style={{
                background: "rgba(232,180,184,0.15)",
                border: "1px solid rgba(232,180,184,0.3)",
                borderRadius: 12, padding: "0.8rem 1.1rem",
                marginBottom: "1.8rem",
                display: "flex", alignItems: "flex-start", gap: "0.6rem",
              }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>💙</span>
                <p style={{
                  fontSize: "0.8rem", color: "var(--text-medium)", lineHeight: 1.5,
                }}>
                  Ini pertanyaan yang sensitif. Jawablah sesuai perasaanmu dengan jujur. Semua jawaban aman dan tidak disimpan.
                  {q.id === 8 && " Jika kamu membutuhkan bantuan, hubungi 119 ext 8 (Hotline Kemenkes)."}
                </p>
              </div>
            )}

            {/* Scale options */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
              marginBottom: "2.5rem",
            }}>
              {[1, 2, 3, 4].map((val) => {
                const isSelected = selected === val;
                const colors = scaleSelectedColors[val];
                return (
                  <button
                    key={val}
                    onClick={() => handleSelect(val)}
                    style={{
                      padding: "1.1rem 0.8rem",
                      border: `1.5px solid ${isSelected ? colors.border : "rgba(135,168,120,0.2)"}`,
                      borderRadius: 16,
                      background: isSelected ? colors.bg : "rgba(255,255,255,0.6)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "0.5rem",
                      transform: isSelected ? "scale(1.025)" : "scale(1)",
                      boxShadow: isSelected ? `0 4px 16px ${colors.border}28` : "none",
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = colors.border;
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.8)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.015)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(135,168,120,0.2)";
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.6)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                      }
                    }}
                  >
                    {/* Number indicator */}
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: isSelected ? colors.border : scaleColors[val],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem", fontWeight: 700,
                      color: isSelected ? "white" : "rgba(45,59,42,0.7)",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}>
                      {val}
                    </div>
                    <span style={{
                      fontSize: "0.78rem",
                      color: isSelected ? colors.text : "var(--text-medium)",
                      fontWeight: isSelected ? 500 : 400,
                      textAlign: "center",
                      lineHeight: 1.3,
                      transition: "all 0.2s ease",
                    }}>
                      {scaleLabels[val]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
            }}>
              <button
                onClick={handleBack}
                disabled={current === 0}
                style={{
                  padding: "0.85rem 1.8rem",
                  background: "transparent",
                  border: "1.5px solid rgba(135,168,120,0.3)",
                  borderRadius: 999, cursor: current === 0 ? "not-allowed" : "pointer",
                  color: current === 0 ? "var(--text-muted)" : "var(--text-medium)",
                  fontSize: "0.9rem", fontFamily: "var(--font-body)",
                  transition: "all 0.2s ease",
                  opacity: current === 0 ? 0.4 : 1,
                }}
              >
                ← Kembali
              </button>

              <button
                onClick={handleNext}
                disabled={selected === null}
                style={{
                  padding: "0.9rem 2.2rem",
                  background: selected !== null
                    ? "linear-gradient(135deg, var(--sage-dark), var(--sage))"
                    : "rgba(135,168,120,0.2)",
                  color: selected !== null ? "white" : "var(--text-muted)",
                  border: "none", borderRadius: 999,
                  cursor: selected !== null ? "pointer" : "not-allowed",
                  fontSize: "0.9rem", fontFamily: "var(--font-body)", fontWeight: 500,
                  letterSpacing: "0.03em",
                  transition: "all 0.3s ease",
                  boxShadow: selected !== null ? "0 6px 20px rgba(94,128,80,0.25)" : "none",
                  transform: "scale(1)",
                }}
                onMouseEnter={e => {
                  if (selected !== null) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 28px rgba(94,128,80,0.35)";
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = selected !== null ? "0 6px 20px rgba(94,128,80,0.25)" : "none";
                }}
              >
                {current === questions.length - 1 ? "Lihat Hasil ✨" : "Selanjutnya →"}
              </button>
            </div>
          </div>

          {/* Mini progress dots */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "5px",
            marginTop: "1.8rem", flexWrap: "wrap", maxWidth: 400, margin: "1.8rem auto 0",
          }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                width: i === current ? 20 : 8, height: 8, borderRadius: 999,
                background: answers[questions[i].id] !== undefined
                  ? "var(--sage-dark)"
                  : i === current
                  ? "var(--sage)"
                  : "rgba(135,168,120,0.25)",
                transition: "all 0.3s ease",
                flexShrink: 0,
              }} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
