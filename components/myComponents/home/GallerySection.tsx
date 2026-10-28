export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Gallery</h2>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-2xl bg-muted"
            aria-label={`Gallery image ${i}`}
          />
        ))}
      </div>
    </section>
  );
}
