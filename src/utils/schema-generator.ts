/**
 * Schema.org Generator
 *
 * 生成 Schema.org JSON-LD 结构化数据
 * 所有数据均从配置文件读取，不包含硬编码业务数据
 */

import type { Post } from '~/types';
import type {
  SchemaBlogPosting,
  SchemaFAQPage,
  SchemaHowTo,
  SchemaBreadcrumbList,
  SchemaOrganization,
  SchemaPerson,
} from '~/types/schema';
import { detectFAQ, detectHowTo, extractFirstImage } from './schema-detector';

/**
 * 生成组织 Schema
 */
export function generateOrganizationSchema(
  siteName: string,
  siteUrl: string,
  logo?: string,
  socialLinks?: string[]
): SchemaOrganization {
  return {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: logo || `${siteUrl}/favicon.svg`,
    sameAs: socialLinks?.filter(Boolean) || [],
  };
}

/**
 * 生成人物 Schema
 */
export function generatePersonSchema(authorName: string, url?: string): SchemaPerson {
  return {
    '@type': 'Person',
    name: authorName,
    ...(url ? { url } : {}),
  };
}

/**
 * 生成博客文章 Schema
 */
export function generateBlogPostingSchema(
  post: Post,
  url: string,
  content: string,
  organization: SchemaOrganization
): SchemaBlogPosting {
  const authorUrl = (post as Post & { authorUrl?: string }).authorUrl;

  const author = post.author
    ? generatePersonSchema(post.author, authorUrl)
    : organization;

  const image = post.image
    ? typeof post.image === 'string'
      ? post.image
      : post.image.src
    : extractFirstImage(content);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: image || undefined,
    author,
    publisher: organization,
    datePublished: post.publishDate.toISOString(),
    dateModified: post.updateDate?.toISOString() || post.publishDate.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * 生成 FAQ Schema
 */
export function generateFAQSchema(content: string): SchemaFAQPage | null {
  const faqItems = detectFAQ(content);
  if (!faqItems) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * 生成 HowTo Schema
 */
export function generateHowToSchema(content: string, title: string): SchemaHowTo | null {
  const steps = detectHowTo(content);
  if (!steps) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      text: step.text,
      position: step.position,
    })),
  };
}

/**
 * 生成面包屑 Schema
 */
export function generateBreadcrumbSchema(post: Post, baseUrl: string): SchemaBreadcrumbList {
  const items: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }> = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ];

  if (post.category) {
    items.push({
      '@type': 'ListItem' as const,
      position: 2,
      name: post.category.title,
      item: `${baseUrl}/category/${post.category.slug}`,
    });
  }

  items.push({
    '@type': 'ListItem' as const,
    position: items.length + 1,
    name: post.title,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * 生成所有 Schema（聚合函数）
 *
 * @param post - 文章数据
 * @param url - 文章完整 URL
 * @param content - 文章内容
 * @param siteName - 网站名称（来自配置）
 * @param siteUrl - 网站 URL（来自配置）
 * @param logo - Logo 路径（可选，来自配置）
 * @param socialLinks - 社交链接数组（可选，来自配置）
 */
export function generateAllSchemas(
  post: Post,
  url: string,
  content: string,
  siteName: string,
  siteUrl: string,
  logo?: string,
  socialLinks?: string[]
): (SchemaBlogPosting | SchemaFAQPage | SchemaHowTo | SchemaBreadcrumbList)[] {
  const schemas: (SchemaBlogPosting | SchemaFAQPage | SchemaHowTo | SchemaBreadcrumbList)[] = [];

  // 生成组织 Schema
  const organization = generateOrganizationSchema(siteName, siteUrl, logo, socialLinks);

  // 生成博客文章 Schema
  schemas.push(generateBlogPostingSchema(post, url, content, organization));

  // 检测并生成 FAQ Schema
  const faqSchema = generateFAQSchema(content);
  if (faqSchema) {
    schemas.push(faqSchema);
    console.log(`✅ 检测到FAQ格式，已生成FAQ Schema`);
  }

  // 检测并生成 HowTo Schema
  const howtoSchema = generateHowToSchema(content, post.title);
  if (howtoSchema) {
    schemas.push(howtoSchema);
    console.log(`✅ 检测到HowTo格式，已生成HowTo Schema`);
  }

  // 生成面包屑 Schema
  schemas.push(generateBreadcrumbSchema(post, siteUrl));

  return schemas;
}
