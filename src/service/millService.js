import httpClient from './httpClient'

const MillService = {
    async getGame() {
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
    async changeGame(type, path) {
        try {
            let RAW_DATA = ''
            switch (type) {
                case 'post':
                    RAW_DATA = await httpClient.post(path)
                    return RAW_DATA.data
                case 'put':
                    RAW_DATA = await httpClient.put(path)
                    break;
                default:
                    return ''
            }
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