import { FormField, FormInputElement } from '../../../types';
/**
 * Serialize Form Submit Event
 * @param event
 * @param fields
 */
export declare class FormSerializer {
    constructor(event: SubmitEvent, fields: FormField[]);
    get form(): {
        [key: string]: any;
    };
    __parse(): void;
    __handle_dropdown(elems: NodeListOf<FormInputElement>, key: string, formatter?: RegExp): void;
    __handle_radio(elem: FormInputElement, key: string, formatter?: RegExp): void;
    __handle_file(elem: FormInputElement, key: string, formatter?: RegExp): void;
    __handle_files(elem: FormInputElement, key: string, formatter?: RegExp): void;
    __form: {
        [key: string]: any;
    };
    __fields: FormField[];
    target: HTMLElement;
}
