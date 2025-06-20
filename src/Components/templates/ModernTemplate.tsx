import React from "react";
import parse from "html-react-parser";

interface Url {
  label?: string;
  href?: string;
}

interface SectionItem {
  id?: string;
  visible?: boolean;
  name?: string;
  issuer?: string;
  company?: string;
  institution?: string;
  position?: string;
  location?: string;
  summary?: string;
  description?: string;
  studyType?: string;
  area?: string;
  username?: string;
  network?: string;
  url?: Url;
}

interface Section {
  id: string;
  name: string;
  columns: number;
  visible: boolean;
  content?: string;
  items?: SectionItem[];
}

interface ResumeData {
  basics: {
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    url: Url;
    picture?: {
      url: string;
      size: number;
      aspectRatio: number;
      borderRadius: number;
      effects: {
        hidden: boolean;
        border: boolean;
        grayscale: boolean;
      };
    };
  };
  sections: {
    [key: string]: any; // Allow loose structure, we'll validate manually
  };
  metadata: {
    theme: {
      background: string;
      text: string;
      primary: string;
    };
  };
}

interface Props {
  data: ResumeData;
}

const ModernResumeTemplate: React.FC<Props> = ({ data }) => {
  const { basics, sections, metadata } = data;

  return (
    <div
      className="p-8"
      style={{
        backgroundColor: metadata?.theme?.background,
        color: metadata?.theme?.text,
        fontFamily: "Merriweather, serif",
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        {basics.picture?.url && !basics.picture.effects?.hidden && (
          <img
            src={basics.picture.url}
            alt={basics.name}
            style={{
              width: basics.picture.size,
              aspectRatio: basics.picture.aspectRatio,
              borderRadius: basics.picture.borderRadius,
              filter: basics.picture.effects.grayscale ? "grayscale(1)" : "none",
              border: basics.picture.effects.border ? "2px solid #000" : "none",
            }}
            className="mb-4"
          />
        )}
        <h1 className="text-2xl font-bold">{basics.name}</h1>
        <p className="text-sm text-gray-600">{basics.headline}</p>
        <div className="text-sm mt-2 space-x-4">
          <span>{basics.email}</span>
          <span>{basics.phone}</span>
          <span>{basics.location}</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {Object.entries(sections).map(([key, section]) => {
          // Skip if section is invalid or not visible
          if (
            !section ||
            typeof section !== "object" ||
            !section.visible ||
            !section.name
          )
            return null;

          return (
            <div key={key}>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: metadata.theme.primary }}
              >
                {section.name}
              </h2>

              {/* Rich text content (like summary) */}
              {section.content && (
                <div className="text-sm text-gray-700 mb-2">
                  {parse(section.content)}
                </div>
              )}

              {/* List items (like education, experience, skills, etc.) */}
              {section.items?.length > 0 && (
                <ul className="space-y-2 text-sm text-gray-700">
                  {section.items.map((item : any, idx : any) => {
                    if (!item.visible) return null;

                    return (
                      <li key={item.id || idx}>
                        <strong>
                          {item.name || item.company || item.institution || item.username}
                        </strong>{" "}
                        {item.position && `– ${item.position}`}{" "}
                        {item.location && `(${item.location})`}
                        {item.date && <div className="text-xs text-gray-500">{item.date}</div>}
                        {item.summary && (
                          <div className="text-sm text-gray-600 mt-1">
                            {parse(item.summary)}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModernResumeTemplate;
