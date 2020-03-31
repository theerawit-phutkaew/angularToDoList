import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  state={
    all:true,
    active:false,
    complete:false
  }
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach(ele => {
        const a = ele.payload.toJSON()
        a['$key'] = ele.key
        this.toDoListArray.push(a)
      })

      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked
      })
    })
  }

  onAdd(itemTitle: { value: string; }){
    this.toDoService.addTitle(itemTitle.value)
    itemTitle.value = null;
  }

  alterCheck($key: string,isChecked: boolean){
    this.toDoService.checkOrUnCheckTitle($key,!isChecked)
  }

  onDelete($key: string){
    this.toDoService.removeTitle($key)
  }

  clickState(name:string){
    if (name === "all") {
      this.state.all = true
    this.state.active = false
    this.state.complete = false
    } else if (name === "active") {
      this.state.all = false
    this.state.active = true
    this.state.complete = false
    } else {
      this.state.all = false
    this.state.active = false
    this.state.complete = true
    }
  }


}
