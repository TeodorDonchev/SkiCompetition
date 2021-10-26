export default class CommunicationFacade {
    private _url: string;
    private _query: string;

    constructor(private extension: string) {
        this._url = 'https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/' + extension;
        this._query = '';
    }

    fetchData(options = {}) {
        this._url = this._query ? this._url + this._query : 'https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/' + this.extension;

        return fetch(this._url, options)
            .then((data) => {
                console.log('url: ', this._url);
                return data.json();
            });
    }
    //generic type
    getAllData() {
        this._query = '';
        return this.fetchData({
            method: 'GET'
        });
    }

    getDataByID(id) {
        this._query = `?id=${id}`
        return this.fetchData({
            method: 'GET'
        });
    }

    postData(element) {
        this._query = '';
        return this.fetchData({
            method: 'POST',
            body: JSON.stringify(element)
        });
    }

    updateData(id, element) {
        this._query = `?id=${id}`;
        return this.fetchData({
            method: 'PUT',
            body: JSON.stringify(element)
        });
    }

    deleteData(id) {
        this._query = `?id=${id}`;
        return this.fetchData({
            method: 'DELETE'
        });
    }
}