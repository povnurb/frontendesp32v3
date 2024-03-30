"use strict";

import { chart } from "./index.js"; //quiere decir que el archivo index.js tomara los valores de esta pagina

const ipdevice = "192.168.1.75"; // o en mi casa 192.168.1.75 -casa  - .207 en el trabajo
const urlActual = window.location; //la url donde estamos la metemos en la constante
const evitarpaginarestart = "http://127.0.0.1:5501/restart.html";
const evitarpaginarestore = "http://127.0.0.1:5501/restore.html";
const evitarpaginamqtt = "http://127.0.0.1:5501/mqtt.html";
const evitarpaginarelay = "http://127.0.0.1:5501/relays.html";
const evitarpaginawifi = "http://127.0.0.1:5501/wifi.html";
const evitarPagIndex = "http://127.0.0.1:5501/index.html";
const evitarContra = "http://127.0.0.1:5501/user.html";
//export es para exportar fuera de este archivo la siguiente expresion regular
export const url = /^(\w+):\/\/([^\/]+)([^]+)$/.exec(urlActual); //mostrando un array con posiciones
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
export const host = url[2] === "127.0.0.1:5501" ? ipdevice : url[2]; //puede ser el ip o mdns

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
      if (
        typeof Node.props[prop] === "function" ||
        typeof Node.props[prop] === "object"
      ) {
        element[prop] = Node.props[prop];
      } else if (prop.includes("bs")) {
        // data-bs-toggle = toggle
        element.dataset[prop] = Node.props[prop];
      } else {
        element.setAttribute(prop, Node.props[prop]);
      }
    }
  }
  // si llegan hijos
  if (Node.children) {
    Node.children.map(builder).forEach((Child) => element.appendChild(Child));
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
  const contenedor = document.querySelector("#header");
  const div = builder({
    type: "div",
    props: { class: "d-flex align-items-center justify-content-between" },
    children: [
      {
        type: "a",
        props: { class: "logo d-flex align-items-center", href: "/" },
        children: [
          //{
          //    type: 'img',
          //    props: { src: 'assets/img/logo.png', alt: 'logo' },
          //},
          //--------------------------------------------------
          {
            type: "span",
            props: { class: "d-none d-lg-block" },
            children: ["Control AC Remoto"], //aqui se modifica el nombre del titulo de la pagina del dispositivo
          },
        ],
      },
      {
        type: "i",
        props: { class: "bi bi-list toggle-sidebar-btn" },
      },
    ],
  });
  contenedor.appendChild(div);
  // crear nav
  const nav = builder({
    type: "nav",
    props: { class: "header-nav ms-auto" },
    children: [
      {
        type: "ul",
        props: { class: "d-flex align-items-center" },
        children: [
          {
            type: "li",
            props: { class: "nav-item dropdown" },
            children: [
              {
                type: "a",
                props: {
                  class: "nav-link nav-icon",
                  href: "#",
                  bsToggle: "dropdown",
                },
                children: [
                  {
                    type: "i",
                    props: {
                      class: "bi",
                      bsToggle: "tooltip",
                      bsPlacement: "bottom",
                      bsOriginalTitle: "Conexión WiFi",
                      id: "wifiStatus",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "li",
            props: { class: "nav-item dropdown" },
            children: [
              {
                type: "a",
                props: {
                  class: "nav-link nav-icon",
                  href: "#",
                  bsToggle: "dropdown",
                },
                children: [
                  {
                    type: "i",
                    props: {
                      class: "bi",
                      bsToggle: "tooltip",
                      bsPlacement: "bottom",
                      bsOriginalTitle: "WiFi RSSI",
                      id: "rssiStatus",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "li",
            props: { class: "nav-item dropdown" },
            children: [
              {
                type: "a",
                props: {
                  class: "nav-link nav-icon",
                  href: "#",
                  bsToggle: "dropdown",
                },
                children: [
                  {
                    type: "i",
                    props: {
                      class: "bi",
                      bsToggle: "tooltip",
                      bsPlacement: "bottom",
                      bsOriginalTitle: "Conexión MQTT",
                      id: "mqttStatus",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "li",
            props: { class: "nav-item dropdown pe-3" },
            children: [
              {
                type: "a",
                props: {
                  class: "nav-link nav-profile d-flex align-items-center pe-0",
                  href: "#",
                  bsToggle: "dropdown",
                },
                children: [
                  {
                    type: "span",
                    props: { class: "d-none d-md-block dropdown-toggle ps-2" },
                    children: ["Admin"],
                  },
                ],
              },
              {
                type: "ul",
                props: {
                  class:
                    "dropdown-menu dropdown-menu-end dropdown-menu-arrow profile",
                },
                children: [
                  {
                    type: "li",
                    props: { class: "dropdown-header" },
                    children: [
                      {
                        type: "h6",
                        children: ["Admin"],
                      },
                      {
                        type: "span",
                        children: ["Administrador del sistema"],
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "hr",
                        props: { class: "dropdown-divider" },
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "a",
                        props: {
                          class: "dropdown-item d-flex align-items-center",
                          href: "esp-admin",
                        },
                        children: [
                          { type: "i", props: { class: "bi bi-person" } },
                          { type: "span", children: ["Perfil"] },
                        ],
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "hr",
                        props: { class: "dropdown-divider" },
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "a",
                        props: {
                          class: "dropdown-item d-flex align-items-center",
                          href: "esp-device",
                        },
                        children: [
                          { type: "i", props: { class: "bi bi-gear" } },
                          { type: "span", children: ["Configuración"] },
                        ],
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "hr",
                        props: { class: "dropdown-divider" },
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "a",
                        props: {
                          class: "dropdown-item d-flex align-items-center",
                          href: "https://iotmx.com",
                          target: "_blank",
                        },
                        children: [
                          {
                            type: "i",
                            props: { class: "bi bi-question-circle" },
                          },
                          { type: "span", children: ["Ayuda?"] },
                        ],
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "hr",
                        props: { class: "dropdown-divider" },
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "a",
                        props: {
                          class: "dropdown-item d-flex align-items-center",
                          href: "esp-logout",
                          id: "logoutHeader",
                        },
                        children: [
                          {
                            type: "i",
                            props: { class: "bi bi-box-arrow-right" },
                          },
                          { type: "span", children: ["Salir"] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(nav);
  // iniciar los toolstips
  initTooltips();
  // capturar el evento click
  document
    .getElementById("logoutHeader")
    .addEventListener("click", (evento) => {
      evento.preventDefault();
      //console.log('click')
      SweetAlert(
        "Salir",
        "¿Realmente desea cerrar la sesión?",
        "question",
        "esp-logout",
        ""
      );
    });
}
//definir la funcion de crear el sidebar
export function createSidebarNav(list) {
  const contenedor = document.querySelector(".sidebar-nav");

  list.forEach((element) => {
    if (element.collapsed) {
      // definir el URL
      let ulContainer = {
        type: "ul",
        props: {
          class: "nav-content collapse",
          bsParent: "#sidebar-nav",
          id: `${element.name}-nav`,
        },
        children: [],
      };
      // recorrer cada collapsed en true
      element.link.forEach((link) => {
        const li = {
          type: "li",
          children: [
            {
              type: "a",
              props: {
                class: url[3] === `/` + link.url ? "active" : "",
                href: link.url,
              },
              children: [
                { type: "i", props: { class: "bi bi-circle" } },
                { type: "span", children: [link.text] },
              ],
            },
          ],
        };

        if (ulContainer.props.class != "nav-content collapse show")
          ulContainer.props.class =
            url[3] === `/` + link.url
              ? "nav-content collapse show"
              : "nav-content collapse";

        ulContainer.children.push(li);
      });
      // crear el li
      const li = builder({
        type: "li",
        props: { class: " nav-item" },
        children: [
          {
            type: "a",
            props: {
              class:
                ulContainer.props.class === "nav-content collapse show"
                  ? "nav-link"
                  : "nav-link collapsed",
              bsTarget: `#${element.name}-nav`,
              bsToggle: "collapse",
              href: "#",
            },
            children: [
              { type: "i", props: { class: `bi bi-${element.icon}` } },
              { type: "span", children: [element.name] },
              { type: "i", props: { class: "bi bi-chevron-down ms-auto" } },
            ],
          },
          ulContainer,
        ],
      });

      contenedor.appendChild(li);
    } else {
      const li = builder({
        type: "li",
        props: { class: "nav-item" },
        children: [
          {
            type: "a",
            props: {
              class:
                url[3] === `/` + element.url
                  ? "nav-link"
                  : "nav-link collapsed",
              href: element.url === "" ? "/" : element.url,
              id: element.name === "Salir" ? "logout" : "",
            },
            children: [
              { type: "i", props: { class: `bi bi-${element.icon}` } },
              { type: "span", children: [element.name] },
            ],
          },
        ],
      });

      contenedor.appendChild(li);
    }
  });
  // capturar el evento click
  document.getElementById("logout").addEventListener("click", (evento) => {
    evento.preventDefault();
    //console.log('click')
    SweetAlert(
      "Salir",
      "¿Realmente desea cerrar la sesión?",
      "question",
      "esp-logout",
      ""
    );
  });
}
// función para crear el breadcrum
export function createBreadCrumb(title, funcion, link) {
  const contenedor = document.querySelector(".pagetitle");
  // H1
  const h1 = builder({
    type: "h1",
    children: [title],
  });
  // nav
  const nav = builder({
    type: "nav",
    children: [
      {
        type: "ol",
        props: { class: "breadcrumb" },
        children: [
          {
            type: "li",
            props: { class: "breadcrumb-item" },
            children: [
              { type: "a", props: { href: "/" }, children: ["Inicio"] },
            ],
          },
          {
            type: "li",
            props: { class: "breadcrumb-item" },
            children: [funcion],
          },
          {
            type: "li",
            props: { class: "breadcrumb-item active" },
            children: [link],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(h1);
  contenedor.appendChild(nav);
}
// POO para la api service
export class ApiService {
  constructor(path, data) {
    this.path = path;
    this.data = data;
  }
  //método para hacer el GET de la información
  async getApiData() {
    //metodo que es como una funcion pero no se declara asi dentro de una clase
    try {
      const get = `http://${host}/api/${this.path}`;
      const response = await fetch(get, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const json = await response.json();
      return await json;
    } catch (error) {
      console.log(error);
    }
  }
  //método para hacer el POST de la información a la API
  async postApiData() {
    try {
      const post = `http://${host}/api/${this.path}`;
      const response = await fetch(post, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data), //stringify convierte un objeto de JS (this.data)a formato JSON
        // y con JSON.parse de un JSON a objeto JS
      });
      const json = await response.json();
      //console.log(json);
      return await json;
    } catch (error) {
      console.log(error);
    }
  }
  // post firmware, Método para subir el firmware o el spiffs
  async postFirmware() {
    try {
      const post = `http://${host}/api/${this.path}`;
      const myHeaders = new Headers();
      myHeaders.append(
        "Accept",
        "application/json",
        "Content-Type",
        "application/octet-stream"
      );
      const formdata = new FormData();
      formdata.append("", this.data, this.data.name);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(post, requestOptions);
      const json = await response.json();
      return await json;
    } catch (error) {
      console.log(error);
    }
  }
  // post subir archivos json
  async postFileApi() {
    try {
      const post = `http://${host}/api/${this.path}`;
      const myHeaders = new Headers();
      myHeaders.append(
        "Accept",
        "application/json",
        "Content-Type",
        "application/json"
      );
      const formdata = new FormData();
      formdata.append("", this.data, this.data.name);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(post, requestOptions);
      const json = await response.json();
      return await json;
    } catch (error) {
      console.log(error);
    }
  }
}
//crear card para el index
export function createCard(
  padre,
  classCard,
  title,
  icon = "cpu",
  id,
  value,
  titleSmall
) {
  const contenedor = document.querySelector(padre);
  const card = builder({
    type: "div",
    props: { class: `card info-card ${classCard}` },
    children: [
      {
        type: "div",
        props: { class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title text-start" },
            children: [`${title}`],
          },
          {
            type: "div",
            props: { class: "d-flex align-items-center" },
            children: [
              {
                type: "div",
                props: {
                  class:
                    "card-icon rounded-circle d-flex align-items-center justify-content-center",
                },
                children: [
                  {
                    type: "i",
                    props: { class: `bi bi-${icon}` },
                  },
                ],
              },
              {
                type: "div",
                props: { class: "ps-1" },
                children: [
                  {
                    type: "h6",
                    props: { id: `${id}`, class: "text-start ps-0" },
                    children: [`${value}`],
                  },
                  {
                    type: "span",
                    props: { class: "text-muted small pt-2 ps-0" },
                    children: [`${titleSmall}`],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(card);
}
//crear card para la temperatura
export function createCardTemp(
  padre,
  classCard,
  title,
  icon = "cpu",
  id,
  value,
  valuemin,
  valuemax
) {
  const contenedor = document.querySelector(padre);
  const card = builder({
    type: "div",
    props: { class: `card info-card ${classCard}` },
    children: [
      {
        type: "div",
        props: { class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title text-start" },
            children: [`${title}`],
          },
          {
            type: "div",
            props: { class: "d-flex align-items-center" },
            children: [
              {
                type: "div",
                props: {
                  class:
                    "card-icon rounded-circle d-flex align-items-center justify-content-center",
                },
                children: [
                  {
                    type: "i",
                    props: { class: `bi bi-${icon}` },
                  },
                ],
              },
              {
                type: "div",
                props: { class: "ps-1" },
                children: [
                  {
                    type: "h6",
                    props: { id: `${id}`, class: "text-start ps-0" },
                    children: [`${value} °C`],
                  },
                  {
                    type: "span",
                    props: { class: "text-muted pt-2 ps-0" },
                    children: [`Min. ${valuemin} - `],
                  },
                  {
                    type: "span",
                    props: { class: "text-danger pt-2 ps-0" },
                    children: [`Max. ${valuemax}`],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(card);
}
//Crear card para tablas wifi, mqtt, info - con opcion de filtro o sin filtro
export function createCardTable(
  padre,
  filter,
  filterText,
  filterHref,
  filterHrefText,
  cardBodyH5Text,
  cardBodySpanText = " | Conexión",
  tableID,
  data
) {
  const entriesData = Object.entries(data);
  //console.log(entriesData);
  let tbody = { type: "tbody", props: { id: tableID }, children: [] };

  entriesData.forEach((row) => {
    let tr = { type: "tr", children: [] };
    let th = {
      type: "th",
      props: { scope: "row" },
      children: [` ${row[0].replace(/_/g, " ")}: `],
    }; //sustituir los guines bajo por espacios
    let td = {
      type: "td",
      props: { id: `${row[0]}` },
      children: [`${row[1]}`],
    };

    tr.children.push(th);
    tr.children.push(td);
    tbody.children.push(tr);
  });

  //si tiene filtro
  let filterContainer;

  if (filter) {
    filterContainer = {
      type: "div",
      props: { class: "filter" },
      children: [
        {
          type: "a",
          props: { class: "icon show", href: "#", bsToggle: "dropdown" },
          children: [{ type: "i", props: { class: "bi bi-three-dots" } }],
        },
        {
          type: "ul",
          props: {
            class: "dropdown-menu dropdown-menu-end dropdown-menu-arrow",
          },
          children: [
            {
              type: "li",
              props: { class: "dropdown-header text-start" },
              children: [{ type: "h6", children: [filterText] }],
            },
            {
              type: "li",
              props: { class: "dropdown-item" },
              children: [
                {
                  type: "a",
                  props: { class: "dropdown-item", href: filterHref },
                  children: [filterHrefText],
                },
              ],
            },
          ],
        },
      ],
    };
  }

  //contenedor padre
  const contenedor = document.querySelector(padre);

  const card = builder({
    type: "div",
    props: { class: "card" },
    children: [
      filterContainer,
      {
        type: "div",
        props: { class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title" },
            children: [
              `${cardBodyH5Text}`,
              {
                type: "span",
                children: [`${cardBodySpanText}`],
              },
            ],
          },
          {
            type: "div",
            props: { class: "table-responsive" },
            children: [
              {
                type: "table",
                props: {
                  class: "table table-borderless datatable align-middle",
                },
                children: [tbody],
              },
            ],
          },
        ],
      },
    ],
  });

  contenedor.appendChild(card);
}
//Crear relays desde la API en el index
export function createCardRelays(padre, data) {
  let relaysContainer = {
    type: "div",
    props: { class: "row text-center" },
    children: [
      {
        type: "div",
        props: { class: "col-md-12 pb-2 mb-2" },
        children: [
          {
            type: "li",
            props: {
              class:
                "list-group-item d-flex align-items-center justify-content-between",
            },
            children: [
              {
                type: "h4",
                props: { class: "mt-3" },
                children: [
                  {
                    type: "span",
                    props: {
                      class: "badge border-primary border-1 text-secondary",
                    },
                    children: [
                      data[0]["R_NAME1"] + " ",
                      {
                        type: "i",
                        props: {
                          //class: relay.R_LOGIC1? (relay.R_STATUS1?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS1?'bi bi-option':'bi bi-alt'),
                          class: data[0]["R_LOGIC1"]
                            ? data[0]["R_STATUS1"]
                              ? "bi bi-alt"
                              : "bi bi-option"
                            : data[0]["R_STATUS1"]
                            ? "bi bi-option"
                            : "bi bi-alt",
                          //id: relay.R_NAME1+'_Icon' //esto seria  RELAY01_Icon
                          id: data[0]["R_NAME1"] + "_Icon", //esto seria  RELAY01_Icon
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class:
                    "form-check form-switch card-icon rounded-circle d-flex align-items-center justify-content-center",
                },
                children: [
                  {
                    type: "input",
                    children: [],
                    props: data[0]["R_LOGIC1"]
                      ? // si la logica es positiva osea normal
                        data[0]["R_STATUS1"]
                        ? {
                            //se es verdadero
                            id: data[0]["R_NAME1"],
                            class: "form-check-input",
                            type: "checkbox",
                            checked: "",
                            onchange: () => {
                              switchRelay(
                                data[0]["R_NAME1"],
                                data[0]["R_LOGIC1"],
                                data[1]["R_NAME2"],
                                data[1]["R_LOGIC2"]
                              );
                            }, //TODO: definir la función   ----------------------------------------------------
                          }
                        : {
                            //si es falso
                            id: data[0]["R_NAME1"],
                            class: "form-check-input",
                            type: "checkbox",
                            onchange: () => {
                              switchRelay(
                                data[0]["R_NAME1"],
                                data[0]["R_LOGIC1"],
                                data[1]["R_NAME2"],
                                data[1]["R_LOGIC2"]
                              );
                            }, //TODO: definir la función   ----------------------------------------------------
                          }
                      : //si la logica es negativa osea diferente
                      data[0]["R_STATUS1"]
                      ? {
                          //se es verdadero
                          id: data[0]["R_NAME1"],
                          class: "form-check-input",
                          type: "checkbox",
                          onchange: () => {
                            switchRelay(
                              data[0]["R_NAME1"],
                              data[0]["R_LOGIC1"],
                              data[1]["R_NAME2"],
                              data[1]["R_LOGIC2"]
                            );
                          }, //TODO: definir la función   ----------------------------------------------------
                        }
                      : {
                          //si es falso
                          id: data[0]["R_NAME1"],
                          class: "form-check-input",
                          type: "checkbox",
                          checked: "",
                          onchange: () => {
                            switchRelay(
                              data[0]["R_NAME1"],
                              data[0]["R_LOGIC1"],
                              data[1]["R_NAME2"],
                              data[1]["R_LOGIC2"]
                            );
                          }, //TODO: definir la función   ----------------------------------------------------
                        },
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class: "card-icon rounded-circle d-flex align-items-center",
                },
                children: [
                  {
                    type: "i",
                    props: {
                      id: data[0]["R_NAME1"] + "_Status",
                      class: data[0]["R_LOGIC1"]
                        ? data[0]["R_STATUS1"]
                          ? "bi bi-lightbulb-fill text-warning"
                          : "bi bi-lightbulb-fill text-dark"
                        : data[0]["R_STATUS1"]
                        ? "bi bi-lightbulb-fill text-danger"
                        : "bi bi-lightbulb-fill text-dark",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "li",
            props: {
              class:
                "list-group-item d-flex align-items-center justify-content-between",
            },
            children: [
              {
                type: "h4",
                props: { class: "mt-3" },
                children: [
                  {
                    type: "span",
                    props: {
                      class: "badge border-primary border-1 text-secondary",
                    },
                    children: [
                      data[1]["R_NAME2"] + " ",
                      {
                        type: "i",
                        props: {
                          //class: relay.R_LOGIC2? (relay.R_STATUS2?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS2?'bi bi-option':'bi bi-alt'),
                          class: data[1]["R_LOGIC2"]
                            ? data[1]["R_STATUS2"]
                              ? "bi bi-alt"
                              : "bi bi-option"
                            : data[1]["R_STATUS2"]
                            ? "bi bi-option"
                            : "bi bi-alt",
                          //id: relay.R_NAME2+'_Icon' //esto seria  RELAY12_Icon
                          id: data[1]["R_NAME2"] + "_Icon", //esto seria  RELAY02_Icon
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class:
                    "form-check form-switch card-icon rounded-circle d-flex align-items-center justify-content-center",
                },
                children: [
                  {
                    type: "input",
                    children: [],
                    props: data[1]["R_LOGIC2"]
                      ? // si la logica es positiva osea normal
                        data[1]["R_STATUS2"]
                        ? {
                            //se es verdadero
                            id: data[1]["R_NAME2"],
                            class: "form-check-input",
                            type: "checkbox",
                            checked: "",
                            onchange: () => {
                              switchRelay(
                                data[0]["R_NAME1"],
                                data[0]["R_LOGIC1"],
                                data[1]["R_NAME2"],
                                data[1]["R_LOGIC2"]
                              );
                            }, //TODO: definir la función   ----------------------------------------------------
                          }
                        : {
                            //si es falso
                            id: data[1]["R_NAME2"],
                            class: "form-check-input",
                            type: "checkbox",
                            onchange: () => {
                              switchRelay(
                                data[0]["R_NAME1"],
                                data[0]["R_LOGIC1"],
                                data[1]["R_NAME2"],
                                data[1]["R_LOGIC2"]
                              );
                            }, //TODO: definir la función   ----------------------------------------------------
                          }
                      : //si la logica es negativa osea diferente
                      data[1]["R_STATUS2"]
                      ? {
                          //se es verdadero
                          id: data[1]["R_NAME2"],
                          class: "form-check-input",
                          type: "checkbox",
                          onchange: () => {
                            switchRelay(
                              data[0]["R_NAME1"],
                              data[0]["R_LOGIC1"],
                              data[1]["R_NAME2"],
                              data[1]["R_LOGIC2"]
                            );
                          },
                        }
                      : {
                          //si es falso
                          id: data[1]["R_NAME2"],
                          class: "form-check-input",
                          type: "checkbox",
                          checked: "",
                          onchange: () => {
                            switchRelay(
                              data[0]["R_NAME1"],
                              data[0]["R_LOGIC1"],
                              data[1]["R_NAME2"],
                              data[1]["R_LOGIC2"]
                            );
                          },
                        },
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class: "card-icon rounded-circle d-flex align-items-center",
                },
                children: [
                  {
                    type: "i",
                    props: {
                      id: data[1]["R_NAME2"] + "_Status",
                      class: data[1]["R_LOGIC2"]
                        ? data[1]["R_STATUS2"]
                          ? "bi bi-lightbulb-fill text-warning"
                          : "bi bi-lightbulb-fill text-dark"
                        : data[1]["R_STATUS2"]
                        ? "bi bi-lightbulb-fill text-danger"
                        : "bi bi-lightbulb-fill text-dark",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  //console.log(data)

  // contenedor padre
  const contenedor = document.querySelector(padre);

  const card = builder({
    type: "div",
    props: { class: "card" },
    children: [
      {
        type: "div",
        props: { class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title" },
            children: [
              "Control de Relays ",
              {
                type: "span",
                children: [
                  "ON/OFF ",
                  { type: "i", props: { class: "bi bi-toggles" } },
                ],
              },
            ],
          },
          relaysContainer,
        ],
      },
    ],
  });

  contenedor.appendChild(card);
}
//Crear tarjeta de alarma de temperatura y falla de compresor
export function createCardA1(padre, title, data, ton, toff, id) {
  const contenedor = document.querySelector(padre);
  const card = builder({
    type: "div",
    props: {
      id: `cardh${id}`,
      //class: relay.R_LOGIC1? (relay.R_STATUS1?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS1?'bi bi-option':'bi bi-alt'),
      //class: data['ALRMS']['ALRM_STATUS1']?`btn btn-danger`:`btn btn-outline-primary`
      //class: `btn btn-primary`
      class: data
        ? `bg-danger card info-card-danger`
        : `bg-primary card info-card-primary`,
      //class: data?`btn btn-danger`:`btn btn-primary`
      //class: `bg-danger card info-card ${classCard}`
    },
    children: [
      {
        type: "div",
        props: { id: `cards${id}`, class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title" },
            children: [
              {
                type: "strong",
                props: { id: `title${id}` },
                children: [`${title}`],
              },
            ], //temp. alta
          },
          {
            type: "div",
            props: { class: "center" },
            children: [
              {
                type: "div",
                //props: {class: 'ps-1'},
                props: { class: "h3" },
                children: [
                  {
                    type: "span",
                    props: { id: `ton${id}`, class: "badge bg-warning card " },
                    children: [
                      toff
                        ? data
                          ? `Alarma presente:  ${ton}`
                          : `La alarma se presentó: ${ton}`
                        : data
                        ? `Alarma presente:  ${ton}`
                        : ``,
                    ],
                  },
                  {
                    type: "span",

                    //props: {class: 'badge bg-success card '},
                    props: {
                      id: `toff${id}`,
                      class: data
                        ? ` badge bg-danger card `
                        : `badge bg-success card`,
                    },
                    //
                    children: [!toff ? `` : `Alarma Clareada:  ${toff}`],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(card);
}
//Crear tarjeta de alarma de climas operando
export function createCardAB(padre, title, data, ton, toff, id) {
  const contenedor = document.querySelector(padre);
  const card = builder({
    type: "div",
    props: {
      id: `cardh${id}`,
      //class: relay.R_LOGIC1? (relay.R_STATUS1?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS1?'bi bi-option':'bi bi-alt'),
      //class: data['ALRMS']['ALRM_STATUS1']?`btn btn-danger`:`btn btn-outline-primary`
      //class: `btn btn-primary`
      class: data
        ? `bg-primary card info-card-primary`
        : `bg-danger card info-card-danger`,
      //class: data?`btn btn-danger`:`btn btn-primary`
      //class: `bg-danger card info-card ${classCard}`
    },
    children: [
      {
        type: "div",
        props: { id: `cards${id}`, class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title" },
            children: [
              {
                type: "strong",
                props: { id: `title${id}` },
                children: [
                  data ? `${title} ENERGIZADO` : `${title} DESENERGIZADO`,
                ],
              },
            ], //temp. alta
          },
          {
            type: "div",
            props: { class: "center" },
            children: [
              {
                type: "div",
                //props: {class: 'ps-1'},
                props: { class: "h3" },
                children: [
                  {
                    type: "span",
                    props: { id: `ton${id}`, class: "badge bg-info card " },
                    //children: [ton?`Operando desde:  ${ton}`:``]
                    //children: [!toff?ton?`Inició operación el:  ${ton}`:``:ton?`Operando desde:  ${ton}`:``]
                    children: [
                      !toff
                        ? ton
                          ? `Operando desde:  ${ton}`
                          : ``
                        : ton
                        ? `Inició operación el:  ${ton}`
                        : ``,
                    ],
                  },
                  {
                    type: "span",

                    //props: {class: 'badge bg-success card '},
                    props: {
                      id: `toff${id}`,
                      class: data
                        ? ` badge bg-danger card `
                        : `badge bg-warning card`,
                    },
                    //
                    children: [toff ? `Desenergizado desde el: ${toff}` : ``],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(card);
}

//funcion para ejecutar los controles a los relays
const switchRelay = (name1, logic1, name2, logic2) => {
  //capturar el estado del relay hay que hacer una igual para capturar la lógica de los relay
  let status1;
  let status2;
  //console.log("name1: " +`#${name1}` +' '+ status1)
  if (logic1) {
    status1 = document.querySelector(`#${name1}`).checked;
  } else {
    status1 = !document.querySelector(`#${name1}`).checked;
  }
  if (logic2) {
    status2 = document.querySelector(`#${name2}`).checked;
  } else {
    status2 = !document.querySelector(`#${name2}`).checked;
  }
  const toSend = {
    protocol: "API",
    //output: name,
    //value: status,
    R_DESCRIPTION1: "",
    R_NAME1: "",
    R_STATUS1: status1,
    R_LOGIC1: "",
    R_TIMER1: "",
    TIMEOFFRELAY1: "",
    TIMEONRELAY1: "",
    R_DESCRIPTION2: "",
    R_NAME2: "",
    R_STATUS2: status2,
    R_LOGIC2: "",
    R_TIMER2: "",
    TIMEOFFRELAY2: "",
    TIMEONRELAY2: "",
  };
  //console.log(toSend)
  const path = "relays"; //de la api en el curso 'device/relays' en mi proyecto relays
  //funcion para ejecutar los POST
  ejecutarPost(path, toSend);
  //let sti = JSON.stringify(toSend)//me falta a que relay se va a enviar
  //console.log(path+' '+sti)
};
//ejecutar POST a la API
export async function ejecutarPost(path, data) {
  const postAPI = new ApiService(path, data); //instancia del servicio de la API
  const resp = await postAPI.postApiData(); //lo que responde el await del post API
  //console.log(resp);
  //if (urlActual!=evitarpaginawifi&&urlActual!=evitarpaginarestore&&urlActual!=evitarpaginamqtt&&urlActual!=evitarpaginarestart&&urlActual!=evitarContra&&urlActual!=evitarpaginarelay&&urlActual!="http://"+ipdevice+"/esp-wifi"&&urlActual!="http://"+ipdevice+"/esp-mqtt"&&urlActual!="http://"+ipdevice+"/esp-restore"&&urlActual!="http://"+ipdevice+"/esp-restart"&&urlActual!="http://"+ipdevice+"/esp-device"&&urlActual!="http://"+ipdevice+"/esp-time"&&urlActual!="http://"+ipdevice+"/esp-admin"){
  if (
    urlActual != evitarpaginawifi &&
    urlActual != evitarpaginarestore &&
    urlActual != evitarpaginamqtt &&
    urlActual != evitarpaginarestart &&
    urlActual != evitarContra &&
    urlActual != evitarpaginarelay &&
    urlActual != "http://" + host + "/esp-wifi" &&
    urlActual != "http://" + host + "/esp-mqtt" &&
    urlActual != "http://" + host + "/esp-restore" &&
    urlActual != "http://" + host + "/esp-restart" &&
    urlActual != "http://" + host + "/esp-device" &&
    urlActual != "http://" + host + "/esp-time" &&
    urlActual != "http://" + host + "/esp-admin"
  ) {
    //console.log("entra a evitar -1167");
    const relayStatus1 = document.querySelector(
      `#${resp["RELAY1"].R_NAME1}_Status`
    ); //es el foco
    const relayIcon1 = document.querySelector(
      `#${resp["RELAY1"].R_NAME1}_Icon`
    ); //es el icono
    const relayStatus2 = document.querySelector(
      `#${resp["RELAY2"].R_NAME2}_Status`
    ); //es el foco
    const relayIcon2 = document.querySelector(
      `#${resp["RELAY2"].R_NAME2}_Icon`
    ); //es el icono
    if (resp["RELAY1"].R_LOGIC1) {
      //sustituye a resp.relay
      //console.log("1")
      //funcion para cambiar los estados de los relay en la pantalla html
      relaysStatusChange(relayStatus1, relayIcon1, resp["RELAY1"].R_STATUS1);
    } else {
      //console.log("1 negativo")
      relaysStatusChangeNeg(relayStatus1, relayIcon1, resp["RELAY1"].R_STATUS1);
    }
    if (resp["RELAY2"].R_LOGIC2) {
      //console.log("2")
      //funcion para cambiar los estados de los relay en la pantalla html
      relaysStatusChange(relayStatus2, relayIcon2, resp["RELAY2"].R_STATUS2);
    } else {
      //console.log("2 negativo")
      relaysStatusChangeNeg(relayStatus2, relayIcon2, resp["RELAY2"].R_STATUS2);
    }
    SweetAlertMsg(
      "top-end",
      "success",
      "¡Configuracion guardada correctamente!",
      3000
    );
    //console.log(resp["save"]);
    if (!localStorage.getItem("save")) {
      alertMsg(
        "danger",
        "¡Se han realizado cambios en la configuración es necesario reiniciar el equipo para guardar estos los cambios!"
      );
    }
  } else if (resp["save"]) {
    //solo para la pagina de los relay   -----ok
    console.log('resp["save"]');
    SweetAlertMsg(
      "top-end",
      "success",
      "¡Configuracion guardada correctamente!",
      3000
    );
    //crear alert y salvar en local storage si no está guardado
    if (!localStorage.getItem("save")) {
      //el siguiente metodo
      alertMsg(
        "danger",
        "¡Se han realizado cambios en la configuración es necesario reiniciar el equipo para guardar estos los cambios!"
      );
    }
  } else if (resp.save) {
    console.log("resp.save");
    SweetAlertMsg(
      "top-end",
      "success",
      "¡Configuración guardada correctamente en wifi!",
      3000
    );
    // crear el alert y salvar en localstorage si no está guardado
    if (!localStorage.getItem("save")) {
      alertMsg(
        "danger",
        "¡Se han realizado cambios en la configuración, es necesario reiniciar el equipo!"
      );
    }
  } else if (resp.restore) {
    SweetAlertMsg("top-end", "success", "¡Dispositivo restablecido!", 5000);
    const div = document.querySelector(".restoreLoading");
    const time = new RestoreRestart(10);
    time.runTime("#progressRestore", div);
    // función para recargar la pagina
    reloadPage("", 10000);
  } else if (resp.restart) {
    SweetAlertMsg("top-end", "success", "¡Dispositivo reiniciado!", 5000);
    const div = document.querySelector(".restartLoading");
    const time = new RestoreRestart(10);
    time.runTime("#progressRestart", div);
    // función para recargar la pagina
    reloadPage("", 10000);
  } else if (!resp.session) {
    // manejo  de la respuesta de la sesión | mensaje superior y recargar pagina en 5s
    SweetAlertMsg("top-end", "warning", `${resp.msg}`, 5000);
    // Recargar la pagina
    reloadPage("", 6000);
  } else {
    console.log("else");
    // Alert superior de error solo para el cambio de la contraseña
    SweetAlertMsg("top-end", "error", `${resp.msg}`, 5000);
  }
}
//funcion de cambio de estado de los relay en el html en el dashboard
const relaysStatusChange = (relayStatus, relayIcon, stado) => {
  //esas funciones solo se deben ejecutar si estoy en el dashboard
  if (urlActual != evitarpaginarelay && urlActual == ipdevice + "/esp-relays") {
    //para evitar un error en la pagina de relays
    //console.log("evitar pagina relay en desarrollo y produccion -1236")
    if (stado) {
      relayStatus.classList.remove("text-dark");
      relayStatus.classList.add("text-warning");
      relayIcon.classList.remove("bi-option");
      relayIcon.classList.add("bi-alt");
    } else {
      relayStatus.classList.remove("text-warning");
      relayStatus.classList.add("text-dark");
      relayIcon.classList.remove("bi-alt");
      relayIcon.classList.add("bi-option");
    }
  }
};
const relaysStatusChangeNeg = (relayStatus, relayIcon, stado) => {
  //console.log("logica negativa del relay1");
  //esas funciones solo se deben ejecutar si estoy en el dashboard
  if (urlActual != evitarpaginarelay && urlActual == ipdevice + "/esp-relays") {
    //para evitar un error en la pagina de realys ---------------------------------------------------------------------------------------------
    if (stado) {
      relayStatus.classList.remove("text-dark");
      relayStatus.classList.add("text-danger");
      relayIcon.classList.remove("bi-option");
      relayIcon.classList.add("bi-alt");
    } else {
      relayStatus.classList.remove("text-danger");
      relayStatus.classList.add("text-dark");
      relayIcon.classList.remove("bi-alt");
      relayIcon.classList.add("bi-option");
    }
  }
};

//función card de los progressbar
export function createProgressBar(padre, type, idProgress, idSpan, value) {
  const contenedor = document.querySelector(padre);

  const progress = builder({
    type: "div",
    props: { class: "progress", style: "height: 25px" },
    children: [
      {
        type: "div",
        props: {
          id: idProgress,
          class: `progress-bar ${type}`,
          style: `width: ${value}%`,
        },
        children: [
          {
            type: "strong",
            children: [
              {
                type: "span",
                props: {
                  id: idSpan,
                  class: "text-white",
                  style: "font-size: 20px",
                },
                children: [`${value}%`],
              },
            ],
          },
        ],
      },
    ],
  });

  contenedor.appendChild(progress);
}
//actualizar los estado de los iconoes del header
export function headerIconsStatus(wifiStatus, rssiStatus, mqttStatus) {
  //capturar los contenedores por id
  let elementWifi = document.getElementById("wifiStatus");
  let elementRssi = document.getElementById("rssiStatus");
  let elementMQTT = document.getElementById("mqttStatus");
  // estado del wifi
  if (wifiStatus) {
    elementWifi.className = ""; //elimina las clases
    elementWifi.classList.add("bi", "bi-wifi", "text-success");
  } else {
    elementWifi.className = ""; //elimina las clases
    elementWifi.classList.add("bi", "bi-wifi-odd", "text-dark");
    rssiStatus = -200;
    mqttStatus = false;
  }

  //Estado del rssi
  if (rssiStatus >= -55) {
    //esta es una calidad de señal buena
    elementRssi.className = "";
    elementRssi.classList.add("bi", "bi-reception-4", "text-success");
  } else if (rssiStatus <= -56 && rssiStatus > -89) {
    elementRssi.className = "";
    elementRssi.classList.add("bi", "bi-reception-3", "text-success");
  } else if (rssiStatus <= -90 && rssiStatus > -97) {
    elementRssi.className = "";
    elementRssi.classList.add("bi", "bi-reception-2", "text-warning");
  } else if (rssiStatus <= -98 && rssiStatus > -103) {
    elementRssi.className = "";
    elementRssi.classList.add("bi", "bi-reception-1", "text-warning");
  } else {
    elementRssi.className = ""; //quita todas las clases
    elementRssi.classList.add("bi", "bi-reception-0", "text-danger");
  }

  //estados para el mqtt
  if (mqttStatus) {
    elementMQTT.className = "";
    elementMQTT.classList.add("bi", "bi-cloud-fill", "text-primary");
  } else {
    elementMQTT.className = "";
    elementMQTT.classList.add("bi", "bi-cloud-slash-fill", "text-dark");
  }
}

//crear input segun el tipo
export function createInputType(
  padre,
  id,
  type,
  label,
  placeholder,
  value,
  classe
) {
  const contenedor = document.querySelector(padre);
  const divRow = builder({
    type: "div",
    props: { class: "row mb-3 mt-3" },
    children: [
      {
        type: "label",
        props: { class: "col-sm-4 col-form-label mt-2", for: id },
        children: [label],
      },
      {
        type: "div",
        props: { class: "col-sm-8 mt-2" }, //columna pequena de 8 y margin top de 2
        children: [
          {
            type: "input",
            props: {
              class: `form-control ${classe}`,
              type: type,
              placeholder: placeholder,
              id: id,
              name: id,
              value: value,
            },
            children: [],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(divRow);
}

export function createInputTypeNum(
  padre,
  id,
  type,
  label,
  placeholder,
  value,
  classe,
  min,
  max
) {
  const contenedor = document.querySelector(padre);
  const divRow = builder({
    type: "div",
    props: { class: "row mb-3 mt-3" },
    children: [
      {
        type: "label",
        props: { class: "col-sm-4 col-form-label mt-2", for: id },
        children: [label],
      },
      {
        type: "div",
        props: { class: "col-sm-8 mt-2" }, //columna pequena de 8 y margin top de 2
        children: [
          {
            type: "input",
            props: {
              class: `form-control ${classe}`,
              type: type,
              placeholder: placeholder,
              id: id,
              name: id,
              value: value,
              Min: min,
              Max: max,
            },
            children: [],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(divRow);
}
// crear funcion si es un switch
export function createSwitch(padre, id, type, label1, label2, value, classe) {
  const contenedor = document.querySelector(padre);
  const divRow = builder({
    type: "div",
    props: { class: "row mb-3 mt-3" },
    children: [
      {
        type: "label",
        props: { class: "col-sm-4 col-form-label", for: id },
        children: [label1],
      },
      {
        type: "div",
        props: { class: "col-sm-8 mt-2" },
        children: [
          {
            type: "div",
            props: { class: "form-check form-switch" },
            children: [
              {
                type: "input",
                props: value
                  ? {
                      // si value es true
                      class: `form-check-input ${classe}`,
                      type: type,
                      id: id,
                      name: id,
                      checked: "",
                      onchange: () => {
                        switchChange(id);
                      }, // funcion para bloquear los switch si estoy en cliente => bloquea ap,  ap => bloquea cliente TODO: implementar
                    }
                  : {
                      // si value es false
                      class: `form-check-input ${classe}`,
                      type: type,
                      id: id,
                      name: id,
                      onchange: () => {
                        switchChange(id);
                      },
                    },
                children: [],
              },
              {
                type: "label",
                props: { class: `form-check-label switch_${id}`, for: id },
                children: [label2],
              }, // SI / NO
            ],
          },
        ],
      },
    ],
  });
  contenedor.appendChild(divRow);
  // Todo: llamar la función
  /*if(document.querySelector('.switch_wifi_mode').checked){
        formDisable("ap", false);
        formDisable("client", true);
    }else{
        formDisable("ap",true);
        formDisable("client", false);
    }*/
  switchChange(id);
}
//crear input tipo select
export function createSelectType(
  padre,
  id,
  type,
  label,
  label2,
  options,
  value,
  classe
) {
  const contenedor = document.querySelector(padre);

  let select = {
    type: type,
    props: { class: `form-select ${classe}`, id: id, name: id },
    children: [],
  };
  // 0,1,2
  options.forEach((option) => {
    const opt = {
      type: "option",
      props:
        option === value ? { value: option, select: "" } : { value: option },
      children: [`${label2} ${option}`], // QoS 0, 1, 2
    };
    select.children.push(opt);
  });

  const divRow = builder({
    type: "div",
    props: { class: "row mb-3 mt-3" },
    children: [
      {
        type: "label",
        props: { class: "col-sm-4 col-form-label", for: id },
        children: [label],
      },
      {
        type: "div",
        props: { class: "col-sm-8" },
        children: [select],
      },
    ],
  });
  contenedor.appendChild(divRow);
}
// crear una tarjeta desde una clase
export class card {
  constructor(textHeaer, body) {
    this.textHeaer = textHeaer;
    this.body = body;
  }
  buildCard() {
    return builder({
      type: "div",
      props: { class: "card" },
      children: [
        {
          type: "div",
          props: { class: "card-header" },
          children: [this.textHeaer],
        },
        this.body,
      ],
    });
  }
}
//switchChange manipular los switch
const switchChange = (id) => {
  if (document.querySelector(`#${id}`).checked) {
    if (id === "wifi_mode") {
      //document.querySelector(`.switch_${id}`).innerHTML = id === 'wifi_mode'?'Cliente': 'SI';
      document.querySelector(".switch_wifi_mode").innerHTML = "Cliente";
      //console.log("wifimode");

      formDisable("ap", true);
      formDisable("client", false);
    } else if (id === "wifi_ip_static") {
      document.querySelector(".switch_wifi_ip_static").innerHTML =
        "IP Estática";
      formDisable("ip", false);
    } else if (id === "mqtt_enable") {
      document.querySelector(".switch_mqtt_enable").innerHTML = "Habilitado";
      formDisable("mq", false);
    } else if (id === "ap_visibility") {
      document.querySelector(".switch_ap_visibility").innerHTML = "Visible";
    } else if (id === "R_LOGIC1") {
      document.querySelector(".switch_R_LOGIC1").innerHTML = "Logica Positiva";
      document.querySelector("#RELAY01_Status").classList.remove("text-danger");
      document.querySelector("#RELAY01_Status").classList.add("text-warning");
    } else if (id === "R_LOGIC2") {
      document.querySelector(".switch_R_LOGIC2").innerHTML = "Logica Positiva";
      document.querySelector("#RELAY02_Status").classList.remove("text-danger");
      document.querySelector("#RELAY02_Status").classList.add("text-warning");
    } else if (id === "R_TIMERON1") {
      document.querySelector(".switch_R_TIMERON1").innerHTML = "Activado";
      formDisable("TRELAY1", false);
    } else if (id === "R_TIMERON2") {
      document.querySelector(".switch_R_TIMERON2").innerHTML = "Activado";
      formDisable("TRELAY2", false);
    } else if (id === "TEMPORIZADOR1") {
      document.querySelector(".switch_TEMPORIZADOR1").innerHTML = "Activado";
      formDisable("TEMPRELAY1", false);
    } else if (id === "TEMPORIZADOR2") {
      document.querySelector(".switch_TEMPORIZADOR2").innerHTML = "Activado";
      formDisable("TEMPRELAY2", false);
    } else {
      //console.log(id);
    }
  } else {
    if (id === "wifi_mode") {
      document.querySelector(".switch_wifi_mode").innerHTML = "AP";
      formDisable("ap", false);
      formDisable("client", true);
    } else if (id === "wifi_ip_static") {
      //document.querySelector(`.switch_${id}`).innerHTML = id === 'wifi_ip_static'?'AP': 'NO';
      document.querySelector(".switch_wifi_ip_static").innerHTML =
        "IP Estática";
      formDisable("ip", true);
    } else if (id === "mqtt_enable") {
      document.querySelector(".switch_mqtt_enable").innerHTML = "Deshabilitado";
      formDisable("mq", true);
    } else if (id === "ap_visibility") {
      document.querySelector(".switch_ap_visibility").innerHTML =
        "Dispositivo Oculto";
    } else if (id === "R_LOGIC1") {
      document.querySelector(".switch_R_LOGIC1").innerHTML = "Logica Negativa";
      document
        .querySelector("#RELAY01_Status")
        .classList.remove("text-warning");
      document.querySelector("#RELAY01_Status").classList.add("text-danger");
    } else if (id === "R_LOGIC2") {
      document.querySelector(".switch_R_LOGIC2").innerHTML = "Logica Negativa";
      document
        .querySelector("#RELAY02_Status")
        .classList.remove("text-warning");
      document.querySelector("#RELAY02_Status").classList.add("text-danger");
    } else if (id === "R_TIMERON1") {
      document.querySelector(".switch_R_TIMERON1").innerHTML = "Desactivado";
      formDisable("TRELAY1", true);
    } else if (id === "R_TIMERON2") {
      document.querySelector(".switch_R_TIMERON2").innerHTML = "Desactivado";
      formDisable("TRELAY2", true);
    } else if (id === "TEMPORIZADOR1") {
      document.querySelector(".switch_TEMPORIZADOR1").innerHTML = "Desactivado";
      formDisable("TEMPRELAY1", true);
    } else if (id === "TEMPORIZADOR2") {
      document.querySelector(".switch_TEMPORIZADOR2").innerHTML = "Desactivado";
      formDisable("TEMPRELAY2", true);
    } else {
      console.log(id);
    }
  }
};

//habilitar o quitar el disable de los inputs
export function formDisable(clase, boolean) {
  //console.log(clase, boolean);
  const formElement = document.querySelectorAll(`.${clase}`);
  //console.log(formElement);
  for (let i = 0; i < formElement.length; i++) {
    formElement[i].disabled = boolean;
  }
}

// crear funcion create cardBuzzer
export function createCardBuzzer(padre, data) {
  let relaysContainer = {
    type: "div",
    props: { class: "row text-center" },
    children: [
      {
        type: "div",
        props: { class: "col-md-12 pb-2 mb-2" },
        children: [
          //buzzer
          {
            type: "li",
            props: {
              class:
                "list-group-item d-flex align-items-center justify-content-between",
            },
            children: [
              {
                type: "h4",
                props: { class: "mt-3" },
                children: [
                  {
                    type: "span",
                    props: {
                      class: "badge border-primary border-1 text-secondary",
                    },
                    children: [
                      "BUZZER",
                      {
                        type: "i",
                        props: {
                          //class: relay.R_LOGIC2? (relay.R_STATUS2?'bi bi-alt':'bi bi-option' ):(relay.R_STATUS2?'bi bi-option':'bi bi-alt'),
                          class: data["BUZZER_STATUS"]
                            ? "bi bi-alt"
                            : "bi bi-option",
                          //id: relay.R_NAME2+'_Icon' //esto seria  RELAY12_Icon
                          id: "BUZZER_STATUS_Icon",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class:
                    "form-check form-switch card-icon rounded-circle d-flex align-items-center justify-content-center",
                },
                children: [
                  {
                    type: "input",
                    children: [],
                    props: data["BUZZER_STATUS"]
                      ? {
                          //si es verdadero
                          id: "BUZZER_STATUS",
                          class: "form-check-input",
                          type: "checkbox",
                          checked: "",
                          onchange: () => {
                            switchBuzzer();
                          },
                        }
                      : {
                          //si es falso
                          id: "BUZZER_STATUS",
                          class: "form-check-input",
                          type: "checkbox",
                          onchange: () => {
                            switchBuzzer();
                          },
                        },
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class: "card-icon rounded-circle d-flex align-items-center",
                },
                children: [
                  {
                    type: "i",
                    props: {
                      id: "Buzzer_Status", //fa-solid fa-bell fa-shake //fa-solid fa-bell fa-shake
                      //class: data['BUZZER_STATUS']?'fa-solid fa-bell fa-shake text-danger':'fa-solid fa-bell fa-shake text-dark'
                      class: data["BUZZER_STATUS"]
                        ? "bi bi-bell-fill text-danger"
                        : "bi bi-bell-fill text-dark",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  //console.log(data)

  // contenedor padre
  const contenedor = document.querySelector(padre);

  const card = builder({
    type: "div",
    props: { class: "card" },
    children: [
      {
        type: "div",
        props: { class: "card-body" },
        children: [
          {
            type: "h5",
            props: { class: "card-title" },
            children: [
              "Control del Buzzer ",
              {
                type: "span",
                children: [
                  "ON/OFF ",
                  { type: "i", props: { class: "bi bi-toggles" } },
                ],
              },
            ],
          },
          relaysContainer,
        ],
      },
    ],
  });
  contenedor.appendChild(card);
}

//crear funcion del buzzer
const switchBuzzer = () => {
  //capturar el estado del relay hay que hacer una igual para capturar la lógica de los relay
  let status1 = document.querySelector("#BUZZER_STATUS").checked;

  const toSend = {
    protocol: "API",
    output: "buzzer",
    value: status1,
  };
  //console.log(toSend)
  const path = "device/buzzer"; //de la api en el curso 'device/relays' en mi proyecto relays
  //funcion para ejecutar los POST
  ejecutarPostBuzzer(path, toSend);
  //let sti = JSON.stringify(toSend)
  //console.log(path+' '+sti)
};

export async function ejecutarPostBuzzer(path, data) {
  //console.log(data)
  const postAPI = new ApiService(path, data); //instancia del servicio de la API
  const resp = await postAPI.postApiData(); //lo que responde el await del post API
  const buzzerStatus = document.querySelector("#Buzzer_Status"); //es el foco
  const buzzerIcon = document.querySelector(`#BUZZER_STATUS_Icon`); //es el icono
  buzzerStatusChange(buzzerStatus, buzzerIcon, data.value);
}

const buzzerStatusChange = (buzzerStatus, buzzerIcon, stado) => {
  if (stado) {
    buzzerStatus.classList.remove("text-dark");
    buzzerStatus.classList.add("text-danger");
    buzzerIcon.classList.remove("bi-option");
    buzzerIcon.classList.add("bi-alt");
  } else {
    buzzerStatus.classList.remove("bi", "bi-bell-fill", "text-danger");
    buzzerStatus.classList.add("bi", "bi-bell-fill", "text-dark");
    buzzerIcon.classList.remove("bi-alt");
    buzzerIcon.classList.add("bi-option");
  }
};

/**
 * Initiate tooltips
 */
export const initTooltips = () => {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};

//crear SweetAlert
export function SweetAlert(title, text, icon, path, data) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "rgb(65,184,130)",
    cancelButtonColor: "rgb(255,118,116)",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      ejecutarPost(path, data);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      history.go(0);
    }
  });
}
//crear un sweete alert de mensaje          -----------------------------------------------------------------------------
export const SweetAlertMsg = (position, icon, title, timer) => {
  //if (urlActual!=evitarPagIndex&&urlActual!="http://"+ipdevice+"/"){//ya que hay un error
  if (urlActual != evitarPagIndex && urlActual != "http://" + host + "/") {
    //ya que hay un error
    //console.log(urlActual)
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: timer,
    });
  }
};

//crear el alert desde localstorage
export const alertMsg = (type, amsg) => {
  const msg = builder({
    //se crea un builder
    type: "div",
    props: {
      class: `alert alert-${type} alert-dismissible fade show`,
      role: "alert",
    },
    children: [
      {
        type: "i",
        props: { class: "bi bi-exclamation-octagon me-1" },
        children: [],
      },
      `${amsg}`,
      {
        type: "button",
        props: {
          class: "btn-close",
          type: "button",
          bsDismiss: "alert",
          onclick: () => {
            clearLocalStorage("save");
          },
        },
        children: [],
      },
    ],
  });
  //inserta el alert en la posicion #1 del contenedor id= 'main'
  const contenedor = document.querySelector("#main");
  contenedor.insertBefore(msg, contenedor.children[0]); //para que lo ponga en un inicio
  //salvar en localstorage
  localStorage.setItem("save", true);
};
//limpiar el local storage
const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};

//Clase para botones
export class btnSend {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }
  //crear un boton segun los parametros del constructor
  btnSendSettings() {
    return builder({
      type: "div",
      props: { class: "col-sm-10" },
      children: [
        {
          type: "button",
          props: { class: `btn btn-${this.type}`, type: "submit" },
          children: [`${this.text}`],
        },
      ],
    });
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
// crear clase para reinicio y restauración
class RestoreRestart {
  constructor(time) {
    this.time = time;
  }
  runTime(progres, div) {
    div.style.cssText = "display:block;";
    this.time--;
    document.querySelector(progres).style.width = this.time * 10 + "%";
    document.querySelector(progres).innerHTML = this.time * 10 + "%";
    if (this.time === 0) {
      this.time = 10;
      div.style.cssText = "display:none;";
    } else {
      setTimeout(() => {
        clearTimeout(this.runTime(progres, div));
      }, 1000);
    }
  }
}
// función para recargar la pagina
export const reloadPage = (url, time) => {
  //console.log("Limpiando el local storage");
  localStorage.clear();
  const timeOut = setTimeout(() => {
    window.location = `/${url}`;
    clearTimeout(timeOut);
  }, time);
};

//-----------------------------------------------
// Funciones para el WS
//------------------------------------------------------
const wsURL = `ws://${host}/ws`;
let reConnect = false;
let tt = 0;
let ws = "";
//variable para el grafico de linea se espera tantos segundos
let wait = 60;
// reconexion ws
const reconnect = () => {
  if (reConnect) {
    return;
  }
  reConnect = true;
  tt && window.clearTimeout(tt);
  tt = window.setTimeout(() => {
    createWebSeckets();
    reConnect = false;
  }, 5000);
};
// iniciar el WS
const createWebSeckets = () => {
  try {
    ws = new WebSocket(wsURL, ["arduino"]);
    initWS();
  } catch (error) {
    reconnect();
  }
};
createWebSeckets();
// variables de temperatura y humedad para el grafico de linea del indez
let dhtTem = [];
let dhtHum = [];
// iniciar los eventos de WS
const initWS = () => {
  ws.onclose = () => {
    console.log("WS-Close");
    reconnect();
  };
  ws.onerror = (e) => {
    console.log("WS-Error ", e);
    reconnect();
  };
  ws.onopen = () => {
    console.log("WS-Open");
  };
  ws.onmessage = (msg) => {
    const resp = JSON.parse(msg.data);
    //console.log(resp);
    if (
      resp.type === "data" &&
      url[3] != "/alarmas.html" &&
      url[3] != "/esp-alarmas" &&
      url[3] != "/esp-device" &&
      url[3] != "/esp-relays" &&
      url[3] != "/esp-wifi" &&
      url[3] != "/esp-mqtt" &&
      url[3] != "/esp-admin" &&
      url[3] != "/esp-time" &&
      url[3] != "/esp-restart"
    ) {
      let ram; //ram available la quite
      headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
      //actualizar el estado del wifi y del mqtt
      document.getElementById("Estado_WiFi").innerHTML = resp.wifiStatus
        ? "ONLINE"
        : "OFFLINE";
      document.getElementById("Estado_MQTT").innerHTML = resp.mqttStatus
        ? "ONLINE"
        : "OFFLINE";
      document.getElementById("Servidor_MQTT").innerHTML = resp.mqtt_server;
      //tiempo actividad
      document.getElementById("activeTime").innerHTML = resp.activeTime;
      document.getElementById("Tiempo_de_Actividad_del_Sistema").innerHTML =
        resp.activeTime;
      // Actualizar el estado de los relays
      relayStatusChange1(resp.R_STATUS1);
      relayStatusChange2(resp.R_STATUS2);
      // document.getElementById('salaTemp3').innerHTML = resp.cpuTemp.toFixed(2);
      document.getElementById("salaTemp2").innerHTML = resp.hum;
      document.getElementById("salaTemp1").innerHTML = resp.tC;
      // Actualizar el progress de la RAM
      // ram = (resp.ramAvailable/resp.RAM_SIZE_KB)*100;
      // document.getElementById('ramAvailable').style.width = ram.toFixed(2) + "%";
      // document.getElementById('ramAvailableSpan').innerHTML = ram.toFixed(2) + "%";
      // Actualizar el progress del WIFI
      document.getElementById("wifiQuality").style.width =
        resp.wifiQuality + "%"; //la barra
      document.getElementById("wifiQualitySpan").innerHTML =
        resp.wifiQuality + "%";

      //modificar el grafico de linea de index con los valores que llegan pero cada 60 segundos
      if (wait >= 60) {
        wait = 0;
        dhtTem = [...dhtTem, resp.tC]; //captura el valor del array y agrega nuevo valor
        dhtHum = [...dhtHum, resp.hum];
      } else {
        wait++;
      }
      //limitar a 60 valores quita el primer valor guardado
      if (dhtTem.length > 60) dhtTem.shift();
      if (dhtHum.length > 60) dhtHum.shift();
      //pasar a la grafica los valores
      chart.updateSeries([{ data: dhtTem }, { data: dhtHum }]);
    } else if (url[3] == "/alarmas.html" || url[3] == "/esp-alarmas") {
      document.getElementById("title1").innerHTML = resp.ALRM_NAME1;
      document.getElementById("title2").innerHTML = resp.ALRM_NAME2;
      document.getElementById("title3").innerHTML = resp.ALRM_NAME3;
      resp.ALRM_STATUS4
        ? (document.getElementById("title4").innerHTML =
            resp.ALRM_NAME4 + " Desenergizado")
        : (document.getElementById("title4").innerHTML =
            resp.ALRM_NAME4 + " Operando");
      resp.ALRM_STATUS5
        ? (document.getElementById("title5").innerHTML =
            resp.ALRM_NAME5 + " Desenergizado")
        : (document.getElementById("title5").innerHTML =
            resp.ALRM_NAME5 + " Operando");
      //--------------------------------------------------------------------------aqui se esta moviendo
      if (!resp.ALRM_STATUS1) {
        //alarma presente bg-danger card info-card-danger`:`bg-primary card info-card-primary
        document.getElementById("cards1").classList.remove("bg-primary");
        document.getElementById("cards1").classList.add("bg-danger");
        if (resp.ALRM_TON1) {
          //registro de fecha on
          if (resp.ALRM_TOFF1) {
            //registro fecha off
            document.getElementById("ton1").innerHTML =
              `Alarma presente: ` + resp.ALRM_TON1;
            document.getElementById("toff1").innerHTML = ``;
          } else {
            document.getElementById("ton1").innerHTML =
              `Alarma presente: ` + resp.ALRM_TON1;
            document.getElementById("toff1").innerHTML = ``;
          }
        }
      } else {
        //alarma se desactivo
        document.getElementById("cards1").classList.remove("bg-danger");
        document.getElementById("cards1").classList.add("bg-primary");
        if (resp.ALRM_TON1) {
          //registro de fecha on
          if (resp.ALRM_TOFF1) {
            //registro fecha off
            document.getElementById("ton1").innerHTML =
              `Alarma se presentó: ` + resp.ALRM_TON1;
            document.getElementById("toff1").innerHTML =
              `Alarma se clareo: ` + resp.ALRM_TOFF1;
          } else {
            document.getElementById("ton1").innerHTML =
              `Alarma se presentó: ` + resp.ALRM_TON1;
          }
        }
      }
      // alarma 2
      if (!resp.ALRM_STATUS2) {
        //alarma presente
        document.getElementById("cards2").classList.remove("bg-primary");
        document.getElementById("cards2").classList.add("bg-danger");
        if (resp.ALRM_TON2) {
          //registro de fecha on
          if (resp.ALRM_TOFF2) {
            //registro fecha off
            document.getElementById("ton2").innerHTML =
              `Alarma presente: ` + resp.ALRM_TON2;
            document.getElementById("toff2").innerHTML = ``;
          } else {
            document.getElementById("ton2").innerHTML =
              `Alarma presente: ` + resp.ALRM_TON2;
            document.getElementById("toff2").innerHTML = ``;
          }
        }
      } else {
        //alarma se desactivo
        document.getElementById("cards2").classList.remove("bg-danger");
        document.getElementById("cards3").classList.add("bg-primary");
        if (resp.ALRM_TON2) {
          //registro de fecha on
          if (resp.ALRM_TOFF2) {
            //registro fecha off
            document.getElementById("ton2").innerHTML =
              `Alarma se presentó: ` + resp.ALRM_TON2;
            document.getElementById("toff2").innerHTML =
              `Alarma se clareo: ` + resp.ALRM_TOFF2;
          } else {
            document.getElementById("ton2").innerHTML =
              `Alarma se presentó: ` + resp.ALRM_TON2;
          }
        }
      }
      //alarma 3 1
      if (!resp.ALRM_STATUS3) {
        //alarma presente
        document.getElementById("cards3").classList.remove("bg-primary");
        document.getElementById("cards3").classList.add("bg-danger");
        if (resp.ALRM_TON3) {
          //registro de fecha on
          if (resp.ALRM_TOFF3) {
            //registro fecha off
            document.getElementById("ton3").innerHTML =
              `Alarma presente: ` + resp.ALRM_TON3;
            document.getElementById("toff3").innerHTML = ``;
          } else {
            document.getElementById("ton3").innerHTML =
              `Alarma presente: ` + resp.ALRM_TON3;
            document.getElementById("toff3").innerHTML = ``;
          }
        }
      } else {
        //alarma se desactivo
        document.getElementById("cards3").classList.remove("bg-danger");
        document.getElementById("cards3").classList.add("bg-primary");
        if (resp.ALRM_TON3) {
          //registro de fecha on
          if (resp.ALRM_TOFF3) {
            //registro fecha off
            document.getElementById("ton3").innerHTML =
              `Alarma se presentó: ` + resp.ALRM_TON3;
            document.getElementById("toff3").innerHTML =
              `Alarma se clareo: ` + resp.ALRM_TOFF3;
          } else {
            document.getElementById("ton3").innerHTML =
              `Alarma se presentó: ` + resp.ALRM_TON3;
          }
        }
      }
      //alarma 4
      if (resp.ALRM_STATUS4) {
        //alarma presente
        document.getElementById("cards4").classList.remove("bg-primary");
        document.getElementById("cards4").classList.add("bg-danger");

        if (resp.ALRM_TON4) {
          //registro de fecha on
          if (resp.ALRM_TOFF4) {
            //registro fecha off
            document.getElementById("ton4").innerHTML =
              `Operando desde: ` + resp.ALRM_TON4;
            document.getElementById("toff4").innerHTML =
              `Dejo de operar el: ` + resp.ALRM_TOFF4;
          } else {
            document.getElementById("ton4").innerHTML =
              `Operando desde: ` + resp.ALRM_TON4;
            document.getElementById("toff4").innerHTML = ``;
          }
        }
      } else {
        //alarma se desactivo
        document.getElementById("cards4").classList.remove("bg-danger");
        document.getElementById("cards4").classList.add("bg-primary");
        if (resp.ALRM_TON4) {
          //registro de fecha on
          if (resp.ALRM_TOFF4) {
            //registro fecha off
            document.getElementById("ton4").innerHTML =
              `Inició operación: ` + resp.ALRM_TON4;
            document.getElementById("toff4").innerHTML = ``;
          } else {
            document.getElementById("ton4").innerHTML =
              `Inició operación: ` + resp.ALRM_TON4;
            document.getElementById("toff4").innerHTML = ``;
          }
        }
      }
      //alarma 5
      if (resp.ALRM_STATUS5) {
        //alarma presente
        document.getElementById("cards5").classList.remove("bg-primary");
        document.getElementById("cards5").classList.add("bg-danger");

        if (resp.ALRM_TON5) {
          //registro de fecha on
          if (resp.ALRM_TOFF5) {
            //registro fecha off
            document.getElementById("ton5").innerHTML =
              `Operando desde: ` + resp.ALRM_TON5;
            document.getElementById("toff5").innerHTML =
              `Dejo de operar el: ` + resp.ALRM_TOFF5;
          } else {
            document.getElementById("ton5").innerHTML =
              `Operando desde: ` + resp.ALRM_TON5;
            document.getElementById("toff5").innerHTML = ``;
          }
        }
      } else {
        //alarma se desactivo
        document.getElementById("cards5").classList.remove("bg-danger");
        document.getElementById("cards5").classList.add("bg-primary");
        if (resp.ALRM_TON5) {
          //registro de fecha on
          if (resp.ALRM_TOFF5) {
            //registro fecha off
            document.getElementById("ton5").innerHTML =
              `Inició operación: ` + resp.ALRM_TON5;
            document.getElementById("toff5").innerHTML = ``;
          } else {
            document.getElementById("ton5").innerHTML =
              `Inició operación: ` + resp.ALRM_TON5;
            document.getElementById("toff5").innerHTML = ``;
          }
        }
      }
    } else if (resp.type === "update") {
      document.getElementById("progressFirmware").style.width = resp.msg + "%";
      document.getElementById("progressFirmware").innerHTML = resp.msg + "%";
    } else {
      headerIconsStatus(resp.wifiStatus, resp.rssiStatus, resp.mqttStatus);
    }
  };
}; // función de cambio de estados de los relays RELAY1_Status
const relayStatusChange1 = (status) => {
  if (status) {
    RELAY1_Status.classList.remove("text-dark");
    RELAY1_Status.classList.add("text-warning");
    RELAY1_Icon.classList.remove("bi-option");
    RELAY1_Icon.classList.add("bi-alt");
    document.getElementById("RELAY1").checked = true;
  } else {
    RELAY1_Status.classList.remove("text-warning");
    RELAY1_Status.classList.add("text-dark");
    RELAY1_Icon.classList.remove("bi-alt");
    RELAY1_Icon.classList.add("bi-option");
    document.getElementById("RELAY1").checked = false;
  }
};
const relayStatusChange2 = (status) => {
  if (status) {
    RELAY2_Status.classList.remove("text-dark");
    RELAY2_Status.classList.add("text-warning");
    RELAY2_Icon.classList.remove("bi-option");
    RELAY2_Icon.classList.add("bi-alt");
    document.getElementById("RELAY2").checked = true;
  } else {
    RELAY2_Status.classList.remove("text-warning");
    RELAY2_Status.classList.add("text-dark");
    RELAY2_Icon.classList.remove("bi-alt");
    RELAY2_Icon.classList.add("bi-option");
    document.getElementById("RELAY2").checked = false;
  }
};
