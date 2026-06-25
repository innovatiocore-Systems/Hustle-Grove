import { cn } from "@/lib/utils";

/**
 * Decorative animated backdrop: soft, blurred brand-coloured orbs that slowly
 * drift and morph. Purely cosmetic (aria-hidden, pointer-events-none) and sits
 * behind content. Motion is disabled under prefers-reduced-motion.
 */
export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 overflow-hidden",
        className
      )}
    >
      <div className="animate-drift-a absolute -left-24 -top-24 size-[28rem] rounded-full bg-primary/25 blur-3xl" />
      <div className="animate-drift-b anim-delay-200 absolute -right-32 top-10 size-[32rem] rounded-full bg-violet/20 blur-3xl" />
      <div className="animate-drift-c anim-delay-400 absolute -bottom-32 left-1/3 size-[26rem] rounded-full bg-primary/15 blur-3xl" />
    </div>
  );
}
