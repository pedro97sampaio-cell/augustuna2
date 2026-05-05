"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import "@/app/farricoco-runner/game.css";

type CharType = "char-seminoide" | "char-semina" | "char-tuno";

export default function FarricocoRunnerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const gameOverRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<"loading" | "select" | "playing" | "gameover">("loading");
  const [selectedChar, setSelectedChar] = useState<CharType>("char-seminoide");
  const [displayScore, setDisplayScore] = useState("00000");
  const [isHighscore, setIsHighscore] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [highscores, setHighscores] = useState<{ name: string; score: number }[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const stateRef = useRef({
    gameOver: true,
    score: 0,
    speed: 3.5,
    gravity: 0.6,
    jumpPower: -12,
    velocityY: 0,
    isJumping: false,
    isDucking: false,
    obstacles: [] as HTMLDivElement[],
    laurels: [] as HTMLDivElement[],
    spawnTimer: 0,
    immuneTime: 0,
  });

  const BIN_URL = "https://jsonblob.com/api/jsonBlob/019d2cc6-daf7-7df0-9801-03e71948ba95";

  // Load highscores on mount & show loading for 2s
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      // Try local storage first
      const localData = localStorage.getItem("augustuna_runner_highscores");
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed)) setHighscores(parsed);
        } catch (e) {
          console.error("Erro ao ler recordes locais:", e);
        }
      }

      const [res] = await Promise.all([
        fetch(BIN_URL).catch(() => null),
        new Promise((r) => setTimeout(r, 2200)),
      ]);

      if (cancelled) return;

      if (res && res.ok) {
        try {
          const data = await res.json();
          if (Array.isArray(data)) {
            const sorted = data.sort((a, b) => b.score - a.score).slice(0, 5);
            setHighscores(sorted);
            localStorage.setItem("augustuna_runner_highscores", JSON.stringify(sorted));
          }
        } catch (e) {
          console.error("Erro ao processar recordes da API:", e);
        }
      }
      setPhase("select");
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // Decoration
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    for (let i = 0; i < 15; i++) {
      const d = document.createElement("div");
      d.className = "fr-ground-detail";
      d.style.left = Math.random() * 2000 + "px";
      d.style.bottom = 10 + Math.random() * 10 + "px";
      c.appendChild(d);
    }
    for (let i = 0; i < 3; i++) {
      const cl = document.createElement("div");
      cl.className = "fr-cloud";
      cl.style.left = 200 + i * 300 + "px";
      cl.style.top = 30 + Math.random() * 40 + "px";
      c.appendChild(cl);
    }
  }, []);

  const getPlayerHTML = (charClass: CharType) => {
    const base = `<div class="fr-hood"></div>`;
    if (charClass === "char-seminoide")
      return base + `<div class="fr-rope"></div><div class="fr-rope-knot"></div><div class="fr-rope-tail"></div><div class="fr-face"><div class="fr-eyes"><div class="fr-eye"></div><div class="fr-eye"></div></div></div>`;
    if (charClass === "char-semina")
      return base + `<div class="fr-face"><div class="fr-eyes"><div class="fr-eye"></div><div class="fr-eye"></div></div><div class="fr-blush"><div class="fr-dot"></div><div class="fr-dot"></div></div></div>`;
    // char-tuno
    return `<div class="fr-pirate-hat"></div><div class="fr-pirate-hat-top"></div>` + base + `<div class="fr-face-bg"></div><div class="fr-face"><div class="fr-eyes"><div class="fr-eye"></div><div class="fr-eye"></div></div></div>`;
  };

  const spawn = useCallback(() => {
    const s = stateRef.current;
    const c = containerRef.current;
    if (s.gameOver || !c) return;

    // Decoration Spawning (Parallax)
    if (Math.random() > 0.85) {
      const g = document.createElement("div");
      g.className = "fr-grass";
      g.style.left = c.offsetWidth + 50 + "px";
      g.style.bottom = "22px";
      c.appendChild(g);
      // Move decoration logic could be simplified by putting them in their own array or just letting them drift
      const moveGrass = () => {
        if (s.gameOver) { g.remove(); return; }
        let x = parseFloat(g.style.left);
        x -= s.speed * 0.8; // Parallax
        g.style.left = x + "px";
        if (x < -20) g.remove();
        else requestAnimationFrame(moveGrass);
      };
      requestAnimationFrame(moveGrass);
    }

    if (Math.random() > 0.94) {
      const laurel = document.createElement("div");
      laurel.className = "fr-laurel";
      laurel.style.left = c.offsetWidth + 50 + "px";
      laurel.style.bottom = 60 + Math.random() * 60 + "px";
      c.appendChild(laurel);
      s.laurels.push(laurel);
    } else if (Math.random() > 0.70) {
      // Bird Spawning
      const bird = document.createElement("div");
      bird.className = "fr-bird";
      bird.style.left = c.offsetWidth + 50 + "px";
      
      // Heights: 
      // 0: low (jump over), 1: mid (duck or perfect jump), 2: high (stay still/duck)
      const heights = [35, 65, 95]; 
      const hType = Math.floor(Math.random() * 3);
      bird.style.bottom = heights[hType] + "px";
      
      bird.innerHTML = '<div class="fr-bird-wing"></div><div class="fr-bird-body"></div>';
      c.appendChild(bird);
      s.obstacles.push(bird);
    } else {
      // Bottle Spawning
      const group = Math.random() > 0.85 ? (Math.random() > 0.6 ? 3 : 2) : 1;
      for (let i = 0; i < group; i++) {
        const b = document.createElement("div");
        b.className = "fr-bottle";
        b.style.left = c.offsetWidth + 50 + i * 20 + "px";
        b.innerHTML = '<div class="fr-b-neck"></div><div class="fr-b-body"></div>';
        c.appendChild(b);
        s.obstacles.push(b);
      }
    }
    // Faster spawning as speed increases
    s.spawnTimer = Math.max(40, 90 / (s.speed / 4) + Math.random() * 60);
  }, []);

  const startGame = useCallback((charClass: CharType) => {
    setSelectedChar(charClass);
    setPhase("playing");

    const p = playerRef.current;
    if (p) {
      p.className = `fr-player-ghost fr-${charClass}`;
      p.innerHTML = getPlayerHTML(charClass);
      p.style.bottom = "22px";
    }

    const s = stateRef.current;
    s.gameOver = false;
    s.score = 0;
    s.speed = 4.0;
    s.velocityY = 0;
    s.spawnTimer = 50;
    s.immuneTime = 0;

    const update = () => {
      if (s.gameOver) return;

      if (s.immuneTime > 0) {
        s.immuneTime--;
        playerRef.current?.classList.add("fr-immune-flash");
      } else {
        playerRef.current?.classList.remove("fr-immune-flash");
      }

      s.velocityY += s.gravity;
      let bottom = parseFloat(playerRef.current?.style.bottom || "22");
      let nextBottom = bottom - s.velocityY;
      if (nextBottom <= 22) {
        nextBottom = 22;
        s.velocityY = 0;
        s.isJumping = false;
      }
      if (playerRef.current) {
        playerRef.current.style.bottom = nextBottom + "px";
        if (s.isDucking && !s.isJumping) {
          playerRef.current.classList.add("fr-ducking");
        } else {
          playerRef.current.classList.remove("fr-ducking");
        }
      }

      s.spawnTimer--;
      if (s.spawnTimer <= 0) spawn();

      const pRect = playerRef.current?.getBoundingClientRect();
      if (!pRect) return;

      // Move Laurels
      for (let i = s.laurels.length - 1; i >= 0; i--) {
        const L = s.laurels[i];
        let x = parseFloat(L.style.left);
        x -= s.speed;
        L.style.left = x + "px";
        const lRect = L.getBoundingClientRect();
        if (pRect.right > lRect.left + 5 && pRect.left < lRect.right - 5 && pRect.bottom > lRect.top + 5 && pRect.top < lRect.bottom - 5) {
          s.immuneTime = 360; // ~6 seconds
          L.remove();
          s.laurels.splice(i, 1);
        } else if (x < -50) {
          L.remove();
          s.laurels.splice(i, 1);
        }
      }

      // Move Obstacles
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        const b = s.obstacles[i];
        let x = parseFloat(b.style.left);
        x -= s.speed;
        b.style.left = x + "px";
        const bRect = b.getBoundingClientRect();
        
        // Dynamic hitbox
        let hitMarginX = 8;
        let hitMarginY = 8;
        
        const isBird = b.classList.contains("fr-bird");
        if (isBird) {
          hitMarginX = 10;
          hitMarginY = 12;
        }

        if (pRect.right - hitMarginX > bRect.left && 
            pRect.left + hitMarginX < bRect.right && 
            pRect.bottom - 2 > bRect.top && 
            pRect.top + hitMarginY < bRect.bottom) {
          if (s.immuneTime <= 0) {
            endGame();
            return;
          } else {
            b.remove();
            s.obstacles.splice(i, 1);
          }
        }
        
        if (x < -100) {
          if (document.body.contains(b)) b.remove();
          s.obstacles.splice(i, 1);
        }
      }

      function endGame() {
        s.gameOver = true;
        setDisplayScore(Math.floor(s.score).toString().padStart(5, "0"));
        const scoreInt = Math.floor(s.score);
        const isHS = highscores.length < 5 || scoreInt > (highscores[highscores.length - 1]?.score ?? 0);
        setIsHighscore(isHS && scoreInt > 0);
        setPhase("gameover");
        playerRef.current?.classList.remove("fr-immune-flash");
      }

      if (!s.gameOver) {
        s.score += 0.15;
        s.speed += 0.0015;
        setDisplayScore(Math.floor(s.score).toString().padStart(5, "0"));
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }, [spawn, highscores]);

  const restart = useCallback(() => {
    const s = stateRef.current;
    s.obstacles.forEach((b) => b.remove());
    s.laurels.forEach((L) => L.remove());
    s.obstacles = [];
    s.laurels = [];
    startGame(selectedChar);
  }, [selectedChar, startGame]);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s.isJumping && !s.gameOver) {
      s.velocityY = s.jumpPower;
      s.isJumping = true;
    }
  }, []);

  // Keyboard & touch
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        stateRef.current.isDucking = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") {
        stateRef.current.isDucking = false;
      }
    };
    const handleTouch = (e: TouchEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName !== "BUTTON" && t.tagName !== "A" && !t.closest(".fr-char-card")) {
        jump();
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("touchstart", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("touchstart", handleTouch);
    };
  }, [jump]);

  const saveHighscore = async () => {
    if (isSaving) return;
    setIsSaving(true);
    let name = playerName.trim() || "Anónimo";
    const scoreInt = Math.floor(stateRef.current.score);
    let updated = [...highscores, { name, score: scoreInt }];
    updated.sort((a, b) => b.score - a.score);
    if (updated.length > 5) updated = updated.slice(0, 5);
    
    // Save locally immediately
    setHighscores(updated);
    localStorage.setItem("augustuna_runner_highscores", JSON.stringify(updated));

    // Try to save to API
    try {
      const res = await fetch(BIN_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error(`Status: ${res.status}`);
    } catch (e) {
      console.warn("Sincronização offline.", e);
    } finally {
      setIsSaving(false);
      setIsHighscore(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center justify-center font-mono text-[#535353] overflow-hidden relative">
      <Link href="/" className="absolute top-5 left-5 no-underline text-[#535353] border-2 border-[#535353] px-4 py-2 font-bold text-sm z-[3000] hover:bg-[#535353] hover:text-[#f7f7f7] transition-all">
        ← Voltar ao Ritmo
      </Link>

      {/* LOADING */}
      {phase === "loading" && (
        <div className="absolute inset-0 bg-[#f7f7f7] flex flex-col justify-center items-center z-[2000]">
          <div className="border-4 border-[#535353] px-8 py-3 text-4xl font-bold tracking-wider mb-8">AUGUSTUNA</div>
          <div className="text-sm text-[#888] mb-5">rumo à Bracara augusta...</div>
          <div className="w-[250px] h-[6px] border border-[#535353] p-[2px]">
            <div className="bg-[#535353] h-full animate-[loadAnim_2s_ease_forwards]" />
          </div>
        </div>
      )}

      {/* CHARACTER SELECTION */}
      {phase === "select" && (
        <div className="absolute inset-0 bg-[#f0f0f0] flex flex-col justify-center items-center z-[1500] text-center p-5">
          <h2 className="text-xl font-bold tracking-wider mb-2">ESCOLHE A TUA PERSONAGEM</h2>
          <div className="flex gap-5 mt-8 flex-wrap justify-center">
            {(["char-seminoide", "char-semina", "char-tuno"] as CharType[]).map((ch) => (
              <button
                key={ch}
                onClick={() => startGame(ch)}
                className="fr-char-card border-2 border-[#535353] bg-white p-5 cursor-pointer w-[120px] rounded-lg shadow-md hover:-translate-y-1 hover:bg-[#e8e8e8] transition-all group"
              >
                <div
                  className={`fr-player-preview fr-${ch} mx-auto mb-4 relative`}
                  style={{ width: 36, height: 50 }}
                  dangerouslySetInnerHTML={{ __html: getPlayerHTML(ch) }}
                />
                <strong className="block text-xs uppercase tracking-tighter">
                  {ch === "char-seminoide" ? "Seminóide" : ch === "char-semina" ? "Semina" : "Tuno"}
                </strong>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME */}
      <div ref={containerRef} id="game-container" className="relative w-full max-w-[800px] h-[250px] bg-[#f7f7f7] overflow-hidden select-none">
        <div ref={scoreRef} className="absolute top-[10px] right-[20px] text-xl font-bold z-20">{displayScore}</div>
        <div ref={groundRef} className="absolute bottom-5 w-[200%] h-[2px] bg-[#535353] z-[3]" />
        <div ref={playerRef} className={`fr-player-ghost fr-${selectedChar}`} style={{ bottom: 22 }} />

        {/* GAME OVER OVERLAY */}
        {phase === "gameover" && (
          <div ref={gameOverRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[100] bg-white/90 p-5 rounded-2xl border-2 border-[#535353] shadow-2xl min-w-[280px] max-h-[90%] overflow-y-auto">
            <h1 className="tracking-[5px] mb-1 text-xl font-bold text-[#535353]">G A M E &nbsp; O V E R</h1>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4" />
            
            {isHighscore ? (
              <div className="my-2">
                <p className="text-[#C9A84C] font-bold mb-2 text-sm">NOVO RECORDE!</p>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="O teu nome..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="p-1.5 text-sm text-center border-2 border-[#535353] font-mono w-full rounded mb-2 focus:outline-none"
                />
                <button 
                  onClick={saveHighscore} 
                  disabled={isSaving}
                  className="w-full bg-[#535353] text-white px-3 py-1.5 text-sm cursor-pointer font-bold hover:bg-black transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "A GUARDAR..." : "GUARDAR RECORDE"}
                </button>
              </div>
            ) : (
              <div className="my-4 text-xs bg-black/5 p-3 rounded-xl text-left">
                <h3 className="text-center mb-2 font-bold uppercase tracking-widest text-xs">TOP 5 ENSAIO</h3>
                <div className="space-y-1">
                  {highscores.length === 0 ? (
                    <p className="text-center text-xs opacity-50">Ainda sem recordes.</p>
                  ) : (
                    highscores.map((e, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-black/5 pb-1 last:border-0 last:pb-0">
                        <span className="font-bold">{i+1}. {e.name}</span>
                        <span className="opacity-70">{e.score.toString().padStart(5, "0")}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            <button onClick={restart} className="w-full text-sm bg-transparent border-2 border-[#535353] text-[#535353] px-3 py-1.5 cursor-pointer font-bold hover:bg-[#535353] hover:text-[#f7f7f7] transition-all rounded mt-1">
              REINICIAR ENSAIO
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-[#888] flex gap-8">
        <div><span className="bg-black/5 px-2 py-1 rounded font-bold text-[#535353]">↑ / ESPAÇO</span> Saltar</div>
        <div><span className="bg-black/5 px-2 py-1 rounded font-bold text-[#535353]">↓</span> Baixar</div>
      </div>
    </div>
  );
}
