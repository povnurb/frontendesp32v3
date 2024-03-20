"use strict";

import{ApiService, createBreadCrumb, createInputType, createSwitch, headerIconsStatus, createSelectType}from './scripts.js'
import{mqttMainInput} from './template.js' //trae informacion

export async function iniciarMqtt(){
    // Cambiar la etiqueta de titulo
    document.title = "MQTT | ESP32 Admin Tool v3";
    // Creamos el breadcrum
    createBreadCrumb('Configuración del MQTT', 'Conexiones', 'MQTT');
    //crear la conexion a la API
    const getMqtt = new ApiService('connection/mqtt');
    const resp = await getMqtt.getApiData();
    console.log(resp);
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
    //pasar los valores de la respuesta al objeto mqtt
    mqttMainInput.forEach((inputValue, index)=>{
        if(inputValue.inputId === Object.keys(resp.mqtt)[index])
        inputValue.value = resp.mqtt[inputValue.inputId]
    });
    //dibujar los inputs
    mqttMainInput.forEach( input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else if(!input.switch && input.type === 'select'){
            createSelectType(input.parentId, input.inputId, input.type, input.label1, input.label2, input.option, input.value, input.classe);                
        }else{
            createInputType(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }
    })
}