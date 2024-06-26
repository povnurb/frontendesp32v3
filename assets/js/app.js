"use strict";

import { url, createHeader, createSidebarNav } from './scripts.js';
import { sidebar } from './template.js';
import { iniciarIndex } from './index.js';
import { iniciarWifi } from './wifi.js';
import { iniciarAlarmas } from './alarmas.js';
import { iniciarMqtt } from './mqtt.js';
import { iniciarRestore } from './restore.js';
import { iniciarRelays } from './relays.js';
import { iniciarTime } from './time.js';
import { iniciarRestart } from './restart.js';
import { iniciarFirmware } from './firmware.js';
import { iniciarUser } from './admin.js';

// 3:"/index.html" o '/' o 'esp-admin'
switch (url[3]) {
    case '/':
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarIndex);
        break;
    case '/index.html':
        createHeader();
        createSidebarNav(sidebar);
        document.addEventListener('DOMContentLoaded', iniciarIndex);
        break;
    case '/wifi.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarWifi);
        break;
    case '/esp-wifi': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarWifi);
        break;
    case '/alarmas.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarAlarmas);
        break;
    case '/esp-alarmas': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarAlarmas);
        break;
    case '/relays.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarRelays);
        break;
    case '/esp-relays': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarRelays);
        break;
    case '/time.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarTime);
        break;
    case '/esp-time': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarTime);
        break;

    case '/mqtt.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarMqtt);
        break;
    case '/esp-mqtt': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarMqtt);
        break;
    case '/restore.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarRestore);
        break;
    case '/esp-restore': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarRestore);
        break;
    case '/restart.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarRestart);
        break;
    case '/esp-restart': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarRestart);
        break;
    case '/firmware.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarFirmware);
        break;
    case '/esp-device': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarFirmware);
        break;
    case '/user.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarUser);
        break;
    case '/esp-admin': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarUser);
        break;
    default:
        break;
}










//-------------------------------------------------------------------------
//Desde el archivo main.js
/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}
/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    if (all) {
        select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
        select(el, all).addEventListener(type, listener)
    }
}
/**
 * Easy on scroll event listener 
 */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}

/**
 * Back to top button
 */
let backtotop = select('.back-to-top')
if (backtotop) {
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
            backtotop.classList.add('active')
        } else {
            backtotop.classList.remove('active')
        }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
}

/**
 * Sidebar toggle
 */
if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
        select('body').classList.toggle('toggle-sidebar')
    })
}
