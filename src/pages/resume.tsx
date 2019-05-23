import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames/bind';
import styles from './resume.module.scss';
import { rhythm } from '../utils/typography';

const cx = classNames.bind(styles);

interface School {
  school: string;
  degree: string;
  graduation: string;
}

interface TechCategory {
  category: string;
  skills: string[];
}

interface ProjectInfo {
  project: string;
  description: string;
  jobTitle: string;
  notes: string[];
}

interface CompanyInfo {
  company: string;
  start: string;
  end: string;
  projects: ProjectInfo[];
}

interface ResumeProps {
  data: {
    resumeYaml: {
      name: string;
      address: { city: string; state: string };
      email: string;
      phone: string;
      education: School[];
      technologies: TechCategory[];
      experience: CompanyInfo[];
    };
  };
}

const PageTitle: React.FC<{title: string}> = ({title}) => <h1 style={{margin: `${rhythm(0.5)} 0`, textAlign: 'center'}}>{title}</h1>

const SectionTitle: React.FC<{title: string}> = ({title}) => <h2 style={{margin: `${rhythm(0.5)} 0`, textAlign: 'center'}}>{title}</h2>

const ContactInfo: React.FC<{location: string, phone: string, email: string}> = ({location, phone, email}) =>
  <div>
    <div>{location}</div>
    <div>{`+1 ${phone.substr(0, 3)}.${phone.substr(3, 3)}.${phone.substr(6)}`}</div>
    <div><a href={`mailto:${email}`}>{email}</a></div>
  </div>;

const Header: React.FC<{name: string, location: string, phone: string, email: string}> = ({name, ...contactInfo}) =>
  <div>
    <PageTitle title={name} />
    <ContactInfo {...contactInfo} />
  </div>

const Skills: React.FC<{technologies: TechCategory[]}> = ({technologies}) =>
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridColumnGap: '8px',
  }}>{
    technologies.map(({category, skills}) =>
      <>
        <div style={{textAlign: 'start'}}>{category}:</div>
        <div>{skills.join(` ${String.fromCharCode(0xfeff00b7)} `)}</div>
      </>
    )
  }</div>;

const ProjectDetails: React.FC<ProjectInfo> = ({project, description, jobTitle, notes}) =>
  <div>
    <h4 style={{margin: `${rhythm(0.5)} 0`}}>{project}</h4>
    <div>{description}</div>
    <div>{jobTitle}</div>
    <div>{notes.map(note => <div dangerouslySetInnerHTML={{__html: note}}/>)}</div>
  </div>;

const CompanyExperience: React.FC<CompanyInfo> = ({company, start, end, projects}) =>
  <div>
    <h3 style={{margin: `${rhythm(0.5)} 0`}}>{company}</h3>
    <div>{`${start} - ${end}`}</div>
    {projects.map(project => <ProjectDetails {...project}/>)}
  </div>;

const Experience: React.FC<{experience: CompanyInfo[]}> = ({experience}) =>
  <div>{
    experience.map(company => <CompanyExperience {...company}/>)
  }</div>

const Education: React.FC<{education: School[]}> = ({education}) =>
  <div>{
    education.map(({school, graduation, degree}) =>
      <div>
        <div>{degree}</div>
        <div>{school}</div>
        <div>{graduation}</div>
      </div>
    )
  }</div>

const Resume: React.FC<ResumeProps> = ({data}) => {
  const {
    name,
    address,
    email,
    phone,
    technologies,
    experience,
    education
  } = data.resumeYaml;

  const contactInfo = {location: `${address.city}, ${address.state}`, email, phone};

  return (
    <div className={cx('root')} style={{padding: '0 8px'}}>
      <Header name={name} {...contactInfo}/>
      <SectionTitle title="Skills"/>
      <Skills technologies={technologies}/>
      <SectionTitle title="Experience"/>
      <Experience experience={experience}/>
      <SectionTitle title="Education"/>
      <Education education={education}/>
    </div>
  )
}

export default Resume;


export const pageQuery = graphql`
{
  resumeYaml {
    name
    address { city state }
    email
    phone
    education { school degree graduation}
    technologies { category skills }
    experience {
      company
      start
      end
      projects {
        project
        description
        jobTitle
        notes
      }
    }
  }
}

`;