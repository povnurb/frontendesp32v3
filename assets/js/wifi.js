"use strict";
import { ApiService, createBreadCrumb, createInputType, createInputTypeNum, createSwitch, headerIconsStatus } from "./scripts.js";
import { wifiMainInput } from './template.js';

export async function iniciarWifi(){
    //Cambiamos la etiqueta de titulo
    document.title = "WIFI | ESP32 Admin Tool v3";
    //creamos el breadcrum
    createBreadCrumb('Configuración de WiFi', 'Conexiones', 'Wifi');
    //peticion a la api para el wifi
    const getWifi = new ApiService('connection/wifi');
    const resp = await getWifi.getApiData();
    console.log(resp);
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);

    //dibujar los input segun corresponda
    wifiMainInput.forEach(input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else{
            createInputTypeNum(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe, input.min, input.max);
        }
    })

}