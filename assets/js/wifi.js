"use strict";
import { ApiService, createBreadCrumb, createInputType, createInputTypeNum, createSwitch, headerIconsStatus, formDisable, builder, initTooltips,SweetAlert, alertMsg } from "./scripts.js";
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
        //console.log('Función auto');
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

    // escaneo de las redes wifi
    // crear la tarjeta de escanear redes
    function buildcard() {

        const card = builder({
            type: 'card',
            props: { class: 'card' },
            children: [
                {
                    type: 'div',
                    props: { class: 'card-body bg-secondary-light', id: 'scanBody' },
                    children: [
                        {
                            type: 'div',
                            props: { class: 'badge bg-primary text-uppercase mt-3' },
                            children: ['Puedes anotar dos redes wifi de la banda de 2.4 GHz']
                        },
                        {
                            type: 'div',
                            props: { class: 'text-center mt-5 text-lg fs-4' },
                            children: [
                                {
                                    type: 'i',
                                    props: { class: 'bi bi-wifi text-warning', style: 'font-size: 100px' }
                                },
                                {
                                    type: 'div',
                                    props: { class: 'text-center py-5' },
                                    children: [
                                        {
                                            type: 'h4',
                                            props: {
                                                class: 'fw-bold text-success text-uppercase mb-0', id: 'scanH4'
                                            },
                                            children: ['Se conectara a la red que tenga mas potencia']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        });
        const contenedor = document.querySelector('#cardScan');
        contenedor.innerHTML = ''; //elimina tarjetas y empieza de nuevo
        contenedor.appendChild(card);
    }
    buildcard();
    initTooltips();
    //crear el boton para enviar la data 
    const btnSendWifi = builder(
        {
            type: 'div',
            props:{ class: 'col-sm-10'},
            children:[
                {
                    type:'button',
                    props:{
                        class: 'btn btn-primary',
                        id: 'submitWifi',
                        type:'submit'
                    },
                    children: ['Enviar']
                }
            ]           
        }
    );
    document.querySelector('#btnSendWifi').appendChild(btnSendWifi);

    //capturar el evento submit del formulario
    const form = document.querySelector('#form')
    form.addEventListener('submit', event=>{
        event.preventDefault();
        const wifi = document.querySelectorAll('.wifi');
        //console.log(wifi);
        let data = {
            wifi_mode:'',   //es un bool
            wifi_ssid:"",
            wifi_password: "",
            wifi_ssid2:"",
            wifi_password2: "",
            wifi_ip_static: '',
            wifi_ipv4: "",
            wifi_subnet: "",
            wifi_gateway: "",
            wifi_dns_primary: "",
            wifi_dns_secondary: "",
            ap_ssid: "",
            ap_password: "",
            ap_visibility: '',
            ap_chanel: '',
            ap_connect: ''
        };
        //capturar los valores de los inputs para enviar por post
        wifi.forEach((inputValue, index)=>{
            //console.log(Object.keys(data)[index])
            //console.log(inputValue.id)
            if(inputValue.id === Object.keys(data)[index]){
                data[inputValue.id] = inputValue.type === 'checkbox'? inputValue.checked : inputValue.value;
                //console.log(inputValue.value)
            }
        });
        //console.log(data);
        //sacar alert de consulta
        SweetAlert('¿Guardar?', 'La Configuración del WiFi', 'question', 'connection/wifi', data);

    });
    //sacar alert superior de la pagina segun el valor en el local storage
    if(localStorage.getItem('save')){
        alertMsg('danger','¡Se han realizado cambios en la configuracion, es necesario reiniciar el equipo');
    }
}