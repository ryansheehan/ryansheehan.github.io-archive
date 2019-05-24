export interface IPersonalInfo {
  address: {
    city: string;
    state: string;
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

export interface IResume {
  name: string;
  title: string;
  personalInfo: IPersonalInfo;
  summary: string;
  education: ISchool[];
}