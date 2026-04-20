export function HeroSection() {
  return (
    <section className="py-16 md:py-24 border-b border-[var(--sq-gray-01)]">
      <div className="max-w-[var(--sq-col-w)] mx-auto md:ml-[max(0px,calc(25%-10px))] px-10 md:px-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[var(--sq-gray-02)] mb-4">
          Domain names
        </p>
        <h1
          className="text-[40px] md:text-[56px] leading-none tracking-[-1.6px] font-normal mb-6"
          style={{ fontFamily: 'var(--sq-font)' }}
        >
          Find the perfect<br />domain name
        </h1>
        <p className="text-[16px] text-[var(--sq-gray-03)] leading-relaxed max-w-md">
          Establish your brand with a domain that&apos;s uniquely yours. Search hundreds of extensions to find the one that fits.
        </p>
      </div>
    </section>
  );
}
