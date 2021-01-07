import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from 'src/app/providers/auth/principal.service';
import { ClientService } from 'src/app/providers/client.service';
import { LoginService } from 'src/app/providers/login/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  clientProfile: boolean = true;
  patientId: number;
  nomeCard = 'Meu Perfil'

  constructor(private principalService: Principal, private clientService: ClientService,
    private loginService: LoginService,
    private route: Router) { }

  ngOnInit() {
    // Identificando se o perfil é de dentista ou de um paciente
    this.principalService.identity()
      .then(dataAccount => {
        console.log(dataAccount)
        if (dataAccount.createdBy === "system") {
          this.clientProfile = false
          this.nomeCard = "Pacientes"
        } else {
          this.clientProfile = true
          console.log(dataAccount.id)
          this.clientService.findByParam('userId', dataAccount.id).subscribe(dataPatient => {
            console.log(dataPatient)
            this.patientId = dataPatient[0].id
          }
            , err => {
              console.log(err)
            })
        }

      })
      .catch(err => {
        console.log(err)
        this.clientProfile = false
        this.nomeCard = "Pacientes"
      }

      )
  }


  logout(): void {
    this.loginService.logout()
    this.route.navigate(['/sign'])
  }
}
