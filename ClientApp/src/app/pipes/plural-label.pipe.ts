import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralLabelPipe implements PipeTransform {

  transform(value: any, label: string): any {
    if(value > 1){
      return value + ' ' + label + 's';
    }
    return value + ' ' + label;
  }

}
