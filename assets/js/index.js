"use strict";
import {
  ApiService,
  createBreadCrumb,
  createCard,
  createCardTable,
  builder,
  createCardRelays,
  createProgressBar,
  createCardTemp,
  headerIconsStatus,
  createCardBuzzer,
  alertMsg,
  card,
} from "./scripts.js";

//para pasar la informacion que traigo de la api /api/index
let index = {};
let chart = "";

//es asincrona por que se van a solicitar peticiones a la api por lo tanto hay
//que agregar awaita la funcion
export async function iniciarIndex() {
  //cambiar el titulo del html en cada una de las paginas
  document.title = "HOME";
  //llamar l función para crear el breadcrum
  createBreadCrumb("Dashboard", "Información", "Dashboard");

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

  const getIndex = new ApiService("index"); //instanciamos una clase
  const resp = await getIndex.getApiData();
  index = resp;

  //console.log(index)
  //llemar el html desde la api
  //crear la tarjeta para el serial
  createCard(
    "#serialCard",
    "sales-card",
    "Serial",
    "cpu",
    "serial",
    index.serial,
    "Numero de serie del equipo"
  );
  //crear la tarjeta para el device
  createCard(
    "#deviceCard",
    "revenue-card",
    "Dispositivo",
    "info-circle",
    "device",
    index.LUGAR,
    "Ubicación del dispositivo"
  );
  //crear la tarjeta reinicios
  createCard(
    "#rebootsCard",
    "customers-card",
    "Reinicios",
    "arrow-clockwise",
    "reboots",
    index.reboots,
    "Conteo de reinicios"
  );
  //crear la tarjeta tiempo activo
  createCard(
    "#cardTimeActive",
    "customers-card",
    "Tiempo Activo",
    "clock-history",
    "activeTime",
    index.activeTime,
    "Tiempo de actividad (D:H:M)"
  );
  //crea la tarjeta de la table wifi
  createCardTable(
    "#wirelessCard",
    true,
    "WiFi",
    "esp-wifi",
    "Configurar",
    "Inalámbrico",
    " | Conexión",
    "wifiTable",
    index.wifi
  );
  // crear broker + tabla
  createCardTable(
    "#brokerCard",
    true,
    "MQTT",
    "esp-mqtt",
    "Configurar",
    "Broker MQTT",
    "| Conexión",
    "brokerTable",
    index.mqtt
  );
  //crear los relays
  createCardRelays("#relaysCard", index.relays); //se entrega la informacion de los relays en index.relays
  //create card del buzzer
  createCardBuzzer("#relaysCard", index);
  //crear card del info
  createCardTable(
    "#infoCard",
    false,
    "",
    "",
    "",
    "Información General",
    " | Dispositivo",
    "infoTable",
    index.info
  );

  //crear los progressbar
  // WiFi
  createProgressBar(
    "#liWiFi",
    "bg-warning",
    "wifiQuality",
    "wifiQualitySpan",
    index.wifiQuality
  );
  //SPIFFS
  const spiffsUsed = () => {
    let usado = parseInt(index.spiffsUsed);
    let total = parseInt(index.info.SPIFFS_SIZE_KB);
    return Math.round(((usado * 100) / total) * 100) / 100;
  };
  createProgressBar(
    "#liSpiffs",
    "bg-secondary",
    "spiffsUsed",
    "spiffsUsedSpan",
    spiffsUsed()
  );
  //RAM
  const ramAvailable = () => {
    let disponible = parseInt(index.ramAvailable);
    let total = parseInt(index.info.RAM_SIZE_KB);
    return Math.round(((disponible * 100) / total) * 100) / 100;
  };
  createProgressBar(
    "#liRam",
    "bg-danger",
    "ramAvailable",
    "ramAvailableSpan",
    ramAvailable()
  );

  //crear card temperatura del dispositivo
  createCard(
    "#tempCpuCard",
    "revenue-card",
    "Temperatura Interna:",
    "thermometer-half",
    "salaTemp3",
    index.cpuTemp,
    "Temp. del dispositivo (°C)"
  );
  //crear card Humedad en sala
  createCard(
    "#tempHum",
    "revenue-card",
    "Humedad en Sala:",
    "water",
    "salaTemp2",
    index.hum,
    "Humedad Relativa (%)"
  );
  //crear card temperatura de la sala
  createCardTemp(
    "#tempCard",
    "revenue-card",
    "Temperatura de la Sala:",
    "thermometer-half",
    "salaTemp1",
    index.tC,
    index.tmin,
    index.tmax
  );

  //pasar valores a los iconos del header
  headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
  //sacar alert superior de la pagina segun el valor en el local storage
  if (localStorage.getItem("save")) {
    alertMsg(
      "danger",
      "¡Se han realizado cambios en la configuracion, es necesario reiniciar el equipo"
    );
  }
  // Gráficas
  const inputsLine = builder({
    type: "div",
    props: { class: "card-body" },
    children: [
      //   {
      //     type: "h5",
      //     props: { class: "card-title" },
      //     children: ["HUMEDAD (%) | TEMPERATURA (°C)"],
      //   },
      {
        type: "div",
        props: { id: "chart" }, //recomendacion de la biblioteca
        childre: [],
      },
    ],
  });
  const cardLine = new card(
    "Gráfica de humedad y temperatura en la sala",
    inputsLine
  ).buildCard();
  // agregar la tarjeta al html
  document.getElementById("chartLine").appendChild(cardLine);
  //llenar los datos a la grafica de linea
  let options = {
    series: [
      {
        name: "TEMPERATURA °C",
        data: [],
        // data: [22,23,24,25,25,26,26,43,42,65,32,12]
      },
      {
        name: "HUMEDAD %",
        data: [],
        // data: [32,43,34,45,23,27,45,23,25,43,32,23]
      },
    ],
    chart: {
      height: 300,
      type: "line",
      // dropShadow: {
      //   enabled: true,
      //   color: "#000",
      //   top: 18,
      //   left: 7,
      //   blur: 10,
      //   opacity: 0.2,
      // },
      zoom: {
        enabled: false,
      },
    },
    annotations: {
      points: [
        // {
        //   x: 1,
        //   y: resp.cH0,
        //   marker: {
        //     size: 0,
        //   },
        //   image: {
        //     path: "../img/loader.png",
        //   },
        // },
        //   {
        //     x: 50,
        //     y: 10,
        //     borderColor: "#00E396",
        //     label: {
        //       borderColor: "#00E396",
        //       style: {
        //         color: "#fff",
        //         background: "#ff0550",
        //       },
        //       text: "Muy baja temperatura",
        //     },
        //   },
      ],
      yaxis: [
        // {
        //   y: 10,
        //   borderColor: "#00E396",
        //   label: {
        //     borderColor: "#00E396",
        //     style: {
        //       color: "#fff",
        //       background: "#ff0550",
        //     },
        //     text: "Zona de baja temperatura",
        //   },
        // },
        // {
        //   y: 40,
        //   borderColor: "#ff0550",
        //   label: {
        //     borderColor: "#ff0550",
        //     style: {
        //       color: "#fff",
        //       background: "#ff0550",
        //     },
        //     text: "Zona de baja humedad",
        //   },
        // },
        // {
        //   y: 28,
        //   borderColor: "#ff0550",
        //   label: {
        //     borderColor: "#ff0550",
        //     style: {
        //       color: "#fff",
        //       background: "#ff0550",
        //     },
        //     text: "Zona de alta temperatura",
        //   },
        // },
        // {
        //   y: 70,
        //   borderColor: "#ff0550",
        //   label: {
        //     borderColor: "#ff0550",
        //     style: {
        //       color: "#fff",
        //       background: "#ff0550",
        //     },
        //     text: "Zona de alta humedad",
        //   },
        // },
        {
          y: 70,
          y2: 90,
          borderColor: "#000",
          fillColor: "#ff0550",
          opacity: 0.2,
        },
        {
          y: 18,
          y2: 10,
          fillColor: "#ff0550",
          opacity: 0.2,
        },
        {
          y: 40,
          y2: 28,
          fillColor: "#ff0550",
          opacity: 0.2,
        },
      ],
      xaxis: [
        // {
        //   x: 1,
        //   strokeDashArray: 0,
        //   borderColor: "#775DD0",
        //   label: {
        //     borderColor: "#775DD0",
        //     style: {
        //       color: "#fff",
        //       background: "#775DD0",
        //     },
        //     text: "Ultimo valor",
        //   },
        // },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      //categories: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
      categories: [
        // "24",
        // "23",
        // "22",
        // "21",
        // "20",
        // "19",
        // "18",
        // "17",
        // "16",
        // "15",
        // "14",
        // "13",
        "12",
        "11",
        "10",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
        "1",
      ],
      align: "left",
      title: {
        text: "Registro de Temperatura y Humedad de cada 10 min",
      },
    },
    yaxis: {
      title: {
        text: "Temperatura °C y Humedad %",
      },
      min: 10,
      max: 85,
      //logarithmic: true,
    },
  };
  chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  /**
   * Quitar el loadig al cargar la pagina
   */
  document.querySelector(".preloader").remove();
  document.querySelector("#content").style = "display:block;";
}

export { chart };
