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