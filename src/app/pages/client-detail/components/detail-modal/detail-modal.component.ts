import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import * as dayjs from "dayjs";
import { ClientItemModel } from "src/app/pages/client-page/client.item.model";
import { ClientService } from "src/app/pages/client-page/client.service";

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.scss"],
})
export class DetailModalComponent implements OnInit {
  @Input() user: ClientItemModel;

  updateUserForm: FormGroup;
  selectedAvatar: string;

  constructor(
    private modalController: ModalController,
    private clientService: ClientService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedAvatar = this.user.foto;
    console.log(this.user);
    this.updateUserForm = new FormGroup({
      cpf: new FormControl(this.user.cpf),
      rg: new FormControl(this.user.rg),
      name: new FormControl(this.user.nome),
      phone: new FormControl(this.user.whatsapp),
      email: new FormControl(this.user.email),
      uf: new FormControl(this.user.uf),
      city: new FormControl(this.user.cidade),
      address: new FormControl(this.user.endereco),
      birthdate: new FormControl(this.user.nascimento),
    });
  }

  updateUser() {
    this.user.foto = this.selectedAvatar;
    this.user.cpf = this.updateUserForm.value.cpf;
    this.user.rg = this.updateUserForm.value.rg;
    this.user.nome = this.updateUserForm.value.name;
    this.user.uf = this.updateUserForm.value.uf;
    this.user.cidade = this.updateUserForm.value.city;
    this.user.endereco = this.updateUserForm.value.address;
    this.user.whatsapp = this.updateUserForm.value.phone;
    this.user.email = this.updateUserForm.value.email;
    this.user.nascimento = this.updateUserForm.value.birthdate;

    this.clientService.updateUser(this.user);
    this.modalController.dismiss();
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: "Confirm",
      message: "Você quer deletar " + this.user.nome + "?",
      buttons: [
        {
          text: "Não",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Sim",
          handler: () => {
            this.clientService.deleteUser(this.user.id);

            this.dismissModal();
            this.router.navigate(["client"])
          },
        },
      ],
    });
    await alert.present();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
