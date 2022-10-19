    //tomar datos del formulario
	var nombreCliente = document.getElementById("nombre");
    var dui = document.getElementById("dui");
    var nit = document.getElementById("nit");
	var anio = document.getElementById("anio");
    var color = document.getElementById("color");
    var placa = document.getElementById("placa");
    var fallas = document.getElementById("fallas");

	//formulario
	var form = document.getElementById("frmC")

	//Select
    var marca = document.getElementById("marca");
    var modelo = document.getElementById("modelo");

    //boton de enviar
    var enviar = document.getElementById("enviar");

	//Arrays de modelos
	var model = new Array(6);
	model["Ford"]=["Fiesta","Explorer","Focus","Mustang","Escape"]
	model["Toyota"]=["Yaris","Corolla","Hiluzx","Supra","C-HR"]
	model["Kia"]=["Picanto","Rio","Optima","Sorento","Soul"]
	model["BMW"]=["i3","i4","i7","i8","Serie 1"]
	model["Mercedez"]=["35 CV","600","Clase A","Clase C","Clase B"]
	model["Mazda"]=["mx-5 Miata","Mazda 3","Mazda 6","CX-50","CX-30"]

//IndexedDb para guardar los datos
/*window.onload = () =>{
let indexedDB = window.indexedDB;

if(indexedDB){
	let db;
	const respuesta = indexedDB.open('clientes', 1);

	respuesta.onsuccess = () =>{
		db= respuesta.result
		console.log('OPEN', db)
	}

	respuesta.onupgradeneeded = () =>{
		db= respuesta.result
		console.log('Create', db)
		const objectStore = db.createObjectStore('usuarios',{autoIncrement: true});
	}

	respuesta.onerror = (error) =>{
		console.log('Error', error);
	}
}

//crear base de datos
}

*/

if(marca.addEventListener){
	marca.addEventListener("change", function(){
		addOptions(model[this.options[this.selectedIndex].text],
		modelo);
	}, false);
}

function iniciar(){
}    

//clases
class cliente{
    constructor(){
        this.nombre ="" ;
        this.dui ="";
        this.nit ="";
		this.marca ="";
   	    this.modelo="";
    	this.anio="";
       	this.color="";
       	this.placa="";
       	this.fallas="";
    }

	addCliente(nombre,dui,nit){
		this.nombre = nombre;
		this.dui = dui;
		this.nit = nit;
	}

	addAuto(marca,modelo,anio,color,placa,fallas){
		this.marca = marca;
		this.modelo = modelo;
		this.anio = anio;
		this.color = color;
		this.placa = placa;
		this.fallas = fallas;
	}
}


//Sube los datos
function enviarDatos(){
	var cl = new cliente();
	if(nombre.value=="" || dui.value=="" || nit.value=="" || marca.value=="" || modelo.value=="" || anio.value=="" || color.value=="" || placa.value=="" || fallas.value==""){
		alert("Tiene que rellenar todos los campos");
		return;
	}
	if(validarNombre(nombre.value) == false){
		alert("El nombre esta un mal formato");
		return;
	}
	if(!(valDui(dui.value))){
		alert("El formato del dui no es el correcto");
		return;
	}
	if(!(validarNit(nit.value))){
		alert("El formato del nit no es el correcto");
		return;
	}
	if(!(validarAnio(anio.value))){
		alert("El formato del año no es el correcto");
		return;
	}
	if(!(veriPlaca(placa.value))){
		alert("El formato de la placa no es la correcto");
		return;
	}
	if(!(validarFallas(fallas.value))){
		alert("No se permiten signos especiales en el apartado de fallas");
		return;
	}
	cl.addCliente(nombre.value, dui.value, nit.value)
	cl.addAuto(marca.value, modelo.value, anio.value, color.value, placa.value, fallas.value)
	/*let mover = indexedDB.transaction(['clientes'], 'readwrite');
	let clt = mover.objectStore('clientes');
	//se agregan los datos
	let usu = {nombre: nombre.value,dui: dui.value, nit: nit.value,año: anio.value,marca: marca.value, modelo: modelo.value, color: color.value, placa: placa.value, falla: fallas.value};
	//se agrega a la tabla
	clt.add(usu);
	mover.oncomplete = function(){
		alert("su vehiculo se ha agregado de forma correcta");
	}

	mover.onerror = function(){
		alert("Error al guardar");
	}*/
	localStorage.setItem("cliente", JSON.stringify(cl))
	console.log(cl);
}

//Validacion del anio
function validarAnio(anio){
    var valAnio = /^[0-9]{4}$/;
    if(valAnio.test(anio)){
        if(anio > 1960 && anio <= 2022){
			return true;
        }else{
			return false;
        }
    }else{
		return false;
    }
}

//Valida el nombre
function validarNombre(nombre){
    var valNombre = /[a-zA-Z]$/ ;
    if(valNombre.test(nombre)){
		return true;
    }else{
		return false;
    }
}

//Validacion de la fallas
function validarFallas(falla){
    var valFallas = /[a-zA-z0-9]/;
    if(valFallas.test(falla)){
        // asignar el valor  this.falla = falla;
        return true;
    }else{
        return false;
    }
}

//Validacion del Dui
function valDui(dui){
	var valDui = /^\d{8}-\d{1}$/;
    if(valDui.test(dui)){
		return true;
   }else{
	   return false;
    }
}

//Validacion del numero de nit
function validarNit(nit){
    var valNit = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;
    if(valNit.test(nit)){
		return true;
    }else{
		return false;
    }
}

//El formato de la placa P 1 A45

//Funcion que verifica si la placa es correcta
function veriPlaca(placa){
	var Placa1 =  /^[PONAV]{1}[\s]{1,2}[0-9]{1,2}\s[A-F0-9]{3}$/;
    var Placa2 =  /^[PONAV]{1}[0-9]{3}\s[A-F0-9]{3}$/;
    if(Placa1.test(placa)){
		return true;
    }else{
        if(Placa2.test(placa)){
			return true;
        }else{
			return false;
        }
    }

}

document.getElementById("datos").addEventListener("click", function(){

	if(localStorage.getItem("cliente")){
		let datos = JSON.parse(localStorage.getItem("cliente"))	
	let tabla = document.getElementById("info")	;
		tabla.innerHTML = "Datos de la persona </br>"+datos.nombre+"</br>"+datos.dui+"</br>"+datos.nit+"</br>"+datos.marca+"</br>"+datos.modelo+"</br>"+datos.anio+"</br>"+datos.color+"</br>"+datos.placa+"</br>"+datos.fallas;
	}
})

//funcion que agrega opciones al select
function addOptions(optionList, optionMenu){
var i=0;
removeOptions(optionMenu); //Limpia las opciones
	for(i=0; i<optionList.length; i++){
		optionMenu[i] = new Option(optionList[i], optionList[i]);
	}
}

//retira las opciones anteriores
function removeOptions(optionMenu){
	for(i=0; i<optionMenu.options.length; i++){
		optionMenu.options[i] = null;
	}
}

function main(){
console.log("epic")
}

if(window.addEventListener){
    window.addEventListener("load", iniciar, false);
}


