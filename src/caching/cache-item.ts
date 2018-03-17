export interface CacheItem {
    key: string,
    data: any,
    /**
     * 到期时间.
     */
    expireDate: number,
    expired?: boolean,
}