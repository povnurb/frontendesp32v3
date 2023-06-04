"use strict";
import { ApiService, createBreadCrumb, createCard, createCardTable, builder, createCardRelays } from "./scripts.js";

//para pasar la informacion que traigo de la api /api/index
let index = {};

//es asincrona por que se van a solicitar peticiones a la api por lo tanto hay
//que agregar awaita la funcion
export async function iniciarIndex(){

    //cambiar el titulo del html en cada una de las paginas
    document.title = 'HOME | ESP32 admin tool v3';
    //llamar l función para crear el breadcrum
    createBreadCrumb('Dashboard', "Información", "Dashboard");

    //demo peticion fetch a la api para que traiga todos los valores
    /*const url = `http://${host}/api/index`;
    await fetch(url,{
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
    })
    .then((res)=>res.json())//la respuesta se convierte en json
    .then((datos) =>{
        index = datos
    })
    .catch((error)=>console.log(error))
    console.log(index);*/

    const getIndex = new ApiService('index') //instanciamos una clase
    const resp = await getIndex.getApiData();
    index = resp;

    //console.log(index)
    //llemar el html desde la api
    //crear la tarjeta para el serial
    createCard('#serialCard', 'sales-card','Serial', 'cpu','serial', index.serial, 'Numero de serie del equipo');
    //crear la tarjeta para el device
    createCard('#deviceCard', 'revenue-card','Dispositivo', 'info-circle','device', index.device, 'Identificación del dispositivo');
    //crear la tarjeta reinicios
    createCard('#rebootsCard', 'customers-card','Reinicios', 'arrow-clockwise','reboots', index.reboots, 'Conteo de reinicios');
    //crear la tarjeta tiempo activo
    createCard('#cardTimeActive', 'customers-card','Tiempo Activo', 'clock-history','activeTime', index.activeTime, 'Tiempo de actividad (D:H:M)');
    //crea la tarjeta de la table wifi
    createCardTable('#wirelessCard', true, 'WiFi', 'esp-wifi', 'Configurar', 'Inalámbrico', ' | Conexión', 'wifiTable', index.wifi);
    // crear broker + tabla
    createCardTable("#brokerCard", true, "MQTT", "esp-mqtt","Configurar","Broker MQTT", "| Conexión", "brokerTable", index.mqtt);
    //crear los relays
    createCardRelays('#relaysCard', index.relays);
































    //Gráficas
    // Gráficas
    /*
    const inputsLine = builder({
        type: "div",
        props: { class: "card-body" },
        children: [
        {
            type: "h5",
            props: { class: "card-title" },
            children: ['TEMPERATURA SALA | DHT22 (°C)'],
        },
        {
            type: "div",
            props: { id: "chart" },
            childre: [],
        },
        ],
    });
    const cardLine = new card("Gráfica de temperatura", inputsLine).buildCard();
    //agregar la tarjeta al documento HTML
    document.getElementById("chartLine").appendChild(cardLine);*/
}


