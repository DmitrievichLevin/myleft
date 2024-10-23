import { FormField, FormInputElement } from '../../../types';

/**
 * Serialize Form Submit Event
 * @param event
 * @param fields
 */
export class FormSerializer {
  constructor(event: SubmitEvent, fields: FormField[]) {
    this.target = event.target as HTMLElement;
    this.__fields = fields;
    this.__parse();
  }

  get form() {
    return this.__form;
  }

  __parse() {
    for (const { name: key, formatter = undefined } of this.__fields) {
      let elem = this.target.querySelector(
        `input[name=${key}],textarea[name=${key}],div[id=${key}-react-select-input],div[id=bv-scheduler-cn]`
      ) as FormInputElement;

      switch (true) {
        // File Input
        case elem?.type === 'file':
          this.__handle_file(elem, key, formatter);
          break;
        // Radio Button
        case elem?.type === 'radio':
          this.__handle_radio(elem, key, formatter);
          break;
        // Scheduler Case(Multiple Input Elems)
        case elem?.id?.includes('bv-scheduler'):
          const schedule_inputs = elem?.querySelectorAll('select');
          const [day_select, time_select] = schedule_inputs;
          this.__form.date = day_select.value;
          this.__form.time = time_select.value;
          break;
        // Multi-Dropdown Case
        case elem?.id?.includes('react-select-input'):
          this.__handle_dropdown(
            (this.target.parentElement as HTMLElement).querySelectorAll(
              `input[name=${key}]`
            ) as NodeListOf<FormInputElement>,
            key,
            formatter
          );
          break;
        default:
          this.__form[key] = formatter
            ? elem?.value?.replace(formatter, '')
            : elem?.value;
      }
    }
  }

  __handle_dropdown(
    elems: NodeListOf<FormInputElement>,
    key: string,
    formatter?: RegExp
  ) {
    this.__form[key] = [];

    for (var m = 0; m < elems.length; m += 1) {
      // e.g. included0, included1
      if (elems[m].value)
        this.__form[key].push(
          formatter ? elems[m].value.replace(formatter, '') : elems[m].value
        );
    }
  }

  __handle_radio(elem: FormInputElement, key: string, formatter?: RegExp) {
    this.__form[key] = elem.checked;
  }

  __handle_file(elem: FormInputElement, key: string, formatter?: RegExp) {
    if (elem?.multiple) {
      this.__handle_files(elem, key, formatter);
    } else {
      this.__form[key] = elem.files[0];
    }
  }

  __handle_files(elem: FormInputElement, key: string, formatter?: RegExp) {
    for (var m = 0; m < elem.files.length; m += 1) {
      // e.g. files1, files2
      this.__form[`${key}${m}`] = elem.files[m];
    }
  }

  __form: { [key: string]: any } = {};
  __fields: FormField[];

  target: HTMLElement;
}
