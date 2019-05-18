export interface IDataSiteMetaData {
  title: string;
  author: string;
  description: string;
  siteUrl: string;
  email: string;
  social: {
    twitter: string;
    github: string;
  };
}

export interface IDataSite {
  siteMetadata: IDataSiteMetaData;
}