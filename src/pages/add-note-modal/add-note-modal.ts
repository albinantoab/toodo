import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { NotesProvider } from "../../providers/note";

/**
 * Generated class for the AddNoteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-note-modal',
  templateUrl: 'add-note-modal.html',
})
export class AddNoteModalPage {

  public note = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, public notesProvider: NotesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNoteModalPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public addNote(){
    if(this.note == ''){
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
      this.viewCtrl.dismiss();
    });
  }

}
