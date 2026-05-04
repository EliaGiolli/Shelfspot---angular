// Buttons
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

// Form-Contacts

export enum FormStatus {
    idle = 'idle', 
    sending = 'sending',
    success = 'success',
    error ='error'
} 

export interface ContactsFormTypes {
    name: string,
    email:string,
    message?: string
    formStatus: FormStatus
}
