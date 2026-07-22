import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { managementProfiles } from '../../data/managementProfilesData';

export default function ManagementProfilesSection() {
  const [expandedProfiles, setExpandedProfiles] = useState<Record<string, boolean>>({});

  const toggleProfile = (profileId: string) => {
    setExpandedProfiles((current) => ({
      ...current,
      [profileId]: !current[profileId],
    }));
  };

  return (
    <section className="management-profiles-section">
      <div className="management-profiles-header">
        <span>Board of Directors</span>
      </div>

      <div className="management-profiles-list">
        {managementProfiles.map((profile) => {
          const isExpanded = expandedProfiles[profile.id] ?? false;
          const hasLongText = profile.paragraphs.length > 2;
          const visibleParagraphs =
            hasLongText && !isExpanded
              ? profile.paragraphs.slice(0, 2)
              : profile.paragraphs;

          return (
            <article
              key={profile.id}
              id={profile.id === 'thilanga-sumathipala' ? 'chairman-profile' : profile.id}
              className="management-profile-card"
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
                  {visibleParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {hasLongText && (
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
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}