import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames/bind';
import styles from './resume.module.scss';
import { rhythm, scale } from "../utils/typography"

const cx = classNames.bind(styles);

const NameTitle: React.FC<{name: string}> = ({name}) => <h1 className={cx('name')}>{name}</h1>;

interface ResumeProps {
  data: {
    resumeYaml: {
      name: string;
      address: {
        street: string;
        city: string;
        state: string;
        zip: string;
      };
      email: string;
      phone: string;
      education: {school: string; degree: string; graduation: string;}[];
      technologies: string[];
      history: {
        company: string;
        title: string;
        time: { start: string; end: string; };
        responsibilities: string[];
      }[];
    }
  }
}

const Resume: React.FC<ResumeProps> = ({data}) => {
  const {
    name,
    address,
    email,
    phone,
    technologies,
    history,
    education,
  } = data.resumeYaml;

  console.log(scale(1.5));
  console.log(rhythm(0.5));

  return (
    <article className={cx('root')}>
      <NameTitle name={name} />

      <section className={cx('contactInfo')}>
        <div>{`+1 ${phone.substr(0, 3)} ${phone.substr(3, 3)} ${phone.substr(6)}`}</div>
        <div><a href={`mailto:${email}`}>{email}</a></div>
        <div>{address.city}, {address.state}</div>
      </section>

      <hr />

      <section>
        <h2 className={cx('sectionTitle')}>Key Skills</h2>
        <div>{technologies.map(tech => <span>{tech}</span>)}</div>
      </section>

      <hr />

      <section>
        <h2 className={cx('sectionTitle')}>Professional Experience</h2>
        <div>{history.map(({company, title, time, responsibilities}) =>
          <div key={company.concat(title)} className={cx('experienceListing')}>
            <div className={cx('company')}>{company}</div>
            <h3 className={cx('position')}>{title}</h3>
            <div className={cx('dates')}>{time.start} - {time.end}</div>
            <ul className={cx('responsibilities')}>{
              responsibilities.map(bullet => <li className={cx('bullet')} dangerouslySetInnerHTML={{__html: bullet}}/>)
            }</ul>
          </div>
        )}</div>
      </section>

      <hr />

      <section>
        <h2 className={cx('sectionTitle')}>Education</h2>
        <div>{education.map(({school, degree, graduation}) =>
          <div key={school.concat(degree)}>
            <div>{degree}</div>
            <div>{school}</div>
            <div>{graduation}</div>
          </div>
        )}</div>
      </section>
    </article>
  );
};

export default Resume;

export const pageQuery = graphql`
{
  resumeYaml {
    name
    address {
      street
      city
      state
      zip
    }
    email
    phone
    education {
      school
      degree
      graduation
    }
    technologies
    history {
      company
      title
      time {
        start
        end
      }
      responsibilities
    }
  }
}
`;