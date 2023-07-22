// eslint-disable-next-line
// console.log(window.location.host);

export default {
    baseURL:window.location.host.includes('staging') ? 'https://Dev.api.v2.nftytribe.io' :'https://test-api.nftytribe.io',
    // baseURL:'https://a5b1-197-210-77-84.eu.ngrok.io',
   
    mainnetEth: {
        chain: 'ethereum',
        chainId: '0x1',
    },
    testnetEth: {
        chain: 'rinkeby',
        chainId: '0x4',
    },
    mainnetBsc: {
        chain: 'bsc',
        chainId: '0x38',
    },
    testnetBsc: {
        chain: 'bsc testnet',
        chainId: '0x61',
    }
}