import { Component, OnInit } from '@angular/core';
import { Principal } from 'src/app/providers/auth/principal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  clientProfile: boolean = true;
  user: any;
  nomeCard = 'Meu Perfil'

  constructor(private principalService: Principal) { }

  ngOnInit() {
    // Identificando se o perfil é de dentista ou de um paciente
    this.principalService.identity()
      .then(data => {
        console.log(data)
        this.clientProfile = true
        this.user = data
      })
      .catch(err => {
        console.log(err)
        this.clientProfile = false
        this.nomeCard = "Pacientes"
      }

    )
  }

}
