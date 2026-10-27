export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-bg" />

      <div className="absolute -top-[26rem] -left-[20rem] size-[52rem] rounded-full bg-accent/14 blur-[140px] animate-drift max-sm:animate-none max-sm:blur-[80px]" />
      <div className="absolute top-[18%] -right-[22rem] size-[46rem] rounded-full bg-accent-2/12 blur-[150px] animate-drift [animation-delay:-8s] max-sm:animate-none max-sm:blur-[80px]" />
      <div className="absolute bottom-[-24rem] left-[22%] size-[42rem] rounded-full bg-accent-3/10 blur-[150px] animate-drift [animation-delay:-14s] max-sm:hidden" />

      <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_78%)]" />

      <div className="absolute inset-x-0 top-0 h-[36rem] bg-gradient-to-b from-accent/[0.05] to-transparent" />

      <div className="absolute inset-0 hidden bg-noise opacity-[0.035] mix-blend-soft-light sm:block" />
    </div>
  );
}
