import { Component, OnInit } from '@angular/core';
import {MemberFormService} from "../member-form.service";
import {Member} from "../../../model/member";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData;
  public members: Member[];

  constructor(private memberFormService: MemberFormService) { }

  ngOnInit() {
    this.loadData();
    this.tableData1 = {
      headerRow: [ 'ID', 'Nom', 'Telephone', 'Ville', 'Categorie', 'Formule'],
      dataRows: [
        ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
    };
  }


  private loadData() {
    this.memberFormService.getAllMembers().subscribe({
      next: value => {
        console.log(value);
        this.members = value;
        //this.dt.reset();
      }
    });
  }

}
