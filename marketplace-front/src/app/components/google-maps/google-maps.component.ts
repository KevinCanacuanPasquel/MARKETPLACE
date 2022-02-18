/// <reference types="@types/google.maps" />
import { Component, Input, Renderer2, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Geolocation} from '@capacitor/geolocation';
import {Network} from '@capacitor/network';
import { ModalController } from '@ionic/angular';
import { SubirArchivoComponent } from '../subir-archivo/subir-archivo.component';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent  {

  coordenadas = {
      lat : 0,
      lng : 0
  }
  address: string;
   htmlButton = '<button>Hello </button> ';

  /*constructor(  private http: HttpClient) { }

  ngOnInit() {
    this.locate();
  }*/

  coords: any;


  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    console.log(this.coords)
  }
  @Input('apiKey') apiKey: string;

    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;
    constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document, private modalCtr: ModalController, 
    private dataSrvice: DataService){
    }
    ngOnInit(){
        this.init().then((res) => {
            console.log("Google Maps ready.")
        }, (err) => {
            console.log(err);
        });
    }
    private init(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.loadSDK().then((res) => {
                this.initMap().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });
    }
    private loadSDK(): Promise<any> {
        console.log("Loading Google Maps SDK");
        return new Promise((resolve, reject) => {
            if(!this.mapsLoaded){
                Network.getStatus().then((status) => {
                    if(status.connected){
                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });
                    } else {
                        if(this.networkHandler == null){
                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {
                                if(status.connected){
                                    this.networkHandler.remove();
                                    this.init().then((res) => {
                                        console.log("Google Maps ready.")
                                    }, (err) => {
                                        console.log(err);
                                    });
                                }
                            });
                        }
                        reject('Not online');
                    }
                }, (err) => {
                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if(navigator.onLine){
                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });
                    } else {
                        reject('Not online');
                    }
                });
            } else {
                reject('SDK already loaded');
            }
        });
    }
    private injectSDK(): Promise<any> {
        return new Promise((resolve, reject) => {
            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            }
            const div = this.renderer.createElement('div');
            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';
            if(this.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
               // script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
            }
          
           
           // let boton = this.renderer.createElement('button');
          ///  console.log( "boton", boton)

            const b1 = this.renderer.createElement("BUTTON");
            b1.id = "boton"
            b1.textContent = "Start";
           
            this.renderer.appendChild(this._document.body, div);
          //  b1.onclick = function() {console.log("hello")};
       
           this.renderer.appendChild(div, b1);
           this.renderer.appendChild(this._document.body, div);
           this.renderer.appendChild(this._document.body, script);
           
           
        });
    }
    private initMap(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition().then((ubication) => {
                console.log(ubication);
                let latLng = new google.maps.LatLng(ubication.coords.latitude, ubication.coords.longitude);
                this.coordenadas.lat =  ubication.coords.latitude;
                this.coordenadas.lng =  ubication.coords.longitude;
                let mapOptions = {
                    center: latLng,
                    zoom: 15
                };
                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
                this.addMarker(ubication.coords.latitude, ubication.coords.longitude)
/*
                new google.maps.Marker({
                    position: latLng,
                    map,
                    title: "Hello World!",
                  });*/

                  google.maps.event.addListener(this.map, "click", (event) => {
                    this.hideMarkers();
                    this.markers = [];
                    console.log( event.latLng.toJSON())
                    let markerUbication =  event.latLng.toJSON()
                    this.addMarker(markerUbication.lat, markerUbication.lng);
                
                  });
                resolve(true);
            }, (err) => {
                reject('Could not initialise map');
            });
        });
    }
    public addMarker(lat: number, lng: number): void {
        let latLng = new google.maps.LatLng(lat, lng);
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
   
        console.log(marker)
        this.markers.push(marker);
        
    }

    hideMarkers(): void {
        this.setMapOnAll(null);
      }

      setMapOnAll(map: google.maps.Map | null) {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(map);
        }
      }

      sendData( ):void {
        this.modalCtr.dismiss(this.coordenadas);
      }
/*
      emitirImagenes(){
        this.dialogRef.close(this.coordenadas);    
        console.log("entro en emitir")
      }*/

      ngOnDestroy() {
           console.log("se fue xd")
         this.dataSrvice.changeMessage(this.coordenadas);
      }
}


