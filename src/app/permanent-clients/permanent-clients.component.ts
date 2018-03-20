import { Component, OnInit } from '@angular/core';
import { PermanentClient } from './permanent-client';
import { PermanentClientsService } from './permanent-clients.service';

@Component({
  selector: 'app-permanent-clients',
  templateUrl: './permanent-clients.component.html',
  styleUrls: ['./permanent-clients.component.scss']
})
export class PermanentClientsComponent implements OnInit {
  public permanentClients: PermanentClient[];

  public permanentClientsRows: PermanentClient[] = [];
  public permanentClientsColumns: { prop: string, name: string, headerClass: string }[] = [
    {prop: 'client_name', name: 'Client Name', headerClass: ''},
    {prop: 'last_date_driven', name: 'Last Date Driven', headerClass: ''},
  ];

  constructor (private permanentClientsService: PermanentClientsService) {
    this.getPermanentClients();
  }

  ngOnInit () {
  }

  getPermanentClients () {
    this.permanentClientsService.getPermanentClients()
      .subscribe(res => {
        this.permanentClients = res.schedule;

        const permanentClientsRows = [];

        res.schedule.map(row => {
          permanentClientsRows.push(new PermanentClient(row));
        });

        this.permanentClientsRows = [...permanentClientsRows];
      });
  }

}
