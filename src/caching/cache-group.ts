import { CacheItem } from './cache-item';

export interface CacheGroup {
    name: string,
    items: Map<string, CacheItem>;
}