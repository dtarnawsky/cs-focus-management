import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Speaker } from '../../types';
import { SpeakerService } from '../../services/speaker.service';
import { Browser } from '@capacitor/browser';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
})
export class SpeakerViewComponent implements OnInit {


  @Input() id: number;

  public speaker: Speaker;

  constructor(
    private speakerService: SpeakerService,
    private modalController: ModalController,
    private title: Title
  ) { }

  ngOnInit() {
    this.speaker = this.speakerService.getSpeaker(this.id);
    this.title.setTitle(this.speaker.firstName);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openLink(link: string) {
    await Browser.open({ url: link });
  }

}
