export interface IEditor{
  type: string,
  children: {
    type:string,
    text:string,
    bold: boolean,
    italic: boolean,
    children: {
      type:string,
      text:string,
      bold: boolean,
      italic: boolean
    }[]
  }[]
}

export interface SiteData {
  id: number;
    name: string;
    slug: string;
    termsOfAgreement: IEditor[];
    privacyPolicy: IEditor[];
    dmcapolicy: IEditor[];
    cookiePolicy: IEditor[];
    logo: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
          formats?: {
            small?: { url?: string; width?: number; height?: number };
          };
        };
      };
    };
    createdAt: string;
    updatedAt: string;
}

export interface Site {
  id: number;
  name: string;
  slug: string;
  termsOfAgreement: IEditor[];
  privacyPolicy: IEditor[];
  dmcapolicy: IEditor[];
  cookiePolicy: IEditor[];
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoSmallUrl?: string | null;
  logoSmallWidth?: number | null;
  logoSmallHeight?: number | null;
  createdAt: string;
  updatedAt: string;
}
