"use strict";
import { ApiService, createBreadCrumb, createInputType, createInputTypeNum, createSwitch, headerIconsStatus, formDisable } from "./scripts.js";
import { wifiMainInput } from './template.js';

export async function iniciarWifi(){
    //Cambiamos la etiqueta de titulo
    document.title = "WIFI | ESP32 Admin Tool v3";
    //creamos el breadcrum
    createBreadCrumb('Configuración de WiFi', 'Conexiones', 'Wifi');
    //peticion a la api para el wifi
    const getWifi = new ApiService('connection/wifi');
    const resp = await getWifi.getApiData();
    //console.log(resp);
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);

    //asignar el valor del input según lo que llega de la api vamos a modificar los valores de value
    wifiMainInput.forEach((inputValue, index) =>{
        //console.log(Object.keys(resp.wifi)[index]);
        //console.log(inputValue.inputId);
        if(inputValue.inputId === Object.keys(resp.wifi)[index]){
          
            inputValue.value = resp.wifi[inputValue.inputId]; //
            //console.log(inputValue.value);
        }
    })

    //Dibujar los input segun corresponda
    wifiMainInput.forEach(input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else{
            createInputTypeNum(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe, input.min, input.max);
        }
    });

    // Habilitar input WIFI/AP segun estado auto-ejecutable
    (function wifi(){
        console.log('Función auto');
        const ip = document.querySelector("#wifi_ip_static");
        const ap = document.querySelector("#wifi_mode");

        if(ap.checked){
            formDisable("ap", true);
            formDisable("client",false)
        }else{
            formDisable("ap", false);
            formDisable("client",true);
        }
        //para el dhcp
        if(ip.checked){
            formDisable("ip",false);
        }else{
            formDisable("ip",true);
        }
    })(); //esta funcion es auto ejecutable en cuanto inicia la pagina se carga esta funcion

}