/**
 * 内容处理工具函数
 */

import type { ReadingTimeCalculator, TagNormalizer, DifficultyValidator, ErrorInfo } from '@/types';

/**
 * 计算阅读时间（分钟）
 * @param content 内容文本
 * @returns 阅读时间（分钟）
 */
export const calculateReadingTime: ReadingTimeCalculator = (content: string): number => {
  const wordsPerMinute = 200; // 平均阅读速度
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * 标准化标签数组
 * @param tags 标签数组
 * @returns 标准化后的标签数组
 */
export const normalizeTags: TagNormalizer = (tags: string[]): string[] => {
  if (!Array.isArray(tags)) return [];

  return tags
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0)
    .filter((tag, index, self) => self.indexOf(tag) === index); // 去重
};

/**
 * 验证难度等级
 * @param difficulty 难度等级
 * @returns 是否为有效难度等级
 */
export const isValidDifficulty: DifficultyValidator = (difficulty: string): boolean => {
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  return validDifficulties.includes(difficulty);
};

/**
 * 创建错误对象
 * @param message 错误消息
 * @param code 错误代码
 * @param details 详细错误信息
 * @returns 错误对象
 */
export const createError = (
  message: string,
  code?: string,
  details?: Record<string, unknown>
): ErrorInfo => {
  return {
    message,
    code,
    details,
    timestamp: new Date(),
  };
};

/**
 * 处理内容错误
 * @param error 错误信息
 * @param context 错误上下文
 */
export const handleContentError = (
  error: unknown,
  context: string
): ErrorInfo => {
  if (error instanceof Error) {
    return createError(
      `内容处理错误: ${error.message}`,
      'CONTENT_ERROR',
      { context, stack: error.stack }
    );
  }

  return createError(
    '未知内容处理错误',
    'UNKNOWN_ERROR',
    { context, error }
  );
};

/**
 * 验证内容元数据
 * @param metadata 元数据对象
 * @returns 验证结果
 */
export const validateContentMetadata = (metadata: Record<string, unknown>): boolean => {
  try {
    // 检查必需字段
    if (!metadata.title || typeof metadata.title !== 'string') {
      throw new Error('标题不能为空且必须是字符串');
    }

    // 检查标题长度
    if (metadata.title.length === 0 || metadata.title.length > 100) {
      throw new Error('标题长度必须在1-100个字符之间');
    }

    // 检查描述
    if (metadata.description && typeof metadata.description !== 'string') {
      throw new Error('描述必须是字符串');
    }

    // 检查标签
    if (metadata.tags && !Array.isArray(metadata.tags)) {
      throw new Error('标签必须是数组');
    }

    // 检查难度等级
    if (metadata.difficulty && !isValidDifficulty(metadata.difficulty as string)) {
      throw new Error('无效的难度等级');
    }

    return true;
  } catch (error) {
    console.error('元数据验证失败:', error);
    return false;
  }
};

/**
 * 生成内容摘要
 * @param content 内容文本
 * @param maxLength 最大长度
 * @returns 内容摘要
 */
export const generateSummary = (content: string, maxLength: number = 150): string => {
  if (!content || content.length <= maxLength) {
    return content;
  }

  // 移除markdown标记
  const cleanContent = content
    .replace(/[#*`~_\[\]()]/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return cleanContent.substring(0, maxLength).trim() + '...';
};