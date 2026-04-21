// 全局类型定义

// 文档类型
export interface DocMetadata {
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  readingTime?: number;
  lastUpdated?: Date;
}

// 导航项类型
export interface NavItem {
  label: string;
  link?: string;
  items?: NavItem[];
  autogenerate?: {
    directory: string;
  };
}

// 配置类型
export interface SiteConfig {
  title: string;
  description: string;
  site: string;
  base: string;
  social: {
    github?: string;
    twitter?: string;
    email?: string;
  };
}

// 错误处理类型
export interface ErrorInfo {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// 内容集合类型
export interface ContentCollection {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: DocMetadata;
}

// 工具函数类型
export type ReadingTimeCalculator = (content: string) => number;
export type TagNormalizer = (tags: string[]) => string[];
export type DifficultyValidator = (difficulty: string) => boolean;