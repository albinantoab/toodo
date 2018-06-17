import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE = 'ab-notes'

@Injectable()
export class NotesProvider {

    constructor(public storage: Storage) { }

    addNote(val){
        return this.storage.get(STORAGE).then((data) => {
            if (data != null) {
                data.push(val);
                this.storage.set(STORAGE, data);
            }
            else {
                let array = [];
                array.push(val);
                this.storage.set(STORAGE, array);
            }
        });
    }

    getNotes(){
        return this.storage.get(STORAGE);
    }

    deleteNote(index){
        return this.storage.get(STORAGE).then((data) => {
            console.log("before", data);
            if (index > -1) {
                data.splice(index, 1);
                console.log("after",data);
                this.storage.set(STORAGE, data);
            }
        });
    }
}