export interface ICreatedBy {
  isCreatedbyStatefulCreatePages: boolean;
}

export type PageContext<T={}> = {
  pageContext: ICreatedBy & T;
}

