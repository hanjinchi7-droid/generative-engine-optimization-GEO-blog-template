/**
 * Schema.org Type Definitions
 *
 * TypeScript 类型定义用于 Schema.org JSON-LD 结构化数据
 * 参考: https://schema.org/
 */

export interface SchemaOrganization {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface SchemaPerson {
  '@type': 'Person';
  name: string;
  url?: string;
}

export interface SchemaBlogPosting {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description?: string;
  image?: string;
  author: SchemaPerson | SchemaOrganization;
  publisher: SchemaOrganization;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface SchemaFAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface SchemaHowTo {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  step: Array<{
    '@type': 'HowToStep';
    text: string;
    position: number;
  }>;
}

export interface SchemaBreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}
