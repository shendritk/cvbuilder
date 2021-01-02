import React, { useContext } from "react";
import TemplateContext from "../utils/TemplateContext";

function TemplateOnePreview(props) {
  let state = useContext(TemplateContext);

  const {
    contacts,
    languages,
    skills,
    hoobies,
    experiences,
    education,
    references,
  } = state.values.categories;

  return (
    <div
      className="cv-w cv-h sm:w-full lg:w-full xl:mx-4 mb-8 flex border border-gray-400 cv-preview-font shadow-xl"
      style={{ width: "1000px", height: "1500px" }}
    >
      {/* LEFT */}
      <div className="w-5/12 h-full pl-16 pt-16 bg-gray-800 text-gray-200">
        {/* CONTACT */}
        <div className="border-b border-gray-200 pt-6 text-xl">CONTACT</div>
        <div className="mt-4 pr-16">
          <span className="font-bold block">Address</span>
          <span className="block">{contacts[3].value}</span>
          <span className="block">
            {contacts[4].value &&
              `${contacts[4].value}, ${contacts[5].value} ${contacts[6].value}`}
          </span>
        </div>
        <div className="mt-4">
          <span className="font-bold block">Phone</span>
          <span className="block">{contacts[7].value}</span>
        </div>
        <div className="mt-4">
          <span className="font-bold block">Email Address</span>
          <span className="block">{contacts[8].value}</span>
        </div>
        <div className="mt-4">
          <span className="font-bold block">Website</span>
          <span className="block">{contacts[9].value}</span>
        </div>

        {/* SKILLS */}
        <div className="border-b border-gray-200 mt-8 mb-2 text-xl">SKILLS</div>
        {skills.map((skill) => (
          <div className="mt-2 pr-16" key={skill.id}>
            <span className="block">{skill.name}</span>
            <div className="w-12/12 h-2 bg-gray-700 rounded-sm mt-1">
              <div
                className={`w-${
                  skill.progress / 10
                }-10 h-2 bg-gray-100 rounded-sm z-10`}
              ></div>
            </div>
          </div>
        ))}

        {/* LANGUAGES  */}
        <div className="border-b border-gray-200 mt-8 mb-2 text-xl">
          LANGUAGES
        </div>
        {languages.map((language) => (
          <div className="flex flex-col mt-2 pr-16" key={language.id}>
            <span className="block">{language.name}</span>
            <div>
              <span className="mr-1">Level:</span>
              <span className="bold">{language.level}</span>
            </div>
          </div>
        ))}

        {/* HOOBIES */}
        <div className="border-b border-gray-200 mt-8 mb-2 text-xl">
          HOOBIES
        </div>
        {hoobies.map((hooby) => (
          <div className="pr-16" key={hooby.id}>
            {hooby.name}
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-7/12 bg-gray-100 px-8 pt-24 text-gray-800">
        {/* INFO */}
        <div>
          <div className="text-3xl font-bold break-normal">
            {`${contacts[0].value} ${contacts[1].value}`}
          </div>

          <div className="text-xl font-bold">{contacts[2].value}</div>
        </div>

        {/* SECTION: EXPERIENCE */}
        <div className="flex flex-col mt-4">
          <h3 className="border-b border-gray-500 font-bold text-base pb-2 text-xl">
            EXPERIENCE
          </h3>

          {experiences.map((experience) => (
            <div className="flex mt-4" key={experience.id}>
              <div className="flex flex-col w-1/5">
                <span className="block">{`${experience.startedAt} - ${experience.completedAt}`}</span>
                <span className="block">{experience.company}</span>
              </div>
              <div className="flex flex-col w-4/5 ml-8">
                <span className="block uppercase">{experience.position}</span>
                <p className="mt-2">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION: EDUCATION */}
        <div className="flex flex-col mt-8">
          <h3 className="border-b border-gray-500 font-bold text-base pb-2 text-xl">
            EDUCATION
          </h3>
        </div>
        {education.map((ed) => (
          <div className="flex mt-4" key={ed.id}>
            <div className="flex flex-col w-1/5">
              <span className="block">{`${ed.startedAt} - ${ed.completedAt}`}</span>
              <span className="block">{ed.institution}</span>
            </div>
            <div className="flex flex-col w-4/5 ml-8">
              <span className="block uppercase">{ed.studyField}</span>
              <p className="mt-2">{ed.description}</p>
            </div>
          </div>
        ))}

        {/* SECTION: REFERENCES */}
        <div className="flex flex-col mt-4">
          <h3 className="border-b border-gray-500 font-bold text-base pb-2 text-xl">
            REFERENCES
          </h3>
          <div className="grid grid-cols-2 justify-between">
            {references.map((reference) => (
              <div className="mt-4" key={reference.id}>
                <span className="block">{reference.fullName}</span>
                <span className="block">{reference.profession}</span>
                <span className="block">{reference.phoneNumber}</span>
                <span className="block underline">{reference.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateOnePreview;
