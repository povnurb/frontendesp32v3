"use strict";
import { ApiService, createBreadCrumb, headerIconsStatus } from "./scripts.js";

export async function iniciarEspNow(){
  console.log('espnow')




  
  var tmp1,tmp2,tmp3,tmp4;
if (window.EventSource) {
 var source = new EventSource('/events');
 
 source.addEventListener('open', function(e) {
  console.log("Events Connected");
 }, false);
 source.addEventListener('error', function(e) {
  if (e.target.readyState != EventSource.OPEN) {
    console.log("Events Disconnected");
  }
 }, false);
 
 source.addEventListener('message', function(e) {
  console.log("message", e.data);
 }, false);
 
 source.addEventListener('new_readings', function(e) {
  //console.log("new_readings", e.data);
  var obj = JSON.parse(e.data);
  
  console.log("Nuevas_Lecturas: ",obj.nameNodo);
  console.log("Metodo: ",obj.modoSend);
  document.getElementById("t"+obj.id).innerHTML = obj.temperature.toFixed(1); //un digito
  document.getElementById("h"+obj.id).innerHTML = obj.humidity.toFixed(1); //un digito
  //document.getElementById("rt"+obj.id).innerHTML = obj.readingId;
  document.getElementById("rh"+obj.id).innerHTML = obj.readingId.toFixed(1);
  document.getElementById("tmin"+obj.id).innerHTML = obj.min.toFixed(1);
  document.getElementById("tmax"+obj.id).innerHTML = obj.max.toFixed(1);
  document.getElementById("cont"+obj.id).innerHTML = obj.tmp;
  
  
  //las siguientes lineas son para darle mas funcionalidad a los dispositivos
  // las siguientes linea son para saber el nombre de las alarmas prensentes del dispositivo
  document.getElementById("alr1"+obj.id).innerHTML = obj.alr1;
  document.getElementById("alr2"+obj.id).innerHTML = obj.alr2;
  document.getElementById("alr3"+obj.id).innerHTML = obj.alr3;
  document.getElementById("alr4"+obj.id).innerHTML = obj.alr4;
  document.getElementById("alr5"+obj.id).innerHTML = obj.alr5;
  document.getElementById("alr6"+obj.id).innerHTML = obj.alr6;
  document.getElementById("alr7"+obj.id).innerHTML = obj.alr7;
  document.getElementById("alr8"+obj.id).innerHTML = obj.alr8;

  //aqui falta una funcion que muestre la alarma presente (quite el hidden)
  document.getElementById('a1'+obj.id).style.display = obj.va1?'block': 'none';
  document.getElementById('a2'+obj.id).style.display = obj.va2?'block': 'none';
  document.getElementById('a3'+obj.id).style.display = obj.va3?'block': 'none';
  document.getElementById('a4'+obj.id).style.display = obj.va4?'block': 'none';
  document.getElementById('a5'+obj.id).style.display = obj.va5?'block': 'none';
  document.getElementById('a6'+obj.id).style.display = obj.va6?'block': 'none';
  document.getElementById('a7'+obj.id).style.display = obj.va7?'block': 'none';
  document.getElementById('a8'+obj.id).style.display = obj.va8?'block': 'none';
 
 }, false);
}else{
  console.log("sin eventos")
}  


//la siguiente funcion se ejecuta apesar de la informacion exitente la cual aumenta el contador
//y en caso de llegar informacion resetea el contador
setInterval(function aumentar(){ // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar
  //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
    tmp1=document.getElementById("cont1").innerHTML; 
    tmp1++;
    tmp2=document.getElementById("cont2").innerHTML;
    tmp2++;
    tmp3=document.getElementById("cont3").innerHTML;
    tmp3++;
    tmp4=document.getElementById("cont4").innerHTML;
    tmp4++;
    document.getElementById("cont1").innerHTML = tmp1;
    document.getElementById("cont2").innerHTML = tmp2;
    document.getElementById("cont3").innerHTML = tmp3;
    document.getElementById("cont4").innerHTML = tmp4;
  },1000);
  

}



