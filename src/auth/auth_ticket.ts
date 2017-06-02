
/**
 * 凭证
 * 
 * @export
 * @interface AuthTicket
 */
export interface AuthTicket {

    /**
     * 凭证类型
     * 
     * @type {string}
     * @memberOf AuthTicket
     */
    scheme: string,

    /**
     * 凭证的值
     * 
     * @type {string}
     * @memberOf AuthTicket
     */
    parameter: string,


    /**
     * 凭证到期的时间.
     * 
     * @type {Date}
     * @memberOf AuthTicket
     */
    expireDate: Date
}