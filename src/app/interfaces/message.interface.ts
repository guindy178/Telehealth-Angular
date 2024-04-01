export interface IChatMessage {
    type: ChatType;
    socketId?: string;
    dockerId: number | string;
    customerId: number | string;
    message: string;
    time: Date;
}

export interface IChatMessageDB {
    chatID: number;
    customerID: number;
    doctorsID: number;
    sender: 'Customer' | 'Doctor';
    message: string;
    timeSend: string;
}

export enum ChatType {
    Customer = 1,
    Doctor = 2,
};


export interface Messages{

    customerID: number;
    doctorsID: number;
    firstName : string
    lastName: string;
    imageFile: string;
}