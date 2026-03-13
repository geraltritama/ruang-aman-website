"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const floatingElements = [
  { emoji: "🌿", top: "12%", left: "8%", delay: "0s", speed: "6s", size: "1.6rem" },
  { emoji: "🌸", top: "20%", right: "10%", delay: "1s", speed: "5s", size: "1.4rem" },
  { emoji: "✨", top: "55%", left: "5%", delay: "2s", speed: "7s", size: "1.2rem" },
  { emoji: "🌿", top: "70%", right: "8%", delay: "0.5s", speed: "5.5s", size: "1.5rem" },
  { emoji: "🌺", top: "40%", left: "92%", delay: "1.5s", speed: "6.5s", size: "1.3rem" },
  { emoji: "🍃", top: "85%", left: "12%", delay: "3s", speed: "8s", size: "1.1rem" },
];

const stats = [
  { number: "1 dari 3", label: "perempuan pernah mengalami kekerasan dalam hidupnya" },
  { number: "63%", label: "korban tidak pernah melapor karena takut tidak dipercaya" },
  { number: "16", label: "pertanyaan untuk memahami rasa amanmu" },
];

export default function LandingPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", position: "relative", overflow: "hidden" }}>
      {/* Background organic shapes */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-15%", right: "-10%",
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(168,192,154,0.18) 0%, rgba(168,192,154,0.04) 70%)",
          filter: "blur(2px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "-8%",
          width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%",
          background: "radial-gradient(ellipse at 60% 60%, rgba(232,180,184,0.15) 0%, rgba(232,180,184,0.03) 70%)",
          filter: "blur(2px)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "30%",
          width: "30vw", height: "30vw", maxWidth: 400, maxHeight: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,192,220,0.10) 0%, transparent 70%)",
        }} />
      </div>

      {/* Floating decorative elements */}
      {floatingElements.map((el, i) => (
        <div key={i} style={{
          position: "fixed",
          top: el.top,
          left: (el as any).left,
          right: (el as any).right,
          fontSize: el.size,
          animation: `floatSlow ${el.speed} ease-in-out infinite`,
          animationDelay: el.delay,
          zIndex: 1,
          opacity: 0.5,
          pointerEvents: "none",
          userSelect: "none",
        }}>
          {el.emoji}
        </div>
      ))}

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.2rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(251,247,240,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(135,168,120,0.15)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "1.1rem",
          color: "var(--sage-dark)", fontWeight: 500, letterSpacing: "0.02em",
        }}>
          🌿 Ruang Aman
        </div>
        <button
          onClick={() => router.push("/quiz")}
          style={{
            padding: "0.55rem 1.4rem",
            background: "var(--sage-dark)", color: "var(--cream)",
            border: "none", borderRadius: 999, cursor: "pointer",
            fontSize: "0.82rem", fontFamily: "var(--font-body)", fontWeight: 500,
            letterSpacing: "0.03em", transition: "all 0.25s ease",
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.background = "var(--sage)";
            (e.target as HTMLButtonElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.background = "var(--sage-dark)";
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          Mulai Kuesioner
        </button>
      </nav>

      {/* HERO SECTION */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column",
        padding: "8rem 2rem 5rem",
        position: "relative", zIndex: 2,
        textAlign: "center",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(135,168,120,0.12)", border: "1px solid rgba(135,168,120,0.3)",
          borderRadius: 999, padding: "0.4rem 1.1rem", marginBottom: "2.5rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease",
        }}>
          <span style={{ fontSize: "0.78rem", color: "var(--sage-dark)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            ✦ Kuesioner Rasa Aman ✦
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "var(--text-dark)",
          maxWidth: 820,
          marginBottom: "1rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.9s ease 0.1s",
        }}>
          Ruang Aman
          <br />
          <span style={{
            fontStyle: "italic", color: "var(--sage-dark)",
            background: "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage) 50%, var(--blush) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            untuk Kita
          </span>
        </h1>

        {/* Sub headline */}
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
          fontStyle: "italic",
          color: "var(--text-light)",
          marginBottom: "2rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.9s ease 0.25s",
        }}>
          Perempuan Kuat
        </p>

        {/* Description */}
        <p style={{
          fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
          color: "var(--text-medium)",
          maxWidth: 560,
          lineHeight: 1.85,
          marginBottom: "3.5rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s ease 0.4s",
        }}>
          Ketahui seberapa aman ruang hidupmu — dari rumah, lingkungan, hingga hukum.
          16 pertanyaan sederhana untuk memahami kondisi dan kekuatanmu.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s ease 0.55s",
        }}>
          <button
            onClick={() => router.push("/quiz")}
            style={{
              padding: "1rem 2.8rem",
              background: "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage) 100%)",
              color: "white",
              border: "none", borderRadius: 999, cursor: "pointer",
              fontSize: "1rem", fontFamily: "var(--font-body)", fontWeight: 500,
              letterSpacing: "0.04em",
              boxShadow: "0 8px 32px rgba(94,128,80,0.3), 0 2px 8px rgba(94,128,80,0.2)",
              transition: "all 0.3s ease",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(94,128,80,0.4), 0 4px 12px rgba(94,128,80,0.25)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(94,128,80,0.3), 0 2px 8px rgba(94,128,80,0.2)";
            }}
          >
            Mulai Kuesioner →
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "1rem 2.2rem",
              background: "transparent",
              color: "var(--sage-dark)",
              border: "1.5px solid rgba(94,128,80,0.35)",
              borderRadius: 999, cursor: "pointer",
              fontSize: "0.95rem", fontFamily: "var(--font-body)", fontWeight: 400,
              letterSpacing: "0.03em",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.background = "rgba(94,128,80,0.08)";
              (e.target as HTMLButtonElement).style.borderColor = "var(--sage)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.background = "transparent";
              (e.target as HTMLButtonElement).style.borderColor = "rgba(94,128,80,0.35)";
            }}
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          opacity: 0.5, animation: "floatMed 2.5s ease-in-out infinite",
        }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, var(--sage-muted), transparent)" }} />
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{
        padding: "5rem 2rem",
        position: "relative", zIndex: 2,
        background: "linear-gradient(180deg, transparent 0%, rgba(135,168,120,0.06) 50%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: "center",
                padding: "2.5rem 1.5rem",
                background: "rgba(251,247,240,0.8)",
                border: "1px solid rgba(135,168,120,0.2)",
                borderRadius: 20,
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(94,128,80,0.12)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(135,168,120,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(135,168,120,0.2)";
                }}
              >
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700,
                  color: "var(--sage-dark)", marginBottom: "0.75rem", lineHeight: 1,
                  background: "linear-gradient(135deg, var(--sage-dark), var(--sage))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {stat.number}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-medium)", lineHeight: 1.6 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{
        padding: "6rem 2rem",
        position: "relative", zIndex: 2,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
            className="about-grid"
          >
            {/* Left: Visual card */}
            <div style={{ position: "relative" }}>
              {/* Main card */}
              <div style={{
                background: "linear-gradient(145deg, var(--sage-pale) 0%, var(--cream-dark) 100%)",
                border: "1px solid rgba(135,168,120,0.25)",
                borderRadius: 24,
                padding: "3rem",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Decorative circles */}
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 120, height: 120, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(232,180,184,0.3), transparent)",
                }} />
                <div style={{
                  position: "absolute", bottom: -20, left: -20,
                  width: 100, height: 100, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(135,168,120,0.2), transparent)",
                }} />

                {/* Big emoji */}
                <div style={{ fontSize: "4rem", marginBottom: "1.5rem", animation: "floatSlow 5s ease-in-out infinite" }}>
                  🌿
                </div>

                <p style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic",
                  fontSize: "1.25rem", color: "var(--text-dark)", lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}>
                  "Perempuan yang kuat bukan yang tidak pernah terluka, tapi yang tetap berdiri dan mencari pertolongan."
                </p>
                <div style={{
                  width: 40, height: 2,
                  background: "linear-gradient(to right, var(--sage), var(--blush))",
                  marginBottom: "0.75rem",
                }} />
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                  — RUANG AMAN UNTUK KITA
                </p>
              </div>

              {/* Floating mini card */}
              <div style={{
                position: "absolute", bottom: -28, right: -28,
                background: "rgba(251,247,240,0.95)",
                border: "1px solid rgba(135,168,120,0.2)",
                borderRadius: 16, padding: "1.2rem 1.5rem",
                boxShadow: "0 12px 32px rgba(94,128,80,0.12)",
                animation: "floatMed 4s ease-in-out infinite",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>💚</span>
                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-dark)" }}>Aman & Privat</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Jawabanmu tidak disimpan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <span style={{
                fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--sage)", fontWeight: 500, marginBottom: "1rem", display: "block",
              }}>
                Tentang Kuesioner
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.25, marginBottom: "1.5rem",
              }}>
                Memahami Rasa Amanmu adalah Langkah Pertama Menuju Kekuatan
              </h2>
              <p style={{ color: "var(--text-medium)", lineHeight: 1.85, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Kuesioner ini dirancang untuk membantu perempuan memahami kondisi keamanan mereka
                di berbagai aspek kehidupan — dari rumah, relasi sosial, hingga lingkungan hukum.
              </p>
              <p style={{ color: "var(--text-medium)", lineHeight: 1.85, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
                Dengan skala 1–4 pada setiap pertanyaan, kamu akan mendapatkan gambaran yang lebih
                jelas tentang area mana yang sudah kuat dan mana yang masih perlu perhatian.
              </p>

              {/* Feature list */}
              {[
                { icon: "🔒", title: "100% Anonim", desc: "Tidak ada data yang disimpan atau dibagikan" },
                { icon: "⏱️", title: "5–8 menit", desc: "Singkat, sederhana, dan bermakna" },
                { icon: "📊", title: "Hasil Personal", desc: "Analisis berdasarkan jawabanmu" },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  marginBottom: "1.2rem",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: "rgba(135,168,120,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.15rem",
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "0.92rem", color: "var(--text-dark)", marginBottom: "0.15rem" }}>{f.title}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        padding: "5rem 2rem",
        background: "linear-gradient(180deg, transparent 0%, rgba(135,168,120,0.05) 30%, rgba(135,168,120,0.08) 70%, transparent 100%)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={{
            fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--sage)", fontWeight: 500, marginBottom: "1rem", display: "block",
          }}>
            Cara Kerja
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3.5vw, 2.3rem)",
            fontWeight: 700, color: "var(--text-dark)", marginBottom: "3.5rem",
          }}>
            Tiga Langkah Menuju Pemahaman Diri
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}>
            {[
              {
                step: "01", icon: "💭", title: "Jawab Kuesioner",
                desc: "16 pertanyaan tentang rasa aman di berbagai aspek kehidupanmu. Tidak ada jawaban yang salah.",
              },
              {
                step: "02", icon: "📊", title: "Analisis Otomatis",
                desc: "Sistem akan menganalisis polamu dan mengkategorikan tingkat rasa amanmu secara holistik.",
              },
              {
                step: "03", icon: "🌱", title: "Pahami & Bertumbuh",
                desc: "Dapatkan hasil yang bermakna, beserta saran dan langkah yang bisa kamu ambil.",
              },
            ].map((step, i) => (
              <div key={i} style={{
                padding: "2.5rem 2rem",
                background: "rgba(251,247,240,0.8)",
                border: "1px solid rgba(135,168,120,0.18)",
                borderRadius: 20,
                position: "relative",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 48px rgba(94,128,80,0.14)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(135,168,120,0.35)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(135,168,120,0.18)";
                }}
              >
                <div style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700,
                  color: "rgba(135,168,120,0.12)", lineHeight: 1,
                }}>
                  {step.step}
                </div>
                <div style={{ fontSize: "2.2rem", marginBottom: "1.2rem" }}>{step.icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600,
                  color: "var(--text-dark)", marginBottom: "0.75rem",
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-medium)", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        padding: "7rem 2rem",
        position: "relative", zIndex: 2, textAlign: "center",
      }}>
        {/* Big decorative circle */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(135,168,120,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-light)", marginBottom: "1.5rem",
          }}>
            Rasa aman bukan kemewahan.<br />Itu hak dasarmu.
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.15,
            marginBottom: "2.5rem",
          }}>
            Siap Mengenal Dirimu<br />
            <span style={{
              fontStyle: "italic", color: "var(--sage-dark)",
              background: "linear-gradient(135deg, var(--sage-dark), var(--sage))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Lebih Dalam?
            </span>
          </h2>
          <button
            onClick={() => router.push("/quiz")}
            style={{
              padding: "1.1rem 3.5rem",
              background: "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage) 100%)",
              color: "white",
              border: "none", borderRadius: 999, cursor: "pointer",
              fontSize: "1.05rem", fontFamily: "var(--font-body)", fontWeight: 500,
              letterSpacing: "0.04em",
              boxShadow: "0 12px 40px rgba(94,128,80,0.35), 0 4px 12px rgba(94,128,80,0.2)",
              transition: "all 0.3s ease",
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = "translateY(-4px) scale(1.02)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 18px 50px rgba(94,128,80,0.4), 0 6px 16px rgba(94,128,80,0.25)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(94,128,80,0.35), 0 4px 12px rgba(94,128,80,0.2)";
            }}
          >
            Mulai Sekarang 🌿
          </button>

          <p style={{ marginTop: "1.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Gratis · Anonim · Tidak perlu akun
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(135,168,120,0.15)",
        padding: "2.5rem 2rem",
        textAlign: "center",
        position: "relative", zIndex: 2,
      }}>
        <div style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "1rem", marginBottom: "0.4rem" }}>
          🌿 Ruang Aman untuk Kita
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Perempuan Kuat · Hak Aman · Suara Didengar
        </p>
      </footer>

      <style>{`
        @media (max-width: 700px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
