import React from "react";
import "../styles/TemplateTwoPreview.css";

function TemplateTwoPreview(props) {
  const { state } = props;
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
      className="root overflow-auto"
      style={{ width: "1000px", height: "1500px" }}
    >
      <div className="top">
        <div className="top__square top__squareTop" />
        <h2>
          {contacts[0].value} <span>{contacts[1].value}</span>
        </h2>
        <div className="top__profession">{contacts[2].value}</div>
        <h3>
          {`${contacts[3].value}, ${contacts[4].value}, ${contacts[5].value}, ${contacts[6].value}`}
        </h3>
        <div className="top__square top__squareBottom" />
      </div>
      <div className="main">
        <div className="main__left">
          <div className="profile">
            <h2 className="category__title">Profile</h2>
            <p className="profile__info">{contacts[10]?.value}</p>
          </div>
          <div className="skills">
            <h2 className="category__title">SKILLS</h2>
            <div className="skills__list">
              {skills.map((skill) => (
                <div className="skill" key={skill.id}>
                  <span className="skill__name uppercase">{skill.name}</span>
                  <div
                    className={`skill__progress w-${2 + skill.progress / 10}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="languages">
            <h2 className="category__title">LANGUAGES</h2>
            <div className="languages__list">
              {languages.map((language) => (
                <div className="skill" key={language.id}>
                  {`${language.name} : ${language.level}`}
                </div>
              ))}
            </div>
          </div>
          <div className="hoobies">
            <h2 className="category__title">HOOBIES</h2>
            {hoobies.map((hooby) => (
              <h3 className="hooby_item" key={hooby.id}>
                {hooby.name}
              </h3>
            ))}
          </div>
        </div>
        <div className="main__right">
          <div className="experiences">
            <h2 className="category__title">Experience</h2>
            {experiences.map((experience) => (
              <div className="experience" key={experience.id}>
                <h2 className="experience__position">{experience.position}</h2>
                <div>
                  <h3 className="experience__duration">
                    {`${experience.startedAt} - ${experience.completedAt}, `}
                  </h3>
                  <h3 className="experience__company">{experience.company}</h3>
                </div>
                <p className="experience__description">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
          <div className="education">
            <h2 className="category__title">Education</h2>
            <div className="education__container">
              {education.map((ed) => (
                <div className="educationItem" key={ed.id}>
                  <h2 className="educationItem__studyField">{ed.studyField}</h2>
                  <div>
                    <h3 className="educationItem__duration">
                      {" "}
                      {`${ed.startedAt} - ${ed.completedAt}, `}
                    </h3>
                    <h3 className="educationItem__institution">
                      {ed.institution}
                    </h3>
                  </div>
                  <p className="educationItem__description">{ed.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="references">
            <h2 className="category__title">References</h2>
            <div className="references__container">
              {references.map((reference) => (
                <div className="reference" key={reference.id}>
                  <h3 className="reference__name">{reference.fullName}</h3>
                  <h3 className="reference__position">
                    {reference.profession}
                  </h3>
                  <h3 className="reference__email">{reference.email}</h3>
                  <h3 className="reference__phone">{reference.phoneNumber}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateTwoPreview;
