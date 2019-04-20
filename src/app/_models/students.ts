export class Student {
    id: number;
    studentName: string;
    category: string;
    // documents: DocumentList
    dob: Date;
    fathersName: string;
    mothersName: string;
    lastClassScore: number
}

export class DocumentList {
    domicile: Boolean;
    birthCertificate: Boolean;
    marksheets: Boolean;
    policeClearance: Boolean;
    passport: Boolean;
    declaration: Boolean;
}