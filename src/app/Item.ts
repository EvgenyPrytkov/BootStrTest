export interface Item {
    id: string,
    author?: {
        account: string,
        fio: string,
        post: string,
    },
    docCode: string,
    docDate: string,
    docName: string,
    docType: string,
    address: string,
    status: string,
    isSpecial: boolean,
}