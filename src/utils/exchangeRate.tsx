import { publicRequest } from './requestMethods'

export const getUsdPrice = async (token: any) => {
    try {
        const usdPrice = await publicRequest.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`)
        const usdValue = usdPrice.data
        //console.log(">>>>", usdValue)
        return Promise.resolve(usdValue)
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }

}
