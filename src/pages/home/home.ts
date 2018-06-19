import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';
import { AddNoteModalPage } from '../add-note-modal/add-note-modal';
import { NotesProvider } from "../../providers/note";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public notes = [];
  public note = '';

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public notesProvider: NotesProvider, private toastCtrl: ToastController) {
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

  public enterPress(keyCode){
    if (keyCode === 13){
      this.addNote();
    }
  }

  public addNote() {
    if (this.note == '') {
      let toast = this.toastCtrl.create({
        message: 'please add something...',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      return;
    }
    this.notesProvider.addNote(this.note).then((res) => {
      let toast = this.toastCtrl.create({
        message: 'todo added',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.note = '';
      this.notesProvider.getNotes().then((data) => {
        this.notes = data;
      });
    });
  }

  public onSwipe(event){
    //console.log(event.direction);
    // 2 - left
    // 4 - right
    // 1 - none
    // 8 - up
    // 16 - down
    var id = event.target.offsetParent.id;
    if(!id) return;
    if (document.getElementById(id).className.includes("move-left")) {
      document.getElementById(id).className = document.getElementById(id).className.replace(/ move-left/g,'');
    } else {
      document.getElementById(id).className = document.getElementById(id).className.concat(" move-left");
    }
  }
}
