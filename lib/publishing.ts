import type { Post } from './types';
import { deletePost as deletePostRecord, updatePost, upsertPost } from './db';

export async function saveDraft(post: Post) {
  return upsertPost({ ...post, status: 'draft', published_at: null });
}

export async function publishPost(post: Post) {
  return upsertPost({ ...post, status: 'published', published_at: new Date().toISOString() });
}

export async function schedulePost(post: Post, scheduledAt: string) {
  return upsertPost({ ...post, status: 'scheduled', scheduled_at: scheduledAt, published_at: null });
}

export async function updateExistingPost(id: string, patch: Partial<Post>) {
  return updatePost(id, patch);
}

export async function deletePost(id: string) {
  return deletePostRecord(id);
}
