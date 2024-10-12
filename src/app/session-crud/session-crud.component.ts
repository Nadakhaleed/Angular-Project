import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-session-crud',
  templateUrl: './session-crud.component.html',
  styleUrl: './session-crud.component.css'
})
export class SessionCrudComponent {
  SessionArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  title: string ="";
  description: string ="";
  start_time: string ="";
  end_time: string ="";
  currentSessionID = "";


  constructor(private http: HttpClient ) 
  {
    this.getAllSessions();
  }
  ngOnInit(): void {
  }
  getAllSessions()
  { 
    this.http.get("http://localhost:8085/api/sessions/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.SessionArray = resultData.data;
    });
  }
  
  register()
  {
    let bodyData = {
      "title" : this.title,
      "description" : this.description,
      "start_time" : this.start_time,
      "end_time" : this.end_time,

    };
    this.http.post("http://localhost:8085/api/sessions/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Session Registered Successfully")
        this.getAllSessions();
    });
  }
  setUpdate(data: any) 
  {
   this.title = data.title;
   this.description = data.description;
   this.start_time = data.start_time;
   this.end_time = data.end_time;

  
   this.currentSessionID = data.id;
 
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "title" : this.title,
      "description" : this.description,
      "start_time" : this.start_time,
      "end_time" : this.end_time,
    };
    
    this.http.put("http://localhost:8085/api/sessions/update"+ "/"+ this.currentSessionID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Session Registered Updated")
        this.getAllSessions();
      
    });
  }
 
  save()
  {
    if(this.currentSessionID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/sessions/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Session Deleted")
        this.getAllSessions();
    });
  }
}

