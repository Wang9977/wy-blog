import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// 扩展文档schema以支持更多自定义字段
const extendedDocsSchema = docsSchema({
  // 添加自定义字段
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  readingTime: z.number().optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: extendedDocsSchema
  }),
};
