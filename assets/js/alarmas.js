"use strict";
import { ApiService, createBreadCrumb, headerIconsStatus } from "./scripts.js";

export async function iniciarAlarmas(){
    //Cambiamos la etiqueta de titulo
    document.title = "ALARMAS";
    //creamos el breadcrum
    createBreadCrumb('Configuración y visualización de Alarmas', 'Periféricos', 'Alarmas');
    //peticion a la api para el alarmas
    const getAlarmas = new ApiService('alarmas');
    const resp = await getAlarmas.getApiData();
    console.log(resp);
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
}