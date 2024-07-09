import { Component } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchForm = new FormGroup({
    searchText : new FormControl('')
  })
  searchFunction(){
    console.log(this.searchForm.value.searchText);
    
  }
}
