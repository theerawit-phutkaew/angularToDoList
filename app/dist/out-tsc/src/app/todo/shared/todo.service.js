import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let TodoService = class TodoService {
    constructor(firebasedb) {
        this.firebasedb = firebasedb;
    }
    getToDoList() {
        this.toDoList = this.firebasedb.list('titles');
        return this.toDoList;
    }
    addTitle(title) {
        this.toDoList.push({
            title: title,
            isChecked: false
        });
    }
    checkOrUnCheckTitle(key, flag) {
        this.toDoList.update(key, { isChecked: flag });
    }
    removeTitle(key) {
        this.toDoList.remove(key);
    }
};
TodoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map