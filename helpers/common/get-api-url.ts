const env = process.env.NODE_ENV || 'production'

export const getEnvBasedUrl = (prodUrl:string, testUrl?:string) => {
    if(testUrl && env !== 'production')
        return testUrl
return prodUrl
}