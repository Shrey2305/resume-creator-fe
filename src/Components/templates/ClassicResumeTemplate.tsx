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
  date?: string;
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
  sections: { [key: string]: Section };
  metadata: {
    theme: {
      background: string;
      text: string;
      primary: string;
    };
    layout: string[][][]; // layout[0][0] is left column, layout[0][1] is right column
  };
}

interface Props {
  data: ResumeData;
}

const TwoColumnResumeTemplate: React.FC<Props> = ({ data }) => {
  const { basics, sections, metadata } = data;
  const [left, right] = metadata.layout?.[0] || [[], []];

  const renderSection = (sectionId: string) => {
    const section = sections[sectionId];
    if (!section?.visible || !section?.name) return null;

    return (
      <div key={section.id} className="mb-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: metadata.theme.primary }}>
          {section.name}
        </h2>
        {section.content && <div className="text-sm text-gray-700 mb-2">{parse(section.content)}</div>}

        {section.items?.length && (
          <ul className="space-y-2 text-sm text-gray-700">
            {section.items.map((item, idx) =>
              item.visible === false ? null : (
                <li key={item.id || idx}>
                  <strong>
                    {item.name || item.company || item.institution || item.username}
                  </strong>{" "}
                  {item.position && `– ${item.position}`}{" "}
                  {item.location && `(${item.location})`}
                  {item.date && <div className="text-xs text-gray-500">{item.date}</div>}
                  {item.summary && (
                    <div className="text-sm text-gray-600 mt-1">{parse(item.summary)}</div>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div
      className="p-8 text-sm"
      style={{
        backgroundColor: metadata.theme.background,
        color: metadata.theme.text,
        fontFamily: "Merriweather, serif",
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        {basics.picture?.url && !basics.picture.effects?.hidden && (
          <img
            src={basics.picture.url}
            alt={basics.name}
            className="mx-auto mb-4"
            style={{
              width: basics.picture.size,
              aspectRatio: basics.picture.aspectRatio,
              borderRadius: basics.picture.borderRadius,
              filter: basics.picture.effects.grayscale ? "grayscale(1)" : "none",
              border: basics.picture.effects.border ? "2px solid #000" : "none",
            }}
          />
        )}
        <h1 className="text-2xl font-bold">{basics.name}</h1>
        <p className="text-sm text-gray-600">{basics.headline}</p>
        <div className="mt-2 text-xs space-x-3 text-gray-600">
          <span>{basics.email}</span>
          <span>{basics.phone}</span>
          <span>{basics.location}</span>
        </div>
      </div>

      {/* Two Column Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1">
          {left.map(renderSection)}
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          {right.map(renderSection)}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnResumeTemplate;
