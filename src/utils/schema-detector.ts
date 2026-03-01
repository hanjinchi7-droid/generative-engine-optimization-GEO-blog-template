/**
 * Schema Content Detector
 *
 * 从 Markdown 内容中自动检测常见格式，生成对应的 Schema 数据
 * 支持的格式：
 *  - FAQ: ### 问题? \n 答案
 *  - HowTo: 1. 步骤内容
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  text: string;
  position: number;
}

/**
 * 检测 FAQ 格式
 * 格式: ### 问题? \n 答案内容
 * 至少需要 2 个 FAQ 才会生成 Schema
 */
export function detectFAQ(markdown: string): FAQItem[] | null {
  // 匹配 ### 开头的问题，后面跟着答案
  const faqPattern = /^###\s+(.+?[?？])\s*\n+(.+?)(?=\n###|$)/gms;
  const matches = [...markdown.matchAll(faqPattern)];

  if (matches.length < 2) return null;

  return matches.map(match => ({
    question: match[1].trim(),
    answer: match[2].trim().replace(/\n+/g, ' '),
  }));
}

/**
 * 检测 HowTo 格式
 * 格式: 1. 步骤内容
 * 至少需要 3 个步骤才会生成 Schema
 */
export function detectHowTo(markdown: string): HowToStep[] | null {
  const howtoPattern = /^\d+\.\s+(.+)$/gm;
  const matches = [...markdown.matchAll(howtoPattern)];

  if (matches.length < 3) return null;

  return matches.map((match, index) => ({
    text: match[1].trim(),
    position: index + 1,
  }));
}

/**
 * 提取内容中的第一张图片
 */
export function extractFirstImage(markdown: string): string | null {
  const imagePattern = /!\[.*?\]\((.+?)\)/;
  const match = markdown.match(imagePattern);
  return match ? match[1] : null;
}
