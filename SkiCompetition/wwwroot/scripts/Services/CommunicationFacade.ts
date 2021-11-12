import BaseModel from "../Models/BaseModel";

export default class CommunicationFacade<T extends BaseModel> {
    private _url: string;
    private _query: string;
    private setURL: () => void;
    private headers: { Accept: string; 'Content-Type': string; };

    constructor(private extension: string) {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        this._url = '/api/' + this.extension;
        this._query = '';

        this.setURL = function (): void {
            if (this._url.split('/')[this._url.lenght - 1] !== this.query) {
                this._url = this._query ? this._url + this._query : '/api/' + this.extension;
            }
        }
    }

    getAllData(): Promise<Array<T>> {
        this._url = '/api/' + this.extension;
        return fetch(this._url)
            .then((data) => {
                return data.json();
            });
    }

    getDataByID(id: number): Promise<T> {
        this._url = '/api/' + this.extension + `/${id}`;
        return fetch(this._url)
            .then(data => data.json());
    }

    postData(element: T): Promise<T> {
        this._url = '/api/' + this.extension;
        return fetch(this._url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: element.getServerData()
        }).then(data => data.json());
    }

    updateData(id: number, element: T): Promise<void> {
        this._url = '/api/' + this.extension + `/${id}`;
        return fetch(this._url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: element.getServerData()
        }).then(data => { });
    }

    deleteData(id: number): Promise<void> {
        this._url = '/api/' + this.extension + `/${id}`
        return fetch(this._url, {
            method: 'DELETE',
        }).then(data => { });
    }
}