import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  imports: [FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  filterDropDown: string = "All";
  range: number = 0;

  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange() {
    this.filterChanged.emit(this.filterDropDown);
  }



  @Output() filterChangedRange = new EventEmitter<number>();
  onChangeRange(){
    this.filterChangedRange.emit(this.range)
  }
}
