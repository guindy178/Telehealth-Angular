export interface Appointment {
    appointmentID: number,
    customerID?: number,
    doctorsID?: number|string,
    datatime: string,
    history: string,
    symptom: string,
    consult: string,
    firstName: string
    lastName: string
    gender: number
    birthday: string
    status: number | string
}