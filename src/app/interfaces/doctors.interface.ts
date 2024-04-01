export interface DoctersResponse {
doctorsID: number | string;
firstName: string;
lastName: string;
gender: number;
email: string;
mobilePhone: string;
username: string;
password: string;
imageFile: string;
birthdays: string;
signup_date: string;
isActive: number;
work_history: string;
symptoms_consult: string;
price: string;
language: string;
university: string
level: string
expertiseNames: string;
departmentNames: string
Identification_card : string
photocopy_Identification_card: string
license : string
status: string
}
export interface UniversityResponse {
    universityID : number;
    university : string;

}
export interface QualificationResponse {
    qulalificationID : number;
    level : string;

}
export interface languageResponse {
    languageID : number;
    language : string;

}
export interface DepartmentResponse {
    departmentID : number;
    departmentName : string;

}
export interface expertiseResponse {
    expertiseID : number;
    expertiseName : string;
    departmentID: number

}
export interface allUniversityResponse {
    doctorsID: number;
    firstName: string
    universityID : number;
    qulalificationID : number;
    university: string
    level: string;

}
export interface allResponse {
    doctorsID: number;
    firstName: string
    expertiseID : number;
    expertiseName : string;
    departmentID: number
    departmentName: string;

}
export interface alllanguageResponse {
    doctorsID: number;
    firstName: string

    languageID: number
    language: string;

}
export interface allDoctorsResponse{
            doctorsID: number
            firstName: string
            lastName: string
            email: string
            imageFile: string
            birthdays: string
            signup_date: string
            work_history: string
            symptoms_consult: string
          
            mobilePhone: string
            language: string
            university: string
            level: string
            expertiseNames: string
            departmentNames: string
            price : string
}

export interface Docters {
    firstName: string;
    lastName: string;
    imageFile: string;
    }