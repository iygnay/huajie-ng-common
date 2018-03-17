
export abstract class LocalSettingsManager<T> {

    /**
     * 获取设置信息
     * 
     * @param name 
     */
    abstract get(name: string): Promise<T>;

    /**
     * 更新设置信息.
     * 
     * @param name 
     * @param data 
     */
    abstract set(name: string, data: Partial<T>): Promise<void>;
}