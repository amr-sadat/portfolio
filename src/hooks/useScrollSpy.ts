import { useEffect, useState } from 'react';

export interface UseScrollSpyOptions<TId extends string> {
  readonly ids: readonly TId[];
  readonly enabled?: boolean;
  readonly initialId?: TId | null;
}

export function useScrollSpy<TId extends string>({
  ids,
  enabled = true,
  initialId = null,
}: UseScrollSpyOptions<TId>) {
  const [activeId, setActiveId] = useState<TId | null>(initialId);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined' || ids.length === 0) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const visibleScores = new Map<string, number>();

    const isScrolledToBottom = () =>
      window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    const pickActiveSection = () => {
      if (isScrolledToBottom()) {
        const lastId = ids[ids.length - 1];
        if (lastId !== undefined) {
          setActiveId(lastId);
          return;
        }
      }

      const bandTop = window.innerHeight * 0.2;
      const bandBottom = window.innerHeight * 0.45;

      let topId: TId | null = null;
      let maxScore = 0;
      let hasLayoutGeometry = false;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 0) {
          hasLayoutGeometry = true;
          const overlap = Math.max(
            0,
            Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop),
          );
          if (overlap > maxScore) {
            maxScore = overlap;
            topId = el.id as TId;
          }
        }
      }

      if (!hasLayoutGeometry) {
        let fallbackMax = -1;
        for (const id of ids) {
          const score = visibleScores.get(id);
          if (score !== undefined && score > fallbackMax) {
            fallbackMax = score;
            topId = id;
          }
        }
      }

      if (topId !== null) {
        setActiveId(topId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const visibleHeight = entry.intersectionRect?.height ?? 0;
            visibleScores.set(
              entry.target.id,
              visibleHeight > 0 ? visibleHeight : entry.intersectionRatio,
            );
          } else {
            visibleScores.delete(entry.target.id);
          }
        }

        pickActiveSection();
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    const handleScroll = () => {
      pickActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, ids]);

  return { activeId, setActiveId } as const;
}
