"use strict";
   
const ipdevice ='192.168.1.66'; // o en mi casa 192.168.1.71 - 198 en el trabajo
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
export const host = url[2] === '127.0.0.1:5501' ? ipdevice : url[2]; //puede ser el ip o mdns
//funcion que construye codigo HTML desde JS
export function builder(Node) {
   // si el node viene indefinido
   if (typeof Node === "undefined") {
       return document.createTextNode("");
   }
   // si el node es un string lo dibujamos
   if (typeof Node === "string") {
       return document.createTextNode(Node);
   }
   // si es un html comparamos por tagname y retorno el mismo hmtl
   if (Node.tagName) {
       return Node;
   }
   // si enviamos un Objeto de JS
   const element = document.createElement(Node.type);
   // si llega props
   if (Node.props) {
       for (const prop in Node.props) {
           if (typeof Node.props[prop] === 'function' || typeof Node.props[prop] === 'object') {
               element[prop] = Node.props[prop];
           } else if (prop.includes('bs')) { // data-bs-toggle = toggle
               element.dataset[prop] = Node.props[prop]
           } else {
               element.setAttribute(prop, Node.props[prop]);
           }
       }
   }
   // si llegan hijos
   if (Node.children) {
       Node.children.map(builder).forEach(Child => element.appendChild(Child));
   }
   // eventos
   if (Node.events) {
       for (const event in Node.events) {
           element.addEventListener(event, Node.events[event](), false);
       }
   }
   return element;
}
// definir función para crear el Header desde js
export function createHeader() {
   const contenedor = document.querySelector('#header');
   const div = builder({
       type: 'div',
       props: { class: 'd-flex align-items-center justify-content-between' },
       children: [
           {
               type: 'a',
               props: { class: 'logo d-flex align-items-center', href: '/' },
               children: [
                   {
                       type: 'img',
                       props: { src: 'assets/img/logo.png', alt: 'logo' },
                   },
                   {
                       type: 'span',
                       props: { class: 'd-none d-lg-block' },
                       children: ['ESP32Tools v3'] //aqui se modifica el nombre del titulo de la pagina del dispositivo 
                   }
               ]
           },
           {
               type: 'i',
               props: { class: 'bi bi-list toggle-sidebar-btn' }
           }
       ]
   });
   contenedor.appendChild(div);
   // crear nav
   const nav = builder({
       type: 'nav',
       props: { class: 'header-nav ms-auto' },
       children: [
           {
               type: 'ul',
               props: { class: 'd-flex align-items-center' },
               children: [
                   {
                       type: 'li',
                       props: { class: 'nav-item dropdown' },
                       children: [
                           {
                               type: 'a',
                               props: {
                                   class: 'nav-link nav-icon',
                                   href: '#',
                                   bsToggle: 'dropdown'
                               },
                               children: [
                                   {
                                       type: 'i',
                                       props: {
                                           class: 'bi',
                                           bsToggle: 'tooltip',
                                           bsPlacement: 'bottom',
                                           bsOriginalTitle: 'Conexión WiFi',
                                           id: 'wifiStatus'
                                       }
                                   }
                               ]
                           }
                       ]
                   },
                   {
                       type: 'li',
                       props: { class: 'nav-item dropdown' },
                       children: [
                           {
                               type: 'a',
                               props: {
                                   class: 'nav-link nav-icon',
                                   href: '#',
                                   bsToggle: 'dropdown'
                               },
                               children: [
                                   {
                                       type: 'i',
                                       props: {
                                           class: 'bi',
                                           bsToggle: 'tooltip',
                                           bsPlacement: 'bottom',
                                           bsOriginalTitle: 'WiFi RSSI',
                                           id: 'rssiStatus'
                                       }
                                   }
                               ]
                           }
                       ]
                   },
                   {
                       type: 'li',
                       props: { class: 'nav-item dropdown' },
                       children: [
                           {
                               type: 'a',
                               props: {
                                   class: 'nav-link nav-icon',
                                   href: '#',
                                   bsToggle: 'dropdown'
                               },
                               children: [
                                   {
                                       type: 'i',
                                       props: {
                                           class: 'bi',
                                           bsToggle: 'tooltip',
                                           bsPlacement: 'bottom',
                                           bsOriginalTitle: 'Conexión MQTT',
                                           id: 'mqttStatus'
                                       }
                                   }
                               ]
                           }
                       ]
                   },
                   {
                       type: 'li',
                       props: { class: 'nav-item dropdown pe-3' },
                       children: [
                           {
                               type: 'a',
                               props: {
                                   class: 'nav-link nav-profile d-flex align-items-center pe-0',
                                   href: '#',
                                   bsToggle: 'dropdown'
                               },
                               children: [
                                   {
                                       type: 'span',
                                       props: { class: 'd-none d-md-block dropdown-toggle ps-2' },
                                       children: ['Admin']
                                   }
                               ]
                           },
                           {
                               type: 'ul',
                               props: { class: 'dropdown-menu dropdown-menu-end dropdown-menu-arrow profile' },
                               children: [
                                   {
                                       type: 'li',
                                       props: { class: 'dropdown-header' },
                                       children: [
                                           {
                                               type: 'h6',
                                               children: ['Admin']
                                           },
                                           {
                                               type: 'span',
                                               children: ['Administrador del sistema']
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'hr',
                                               props: { class: 'dropdown-divider' }
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'a',
                                               props: { class: 'dropdown-item d-flex align-items-center', href: 'esp-admin' },
                                               children: [
                                                   { type: 'i', props: { class: 'bi bi-person' } },
                                                   { type: 'span', children: ['Perfil'] }
                                               ]
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'hr',
                                               props: { class: 'dropdown-divider' }
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'a',
                                               props: { class: 'dropdown-item d-flex align-items-center', href: 'esp-device' },
                                               children: [
                                                   { type: 'i', props: { class: 'bi bi-gear' } },
                                                   { type: 'span', children: ['Configuración'] }
                                               ]
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'hr',
                                               props: { class: 'dropdown-divider' }
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'a',
                                               props: {
                                                   class: 'dropdown-item d-flex align-items-center',
                                                   href: 'https://iotmx.com',
                                                   target: '_blank'
                                               },
                                               children: [
                                                   { type: 'i', props: { class: 'bi bi-question-circle' } },
                                                   { type: 'span', children: ['Ayuda?'] }
                                               ]
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'hr',
                                               props: { class: 'dropdown-divider' }
                                           }
                                       ]
                                   },
                                   {
                                       type: 'li',
                                       children: [
                                           {
                                               type: 'a',
                                               props: {
                                                   class: 'dropdown-item d-flex align-items-center',
                                                   href: 'esp-logout',
                                                   id: 'logoutHeader'
                                               },
                                               children: [
                                                   { type: 'i', props: { class: 'bi bi-box-arrow-right' } },
                                                   { type: 'span', children: ['Salir'] }
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
//definir la funcion de crear el sidebar
export function createSidebarNav(list) {

    const contenedor = document.querySelector('.sidebar-nav');

    list.forEach(element => {
        if (element.collapsed) {
            // definir el URL
            let ulContainer = {
                type: 'ul',
                props: {
                    class: 'nav-content collapse',
                    bsParent: '#sidebar-nav',
                    id: `${element.name}-nav`
                },
                children: []
            }
            // recorrer cada collapsed en true
            element.link.forEach(link => {

                const li = {
                    type: 'li',
                    children: [
                        {
                            type: 'a',
                            props: { class: url[3] === `/` + link.url ? 'active' : '', href: link.url },
                            children: [
                                { type: 'i', props: { class: 'bi bi-circle' } },
                                { type: 'span', children: [link.text] }
                            ]
                        }
                    ]
                }

                if (ulContainer.props.class != 'nav-content collapse show')
                    ulContainer.props.class = url[3] === `/` + link.url ? 'nav-content collapse show' : 'nav-content collapse'

                ulContainer.children.push(li);

            });
            // crear el li
            const li = builder({
                type: 'li',
                props: { class: ' nav-item' },
                children: [
                    {
                        type: 'a',
                        props: {
                            class: ulContainer.props.class === 'nav-content collapse show' ? 'nav-link' : 'nav-link collapsed',
                            bsTarget: `#${element.name}-nav`,
                            bsToggle: 'collapse',
                            href: '#'
                        },
                        children: [
                            { type: 'i', props: { class: `bi bi-${element.icon}` } },
                            { type: 'span', children: [element.name] },
                            { type: 'i', props: { class: 'bi bi-chevron-down ms-auto' } }
                        ]
                    },
                    ulContainer
                ]
            });

            contenedor.appendChild(li);

        } else {
            const li = builder({
                type: 'li',
                props: { class: 'nav-item' },
                children: [
                    {
                        type: 'a',
                        props: {
                            class: url[3] === `/`+element.url ? 'nav-link' : 'nav-link collapsed', 
                            href: element.url === '' ? '/' : element.url,
                            id: element.name === 'Salir' ? 'logout' : ''
                        },
                        children: [
                            { type: 'i', props: { class: `bi bi-${element.icon}` } },
                            { type: 'span', children: [element.name] }
                        ]
                    }
                ]
            });

            contenedor.appendChild( li );
        }
    });
    // capturar el evento click
    document.getElementById('logout').addEventListener('click', evento =>{
        evento.preventDefault();
        //console.log('click')
        SweetAlert('Salir', '¿Realmente desea cerrar la sesión?', 'question', 'esp-logout', '');
    });
}
// función para crear el breadcrum
export function createBreadCrumb(title, funcion, link){
    
    const contenedor = document.querySelector('.pagetitle');
    // H1
    const h1 = builder({
        type: 'h1', children:[title]
    });
    // nav
    const nav = builder({
        type: 'nav', 
        children:[
            {
                type: 'ol',
                props: {class: 'breadcrumb'},
                children:[
                    {
                        type: 'li',
                        props: {class: 'breadcrumb-item'},
                        children:[{type: 'a', props:{href: '/'}, children:['Inicio']}]
                    },
                    {
                        type: 'li',
                        props: {class: 'breadcrumb-item'},
                        children:[funcion]
                    },
                    {
                        type: 'li',
                        props: {class: 'breadcrumb-item active'},
                        children:[link]
                    }
                ]
            }
        ]
    });
    contenedor.appendChild(h1);
    contenedor.appendChild(nav)
}
//POO para la api service
export class ApiService{
    constructor(path, data){
        this.path = path;
        this.data = data;
    }
    //metodo para hacer el GET de la información
    async getApiData(){ //metodo que es como una funcion pero no se declara asi dentro de una clase
        try {
            const get = `http://${host}/api/${this.path}`;
            const response = await fetch( get,
                {
                    method: 'GET',
                    headers:{
                        'Accept': 'application/json'
                    }
                }
            );
            const json = await response.json();
            return await json;
        } catch (error) {
            console.log(error);
        }
    }
    //método para hacer el POST de la información a la API
    async postApiData(){
        try{
            const post = `http://${host}/api/${this.path}`;
            const response = await fetch( post,
                {
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.data)//stringify convierte un objeto de JS (this.data)a formato JSON
                    // y con JSON.parse de un JSON a objeto JS
                }
            );
            const json = await response.json();
            return await json;
        }catch (error){
            console.log(error);
        }
    }
}

//crear card para el index
export function createCard(padre, classCard, title, icon ='cpu', id, value, titleSmal){
    const contenedor = document.querySelector(padre);
    const card = builder({
        type: 'div',
        props: {class: `card info-card ${classCard}`},
        children:[
            {
                type: 'div',
                props: {class: 'card-body'},
                children: [
                    {
                        type: 'h5',
                        props: {class: 'card-title text-start'},
                        children : [`${title}`]
                    },
                    {
                        type: 'div',
                        props: {class: 'd-flex align-items-center'},
                        children:[
                            {
                                type: 'div',
                                props: {class: 'card-icon rounded-circle d-flex align-items-center justify-content-center'},
                                children:[
                                    {
                                        type: 'i',
                                        props:{class: `bi bi-${icon}`}
                                    }
                                ]
                            },
                            {
                                type: 'div',
                                props: {class: 'ps-1'},
                                children: [
                                    {
                                        type:'h6',
                                        props:{ id: `${id}`, class: 'text-start ps-0'},
                                        children: [`${value}`]
                                    },
                                    {
                                        type: 'span',
                                        props: {class: 'text-muted small pt-2 ps-0'},
                                        children: [`${titleSmal}`]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    contenedor.appendChild(card);
}
//Crear card para tablas wifi, mqtt, info - con opcion de filtro o sin filtro
export function createCardTable(padre, filter, filterText, filterHref, filterHrefText, cardBodyH5Text, cardBodySpanText = " | Conexión", tableID, data){
    const entriesData = Object.entries(data);
    //console.log(entriesData);
    let tbody = {type: 'tbody', props:{ id: tableID}, children: [] }

    entriesData.forEach(row =>{

        let tr = { type: 'tr', children:[] };
        let th = { type: 'th', props:{scope: 'row'}, children: [ `${row[0].replace(/_/g, ' ')}:`]} //sustituir los guines bajo por espacios
        let td = { type: 'td', props:{id:`${row[0]}`}, children: [`${row[1]}`] };

        tr.children.push(th);
        tr.children.push(td);
        tbody.children.push(tr);

    });
    //si tiene filtro
    let filterContainer;
    if (filter){
        filterContainer = {
            type: 'div',
            props: {class: 'filter'},
            children:[
                {
                    type: 'a',
                    props:{class:'icon show', href:'#', bsToggle: 'dropdown'},
                    children: [ {type: 'i', props:{class: 'bi bi-three-dots'} } ]
                },
                {
                    type: 'ul',
                    props: {class: 'dropdown-menu dropdown-menu-end dropdown-menu-arrow'},
                    children:[
                        {
                            type: 'li',
                            props:{ class: 'dropdown-header text-start'},
                            children: [{ type: 'h6', children:[filterText]}]
                        },
                        {
                            type:'li',
                            props:{class: 'dropdown-item'},
                            children: [
                                {
                                    type: 'a',
                                    props: { class: 'dropdown-item', href: filterHref },
                                    children: [ filterHrefText ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    //contenedor padre
    const contenedor = document.querySelector(padre);

    const card = builder({
        type: 'div',
        props: {class: 'card'},
        children:[
            filterContainer,
            {
                type: 'div',
                props:{ class: 'card-body'},
                children:[
                    {
                        type: 'h5',
                        props: {class: 'card-title'},
                        children:[
                            `${cardBodyH5Text}`,
                            {
                                type:'span',
                                children:[`${cardBodySpanText}`]
                            }
                        ]
                    },
                    {
                        type: 'div',
                        props: {class: 'table-responsive'},
                        children:[
                            {
                                type: 'table',
                                props:{class:'table table-borderless datatable align-middle'},
                                children:[ tbody ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    contenedor.appendChild(card);

}
//Crear relays desde la API
export function createCardRelays(padre, data){
    let relaysContainer = {
        type: 'div',
        props: { class: 'row text-center'},
        children: [
            //data[0]['R_NAME1'].toString(),data[1]['R_NAME2'].toString()
        {
            type: 'div',
            props: {class: 'col-md-12 pb-2 mb-2'},
            children: [
                {   
                    type: 'li',
                    props: {class: 'list-group-item d-flex align-items-center justify-content-between'},
                    children:[
                        {
                            type: 'h4',
                            props:{class: 'mt-3'},
                            children:[
                                {
                                    type: 'span',
                                    props:{class: 'badge border-primary border-1 text-secondary'},
                                    children: [
                                        data[0]['R_NAME1']+' ',
                                        {
                                            type:'i',
                                            props:{
                                                //class: relay.R_LOGIC1? (relay.R_STATUS1?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS1?'bi bi-option':'bi bi-alt'),
                                                class: data[0]['R_LOGIC1']? (data[0]['R_STATUS1']?'bi bi-alt':'bi bi-option' ):(data[0]['R_STATUS1']?'bi bi-option':'bi bi-alt'),
                                                //id: relay.R_NAME1+'_Icon' //esto seria  RELAY01_Icon
                                                id: data[0]['R_NAME1']+'_Icon' //esto seria  RELAY01_Icon
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'div',
                            props: {class: 'form-check form-switch card-icon rounded-circle d-flex align-items-center justify-content-center'},
                            children: [
                                {
                                    type: 'input',
                                    children:[],
                                    props: data[0]['R_LOGIC1']?(
                                        // si la logica es positiva osea normal
                                        data[0]['R_STATUS1']?{
                                            //se es verdadero
                                            id: data[0]['R_NAME1'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            checked: '',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }:
                                        {
                                            //si es falso
                                            id: data[0]['R_NAME1'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }
                                    ) : 
                                    (
                                        //si la logica es negativa osea diferente
                                        data[0]['R_STATUS1']?{
                                            //se es verdadero
                                            id: data[0]['R_NAME1'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }:
                                        {
                                            //si es falso
                                            id: data[0]['R_NAME1'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            checked: '',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }
                                    )
                                    
                                }
                            ]
                        },
                        {
                            type:'div',
                            props: {class: 'card-icon rounded-circle d-flex align-items-center'},
                            children: [
                                {
                                    type:'i',
                                    props:{
                                        id: data[0]['R_STATUS1']+'_Status',
                                        class: data[0]['R_LOGIC1']? (data[0]['R_STATUS1']?'bi bi-lightbulb-fill text-warning':'bi bi-lightbulb-fill text-dark' ):(data[0]['R_STATUS1']?'bi bi-lightbulb-fill text-dark':'bi bi-lightbulb-fill text-warning')
                                    }
                                }
                            ]
                        }
                    ]
                },
                {   
                    type: 'li',
                    props: {class: 'list-group-item d-flex align-items-center justify-content-between'},
                    children:[
                        {
                            type: 'h4',
                            props:{class: 'mt-3'},
                            children:[
                                {
                                    type: 'span',
                                    props:{class: 'badge border-primary border-1 text-secondary'},
                                    children: [
                                        data[1]['R_NAME2']+' ',
                                        {
                                            type:'i',
                                            props:{
                                                //class: relay.R_LOGIC2? (relay.R_STATUS2?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS2?'bi bi-option':'bi bi-alt'),
                                                class: data[1]['R_LOGIC2']? (data[1]['R_STATUS2']?'bi bi-alt':'bi bi-option' ):(data[1]['R_STATUS2']?'bi bi-option':'bi bi-alt'),
                                                //id: relay.R_NAME2+'_Icon' //esto seria  RELAY12_Icon
                                                id: data[1]['R_NAME2']+'_Icon' //esto seria  RELAY02_Icon
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'div',
                            props: {class: 'form-check form-switch card-icon rounded-circle d-flex align-items-center justify-content-center'},
                            children: [
                                {
                                    type: 'input',
                                    children:[],
                                    props: data[1]['R_LOGIC2']?(
                                        // si la logica es positiva osea normal
                                        data[1]['R_STATUS2']?{
                                            //se es verdadero
                                            id: data[1]['R_NAME2'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            checked: '',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }:
                                        {
                                            //si es falso
                                            id: data[1]['R_NAME2'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }
                                    ) : 
                                    (
                                        //si la logica es negativa osea diferente
                                        data[1]['R_STATUS2']?{
                                            //se es verdadero
                                            id: data[1]['R_NAME2'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }:
                                        {
                                            //si es falso
                                            id: data[1]['R_NAME2'],
                                            class: 'form-check-input',
                                            type: 'checkbox',
                                            checked: '',
                                            onchange:()=>{switchRelay(data[0]['R_NAME1'],data[0]['R_LOGIC1'],data[1]['R_NAME2'],data[1]['R_LOGIC2'])}//TODO: definir la función   ----------------------------------------------------
                                        }
                                    )
                                    
                                }
                            ]
                        },
                        {
                            type:'div',
                            props: {class: 'card-icon rounded-circle d-flex align-items-center'},
                            children: [
                                {
                                    type:'i',
                                    props:{
                                        id: data[1]['R_STATUS2']+'_Status',
                                        class: data[1]['R_LOGIC2']? (data[1]['R_STATUS2']?'bi bi-lightbulb-fill text-warning':'bi bi-lightbulb-fill text-dark' ):(data[1]['R_STATUS2']?'bi bi-lightbulb-fill text-dark':'bi bi-lightbulb-fill text-warning')
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
        
    }
    //console.log(data)

  
    // contenedor padre
    const contenedor = document.querySelector(padre);

    const card = builder({
        type: 'div',
        props: {class: 'card'},
        children:[
            {
                type: 'div',
                props: {class: 'card-body'},
                children: [
                    {
                        type: 'h5',
                        props: {class: 'card-title'},
                        children: [
                            'Control de relays ',
                            { type: 'span', children:['ON/OFF ', {type: 'i', props:{class: 'bi bi-toggles'} } ] }
                        ]
                    },
                    relaysContainer
                ]
            }
        ]
    });
    contenedor.appendChild(card);
}

//funcion para ejecutar los controles a los relays
const switchRelay = (name1,logic1,name2,logic2) =>{
    //capturar el estado del relay hay que hacer una igual para capturar la lógica de los relay
    const status1 = document.querySelector(`#${name1}`).checked;
    const status2 = document.querySelector(`#${name2}`).checked;
    console.log("name1: " +`#${name1}` +' '+ status1)
    const toSend = {
        protocol: 'API',
        //output: name,
        //value: status,
        R_DESCRIPTION1: "",
        R_NAME1: "",
        R_STATUS1: status1,
        R_LOGIC1: logic1,
        R_TIMER1: "",
        TIMEOFFRELAY1: "",
        TIMEONRELAY1: "",
        R_DESCRIPTION2: "",
        R_NAME2: "",
        R_STATUS2: status2,
        R_LOGIC2: logic2,
        R_TIMER2: "",
        TIMEOFFRELAY2: "",
        TIMEONRELAY2: ""
    }
    //console.log(toSend)
    const path =  'relays'; //de la api en el curso 'device/relays' en mi proyecto relays
    //funcion para ejecutar los POST
    ejecutarPost(path, toSend);
    let sti = JSON.stringify(toSend)//me falta a que relay se va a enviar
    console.log(path+' '+sti)
}
//ejecutar POST a la API
export async function ejecutarPost(path, data){
    const postAPI = new ApiService(path,data);
    const resp = await postAPI.postApiData();
    console.log(resp)
    if( resp.relay){
        console.log(resp)
    }
}

/*
export class card{
    constructor(textHeaer, body){
        this.textHeaer = textHeaer;
        this.body = body;
    }
    builCard(){
        return builder({
            type: 'div',
            props: {class: 'card'},
            chidren:[
                {
                    type: 'div',
                    props: {class: 'card-header'},
                    children: [ this.textHeaer ]
                },
                this.body
            ]
        });
    }
}*/