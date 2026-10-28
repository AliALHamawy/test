export function SpecsSection() {
  const specs = [
    ["Display", "7.9-inch foldable OLED"],
    ["Chip", "A19 Pro"],
    ["Camera", "48MP triple system"],
    ["Battery", "Up to 30 hours"],
  ];
  return (
    <section id="specs" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Specifications</h2>
      <dl className="mt-12 divide-y divide-border">
        {specs.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-4">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
