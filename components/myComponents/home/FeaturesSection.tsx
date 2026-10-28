const features = [
  { title: "Dual Display", desc: "Two OLED panels that fold into one continuous canvas." },
  { title: "Pro Camera", desc: "Triple-lens system with cinematic mode for creators." },
  { title: "All-Day Battery", desc: "Adaptive power for fold and unfold workflows." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Built for creators</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
