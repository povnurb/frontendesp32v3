"use strict";
import { ApiService, createBreadCrumb, headerIconsStatus, createSwitch, createInputType, formDisable, createInputTypeNum } from "./scripts.js";
import { relayMainInput1, relayMainInput2 } from './template.js';

export async function iniciarRelays(){
    //Cambiamos la etiqueta de titulo
    document.title = "RELAYS | ESP32 Admin Tool v3";
    //creamos el breadcrum
    createBreadCrumb('Configuración de Relays', 'Periféricos', 'Relays');
    //peticion a la api para el alarmas
    const getRelays = new ApiService('relays');
    const resp = await getRelays.getApiData();
    //console.log(resp);
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);


    //asignar el valor del input del RELAY1 según lo que llega de la api se va a modificar los valores de value
    relayMainInput1.forEach((inputValue, index) =>{
        //console.log(Object.keys(resp.RELAY1)[index]);
        //console.log(inputValue.inputId);
        if(inputValue.inputId === Object.keys(resp.RELAY1)[index]){
            inputValue.value = resp.RELAY1[inputValue.inputId]; //
            //console.log(inputValue.value);
        }
    })
    relayMainInput2.forEach((inputValue, index) =>{
        //console.log(Object.keys(resp.RELAY1)[index]);
        //console.log(inputValue.inputId);
        if(inputValue.inputId === Object.keys(resp.RELAY2)[index]){
            inputValue.value = resp.RELAY2[inputValue.inputId]; //
            //console.log(inputValue.value);
        }
    })

    //dibujar los input segun corresponda
    relayMainInput1.forEach(input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else{
            createInputTypeNum(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe, input.min, input.max);
        }
    })

    relayMainInput2.forEach(input =>{
        if(input.switch){
            createSwitch(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe);
        }else{
            createInputTypeNum(input.parentId, input.inputId, input.type, input.label1, input.label2, input.value, input.classe, input.min, input.max);
        }
    });


    // Habilitar input timer/temporizador segun estado 
    (function relaysStatus(){
        console.log('Función auto');
        const rtimer1 = document.querySelector("#R_TIMERON1");
        const rtimer2 = document.querySelector("#R_TIMERON2");
        const rtime1 = document.querySelector("#TEMPORIZADOR1");
        const rtime2 = document.querySelector("#TEMPORIZADOR1");

        if(rtimer1.Checked){
            formDisable("TRELAY1",false)
        }else{
            formDisable("TRELAY1",true)
        }
        if(rtime1.Checked){
            formDisable("TEMPRELAY1",false)
        }else{
            formDisable("TEMPRELAY1",true)
        }
        if(rtimer2.Checked){
            formDisable("TRELAY2",false)
        }else{
            formDisable("TRELAY2",true)
        }
        if(rtime2.Checked){
            formDisable("TEMPRELAY2",false)
        }else{
            formDisable("TEMPRELAY2",true)
        }
    })(); //esta funcion es auto ejecutable en cuanto inicia la pagina se carga esta funcion

}