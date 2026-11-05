"use strict";

const SUPABASE_URL = "https://qbbzmxtgpjwiqpqmhvwa.supabase.co";
// Publishable key: the database only lets it add feedback rows and audio files.
const SUPABASE_KEY = "sb_publishable_aciGwJFOENK3Z3trSfV6Yg_5swC4ReO";
const MIN_SAIL_KN = 4.5;
// Beat angle of the engine's cruising boat: a sailed leg closer to the wind is crossed in short boards.
const BEAT_TWA = 50;
// Head-on (true wind within 60° of the bow) and general wind limits of the engine.
const HEAD_ON_TWA = 60;
const HEAD_ON_LIMIT_KN = 16;
const WIND_LIMIT_KN = 20;

const TEXT = {
  it: {
    title: "Revisione rotte",
    loading: "Caricamento…",
    invalid: "Link non valido. Controlla di averlo copiato per intero.",
    heading: "Le rotte della call, ricalcolate con le correzioni",
    intro: "Grazie ancora per la call del 3 novembre. Abbiamo lavorato sui punti che avevi segnalato e ricalcolato cinque rotte sulla stessa previsione di allora, con la stessa partenza. Sulla mappa la linea tratteggiata grigia è la rotta che avevi visto in call.",
    boat: "Barca: Oceanis 40.1, polare ORC al 85%, bolina a 50° reali, motore a 6 kn, velocità minima a vela 4,5 kn.",
    changesTitle: "Cosa è cambiato dopo la call",
    changes: [
      "La poppa piena con poco vento non conviene più: la rotta fa i bordi al lasco.",
      "Bolina a 50° reali per una barca da crociera.",
      "Velocità minima a vela (4,5 kn, impostabile): con il motore ausiliario sotto quella velocità si va a motore; in solo vela il tratto è segnalato.",
      "Limiti di prua separati da quelli portanti: 16 kn di vento e 1,2 m di onda entro 60° dalla prua. La bolina con vento fresco pesa di più.",
      "Preferenza per la costa: niente punti al largo quando non servono; con vento oltre il limite la preferenza si spegne.",
      "Il vento di un tratto lungo è letto lungo tutto il tratto, ora per ora.",
      "Corretto il motore che andava a zig-zag (Ischia → Ponza).",
    ],
    howto: "Per ogni rotta puoi scrivere un commento o registrare un messaggio vocale: parla pure liberamente mentre guardi la mappa, come in call. Non serve nessun account. I commenti arrivano solo a noi.",
    motor_assist: "Motore ausiliario",
    sail_only: "Solo vela",
    departure: "Partenza",
    distance: "Distanza",
    duration: "Durata",
    sailShare: "A vela",
    manoeuvres: "Virate / abbattute",
    inCall: "in call",
    legend: { sail: "Vela", slow: "Vela sotto 4,5 kn", motor: "Motore", limit: "Oltre il limite di vento", call: "Rotta vista in call", arrow: "Freccia: dove soffia il vento" },
    legsTitle: (n) => `Tratti (${n})`,
    cols: ["#", "Ora", "Rotta", "NM", "Propulsione", "Vento da", "Vento kn", "Angolo vento", "Velocità", "Manovra"],
    sail: "Vela",
    motor: "Motore",
    tack: "Virata",
    gybe: "Abbattuta",
    boards: "Bordi corti",
    harbour: "porto",
    commentTitle: (n) => `Il tuo commento sulla rotta ${n}`,
    generalTitle: "Commento generale",
    generalHint: "Qualcosa che vale per tutte le rotte, o che non c'entra con una rotta in particolare.",
    placeholder: "Scrivi qui…",
    send: "Invia",
    record: "Registra",
    stop: "Ferma",
    sendAudio: "Invia vocale",
    discard: "Scarta",
    sending: "Invio in corso…",
    sentOk: "Inviato, grazie!",
    sendErr: "Invio non riuscito. Riprova tra poco.",
    micErr: "Il browser non dà accesso al microfono. Controlla i permessi, oppure scrivi il commento.",
    noRecorder: "Questo browser non registra audio: scrivi il commento qui sopra.",
    sentText: "Commento inviato",
    sentAudio: "Vocale inviato",
    warnings: {
      "The forecast wind exceeds your limit on part of the route.": "Il vento previsto supera il limite su una parte della rotta.",
      "Part of the route is sailed below your minimum sail speed.": "Una parte della rotta è a vela sotto 4,5 kn.",
      "Part of the route cannot be sailed in this wind; it is motored there.": "Una parte della rotta non si può fare a vela con questo vento: lì si va a motore.",
    },
    footer: "Bordea · pagina privata di revisione, non indicizzata.",
  },
  es: {
    title: "Revisión de rutas",
    loading: "Cargando…",
    invalid: "Enlace no válido. Comprueba que lo has copiado entero.",
    heading: "Las rutas de la llamada, recalculadas con las correcciones",
    intro: "Gracias otra vez por la llamada del 3 de noviembre. Hemos trabajado en lo que nos comentaste y recalculado cinco rutas con la misma previsión de entonces y la misma salida. En el mapa, la línea gris discontinua es la ruta que viste en la llamada.",
    boat: "Barco: Oceanis 40.1, polar ORC al 85%, ceñida a 50° reales, motor a 6 nudos, velocidad mínima a vela 4,5 nudos.",
    changesTitle: "Qué ha cambiado después de la llamada",
    changes: [
      "La popa cerrada con poco viento ya no sale a cuenta: la ruta hace bordos al largo.",
      "Ceñida a 50° reales para un barco de crucero.",
      "Velocidad mínima a vela (4,5 nudos, ajustable): con motor auxiliar, por debajo se va a motor; en solo vela el tramo queda marcado.",
      "Límites de proa distintos de los portantes: 16 nudos de viento y 1,2 m de ola a menos de 60° de la proa. La ceñida con viento fresco pesa más.",
      "Preferencia por la costa: sin puntos mar adentro cuando no hacen falta; con viento por encima del límite la preferencia se apaga.",
      "El viento de un tramo largo se lee a lo largo de todo el tramo, hora por hora.",
    ],
    howto: "En cada ruta puedes escribir un comentario o grabar un mensaje de voz: habla libremente mientras miras el mapa, como en la llamada. No hace falta ninguna cuenta. Los comentarios solo nos llegan a nosotros.",
    motor_assist: "Motor auxiliar",
    sail_only: "Solo vela",
    departure: "Salida",
    distance: "Distancia",
    duration: "Duración",
    sailShare: "A vela",
    manoeuvres: "Viradas / trasluchadas",
    inCall: "en la llamada",
    legend: { sail: "Vela", slow: "Vela por debajo de 4,5 nudos", motor: "Motor", limit: "Por encima del límite de viento", call: "Ruta de la llamada", arrow: "Flecha: hacia dónde sopla el viento" },
    legsTitle: (n) => `Tramos (${n})`,
    cols: ["#", "Hora", "Rumbo", "MN", "Propulsión", "Viento de", "Viento kn", "Ángulo viento", "Velocidad", "Maniobra"],
    sail: "Vela",
    motor: "Motor",
    tack: "Virada",
    gybe: "Trasluchada",
    boards: "Bordos cortos",
    harbour: "puerto",
    commentTitle: (n) => `Tu comentario sobre la ruta ${n}`,
    generalTitle: "Comentario general",
    generalHint: "Algo que valga para todas las rutas, o que no tenga que ver con una ruta en concreto.",
    placeholder: "Escribe aquí…",
    send: "Enviar",
    record: "Grabar",
    stop: "Parar",
    sendAudio: "Enviar audio",
    discard: "Descartar",
    sending: "Enviando…",
    sentOk: "Enviado, ¡gracias!",
    sendErr: "No se ha podido enviar. Inténtalo de nuevo en un momento.",
    micErr: "El navegador no da acceso al micrófono. Revisa los permisos o escribe el comentario.",
    noRecorder: "Este navegador no graba audio: escribe el comentario arriba.",
    sentText: "Comentario enviado",
    sentAudio: "Audio enviado",
    warnings: {
      "The forecast wind exceeds your limit on part of the route.": "El viento previsto supera el límite en parte de la ruta.",
      "Part of the route is sailed below your minimum sail speed.": "Parte de la ruta va a vela por debajo de 4,5 nudos.",
      "Part of the route cannot be sailed in this wind; it is motored there.": "Parte de la ruta no se puede navegar a vela con este viento: ahí se va a motor.",
    },
    footer: "Bordea · página privada de revisión, no indexada.",
  },
};

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
};
const icon = (name, weight = "") => el("i", { class: `ph${weight ? "-" + weight : ""} ph-${name}`, "aria-hidden": "true" });

let T = TEXT.it;
let data = null;

function fmtNumber(value, digits = 1) {
  return value.toLocaleString(data.lang, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function fmtHours(hours) {
  const total = Math.round(hours * 60);
  return `${Math.floor(total / 60)} h ${String(total % 60).padStart(2, "0")}′`;
}

function fmtTime(iso, withDay) {
  const options = { timeZone: data.tz, hour: "2-digit", minute: "2-digit" };
  if (withDay) Object.assign(options, { weekday: "short", day: "numeric", month: "short" });
  return new Intl.DateTimeFormat(data.lang, options).format(new Date(iso));
}

function legColor(leg) {
  if (leg.p !== "sail") return "var(--motor)";
  if (overLimit(leg)) return "var(--limit)";
  if (leg.v < MIN_SAIL_KN) return "var(--slow)";
  return "var(--sail)";
}
const CSS_COLORS = { "var(--motor)": "#d9822b", "var(--limit)": "#c2372f", "var(--slow)": "#8fb8dc", "var(--sail)": "#1f6fb2" };

function overLimit(leg) {
  if (leg.ws == null) return false;
  if (leg.twa != null && leg.twa < HEAD_ON_TWA) return leg.ws > HEAD_ON_LIMIT_KN;
  return leg.ws > WIND_LIMIT_KN;
}

function cardinal(deg) {
  const names = data.lang === "es"
    ? ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"]
    : ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
  return names[Math.round(deg / 22.5) % 16];
}

function course(a, b) {
  const [lat1, lon1] = a.map((v) => (v * Math.PI) / 180);
  const [lat2, lon2] = b.map((v) => (v * Math.PI) / 180);
  const x = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return ((Math.atan2(x, y) * 180) / Math.PI + 360) % 360;
}

// ---- Feedback storage -------------------------------------------------------

async function insertFeedback(row) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/review_feedback`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ reviewer: data.token, ...row }),
  });
  if (!response.ok) throw new Error(`insert ${response.status}`);
}

async function uploadAudio(blob, routeN, ext) {
  const path = `${data.token}/r${routeN}-${new Date().toISOString().replace(/[:.]/g, "-")}.${ext}`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/review-audio/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": blob.type.split(";")[0],
      "x-upsert": "false",
    },
    body: blob,
  });
  if (!response.ok) throw new Error(`upload ${response.status}`);
  return path;
}

const sentKey = (n) => `bordea-review-${data.token}-sent-${n}`;
const draftKey = (n) => `bordea-review-${data.token}-draft-${n}`;

function sentList(n) {
  try { return JSON.parse(localStorage.getItem(sentKey(n)) || "[]"); } catch { return []; }
}
function remember(n, item) {
  const list = sentList(n);
  list.push(item);
  try { localStorage.setItem(sentKey(n), JSON.stringify(list)); } catch { /* private mode */ }
}

function recorderType() {
  if (!window.MediaRecorder) return null;
  const options = [
    ["audio/webm;codecs=opus", "webm"],
    ["audio/mp4", "m4a"],
    ["audio/ogg;codecs=opus", "ogg"],
    ["audio/webm", "webm"],
  ];
  return options.find(([type]) => MediaRecorder.isTypeSupported(type)) || null;
}

function feedbackBlock(n, title, hint) {
  const status = el("span", { class: "status", role: "status" });
  const sent = el("ul", { class: "sent" });
  const renderSent = () => {
    sent.replaceChildren(...sentList(n).map((item) =>
      el("li", {}, icon("check-circle", "fill"), `${item.kind === "audio" ? T.sentAudio : T.sentText} · ${fmtTime(item.at, true)}`
        + (item.kind === "text" ? ` — “${item.preview}”` : ""))));
  };
  const setStatus = (text, kind = "") => { status.textContent = text; status.className = `status ${kind}`; };

  const area = el("textarea", { placeholder: T.placeholder, "aria-label": title });
  try { area.value = localStorage.getItem(draftKey(n)) || ""; } catch { /* private mode */ }
  area.addEventListener("input", () => { try { localStorage.setItem(draftKey(n), area.value); } catch { /* */ } });

  const sendText = el("button", { class: "primary", type: "button" }, icon("paper-plane-right"), T.send);
  sendText.addEventListener("click", async () => {
    const body = area.value.trim();
    if (!body) return;
    sendText.disabled = true;
    setStatus(T.sending);
    try {
      await insertFeedback({ route_n: n, kind: "text", body });
      remember(n, { kind: "text", at: new Date().toISOString(), preview: body.length > 60 ? body.slice(0, 60) + "…" : body });
      area.value = "";
      try { localStorage.removeItem(draftKey(n)); } catch { /* */ }
      setStatus(T.sentOk, "ok");
      renderSent();
    } catch (error) {
      console.error(error);
      setStatus(T.sendErr, "err");
    } finally {
      sendText.disabled = false;
    }
  });

  const actions = el("div", { class: "actions" }, sendText);
  const clip = el("div", { class: "clip", hidden: "" });
  const type = recorderType();
  if (type) {
    const timer = el("span", { class: "timer", hidden: "" });
    const rec = el("button", { class: "rec", type: "button" }, icon("microphone"), T.record);
    let recorder = null;
    let chunks = [];
    let started = 0;
    let tick = null;
    let recorded = null;

    const showClip = (blob, seconds) => {
      recorded = { blob, seconds };
      const audio = el("audio", { controls: "", src: URL.createObjectURL(blob) });
      const send = el("button", { class: "primary", type: "button" }, icon("paper-plane-right"), T.sendAudio);
      const discard = el("button", { type: "button" }, icon("trash"), T.discard);
      discard.addEventListener("click", () => { recorded = null; clip.hidden = true; clip.replaceChildren(); });
      send.addEventListener("click", async () => {
        send.disabled = discard.disabled = true;
        setStatus(T.sending);
        try {
          const path = await uploadAudio(recorded.blob, n, type[1]);
          await insertFeedback({ route_n: n, kind: "audio", audio_path: path, duration_s: recorded.seconds });
          remember(n, { kind: "audio", at: new Date().toISOString() });
          clip.hidden = true;
          clip.replaceChildren();
          setStatus(T.sentOk, "ok");
          renderSent();
        } catch (error) {
          console.error(error);
          setStatus(T.sendErr, "err");
          send.disabled = discard.disabled = false;
        }
      });
      clip.replaceChildren(audio, send, discard);
      clip.hidden = false;
    };

    rec.addEventListener("click", async () => {
      if (recorder && recorder.state === "recording") {
        recorder.stop();
        return;
      }
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error(error);
        setStatus(T.micErr, "err");
        return;
      }
      chunks = [];
      recorder = new MediaRecorder(stream, { mimeType: type[0] });
      recorder.addEventListener("dataavailable", (event) => { if (event.data.size) chunks.push(event.data); });
      recorder.addEventListener("stop", () => {
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(tick);
        timer.hidden = true;
        rec.classList.remove("on");
        rec.replaceChildren(icon("microphone"), T.record);
        showClip(new Blob(chunks, { type: type[0] }), (Date.now() - started) / 1000);
      });
      recorder.start(1000);
      started = Date.now();
      rec.classList.add("on");
      rec.replaceChildren(icon("stop", "fill"), T.stop);
      timer.hidden = false;
      timer.textContent = "0:00";
      tick = setInterval(() => {
        const s = Math.floor((Date.now() - started) / 1000);
        timer.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      }, 500);
      setStatus("");
    });
    actions.append(rec, timer);
  } else {
    actions.append(el("span", { class: "status" }, T.noRecorder));
  }
  actions.append(status);
  renderSent();
  return el("div", { class: "feedback" }, el("h3", {}, title), hint ? el("p", { class: "status" }, hint) : null, area, actions, clip, sent);
}

// ---- Route cards -------------------------------------------------------------

function stat(label, now, was) {
  return el("div", { class: "stat" }, el("div", { class: "k" }, label), el("div", { class: "v" }, now),
    el("div", { class: "was" }, `${T.inCall}: ${was}`));
}

function routeCard(route) {
  const now = route.now;
  const call = route.call;
  const head = el("div", { class: "route-head" },
    el("h2", {}, el("span", { class: "route-n" }, route.n), route.label, el("span", { class: "badge" }, T[route.style])),
    el("div", { class: "route-meta" }, `${T.departure}: ${fmtTime(route.departure, true)}`));
  const stats = el("div", { class: "stats" },
    stat(T.distance, `${fmtNumber(now.nm)} NM`, `${fmtNumber(call.nm)} NM`),
    stat(T.duration, fmtHours(now.h), fmtHours(call.h)),
    stat(T.sailShare, `${Math.round(now.sail * 100)}%`, `${Math.round(call.sail * 100)}%`),
    stat(T.manoeuvres, `${now.tacks} / ${now.gybes}`, `${call.tacks} / ${call.gybes}`));
  const warnings = now.warnings.length
    ? el("div", { class: "warn" }, now.warnings.map((w) => el("span", {}, icon("warning"), T.warnings[w] || w)))
    : null;
  const mapNode = el("div", { class: "map" });
  const legend = el("div", { class: "legend" },
    ...["sail", "slow", "motor", "limit", "call"].map((key) => el("span", {}, el("i", { class: `sw ${key}` }), T.legend[key])),
    el("span", {}, icon("arrow-up"), T.legend.arrow));

  const rows = [];
  const tbody = el("tbody");
  now.legs.forEach((leg, index) => {
    const harbour = leg.s && leg.s !== "sea";
    const row = el("tr", { class: "leg" },
      el("td", {}, index + 1),
      el("td", {}, fmtTime(leg.t, false)),
      el("td", {}, `${Math.round(course(leg.a, leg.b))}°`),
      el("td", {}, fmtNumber(leg.nm, 1)),
      el("td", { class: "l" }, el("span", { class: "dot", style: `background:${CSS_COLORS[legColor(leg)]}` }),
        leg.p === "sail" ? T.sail : T.motor, harbour ? ` (${T.harbour})` : ""),
      el("td", {}, leg.wd == null ? "–" : `${cardinal(leg.wd)} ${leg.wd}°`),
      el("td", { class: overLimit(leg) ? "bad" : "" }, leg.ws == null ? "–" : fmtNumber(leg.ws, 1)),
      el("td", {}, leg.twa == null || leg.p !== "sail" ? "–" : `${leg.twa}°`),
      el("td", { class: leg.p === "sail" && leg.v < MIN_SAIL_KN ? "bad" : "" }, `${fmtNumber(leg.v, 1)} kn`),
      el("td", { class: "l" }, [leg.m ? T[leg.m] : null, leg.p === "sail" && leg.twa != null && leg.twa < BEAT_TWA ? T.boards : null].filter(Boolean).join(" · ")));
    rows.push(row);
    tbody.append(row);
  });
  const table = el("table", {}, el("thead", {}, el("tr", {}, T.cols.map((c, i) => el("th", { class: i === 4 || i === 9 ? "l" : "" }, c)))), tbody);
  const legs = el("details", { class: "legs" }, el("summary", {}, T.legsTitle(now.legs.length)), el("div", { class: "table-wrap" }, table));

  const card = el("section", { class: "route", id: `rotta-${route.n}` },
    head, stats, el("p", { class: "note" }, route.note), warnings, mapNode, legend, legs,
    feedbackBlock(route.n, T.commentTitle(route.n)));

  requestAnimationFrame(() => drawMap(mapNode, route, rows));
  return card;
}

function drawMap(node, route, rows) {
  const map = L.map(node, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  L.polyline(route.call.line, { color: "#8a96a0", weight: 3, dashArray: "6 6", opacity: 0.9 }).addTo(map);
  const lines = route.now.legs.map((leg, index) => {
    const line = L.polyline([leg.a, leg.b], { color: CSS_COLORS[legColor(leg)], weight: 5, opacity: 0.95 }).addTo(map);
    line.on("click", () => highlight(index));
    if (leg.wd != null && leg.nm > 1.5) {
      const mid = [(leg.a[0] + leg.b[0]) / 2, (leg.a[1] + leg.b[1]) / 2];
      L.marker(mid, {
        interactive: false,
        icon: L.divIcon({
          className: "",
          html: `<i class="ph-fill ph-arrow-fat-up wind-arrow" style="display:inline-block;transform:rotate(${(leg.wd + 180) % 360}deg)"></i>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
      }).addTo(map);
    }
    return line;
  });
  const first = route.now.legs[0].a;
  const last = route.now.legs[route.now.legs.length - 1].b;
  L.circleMarker(first, { radius: 6, color: "#14212b", fillColor: "#fff", fillOpacity: 1, weight: 2 }).addTo(map);
  L.circleMarker(last, { radius: 6, color: "#14212b", fillColor: "#14212b", fillOpacity: 1, weight: 2 }).addTo(map);
  const bounds = L.latLngBounds([...route.now.legs.flatMap((leg) => [leg.a, leg.b]), ...route.call.line]);
  map.fitBounds(bounds, { padding: [24, 24] });

  let selected = null;
  function highlight(index) {
    if (selected != null) {
      lines[selected].setStyle({ weight: 5 });
      rows[selected].classList.remove("on");
    }
    if (selected === index) { selected = null; return; }
    selected = index;
    lines[index].setStyle({ weight: 9 }).bringToFront();
    rows[index].classList.add("on");
  }
  rows.forEach((row, index) => row.addEventListener("click", () => {
    highlight(index);
    if (selected === index) map.fitBounds(lines[index].getBounds(), { padding: [60, 60], maxZoom: 12 });
  }));
}

// ---- Page --------------------------------------------------------------------

function render() {
  document.documentElement.lang = data.lang;
  document.title = `Bordea · ${T.title}`;
  document.querySelectorAll("[data-t]").forEach((node) => { node.textContent = T[node.dataset.t]; });
  const app = document.getElementById("app");
  const intro = el("section", { class: "intro" },
    el("h1", {}, T.heading),
    el("p", {}, T.intro),
    el("p", { class: "boat" }, T.boat),
    el("h3", {}, T.changesTitle),
    el("ul", { class: "changes" }, T.changes.map((c) => el("li", {}, c))),
    el("div", { class: "howto" }, icon("microphone"), el("p", {}, T.howto)));
  app.replaceChildren(intro, ...data.routes.map(routeCard),
    el("section", { class: "general" }, feedbackBlock(0, T.generalTitle, T.generalHint)),
    el("footer", {}, T.footer));
}

async function main() {
  const key = new URLSearchParams(location.search).get("k") || "";
  document.querySelectorAll("[data-t]").forEach((node) => { node.textContent = T[node.dataset.t]; });
  if (!/^[0-9a-f]{16}$/.test(key)) {
    document.getElementById("app").replaceChildren(el("p", { class: "error" }, T.invalid));
    return;
  }
  try {
    const response = await fetch(`data/${key}.json`, { cache: "no-store" });
    if (!response.ok) throw new Error(String(response.status));
    data = await response.json();
  } catch (error) {
    console.error(error);
    document.getElementById("app").replaceChildren(el("p", { class: "error" }, T.invalid));
    return;
  }
  T = TEXT[data.lang] || TEXT.it;
  render();
}

main();
