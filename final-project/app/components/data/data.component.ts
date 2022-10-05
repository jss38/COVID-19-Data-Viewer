import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  inputValues: any[] = [true, true, true, true, false, false];
  region: boolean = true;
  startDateArray: any[] = [];
  endDateArray: any[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Object>("https://api.opencovid.ca/summary?loc=hr&date=2021-03-01").subscribe((Data: any) => {
      this.startDateArray = Data.summary;
      
      this.http.get<Object>("https://api.opencovid.ca/summary?loc=hr&date=2022-03-01").subscribe((Data: any) => {
        this.endDateArray = Data.summary;
        console.log(Data.summary);
      });
    });

    (<HTMLParagraphElement>document.getElementById("date")).innerHTML = "Time Period: 2021-03-01 to 2022-03-01"
  }

  updateTable(): void {
    var query: string = "https://api.opencovid.ca/summary?";
    var startDateQuery: string;
    var endDateQuery: string;

    if((<HTMLInputElement>document.getElementById("locRadio1")).checked) {
      this.region = false;
      query += "loc=canada";
    } else if((<HTMLInputElement>document.getElementById("locRadio2")).checked) {
      this.region = false;
      query += "loc=prov";
    } else {
      this.region = true;
      query += "loc=hr"
    }

    console.log(this.region);

    startDateQuery = query + ("&date=" + (<HTMLInputElement>document.getElementById("startDate")).value);
    endDateQuery = query + ("&date=" + (<HTMLInputElement>document.getElementById("endDate")).value);

    console.log(startDateQuery);

    var checkbox1 = document.getElementById('statCheckbox1');
    var checkbox2 = document.getElementById('statCheckbox2');
    var checkbox3 = document.getElementById('statCheckbox3');
    var checkbox4 = document.getElementById('statCheckbox4');
    var checkbox5 = document.getElementById('statCheckbox5');
    var checkbox6 = document.getElementById('statCheckbox6');

    if((<HTMLInputElement>checkbox1).checked) {
      this.inputValues[0] = true;
    } else {
      this.inputValues[0] = false;
    }

    if((<HTMLInputElement>checkbox2).checked) {
      this.inputValues[1] = true;
    } else {
      this.inputValues[1] = false;
    }
    
    if((<HTMLInputElement>checkbox3).checked) {
      this.inputValues[2] = true;
    } else {
      this.inputValues[2] = false;
    }

    if((<HTMLInputElement>checkbox4).checked) {
      this.inputValues[3] = true;
    } else {
      this.inputValues[3] = false;
    }

    if((<HTMLInputElement>checkbox5).checked) {
      this.inputValues[4] = true;
    } else {
      this.inputValues[4] = false;
    }

    if((<HTMLInputElement>checkbox6).checked) {
      this.inputValues[5] = true;
    } else {
      this.inputValues[5] = false;
    }

    console.log(this.inputValues)

    this.http.get<Object>(startDateQuery).subscribe((Data: any) => {
      this.startDateArray = Data.summary;
      
      this.http.get<Object>(endDateQuery).subscribe((Data: any) => {
        this.endDateArray = Data.summary;
      });
    });

    (<HTMLParagraphElement>document.getElementById("date")).innerHTML = ("Time Period: " + (<HTMLInputElement>document.getElementById("startDate")).value + " to " + (<HTMLInputElement>document.getElementById("endDate")).value)
  }
}
