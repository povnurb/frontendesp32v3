"use strict";
import { ApiService, createBreadCrumb, headerIconsStatus, createCardA1, createCardAB } from "./scripts.js";

let index = {};
export async function iniciarAlarmas(){
    //Cambiamos la etiqueta de titulo
    document.title = "ALARMAS";
    //creamos el breadcrum
    createBreadCrumb('Visualización de Alarmas', 'Periféricos', 'Alarmas');
    //peticion a la api para el alarmas



    const getAlarmas = new ApiService('alarmas');
    const resp = await getAlarmas.getApiData();

    index = resp;

    console.log(resp);
    //revenue-card = verde
    //sales-card = azul
    createCardA1('#alarm1Card',index.ALRMS.ALRM_NAME1, index.ALRMS.ALRM_STATUS1, index.ALRMS.ALRM_TON1,index.ALRMS.ALRM_TOFF1);
    createCardA1('#alarm2Card',index.ALRMS.ALRM_NAME2, index.ALRMS.ALRM_STATUS2, index.ALRMS.ALRM_TON2,index.ALRMS.ALRM_TOFF2);
    createCardA1('#alarm3Card',index.ALRMS.ALRM_NAME3, index.ALRMS.ALRM_STATUS3, index.ALRMS.ALRM_TON3,index.ALRMS.ALRM_TOFF3);
    createCardAB('#alarm4Card',index.ALRMS.ALRM_NAME4, index.ALRMS.ALRM_STATUS4, index.ALRMS.ALRM_TON4,index.ALRMS.ALRM_TOFF4);
    createCardAB('#alarm5Card',index.ALRMS.ALRM_NAME5, index.ALRMS.ALRM_STATUS5, index.ALRMS.ALRM_TON5,index.ALRMS.ALRM_TOFF5);
    
    //pasar valores a los iconos del header
    headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
}