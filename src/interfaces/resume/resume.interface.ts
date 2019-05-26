export interface IPersonalInfo {
  address: {
    city: string;
    state: string;
    zip: string;
  }
  email: string;
  phone: string;
  website: string;
  social: {
    github: string;
    linkedin: string;
  }
}

export interface ISchool {
  school: string;
  degree: string;
  graduation: string;
}


export interface ISkill {
  name: string;
  level: number;
}

export interface ISkillCategory {
  category: string;
  skills: ISkill [];
}

export interface ICompanyInfo {
  company: string;
  title: string;
  start: string;
  end: string;
  notes: string[];
}

export interface IResume {
  name: string;
  title: string;
  personalInfo: IPersonalInfo;
  summary: string;
  skills: ISkillCategory[];
  education: ISchool[];
  experience: ICompanyInfo[];
}