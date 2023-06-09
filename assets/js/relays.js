"use strict";
import { ApiService, createBreadCrumb, headerIconsStatus, createSwitch, createInputType } from "./scripts.js";
import { relayMainInput1, relayMainInput2 } from './template.js';

export async function iniciarRelays(){
    //Cambiamos la etiqueta de titulo
    document.title = "RELAYS | ESP32 Admin Tool v3";
    //creamos el breadcrum
    createBreadCrumb('Configuración y visualización de Relays', 'Periféricos', 'Relays');
    //peticion a la api para el alarmas
    const getRelays = new ApiService('relays');
    const resp = await getRelays.getApiData();
    console.log(resp);
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);

    //dibujar los input segun corresponda
    relayMainInput1.forEach(input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else{
            createInputType(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }
    })

    relayMainInput2.forEach(input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else{
            createInputType(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }
    })
}