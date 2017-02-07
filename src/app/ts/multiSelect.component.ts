import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'multiSelect',
	templateUrl: 'src/app/html/multiSelect.html',
	styleUrls: ['dist/css/ng2-select.css']
})

export class MultiSelectComponent {
	@Input() public items:Array<any>;
	@Output() change: EventEmitter<Array<any>> = new EventEmitter();
	@Input() private value:any;

	public onChange(value:any):void {
		this.value = value;
		this.change.next(value);
	}
}
