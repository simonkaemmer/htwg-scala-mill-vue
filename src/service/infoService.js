import httpClient from './httpClient'

const END_POINT = '/info'

const InfoService = {
    async get (path) {
        try {
            const RAW_DATA = await httpClient.get(`${END_POINT}/${path}`)
            return RAW_DATA.data
        } catch (e) {
            this.errorHandling(e)
            return ''
        }
    },
    errorHandling (e) {
        console.error(e)
    }
}

export default InfoService;