"use strict";
import { ApiService, createBreadCrumb, createCard, createCardTable, builder, createCardRelays, createProgressBar, createCardTemp, headerIconsStatus, createCardBuzzer,alertMsg } from "./scripts.js";

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
    createCardRelays('#relaysCard', index.relays); //se entrega la informacion de los relays en index.relays
    //create card del buzzer
    createCardBuzzer('#relaysCard', index);
    //crear card del info
    createCardTable("#infoCard", false, "", "", "", "Información General", " | Dispositivo", "infoTable", index.info);

    //crear los progressbar
    // WiFi
    createProgressBar("#liWiFi","bg-warning","wifiQuality", "wifiQualitySpan",index.wifiQuality);
    //SPIFFS
    const spiffsUsed = () =>{
        let usado = parseInt(index.spiffsUsed);
        let total = parseInt(index.info.SPIFFS_SIZE_KB);
        return Math.round(usado*100/total*100)/100;
    }
    createProgressBar("#liSpiffs","bg-secondary","spiffsUsed", "spiffsUsedSpan",spiffsUsed());
    //RAM
    const ramAvailable = () =>{
        let disponible = parseInt(index.ramAvailable);
        let total = parseInt(index.info.RAM_SIZE_KB);
        return Math.round(disponible*100/total*100)/100;
    }
    createProgressBar("#liRam","bg-danger","ramAvailable", "ramAvailableSpan",ramAvailable());

    //crear card temperatura del dispositivo
    createCard("#tempCpuCard", "revenue-card", "Temperatura Interna:", "thermometer-half", "salaTemp", index.cpuTemp, "Temp. del dispositivo (°C)");
    //crear card Humedad en sala 
    createCard("#tempHum", "revenue-card", "Humedad en Sala:", "water", "salaTemp", index.hum, "Humedad Relativa (%)");
    //crear card temperatura de la sala
    createCardTemp("#tempCard", "revenue-card", "Temperatura de la Sala:", "thermometer-half", "salaTemp", index.tC, index.tmin, index.tmax);

    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
    //sacar alert superior de la pagina segun el valor en el local storage
    if(localStorage.getItem('save')){
        alertMsg('danger','¡Se han realizado cambios en la configuracion, es necesario reiniciar el equipo');
    }

























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


