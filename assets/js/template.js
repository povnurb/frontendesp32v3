"use strict";
//template del sidebar
export const sidebar=[
    /**
     * <li class="nav-item"><a class=""><a class="nav-link" href="/"><i
              class="bi bi-grid"></i><span>Dashboard</span></a></a></li>
     */
    {
        collapsed: false,
        name: 'Dashboard',
        icon: 'display',
        url: '',
        link:[]
    },
    /**
     * <li class="nav-item"><span class="nav-link collapsed" data-bs-target="#Perifericos-nav"
          data-bs-toggle="collapse"><i class="bi bi-door-open"></i><span>Periféricos</span><i
            class="bi bi-chevron-down ms-auto"></i></span>
        <ul class="nav-content collapse" data-bs-parent="#sidebar-nav" id="Perifericos-nav">
          <li><a href="esp-alarmas"><i class="bi bi-circle"></i><span>ALARMAS</span></a></li>
          <li><a href="esp-relays"><i class="bi bi-circle"></i><span>RELAYS</span></a></li>
          <li><a href="esp-espnow"><i class="bi bi-circle"></i><span>EXPANCIONES</span></a></li>
        </ul>
      </li>
     */
    {
        collapsed:true,
        name:'Periféricos',
        icon: 'diagram-3',
        url: '',
        link:[
            {
                url:'esp-alarmas',
                text: 'Alarmas'
            },
            {
                url:'esp-relays',
                text: 'Relays'
            },
            {
                url:'esp-espnow',
                text:'Expanciones'
            }
        ]
    },
    {
        collapsed:true,
        name:'Conexiones',
        icon: 'hdd-network',
        url: '',
        link:[
            {
                url:'esp-wifi',
                text: 'WiFi'
            },
            {
                url:'esp-mqtt',
                text: 'MQTT'
            },
            {
                url:'esp-deviceremote',
                text:'Dispositivo Remoto'
            }
        ]
    },
    {
        collapsed:true,
        name:'Dispositivo',
        icon: 'sliders',
        url: '',
        link:[
            {
                url:'esp-restore',
                text: 'Restaurar a fábrica'
            },
            {
                url:'esp-restart',
                text: 'Reiniciar'
            },
            {
                url:'esp-device',
                text:'Configuración'
            },
            {
                url:'esp-time',
                text:'Fecha y hora'
            }
        ]
    },
    {
        collapsed: false,
        name: 'Perfil',
        icon: 'person',
        url: 'esp-admin',
        link:[]
    },
    {
        collapsed: false,
        name: 'Salir',
        icon: 'box-arrow-right',
        url: 'esp-logout',
        link:[]
    }
]
//template del wifi
export const wifiMainInput = [
    //aqui se definen lo imputs
    {
        switch: true,
        parentId: '#switchMode',
        inputId:'wifi_mode',
        type: 'checkbox',
        label1: 'Modo WiFi',
        label2: '',
        value: false,
        classe: 'wifi'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputSSID',
        inputId:'wifi_ssid',
        type: 'text',
        label1: 'SSID Estación',
        label2: 'Nombre de la red', //placeholder 
        value: '',
        classe: 'wifi client'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputPassword',
        inputId:'wifi_password',
        type: 'password',
        label1: 'Contraseña Estación',
        label2: 'Contraseña de la red', //placeholder 
        value: '',
        classe: 'wifi client'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputSSID2',
        inputId:'wifi_ssid2',
        type: 'text',
        label1: 'SSID Estación2',
        label2: 'Red (Opcional)', //placeholder 
        value: '',
        classe: 'wifi client'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputPassword2',
        inputId:'wifi_password2',
        type: 'password',
        label1: 'Contraseña Estación 2',
        label2: 'Red (Opcional)', //placeholder 
        value: '',
        classe: 'wifi client'
    },
    {
        switch: true, //por que no es un switch es un input
        parentId: '#switchDHCP',
        inputId:'wifi_ip_static',
        type: 'checkbox',
        label1: 'DHCP',
        label2: '', //placeholder 
        value: 'false',
        classe: 'wifi ipswiche'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputIpv4',
        inputId:'wifi_ipv4',
        type: 'text',
        label1: 'Direccion IPv4',
        label2: '192.168.0.10', //placeholder 
        value: '',
        classe: 'wifi client ip'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputGateway',
        inputId:'wifi_gateway',
        type: 'text',
        label1: 'Puerta de enlace',
        label2: '192.168.0.1', //placeholder 
        value: '',
        classe: 'wifi client ip'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputSubnet',
        inputId:'wifi_subnet',
        type: 'text',
        label1: 'Máscara de subred',
        label2: '255.255.255.240', //placeholder 
        value: '',
        classe: 'wifi client ip'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputDnsPrimary',
        inputId:'wifi_dns_primary',
        type: 'text',
        label1: 'DNS primario',
        label2: '192.168.0.1', //placeholder 
        value: '',
        classe: 'wifi client ip'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputDnsSecondary',
        inputId:'wifi_dns_secondary',
        type: 'text',
        label1: 'DNS secundario',
        label2: '8.8.8.8', //placeholder 
        value: '',
        classe: 'wifi client ip'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputApSsid',
        inputId:'ap_ssid',
        type: 'text',
        label1: 'SSID punto de acceso',
        label2: 'Nombre del punto de acceso', //placeholder 
        value: '',
        classe: 'wifi ap'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputApPassword',
        inputId:'ap_password',
        type: 'password',
        label1: 'Contraseña punto de acceso',
        label2: 'Contraseña del punto de acceso', //placeholder 
        value: '',
        classe: 'wifi ap'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputApChanel',
        inputId:'ap_chanel',
        type: 'number',
        label1: 'Canal de radio',
        label2: 'Permitido del 1 al 13', //placeholder 
        value: '',
        classe: 'wifi ap',
        min: 1,
        max: 13
    },
    {
        switch: true, //por que no es un switch es un input
        parentId: '#switchVisibility',
        inputId:'ap_visibility',
        type: 'checkbox',
        label1: 'Visibilidad',
        label2: '', //placeholder 
        value: 'false',
        classe: 'wifi ap'
    },
    {
        switch: false, //por que no es un switch es un input
        parentId: '#inputApConnect',
        inputId:'ap_connect',
        type: 'number',
        label1: 'Conexiones permitidas',
        label2: 'Valores Min: 1 -Máx: 8', //placeholder 
        value: '',
        classe: 'wifi ap',
        min:1,
        max:8
    }
]
//template de relays1
export const relayMainInput1 = [
    //aqui se definen lo imputs
    {
        switch: true,
        parentId: '#switchModeLogic1',
        inputId:'R_LOGIC1',
        type: 'checkbox',
        label1: 'Relay1:',
        label2: '', //placeholder 
        value: true,
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputRelayName1',
        inputId:'R_NAME1',
        type: 'text',
        label1: 'Nombre: ',
        label2: 'Nombre del Relay1', //placeholder 
        value: '',
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputDescripcion1',
        inputId:'R_DESCRIPTION1',
        type: 'text',
        label1: 'Descripción: ',
        label2: 'Ejemplo: Abre Puerta', //placeholder 
        value: '',
        classe: 'RELAYS'
    },
    {
        switch: true,
        parentId: '#switchTimer1',
        inputId:'R_TIMERON1',
        type: 'checkbox',
        label1: 'Timer: ',
        label2: '', //placeholder 
        value: false,
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputR_TIMER1',
        inputId:'R_TIMER1',
        type: 'number',
        label1: 'Tiempo en Segundos: ',
        label2: '0', //placeholder 
        value: '0',
        classe: 'RELAYS TRELAY1',
        min: 0,
        max: 3600,
    },
    {
        switch: true,
        parentId: '#switchTEMPORIZADOR1',
        inputId:'TEMPORIZADOR1',
        type: 'checkbox',
        label1: 'TEMPORIZADOR ',
        label2: '', //placeholder 
        value: false,
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputTIMEONRELAY1',
        inputId:'TIMEONRELAY1',
        type: 'text',
        label1: 'Hr. de Encendido ',
        label2: '', //placeholder 
        value: '00:00',
        classe: 'RELAYS TEMPRELAY1'
    },
    {
        switch: false,
        parentId: '#inputTIMEOFFRELAY1',
        inputId:'TIMEOFFRELAY1',
        type: 'text',
        label1: 'Hr. de Apagado ',
        label2: '', //placeholder 
        value: '00:00',
        classe: 'RELAYS TEMPRELAY1'
    }
]
//template de relays2
export const relayMainInput2 = [
    //aqui se definen lo imputs
    {
        switch: true,
        parentId: '#switchModeLogic2',
        inputId:'R_LOGIC2',
        type: 'checkbox',
        label1: 'Relay2:',
        label2: '', //placeholder 
        value: true,
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputRelayName2',
        inputId:'R_NAME2',
        type: 'text',
        label1: 'Nombre: ',
        label2: 'Nombre del Relay2', //placeholder 
        value: '',
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputDescripcion2',
        inputId:'R_DESCRIPTION2',
        type: 'text',
        label1: 'Descripción: ',
        label2: 'Ejemplo: Abre Puerta', //placeholder 
        value: '',
        classe: 'RELAYS'
    },
    {
        switch: true,
        parentId: '#switchTimer2',
        inputId:'R_TIMERON2',
        type: 'checkbox',
        label1: 'Timer: ',
        label2: '', //placeholder 
        value: false,
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputR_TIMER2',
        inputId:'R_TIMER2',
        type: 'number',
        label1: 'Tiempo en Segundos: ',
        label2: '0', //placeholder 
        value: '0',
        classe: 'RELAYS TRELAY2',
        min: 0,
        max: 3600
    },
    {
        switch: true,
        parentId: '#switchTEMPORIZADOR2',
        inputId:'TEMPORIZADOR2',
        type: 'checkbox',
        label1: 'TEMPORIZADOR',
        label2: '', //placeholder 
        value: false,
        classe: 'RELAYS'
    },
    {
        switch: false,
        parentId: '#inputTIMEONRELAY2',
        inputId:'TIMEONRELAY2',
        type: 'text',
        label1: 'Hr. de Encendido ',
        label2: '', //placeholder 
        value: '00:00',
        classe: 'RELAYS TEMPRELAY2'
    },
    {
        switch: false,
        parentId: '#inputTIMEOFFRELAY2',
        inputId:'TIMEOFFRELAY2',
        type: 'text',
        label1: 'Hr. de Apagado ',
        label2: '', //placeholder 
        value: '00:00',
        classe: 'RELAYS TEMPRELAY2'
    }
]
//template de MQTT
export const mqttMainInput = [
    {
        switch : true,
        parentId: '#switchMqtt',
        inputId: 'mqtt_enable',
        type: 'checkbox',
        label1: 'Habilitar el MQTT',
        label2: '',
        value: false,
        classe: 'mqtt'
    },
    {
        switch : false,
        parentId: '#inputServer',
        inputId: 'mqtt_server',
        type: 'text',
        label1: 'Sevidor MQTT',
        label2: 'Dirección del servidor',
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : false,
        parentId: '#inputPort',
        inputId: 'mqtt_port',
        type: 'number',
        label1: 'Puerto MQTT',
        label2: 'Puerto de acceso',
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : true,
        parentId: '#switchRetain',
        inputId: 'mqtt_retin',
        type: 'checkbox',
        label1: 'Mensajes retenidos',
        label2: '',
        value: 'false',
        classe: 'mqtt mq'
    },
    {
        switch : false,
        parentId: '#selectQos',
        inputId: 'mqtt_qos',
        type: 'select',
        label1: 'Calidad del servicio',
        label2: 'QOS',
        option: [0,1,2],
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : false,
        parentId: '#inputClientId',
        inputId: 'mqtt_id',
        type: 'text',
        label1: 'Client Id',
        label2: 'Client Id MQTT',
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : false,
        parentId: '#inputServer',
        inputId: 'mqtt_user',
        type: 'text',
        label1: 'Usuario',
        label2: 'Usuario MQTT',
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : false,
        parentId: '#inputPassword',
        inputId: 'mqtt_password',
        type: 'password',
        label1: 'Contraseña',
        label2: 'Contraseña MQTT',
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : true,
        parentId: '#switchClean',
        inputId: 'mqtt_clean_sessions',
        type: 'checkbox',
        label1: 'Sesiones limpias',
        label2: '',
        value: 'false',
        classe: 'mqtt mq'
    },
    {
        switch : true,
        parentId: '#switchSend',
        inputId: 'mqtt_time_send',
        type: 'checkbox',
        label1: 'Enviar datos del dispositivo',
        label2: '',
        value: 'false',
        classe: 'mqtt mq'
    },
    {
        switch : false,
        parentId: '#inputInterval',
        inputId: 'mqtt_time_interval',
        type: 'number',
        label1: 'Intervalo en segundos(s)',
        label2: '60',
        value: '',
        classe: 'mqtt mq'
    },
    {
        switch : true,
        parentId: '#switchSendStatus',
        inputId: 'mqtt_status_send',
        type: 'checkbox',
        label1: 'Enviar estados',
        label2: '',
        value: 'false',
        classe: 'mqtt mq'
    }

]