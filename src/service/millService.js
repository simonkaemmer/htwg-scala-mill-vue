import httpClient from './httpClient'

const MillService = {
    async getGame () {
        try {
            const RAW_DATA = await httpClient.get('/json')
            return RAW_DATA.data
        } catch (e) {
            this.errorHandling(e)
            return ''
        }
    },
    async makeMove(row, col) {
        try {
            const RAW_DATA = await httpClient.put(`${row}${col}`)
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

export default MillService;