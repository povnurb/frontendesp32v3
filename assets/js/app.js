"use strict";

import { url, createHeader, createSidebarNav } from './scripts.js'
import { sidebar } from './template.js';
import { iniciarIndex } from './index.js';
import { iniciarWifi } from './wifi.js';
import { iniciarAlarmas } from './alarmas.js';
import { iniciarDeviceRemote } from './deviceremote.js';

import { iniciarRelays } from './relays.js';
import { iniciarTime } from './time.js';

import { iniciarEspNow } from './espnow.js';

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
    case '/deviceremote.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarDeviceRemote);
        break;
    case '/esp-deviceremote': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarDeviceRemote);
        break;
    case '/espnow.html': //para modo desarrollo
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarEspNow);
        break;
    case '/esp-espnow': //para producción
        createHeader();
        createSidebarNav(sidebar);
        //cuando todo el documento se carge despues se ejecuta la funcion iniciarIndex
        document.addEventListener('DOMContentLoaded', iniciarEspNow);
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
/**
 * Initiate tooltips
 */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})