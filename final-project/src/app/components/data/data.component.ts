import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

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
  data: any;
  options = {
    responsive: false,
    maintainAspectRatio: false
  };
  prevEndDate: string = "2022-03-01";
  postObjectArray: any[] = [];
  loc: any = "Regional";

  historyData: any = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Object>("https://api.opencovid.ca/summary?loc=hr&date=2021-03-01").subscribe((Data: any) => {
      this.startDateArray = Data.summary;
      
      this.http.get<Object>("https://api.opencovid.ca/summary?loc=hr&date=2022-03-01").subscribe((Data: any) => {
        this.endDateArray = Data.summary;
      });
    });

    (<HTMLParagraphElement>document.getElementById("date")).innerHTML = "Time Period: 2021-03-01 to 2022-03-01"

    this.http.get<Object>("https://api.opencovid.ca/summary?loc=prov&date=2022-03-01").subscribe((Data: any) => {
      this.data = {
        labels: [
          'AB',
          'BC',
          'MB',
          'NB',
          'NL',
          'NS',
          'NU',
          'NT',
          'ON',
          'PE',
          'QC',
          'SK',
          'YT'
        ],
        datasets: [
            {
                data: [
                  Data.summary[0].cumulative_cases, 
                  Data.summary[1].cumulative_cases, 
                  Data.summary[2].cumulative_cases,
                  Data.summary[3].cumulative_cases, 
                  Data.summary[4].cumulative_cases, 
                  Data.summary[5].cumulative_cases,
                  Data.summary[6].cumulative_cases, 
                  Data.summary[7].cumulative_cases, 
                  Data.summary[8].cumulative_cases,
                  Data.summary[9].cumulative_cases, 
                  Data.summary[10].cumulative_cases, 
                  Data.summary[12].cumulative_cases,
                  Data.summary[13].cumulative_cases
                ],
                backgroundColor: [
                    "#56a71b",
                    "#91a035",
                    "#62b0c1",
                    "#1c05d9",
                    "#adacc7",
                    "#921b70",
                    "#bff5e0",
                    "#fe2dfa",
                    "#1eaacc",
                    "#52236f",
                    "#f0c570",
                    "#cbd21d",
                    "#f62202"
  
                ],
                hoverBackgroundColor: [
                  "#56a71b",
                  "#91a035",
                  "#62b0c1",
                  "#1c05d9",
                  "#adacc7",
                  "#921b70",
                  "#bff5e0",
                  "#fe2dfa",
                  "#1eaacc",
                  "#52236f",
                  "#f0c570",
                  "#cbd21d",
                  "#f62202"
                ]
            }
        ]
      };
    });

    // Display the postObjectArray on startup?
    // GET the array and put into a variable called historyData which is linked to the html table 
    this.http.get('https://218.selfip.net/apps/FP82KxadnE/collections/data/documents/postObjectArray').subscribe((data: any) => {
      this.historyData = JSON.parse(data.data);
    })
  }

  updateTable(): void {
    var query: string = "https://api.opencovid.ca/summary?";
    var startDateQuery: string;
    var endDateQuery: string;

    if((<HTMLInputElement>document.getElementById("locRadio1")).checked) {
      this.region = false;
      this.loc = "Federal";
      query += "loc=canada";
    } else if((<HTMLInputElement>document.getElementById("locRadio2")).checked) {
      this.region = false;
      this.loc = "Provincial"
      query += "loc=prov";
    } else {
      this.region = true;
      this.loc = "Regional"
      query += "loc=hr"
    }

    startDateQuery = query + ("&date=" + (<HTMLInputElement>document.getElementById("startDate")).value);
    endDateQuery = query + ("&date=" + (<HTMLInputElement>document.getElementById("endDate")).value);

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

    this.http.get<Object>(startDateQuery).subscribe((Data: any) => {
      this.startDateArray = Data.summary;
      
      this.http.get<Object>(endDateQuery).subscribe((Data: any) => {
        this.endDateArray = Data.summary;
      });
    });

    (<HTMLParagraphElement>document.getElementById("date")).innerHTML = ("Time Period: " + (<HTMLInputElement>document.getElementById("startDate")).value + " to " + (<HTMLInputElement>document.getElementById("endDate")).value)

    if(this.prevEndDate != (<HTMLInputElement>document.getElementById("endDate")).value) {
      this.prevEndDate = (<HTMLInputElement>document.getElementById("endDate")).value;

      this.http.get<Object>("https://api.opencovid.ca/summary?loc=prov&date=" + (<HTMLInputElement>document.getElementById("endDate")).value).subscribe((Data: any) => {
        this.data = {
          labels: [
            'AB',
            'BC',
            'MB',
            'NB',
            'NL',
            'NS',
            'NU',
            'NT',
            'ON',
            'PE',
            'QC',
            'SK',
            'YT'
          ],
          datasets: [
              {
                  data: [
                    Data.summary[0].cumulative_cases, 
                    Data.summary[1].cumulative_cases, 
                    Data.summary[2].cumulative_cases,
                    Data.summary[3].cumulative_cases, 
                    Data.summary[4].cumulative_cases, 
                    Data.summary[5].cumulative_cases,
                    Data.summary[6].cumulative_cases, 
                    Data.summary[7].cumulative_cases, 
                    Data.summary[8].cumulative_cases,
                    Data.summary[9].cumulative_cases, 
                    Data.summary[10].cumulative_cases, 
                    Data.summary[12].cumulative_cases,
                    Data.summary[13].cumulative_cases
                  ],
                  backgroundColor: [
                      "#56a71b",
                      "#91a035",
                      "#62b0c1",
                      "#1c05d9",
                      "#adacc7",
                      "#921b70",
                      "#bff5e0",
                      "#fe2dfa",
                      "#1eaacc",
                      "#52236f",
                      "#f0c570",
                      "#cbd21d",
                      "#f62202"
    
                  ],
                  hoverBackgroundColor: [
                    "#56a71b",
                    "#91a035",
                    "#62b0c1",
                    "#1c05d9",
                    "#adacc7",
                    "#921b70",
                    "#bff5e0",
                    "#fe2dfa",
                    "#1eaacc",
                    "#52236f",
                    "#f0c570",
                    "#cbd21d",
                    "#f62202"
                  ]
              }
            ]
        };
      });
    }
  }

  saveTable(): void {
    var stats: string = "";
    let statsArray: string[] = [];

    if(this.inputValues[0]) {stats += ("New Cases "); statsArray.push("New Cases")}
    if(this.inputValues[1]) {stats += ("Cumulative Cases "); statsArray.push("Cumulative Cases")}
    if(this.inputValues[2]) {stats += ("New Deaths "); statsArray.push("New Deaths")}
    if(this.inputValues[3]) {stats += ("Cumulative Deaths "); statsArray.push("Cumulative Deaths")}
    if(this.inputValues[4]) {stats += ("New Recovered "); statsArray.push("New Recovered")}
    if(this.inputValues[5]) {stats += ("Cumulative Recovered "); statsArray.push("Cumulative Recovered")}

    stats = stats.substring(0, (stats.length - 1))
    
    let postObject: any = {};
  
    postObject.stats = stats;
    postObject.loc = this.loc;
    postObject.startDate =  (<HTMLInputElement>document.getElementById("startDate")).value;
    postObject.endDate = (<HTMLInputElement>document.getElementById("endDate")).value;
    postObject.timePeriod = ((<HTMLInputElement>document.getElementById("startDate")).value + " to " + (<HTMLInputElement>document.getElementById("endDate")).value);
    postObject.timeSaved = new Date().toLocaleString();
    postObject.statsArray = statsArray

    this.historyData.push(postObject);
    
    var postObjectArrayJSON = JSON.stringify(this.historyData);
    
    this.http.delete('https://218.selfip.net/apps/FP82KxadnE/collections/data/documents/postObjectArray').subscribe(data => {
      this.http.post('https://218.selfip.net/apps/FP82KxadnE/collections/data/documents/', { key: "postObjectArray", data: postObjectArrayJSON}).subscribe(data => {
      })
    })
  }

  delete(index: number): void {
    this.historyData.splice(index, 1);

    var postObjectArrayJSON = JSON.stringify(this.historyData);
    
    this.http.delete('https://218.selfip.net/apps/FP82KxadnE/collections/data/documents/postObjectArray').subscribe(data => {
      this.http.post('https://218.selfip.net/apps/FP82KxadnE/collections/data/documents/', { key: "postObjectArray", data: postObjectArrayJSON}).subscribe(data => {
      })
    })
  }

  display(index: number): void {
    let displayObject: any = this.historyData[index];

    let arr = displayObject.statsArray;
    let inputs: any[] = [false, false, false, false, false, false];

    for(let i = 0; i < arr.length; i++) {
      switch(arr[i]) {
        case "New Cases":
          inputs[0] = true;
          break;
        case "Cumulative Cases":
          inputs[1] = true;
          break;
        case "New Deaths":
          inputs[2] = true;
          break;
        case "Cumulative Deaths":
          inputs[3] = true;
          break;
        case "New Recovered":
          inputs[4] = true;
          break;
        case "Cumulative Recovered":
          inputs[5] = true;
          break;
      }
    }
    
    if(inputs[0] == true) {(<HTMLInputElement>document.getElementById("statCheckbox1")).checked = true} else {(<HTMLInputElement>document.getElementById("statCheckbox1")).checked = false}
    if(inputs[1] == true) {(<HTMLInputElement>document.getElementById("statCheckbox2")).checked = true} else {(<HTMLInputElement>document.getElementById("statCheckbox2")).checked = false}
    if(inputs[2] == true) {(<HTMLInputElement>document.getElementById("statCheckbox3")).checked = true} else {(<HTMLInputElement>document.getElementById("statCheckbox3")).checked = false}
    if(inputs[3] == true) {(<HTMLInputElement>document.getElementById("statCheckbox4")).checked = true} else {(<HTMLInputElement>document.getElementById("statCheckbox4")).checked = false}
    if(inputs[4] == true) {(<HTMLInputElement>document.getElementById("statCheckbox5")).checked = true} else {(<HTMLInputElement>document.getElementById("statCheckbox5")).checked = false}
    if(inputs[5] == true) {(<HTMLInputElement>document.getElementById("statCheckbox6")).checked = true} else {(<HTMLInputElement>document.getElementById("statCheckbox6")).checked = false}

    if(displayObject.loc == "Federal") {(<HTMLInputElement>document.getElementById("locRadio1")).checked = true}
    if(displayObject.loc == "Provincial") {(<HTMLInputElement>document.getElementById("locRadio2")).checked = true}
    if(displayObject.loc == "Regional") {(<HTMLInputElement>document.getElementById("locRadio3")).checked = true}
    
    (<HTMLInputElement>document.getElementById("startDate")).value = displayObject.startDate;
    (<HTMLInputElement>document.getElementById("endDate")).value = displayObject.endDate;
    
    this.updateTable();
  }
}
