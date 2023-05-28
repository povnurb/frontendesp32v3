"use strict";
    
const ipdevice ='192.168.1.198'; // o en mi casa 192.168.1.67
const urlActual = window.location; //la url donde estamos la metemos en la constante

//export es para exportar fuera de este archivo la siguiente expresion regular
export const url =  /^(\w+):\/\/([^\/]+)([^]+)$/.exec(urlActual);//mostrando un array con posiciones
/**
 * [
    "http://127.0.0.1:5500/#",
    "http",
    "127.0.0.1:5500",
    "/#"
    ]
 */
//esto nos ayuda a decifrar el url y saber en que pagina me encuentro
//tambien nos sirve para saber la dirección IP y saber si estamos en modo desarrollo o producción
export const host =  url[2] === '127.0.0.1:5500' ? ipdevice : url[2]; //puede ser el ip o mdns

//funcion que construye codigo HTML desde JS
export function builder(Node){

   //si el nodo viene indefinido
   if(typeof Node === 'undefined'){
      return document.createTextNode('')
   }
   //si el node es un string lo dibujamos
   if(typeof Node === 'string'){
      return document.createTextNode('Node')
   }
   //si es un html comparamos por tagname y retorna el mismo HTML
   if(Node.tagName){
      return Node;
   }
   //si enviamos un objeto de Js
   const element = document.createElement(Node.type);

   //si llega props (propiedades);
   if(Node.props){
      for(const prop in Node.props){
         if(typeof Node.props[prop] === 'function' || typeof Node.props[prop] === 'object'){
            element[prop] = Node.props[prop];
         }else if( prop.includes('bs')){ //data-bs-toggle = toggle
            element.dataset[prop] = Node.props[prop]
         }else{
            element.setAttribute(prop, Node.props[prop]);
         }
      }
   }
   //si llegan hijos
   if(Node.children){
      Node.children.map(builder).forEach(Child => element.appendChild(Child));
   }
   //eventos
   if(Node.events){
      for(const event in Node.events){
         element.addEventListener(event, Node.events[event](), false);

      }
   }
   return element;
}

// definir una funcion para crear el Header desde JS
export function createHeader(){
   const contenedor = document.querySelector('#header');
   const div = builder({
      type: 'div',
      props:{class:'d-flex align-items-center justify-content-between'},
      children:[
         {
            type: 'a',
            props: {class: 'logo d-flex align-items-center', href: '/'},
            children:[
               {
                  type:'img',
                  props: {src:'assets/img/logo.png', alt: 'logo'}
               },
               {
                  type: 'span',
                  props:{class: 'd-none d-lg-block'},
                  children:['ESP32WebConfig v3']
               },
               {
                  type: 'i',
                  props:{class:'bi bi-list toggle-sidebar-btn'}
               }
            ]
         }
      ]
   });
   contenedor.appendChild(div);
   //crear nav
   const nav = builder({
      type: 'nav',
      props: {class: 'header-nav ms-auto'},
      children: [
         {
            type: 'ul',
            props:{class: 'd-flex align-items-center'},
            children: [
               /**
               <li class="nav-item dropdown">
                  <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                  <i class="bi bi-wifi text-success" data-bs-toggle="tooltip" data-bs-placement="bottom"
                  data-bs-original-title="Conexión WiFi" id="wifiStatus"></i>
                  </a><!-- End wifi Icon -->
               </li><!-- End wifi Nav -->
               */
               {
                  type: 'li',
                  props:{class: 'nav-item dropdown'},
                  children:[
                     {
                        type:'a',
                        props:{class: ' nav-link nav-icon', href: '#', bsToggle: 'dropdown'},
                        children:[
                           {
                              type: 'i',
                              props:{
                                 class: 'bi', 
                                 bsToggle: 'tooltip',
                                 bsPlacement: 'bottom', 
                                 bsOriginalTitle:'Conexion Wifi', 
                                 id:'wifiStatus'
                              }
                           }
                        ]
                     }
                  ]
               },
               /*
                  <li class="nav-item dropdown">
                     <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                     <i class="bi bi-reception-4 text-success" data-bs-toggle="tooltip" data-bs-placement="bottom"
                     data-bs-original-title="WIFI RSSI" id="rssiStatus"></i>
                     </a><!-- End signal Icon -->
                  </li><!-- End signal Nav -->
                */
               {
                  type: 'li',
                  props:{class: 'nav-item dropdown'},
                  children:[
                     {
                        type:'a',
                        props:{class: ' nav-link nav-icon', href: '#', bsToggle: 'dropdown'},
                        children:[
                           {
                              type: 'i',
                              props:{
                                 class: 'bi', 
                                 bsToggle: 'tooltip',
                                 bsPlacement: 'bottom', 
                                 bsOriginalTitle:'WIFI RSSI', 
                                 id:'rssiStatus'
                              }
                           }
                        ]
                     }
                  ] 
               },
               /**
               <li class="nav-item dropdown">
                  <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                  <i class="bi bi-cloudy-fill text-success" data-bs-toggle="tooltip" data-bs-placement="bottom"
                  data-bs-original-title="Conexión MQTT" id="mqttStatus"></i>
                  </a><!-- End mqtt Icon -->
                  </li><!-- End mqtt Nav -->
               */
               {
                  type: 'li',
                  props:{class: 'nav-item dropdown'},
                  children:[
                     {
                        type:'a',
                        props:{class: ' nav-link nav-icon', href: '#', bsToggle: 'dropdown'},
                        children:[
                           {
                              type: 'i',
                              props:{
                                 class: 'bi', 
                                 bsToggle: 'tooltip',
                                 bsPlacement: 'bottom', 
                                 bsOriginalTitle:'Conexión MQTT', 
                                 id:'mqttStatus'
                              }
                           }
                        ]
                     }
                  ] 
               },
               {
                  type: 'li',
                  props:{class: 'nav-item dropdown pe-3'},
                  children:[
                     {
                        type:'a',
                        props:{class: ' nav-link nav-icon', href: '#', bsToggle: 'dropdown'},
                        children:[
                           {
                              type: 'a',
                              props:{
                                 class: 'nav-link nav-profile d-flex align-items-center pe-0',
                                 href: '#',
                                 bsToggle: 'droopdown',
                              },
                              children:[
                                 {
                                    type:'span',
                                    props: {class: 'd-none d-md-block dropdown-toggle ps-2'},
                                    children:['Admin']
                                 }
                              ]
                           },
                           {
                              type: 'ul',
                              props:{class: 'dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'},
                              children:[
                                 {
                                    type: 'li',
                                    props:{class:'dropdown-header'},
                                    children:[
                                       {
                                          type: 'h6',
                                          children:['Admin']
                                       },
                                       {
                                          type: 'span',
                                          children: ['Administrador del sistema ESP32']
                                       }
                                    ]
                                 }, 
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'hr',
                                          props: {class: 'dropdown-divider'}
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'a',
                                          props: {class: 'dropdown-item d-flex align-items-center',href: 'esp-admin'},
                                          children: [
                                             {type: 'i', props:{class: 'bi bi-person'}},
                                             {type: 'span', children: ['Perfil']}
                                          ]
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'hr',
                                          props: {class: 'dropdown-divider'}
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'a',
                                          props: {
                                             class: 'dropdown-item d-flex align-items-center',
                                             href: 'https://iotmx.com', 
                                             target: '_blank'
                                          },
                                          children: [
                                             {type: 'i', props:{class: 'bi bi-question-circle'}},
                                             {type: 'span', children: ['Ayuda']}
                                          ]
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'hr',
                                          props: {class: 'dropdown-divider'}
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'a',
                                          props: {
                                             class: 'dropdown-item d-flex align-items-center',
                                             href: 'esp-logout',
                                             id: 'logoutHeader'
                                          },
                                          children: [
                                             {type: 'i', props:{class: 'bi bi-box-arrow-right'}},
                                             {type: 'span', children: ['Salir']}
                                          ]
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'hr',
                                          props: {class: 'dropdown-divider'}
                                       }
                                    ]
                                 },
                                 {
                                    type:'li',
                                    children:[
                                       {
                                          type: 'a',
                                          props: {class: 'dropdown-item d-flex align-items-center',href: 'esp-device'},
                                          children: [
                                             {type: 'i', props:{class: 'bi bi-gear'}},
                                             {type: 'span', children: ['Configuración']}
                                          ]
                                       }
                                    ]
                                 }
                              ]
                           }
                        ]
                     }
                  ] 
               }
            ]
         }
      ]
   });
   contenedor.appendChild(nav);
}