import { Container } from "./primitives";

/** Lightweight placeholder shown for a moment during client-side navigation. */
export function PageSkeleton() {
  return (
    <Container className="animate-pulse py-20" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-32 rounded bg-surface-2" />
      <div className="mt-6 h-10 w-3/4 rounded bg-surface-2" />
      <div className="mt-4 h-5 w-1/2 rounded bg-surface-2" />
      <div className="mt-12 space-y-3">
        <div className="h-4 rounded bg-surface-2" />
        <div className="h-4 rounded bg-surface-2" />
        <div className="h-4 w-5/6 rounded bg-surface-2" />
      </div>
    </Container>
  );
}
