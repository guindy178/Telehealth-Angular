import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environment/environment';
import { ChatType, IChatMessage, IChatMessageDB } from '../interfaces/message.interface';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SocketService {
    constructor(
        private _socket: Socket,
        private _http: HttpClient
    ) { }

    get socket() { return this._socket; }

    /** ดูข้อมูลสนทนา */
    viewChat(customerID: string | number, doctorsID: string | number) {
        return this._http
            .get<{ status: boolean, messate: string; data: IChatMessageDB[] }>(apiUrl + '/api/getMasseage', { params: { customerID, doctorsID } })
            .pipe(map(res => res.data));
    }

    /** บันทึกข้อมูลสนทนา */
    createChat(value: IChatMessage) {
        const data = {
            customerID: value.customerId,
            doctorsID: value.dockerId,
            sender: ChatType[value.type],
            message: value.message,
            timeSend: new Date()
        };
        return this._http.post<{ message: string }>(apiUrl + '/api/sendMasseage', data);
    }
}