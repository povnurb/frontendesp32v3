"use strict";
import { ApiService, createBreadCrumb, headerIconsStatus, createSwitch, createInputType, formDisable, createInputTypeNum, builder,SweetAlert,alertMsg } from "./scripts.js";
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
        //console.log(Object.keys(resp.RELAY2)[index]);
        //console.log(inputValue.inputId);
        if(inputValue.inputId === Object.keys(resp.RELAY2)[index]){
            inputValue.value = resp.RELAY2[inputValue.inputId]; //
            //console.log(inputValue.value);
        }
    })

    //dibujar los input segun corresponda
    relayMainInput1.forEach(input =>{
        if(input.switch){//si son switch hara esto
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


    // Habilitar input timer/temporizador segun estado funcion automatica
    (function relaysStatus(){
        const rtimer1 = document.querySelector("#R_TIMERON1");
        const rtimer2 = document.querySelector("#R_TIMERON2");
        const rtime1 = document.querySelector("#TEMPORIZADOR1");
        const rtime2 = document.querySelector("#TEMPORIZADOR1");
        
        if(rtimer1.Checked){
            formDisable("TRELAY1",false)
        }else{
            formDisable("TRELAY1",true)
        }
        if(rtime1.Checked){ //temporizador
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

    
    const btnSendRelays2 = builder(
        {
            type: 'div',
            props:{ class: 'col-sm-10'},
            children:[
                {
                    type:'button',
                    props:{
                        class: 'btn btn-primary',
                        id: 'submitRelays',
                        type:'submit'
                    },
                    children: ['Enviar']
                }
            ]           
        }
    );
    document.querySelector('#btnSendRelays2').appendChild(btnSendRelays2);
    //capturar el evento submit del formulario
    const form2 = document.querySelector('#form2')
    form2.addEventListener('submit', event=>{
        event.preventDefault();
        const relays = document.querySelectorAll('.RELAYS'); //por que s la clase del template
        //console.log(relays);
        let data = {
            R_LOGIC1:'',
            R_NAME1:"",
            R_DESCRIPTION1:"",
            R_TIMERON1:'',
            R_TIMER1:"",
            TEMPORIZADOR1:'',
            TIMEONRELAY1:"",
            TIMEOFFRELAY1:"",
            R_LOGIC2:'',
            R_NAME2:"",
            R_DESCRIPTION2:"",
            R_TIMERON2:'',
            R_TIMER2:"",
            TEMPORIZADOR2:'',
            TIMEONRELAY2:"",
            TIMEOFFRELAY2:""
        };
        //capturar los valores de los inputs para enviar por post
        relays.forEach((inputValue, index)=>{
            //console.log(Object.keys(data)[index])
            //console.log(inputValue.id)
            if(inputValue.id === Object.keys(data)[index]){
                data[inputValue.id] = inputValue.type === 'checkbox'? inputValue.checked : inputValue.value;
                //console.log(inputValue.value)
            }
        });
        //console.log(data);
        SweetAlert('¿Guardar?', 'La Configuración de los Relays', 'question', 'relays', data);
        
    });
    //sacar alert superior de la pagina segun el valor en el local storage
    if(localStorage.getItem('save')){
        alertMsg('danger','¡Se han realizado cambios en la configuracion, es necesario reiniciar el equipo');
    }
    
}
