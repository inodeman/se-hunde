import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Captions,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  Share2,
  SkipBack,
  SkipForward,
  ThumbsUp,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FILM, SCENES, SOURCES } from "@/data/film";

const RATES = [1, 1.25, 1.5];

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function sentenceAt(text: string, ratio: number) {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (parts.length === 0) return text;
  const i = Math.min(parts.length - 1, Math.max(0, Math.floor(ratio * parts.length)));
  return parts[i] ?? text;
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <path d="M5 13h22" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 13c1.4 8 14.6 8 16 0" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 5v5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function WatchPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const rateRef = useRef(1);
  const pendingSeek = useRef<number | null>(null);
  const globalRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [captions, setCaptions] = useState(true);
  const [local, setLocal] = useState(0);
  const [durations, setDurations] = useState<number[]>(() => SCENES.map(() => 0));
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fs, setFs] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const scene = SCENES[index] ?? SCENES[0];
  const total = durations.reduce((sum, n) => sum + (n || 0), 0);
  const before = durations.slice(0, index).reduce((sum, n) => sum + (n || 0), 0);
  const global = before + local;
  globalRef.current = global;
  playingRef.current = playing;
  rateRef.current = rate;
  const sceneDur = durations[index] || 0;
  const ratio = sceneDur > 0 ? local / sceneDur : 0;
  const sentence = sentenceAt(scene.narration, ratio);
  const pct = total > 0 ? `${(global / total) * 100}%` : "0%";
  const showClip = Boolean(scene.video) && local < 6.2 && started && !ended;

  useEffect(() => {
    let cancelled = false;
    void Promise.all(
      SCENES.map(
        (item) =>
          new Promise<number>((resolve) => {
            const probe = new Audio();
            probe.preload = "metadata";
            probe.src = item.audio;
            probe.onloadedmetadata = () => resolve(Number.isFinite(probe.duration) ? probe.duration : 0);
            probe.onerror = () => resolve(0);
          }),
      ),
    ).then((next) => {
      if (!cancelled) setDurations(next);
    });
    setLiked(window.localStorage.getItem("se-hunde-like") === "1");
    setSubscribed(window.localStorage.getItem("se-hunde-sub") === "1");
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextSrc = scene.audio;
    if (!audio.src.endsWith(nextSrc)) {
      audio.src = nextSrc;
      audio.load();
    }
    audio.playbackRate = rateRef.current;
    audio.muted = muted;
    const seek = pendingSeek.current;
    pendingSeek.current = null;
    const arm = () => {
      if (seek != null && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(Math.max(0, seek), Math.max(0, audio.duration - 0.05));
      }
      if (playingRef.current) {
        void audio.play().catch(() => setPlaying(false));
      }
    };
    if (audio.readyState >= 1) arm();
    else audio.addEventListener("loadedmetadata", arm, { once: true });
  }, [index, scene.audio, muted]);

  useEffect(() => {
    const onFs = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  function seekTo(target: number) {
    const cap = total > 0 ? total : target;
    const t = Math.min(Math.max(0, target), Math.max(0, cap - 0.05));
    let acc = 0;
    for (let i = 0; i < SCENES.length; i++) {
      const d = durations[i] || 0;
      const last = i === SCENES.length - 1;
      if (!last && d > 0 && acc + d <= t) {
        acc += d;
        continue;
      }
      const localTime = Math.max(0, t - acc);
      setEnded(false);
      if (i === index) {
        const audio = audioRef.current;
        if (audio) audio.currentTime = localTime;
        setLocal(localTime);
      } else {
        pendingSeek.current = localTime;
        setIndex(i);
      }
      return;
    }
  }

  function seekBy(delta: number) {
    seekTo(globalRef.current + delta);
  }

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    setEnded(false);
    setStarted(true);
    setAudioError(false);
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setAudioError(true);
    }
  }

  function goChapter(i: number) {
    pendingSeek.current = 0;
    setEnded(false);
    setStarted(true);
    setLocal(0);
    setIndex(i);
    setPlaying(true);
  }

  function onEnded() {
    if (index < SCENES.length - 1) {
      pendingSeek.current = 0;
      setLocal(0);
      setIndex((n) => n + 1);
      return;
    }
    setPlaying(false);
    setEnded(true);
  }

  async function share() {
    const url = window.location.href;
    const payload = { title: FILM.title, text: FILM.blurb, url };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        /* copy fallback */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function toggleFs() {
    const node = stageRef.current;
    if (!node) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void node.requestFullscreen();
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON")) {
        return;
      }
      if (event.key === " " || event.key === "k") {
        event.preventDefault();
        void toggle();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        seekBy(5);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        seekBy(-5);
      } else if (event.key === "m") {
        setMuted((value) => !value);
      } else if (event.key === "f") {
        toggleFs();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const starts = SCENES.map((_, i) => durations.slice(0, i).reduce((sum, n) => sum + (n || 0), 0));

  return (
    <main className="min-h-screen bg-ink text-foam">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-lake text-clay">
            <Mark />
          </div>
          <div>
            <p className="font-display text-lg leading-none text-bone">VASO</p>
            <p className="text-xs tracking-wide text-mist">Documental animado</p>
          </div>
        </div>
        <p className="text-xs tracking-widest text-mist">OCT 2026</p>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 lg:grid-cols-3">
        <section className="min-w-0 lg:col-span-2">
          <div ref={stageRef} className="overflow-hidden rounded-xl bg-deep">
            <div
              className="relative aspect-video bg-lake"
              onClick={() => {
                if (!ended) void toggle();
              }}
            >
              <img
                key={scene.id}
                src={scene.image}
                alt={scene.title}
                className={clsx("stage-in ken absolute inset-0 h-full w-full object-cover", `ken-${scene.ken}`, playing && "is-on")}
              />
              {showClip && scene.video ? (
                <video
                  key={`${scene.id}-clip`}
                  src={scene.video}
                  className="absolute inset-0 h-full w-full object-cover"
                  muted
                  playsInline
                  autoPlay
                />
              ) : null}

              <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-ink/80 px-3 py-1.5 text-xs tracking-wide text-bone">
                {scene.kicker}
              </div>

              {!started && !ended ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-16 px-4 sm:px-6">
                  <p className="text-xs tracking-widest text-bone">VASO · DOCUMENTAL</p>
                  <p className="font-display text-4xl leading-none text-bone sm:text-6xl">Se hunde</p>
                </div>
              ) : (
                <p className="pointer-events-none absolute bottom-14 left-3 text-xs tracking-wide text-bone">
                  {String(index + 1).padStart(2, "0")} · {scene.title}
                </p>
              )}

              {ended ? (
                <div className="absolute inset-0 z-30 flex flex-col items-start justify-end gap-3 bg-ink/70 p-5" onClick={(event) => event.stopPropagation()}>
                  <p className="font-display text-3xl text-bone sm:text-4xl">El lago no era el problema.</p>
                  <button
                    type="button"
                    onClick={() => goChapter(0)}
                    className="pointer-events-auto inline-flex h-11 items-center gap-2 rounded-full bg-clay px-4 text-sm text-ink"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Ver de nuevo
                  </button>
                </div>
              ) : null}

              {!playing && !ended ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    void toggle();
                  }}
                  aria-label="Reproducir"
                  className="absolute left-1/2 top-1/2 z-30 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-clay text-ink"
                >
                  <Play className="ml-1 h-7 w-7" />
                </button>
              ) : null}

              <div
                className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink to-transparent px-3 pb-2 pt-8"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  className="scrub"
                  style={{ ["--pct" as string]: pct }}
                  type="range"
                  min={0}
                  max={Math.max(total, 0.1)}
                  step={0.1}
                  value={Math.min(global, total || 0)}
                  aria-label="Posición del documental"
                  disabled={total <= 0}
                  onChange={(event) => seekTo(Number(event.target.value))}
                />
                <div className="mt-1 flex items-center gap-1">
                  <button type="button" aria-label={playing ? "Pausar" : "Reproducir"} onClick={() => void toggle()} className="grid h-11 w-11 place-items-center text-bone">
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button type="button" aria-label="Capítulo anterior" onClick={() => goChapter(Math.max(0, index - 1))} className="hidden h-11 w-11 place-items-center text-bone sm:grid">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button type="button" aria-label="Capítulo siguiente" onClick={() => goChapter(Math.min(SCENES.length - 1, index + 1))} className="hidden h-11 w-11 place-items-center text-bone sm:grid">
                    <SkipForward className="h-4 w-4" />
                  </button>
                  <span className="px-1 text-xs tabular-nums text-mist">
                    {fmt(global)} / {total > 0 ? fmt(total) : "–:––"}
                  </span>
                  <span className="flex-1" />
                  <button
                    type="button"
                    aria-label="Velocidad"
                    onClick={() => {
                      const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length] ?? 1;
                      setRate(next);
                      if (audioRef.current) audioRef.current.playbackRate = next;
                    }}
                    className="h-11 px-2 text-xs text-bone"
                  >
                    {rate.toFixed(rate % 1 === 0 ? 0 : 2)}×
                  </button>
                  <button type="button" aria-pressed={captions} aria-label="Subtítulos" onClick={() => setCaptions((v) => !v)} className={clsx("grid h-11 w-11 place-items-center", captions ? "text-clay" : "text-bone")}>
                    <Captions className="h-4 w-4" />
                  </button>
                  <button type="button" aria-label={muted ? "Activar sonido" : "Silenciar"} onClick={() => setMuted((v) => !v)} className="grid h-11 w-11 place-items-center text-bone">
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button type="button" aria-label="Pantalla completa" onClick={toggleFs} className="grid h-11 w-11 place-items-center text-bone">
                    {fs ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            {captions ? (
              <p className="min-h-16 bg-deep px-4 py-3 text-sm leading-relaxed text-bone">{started ? sentence : "Pulsa play. Una voz, trece planos, el valle que se está cerrando."}</p>
            ) : null}
          </div>

          {audioError ? (
            <p className="mt-3 text-sm text-clay">No se pudo reproducir la voz. Vuelve a pulsar play.</p>
          ) : null}

          <h1 className="mt-4 font-display text-2xl leading-tight text-bone sm:text-3xl">{FILM.title}</h1>
          <p className="mt-1 text-sm text-mist">
            {total > 0 ? fmt(total) : "10 min"} · {SCENES.length} capítulos · Ciencia · Español
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={liked}
              onClick={() => {
                const next = !liked;
                setLiked(next);
                window.localStorage.setItem("se-hunde-like", next ? "1" : "0");
              }}
              className={clsx("inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm", liked ? "bg-clay text-ink" : "bg-lake text-foam")}
            >
              <ThumbsUp className="h-4 w-4" />
              {liked ? "Te gusta" : "Me gusta"}
            </button>
            <button type="button" onClick={() => void share()} className="inline-flex h-11 items-center gap-2 rounded-full bg-lake px-4 text-sm text-foam">
              <Share2 className="h-4 w-4" />
              {copied ? "Enlace copiado" : "Compartir"}
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lake text-clay">
              <Mark />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-bone">{FILM.channel}</p>
              <p className="truncate text-xs text-mist">{FILM.channelLine}</p>
            </div>
            <button
              type="button"
              aria-pressed={subscribed}
              onClick={() => {
                const next = !subscribed;
                setSubscribed(next);
                window.localStorage.setItem("se-hunde-sub", next ? "1" : "0");
              }}
              className={clsx("h-11 shrink-0 rounded-full px-4 text-sm", subscribed ? "bg-lake text-foam" : "bg-bone text-ink")}
            >
              {subscribed ? "Suscrito" : "Suscribirse"}
            </button>
          </div>

          <div className="mt-5 rounded-xl bg-deep p-4">
            <p className={clsx("text-sm leading-relaxed text-foam", !openDesc && "line-clamp-3")}>{FILM.blurb}</p>
            {openDesc ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs tracking-widest text-mist">FUENTES</p>
                <ul className="space-y-2">
                  {SOURCES.map((source) => (
                    <li key={source.name} className="text-sm leading-relaxed text-mist">
                      <span className="text-bone">{source.name}. </span>
                      {source.detail}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-mist">
                  Divulgación, no un dictamen de ingeniería. Las cifras están redondeadas a partir de estudios y notas públicas de 2021 y de octubre de 2026.
                </p>
              </div>
            ) : null}
            <button type="button" onClick={() => setOpenDesc((v) => !v)} className="mt-3 text-sm text-clay">
              {openDesc ? "Mostrar menos" : "Fuentes y descripción"}
            </button>
          </div>

          <audio
            ref={audioRef}
            preload="auto"
            onTimeUpdate={(event) => setLocal(event.currentTarget.currentTime)}
            onEnded={onEnded}
            onError={() => setAudioError(true)}
          />
        </section>

        <aside className="min-w-0">
          <h2 className="mb-3 text-sm tracking-wide text-mist">Capítulos</h2>
          <ol className="space-y-2">
            {SCENES.map((item, i) => {
              const active = i === index;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goChapter(i)}
                    className={clsx("flex w-full gap-3 rounded-lg p-2 text-left", active ? "bg-lake" : "hover:bg-deep")}
                  >
                    <img src={item.image} alt="" className="h-16 w-28 shrink-0 rounded-md object-cover" />
                    <span className="min-w-0">
                      <span className={clsx("block text-xs tabular-nums", active ? "text-clay" : "text-mist")}>
                        {total > 0 ? fmt(starts[i] ?? 0) : `${i + 1}`}
                      </span>
                      <span className="block text-sm text-bone">{item.title}</span>
                      <span className="block truncate text-xs text-mist">{item.kicker}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </main>
  );
}
