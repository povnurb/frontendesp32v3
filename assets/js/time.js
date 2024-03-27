"use strict";
import { createBreadCrumb } from "./scripts.js";

export async function iniciarTime(){
    console.log('Time');
    /**
     * Quitar el loadig al cargar la pagina
     */
    document.querySelector('.preloader').remove();
    document.querySelector('#content').style = 'display:block;';
}