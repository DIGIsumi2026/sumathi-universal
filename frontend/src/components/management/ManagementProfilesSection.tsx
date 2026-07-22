import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { managementProfiles } from '../../data/managementProfilesData';

export default function ManagementProfilesSection() {
  const [expandedProfiles, setExpandedProfiles] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  const toggleProfile = (profileId: string) => {
    setExpandedProfiles((current) => ({
      ...current,
      [profileId]: !current[profileId],
    }));
  };

  return (
    <section className="management-profiles-section">
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

          const ExpandButton = () => (
            <div className="management-profile-expand-row">
              <div className="management-profile-line" />

              <button
                type="button"
                className="management-profile-expand-btn"
                onClick={() => toggleProfile(profile.id)}
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Show Less' : 'Read Full Profile'}

                {isExpanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              <div className="management-profile-line" />
            </div>
          );

          return (
            <motion.article
              layout
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
                layout: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
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
              <motion.div layout className="management-profile-image-wrap">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="management-profile-image"
                  draggable={false}
                />
              </motion.div>

              <motion.div layout className="management-profile-content">
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

                {hasLongText && !isExpanded && <ExpandButton />}
              </motion.div>

              <AnimatePresence initial={false}>
                {isExpanded && remainingParagraphs.length > 0 && (
                  <motion.div
                    key={`${profile.id}-expanded-body`}
                    className="management-profile-expanded-body"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            height: 0,
                            opacity: 0,
                            y: -12,
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            height: 'auto',
                            opacity: 1,
                            y: 0,
                          }
                    }
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : {
                            height: 0,
                            opacity: 0,
                            y: -10,
                          }
                    }
                    transition={{
                      height: {
                        duration: 0.58,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.35,
                        ease: 'easeOut',
                      },
                      y: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                  >
                    <motion.div
                      className="management-profile-expanded-body-inner"
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.12,
                        ease: 'easeOut',
                      }}
                    >
                      {remainingParagraphs.map((paragraph, paragraphIndex) => (
                        <motion.p
                          key={paragraph}
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 14,
                                }
                          }
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  opacity: 1,
                                  y: 0,
                                }
                          }
                          transition={{
                            duration: 0.42,
                            delay: paragraphIndex * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}

                      <ExpandButton />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}