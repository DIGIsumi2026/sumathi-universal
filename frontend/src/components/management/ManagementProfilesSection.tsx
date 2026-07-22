import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { managementProfiles } from '../../data/managementProfilesData';

export default function ManagementProfilesSection() {
  const [expandedProfiles, setExpandedProfiles] = useState<Record<string, boolean>>({});
  const [expandedHeights, setExpandedHeights] = useState<Record<string, number>>({});
  const expandedContentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const measureFrameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const measureProfileHeight = useCallback((profileId: string) => {
    const contentElement = expandedContentRefs.current[profileId];
    const measuredHeight = contentElement?.scrollHeight ?? 0;

    setExpandedHeights((current) => {
      if (current[profileId] === measuredHeight) {
        return current;
      }

      return {
        ...current,
        [profileId]: measuredHeight,
      };
    });
  }, []);

  const measureAllProfileHeights = useCallback(() => {
    const nextHeights: Record<string, number> = {};

    managementProfiles.forEach((profile) => {
      if (profile.paragraphs.length <= 2) {
        return;
      }

      nextHeights[profile.id] = expandedContentRefs.current[profile.id]?.scrollHeight ?? 0;
    });

    setExpandedHeights((current) => {
      const currentKeys = Object.keys(current);
      const nextKeys = Object.keys(nextHeights);
      const hasChanged =
        currentKeys.length !== nextKeys.length ||
        nextKeys.some((profileId) => current[profileId] !== nextHeights[profileId]);

      return hasChanged ? nextHeights : current;
    });
  }, []);

  const cancelPendingMeasurement = useCallback(() => {
    if (measureFrameRef.current === null) {
      return;
    }

    window.cancelAnimationFrame(measureFrameRef.current);
    measureFrameRef.current = null;
  }, []);

  const scheduleAllHeightMeasurements = useCallback(() => {
    cancelPendingMeasurement();

    measureFrameRef.current = window.requestAnimationFrame(() => {
      measureFrameRef.current = null;
      measureAllProfileHeights();
    });
  }, [cancelPendingMeasurement, measureAllProfileHeights]);

  const openProfile = useCallback(
    (profileId: string) => {
      cancelPendingMeasurement();

      measureFrameRef.current = window.requestAnimationFrame(() => {
        measureFrameRef.current = null;
        measureProfileHeight(profileId);
        setExpandedProfiles((current) => ({
          ...current,
          [profileId]: true,
        }));
      });
    },
    [cancelPendingMeasurement, measureProfileHeight],
  );

  const closeProfile = useCallback((profileId: string) => {
    setExpandedProfiles((current) => ({
      ...current,
      [profileId]: false,
    }));
  }, []);

  useLayoutEffect(() => {
    scheduleAllHeightMeasurements();

    return cancelPendingMeasurement;
  }, [cancelPendingMeasurement, scheduleAllHeightMeasurements]);

  useEffect(() => {
    const handleResize = () => {
      scheduleAllHeightMeasurements();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelPendingMeasurement();
    };
  }, [cancelPendingMeasurement, scheduleAllHeightMeasurements]);

  return (
    <section
      className={`management-profiles-section ${
        shouldReduceMotion ? 'management-profiles-reduced-motion' : ''
      }`}
    >
      <motion.div
        className="management-profiles-header"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>Board of Directors</span>
      </motion.div>

      <div className="management-profiles-list">
        {managementProfiles.map((profile, index) => {
          const isExpanded = expandedProfiles[profile.id] ?? false;
          const hasLongText = profile.paragraphs.length > 2;

          const introParagraphs = hasLongText
            ? profile.paragraphs.slice(0, 2)
            : profile.paragraphs;

          const remainingParagraphs = hasLongText
            ? profile.paragraphs.slice(2)
            : [];

          const ExpandButton = ({ mode }: { mode: 'open' | 'close' }) => {
            const isCloseButton = mode === 'close';

            return (
              <div className="management-profile-expand-row">
                <div className="management-profile-line" />

                <button
                  type="button"
                  className="management-profile-expand-btn"
                  onClick={() => {
                    if (isCloseButton) {
                      closeProfile(profile.id);
                      return;
                    }

                    openProfile(profile.id);
                  }}
                  aria-expanded={isExpanded}
                >
                  {isCloseButton ? 'Show Less' : 'Read Full Profile'}

                  {isCloseButton ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                <div className="management-profile-line" />
              </div>
            );
          };

          return (
            <motion.article
              key={profile.id}
              id={profile.id === 'thilanga-sumathipala' ? 'chairman-profile' : profile.id}
              className={`management-profile-card ${isExpanded ? 'profile-expanded' : ''}`}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 54,
                      scale: 0.985,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
              }
              viewport={{ once: true, margin: '-90px' }}
              transition={{
                opacity: {
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: {
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <div className="management-profile-image-wrap">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="management-profile-image"
                  draggable={false}
                />
              </div>

              <div className="management-profile-content">
                <span>{profile.role}</span>

                <h3>{profile.name}</h3>

                {profile.qualification && (
                  <p className="management-profile-qualification">
                    {profile.qualification}
                  </p>
                )}

                <div className="management-profile-text">
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {hasLongText && !isExpanded && <ExpandButton mode="open" />}
              </div>

              {hasLongText && remainingParagraphs.length > 0 && (
                <div
                  className={`management-profile-expanded-body ${isExpanded ? 'is-open' : ''}`}
                  aria-hidden={!isExpanded}
                  style={
                    {
                      '--expanded-height': `${expandedHeights[profile.id] ?? 0}px`,
                    } as CSSProperties
                  }
                >
                  <div
                    className="management-profile-expanded-body-inner"
                    ref={(element) => {
                      expandedContentRefs.current[profile.id] = element;
                    }}
                  >
                    {remainingParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    <ExpandButton mode="close" />
                  </div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
