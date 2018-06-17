import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddNoteModalPage } from '../add-note-modal/add-note-modal';
import { NotesProvider } from "../../providers/note";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public notes = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public notesProvider: NotesProvider) {
    //this.notesProvider.deleteNote('abnotes');
    this.notesProvider.getNotes().then((data) => {
      this.notes = data;
    });
  }

  public openModal(){
    let addModal = this.modalCtrl.create(AddNoteModalPage);
    addModal.onDidDismiss(() => {
      this.notesProvider.getNotes().then((data) => {
        this.notes = data;
      });
    });
    addModal.present();
  }

  public removeNote(key){
    this.notesProvider.deleteNote(key).then(() => {
      this.notes = [];
      this.notesProvider.getNotes().then((data) => {
        this.notes = data;
      });
    });
  }
}
