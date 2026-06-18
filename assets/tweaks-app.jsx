/* Tweaks de la landing Elbufalo — acentos, motion, galería */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#997A9D", "#b89dbb"],
  "motion": "Normal",
  "gallery": "3D"
}/*EDITMODE-END*/;

function hexToGlow(hex, a){
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

const MOTION_MAP = { "Sutil": 0.5, "Normal": 1, "Intenso": 1.7 };

function TweaksApp(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    const gold = (t.accent && t.accent[0]) || "#c9a227";
    const soft = (t.accent && t.accent[1]) || "#d8b94e";
    root.style.setProperty('--gold', gold);
    root.style.setProperty('--gold-soft', soft);
    root.style.setProperty('--gold-glow', hexToGlow(gold, 0.35));
  }, [t.accent]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--motion', MOTION_MAP[t.motion] || 1);
  }, [t.motion]);

  React.useEffect(() => {
    const rotor = document.getElementById('wall-rotor');
    if(!rotor) return;
    if(t.gallery === 'Recto') rotor.classList.add('flat');
    else rotor.classList.remove('flat');
  }, [t.gallery]);

  return (
    <TweaksPanel>
      <TweakSection label="Color de acento" />
      <TweakColor
        label="Acento"
        value={t.accent}
        options={[
          ["#997A9D", "#b89dbb"],
          ["#c9a227", "#d8b94e"],
          ["#7d6cc4", "#9c8be0"],
          ["#5b8a72", "#79ab90"],
          ["#b5708a", "#cf90a6"]
        ]}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakSection label="Movimiento" />
      <TweakRadio
        label="Intensidad"
        value={t.motion}
        options={["Sutil", "Normal", "Intenso"]}
        onChange={(v) => setTweak('motion', v)}
      />
      <TweakSection label="Galería" />
      <TweakRadio
        label="Inclinación del muro"
        value={t.gallery}
        options={["3D", "Recto"]}
        onChange={(v) => setTweak('gallery', v)}
      />
    </TweaksPanel>
  );
}

(function mount(){
  const el = document.getElementById('tweaks-root');
  if(!el){ return; }
  ReactDOM.createRoot(el).render(<TweaksApp />);
})();
