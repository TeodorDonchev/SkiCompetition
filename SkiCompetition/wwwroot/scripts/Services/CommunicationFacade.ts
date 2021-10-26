export default class CommunicationFacade<T> {
    private _url: string;
    private _query: string;
    private setURL: () => void;

    constructor(private extension: string) {
        this._url = 'https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/' + this.extension;
        this._query = '';

        this.setURL = function (): void {
            this._url = this._query ? this._url + this._query : 'https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/' + this.extension;
        }
    }

    getAllData(): Promise<Array<T>> {
        this._query = '';
        this.setURL();
        return fetch(this._url)
            .then((data) => {
                return data.json();
            });
    }

    getDataByID(id: number): Promise<T> {
        this._query = `?id=${id}`;
        this.setURL();
        return fetch(this._url)
            .then(data => data.json());
    }

    postData(element: T): Promise<T> {
        this._query = '';
        this.setURL();
        return fetch(this._url, {
            method: 'POST',
            body: JSON.stringify(element)
        }).then(data => data.json());
    }

    updateData(id: number, element: T): Promise<void> {
        this._query = `?id=${id}`;
        this.setURL();
        return fetch(this._url, {
            method: 'PUT',
            body: JSON.stringify(element)
        }).then(data => data.json());
    }

    deleteData(id: number): Promise<void> {
        this._query = `?id=${id}`;
        return fetch(this._url, {
            method: 'DELETE',
        }).then(data => data.json());
    }
}