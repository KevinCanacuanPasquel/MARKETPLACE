import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataUpload } from 'src/app/interfaces/interfaces';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.scss'],
})
export class SubirArchivoComponent implements OnInit {

  file: File;
  filesToLoad:Array<DataUpload>=[];
  images=[];


  constructor(public dialogRef: MatDialogRef<SubirArchivoComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {}



  changeListener(e) : void {
    //this.images=[];
    //this.filesToLoad=[];
    if( e.target.files ){
      if ((e.target.files.length + this.images.length) <=3  ) {
        let flag=true;
        for (var i = 0; i < e.target.files.length; i++) {  
          let file = e.target.files[i];
          if( (file.size/1024.0)/1024.0 > 9  ){
            flag=false;
            this.images=[];
            console.log("No puede cargar archivos de mas de 9MB")
            //    this.presentToast("No puede cargar archivos de mas de 9MB","danger");
            break;
          }
        }
        if( flag ){
          for (var i = 0; i < e.target.files.length; i++) {  
              let reader = new FileReader();
              let file = e.target.files[i];
              //console.log("==>tamanio de archivo " + file.size )
              reader.readAsDataURL(file);  
              console.log("el archivooooo", file)            
              reader.onload = () => {        
                this.images.push( reader.result );  
                let dataUpload:DataUpload = {
                  name: file.name,
                  ext: file.type,
                  fecha: new Date(),
                  fileBase64: String(reader.result).split(",")[1],
                           
                };
                this.filesToLoad.push(dataUpload);  
              }  
            //console.log("===>seleccionados " + this.filesToLoad.length);
          }
        }
          
        
      } else {
        //this.images=[];
        //this.filesToLoad=[];
    //    this.presentToast("No puede cargar mas de 3 archivos","danger");
      }
    } else {
      this.images=[];
      this.filesToLoad=[];
      console.log("esta entrando aqui")
  //    this.presentToast("No selecciono archivos","danger");
    }
  }

  cerrarDialog():void{
      this.dialogRef.close();
    
  }

  emitirImagenes(){
    this.dialogRef.close(this.filesToLoad);    
  }
  
}
