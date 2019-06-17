firebase.initializeApp({
  apiKey: "AIzaSyB73tDgusMrdcKucIcIuboQFlIYGpfeGGE",
  authDomain: "clientesdygi.firebaseapp.com",
  databaseURL: "https://clientesdygi.firebaseio.com",
  projectId: "clientesdygi",
  storageBucket: "clientesdygi.appspot.com",
  messagingSenderId: "775679037275",
  appId: "1:775679037275:web:3ef42f12fd2780b0"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


//leer datos
db.collection("clientes").onSnapshot((querySnapshot) => {
    
    var tabla = document.getElementById('tabla-clientes'); //guardamos tabla
    tabla.innerHTML = `<thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Ultimo servicio</th>
          </tr>
        </thead>`; //Colocamos el encabezado
    querySnapshot.forEach((doc) => {
    	tabla.innerHTML +=
    		`<tr>
	            <th scope="row">${doc.id}</th>
	            <td>${doc.data().Nombre}</td>
	            <td>${doc.data().Telefono}</td>
	            <td>${doc.data().Updated_at}</td>
	            <td><button type="submit" class="btn btn-warning" id="editar" onclick="mostrar_editar('${doc.id}', '${doc.data().Nombre}', '${doc.data().Telefono}')">Editar</button>
	            <button type="submit" class="btn btn-danger" id="eliminar" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          	</tr>
          	`;
        console.log(`${doc.id} => ${doc.data()}`);
    });
});


//agrega datos
function guardar(){
	var	nombre = document.getElementById('nombre').value;
	var	telefono = document.getElementById('telefono').value;
	var f = new Date(); //obtiene la fecha

	db.collection("clientes").add({
    
    Nombre: nombre,
    Telefono: telefono,
    Created_at: `${f.getMonth()}/${f.getDate()}/${f.getFullYear()} a las ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`,
    Updated_at: `${f.getMonth()}/${f.getDate()}/${f.getFullYear()} a las ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`

	})
	.then(function(docRef) {
	    console.log("Datos guardados con ID: ", docRef.id);
		document.getElementById('nombre').value = "";
		document.getElementById('telefono').value = "";
		Command: toastr["success"]("La información fue agregada exitosamente", "Agregado correctamente");

	})
	.catch(function(error) {
	    console.error("Error al agregar Documento: ", error);
	     Command: toastr["danger"]("Error al agregar documento", "Alerta de error");

	});
}

//Eliminar datos
function eliminar(id){
	db.collection("clientes").doc(id).delete().then(function() {
    	console.log("Datos eliminados correctamente");
	}).catch(function(error) {
    	console.error("Error en el documento: ", error);
    	Command: toastr["danger"]("Error al eliminar documento", "Alerta de error");
	});
}



//Modificar datos
function mostrar_editar(id, nombre, telefono){
	document.getElementById('nombre-editar').value = nombre;
	document.getElementById('telefono-editar').value = telefono;
	document.getElementById('id-editar').value = id;
	$('#editarModal').modal('show'); //mostramos modal
}

function editar(){
	//guardamos datos
	id	= document.getElementById('id-editar').value;
	nombre = document.getElementById('nombre-editar').value;
	telefono = document.getElementById('telefono-editar').value;

	var f = new Date(); //obtiene la fecha
	db.collection("clientes").doc(id).update({
	    Nombre: nombre,
	    Telefono: telefono,
	    Updated_at: `${f.getMonth()}/${f.getDate()}/${f.getFullYear()} a las ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`

	})
	.then(function() {
	    console.log("Datos actualizados de ID: ", id);
		document.getElementById('nombre-editar').value = "";
		document.getElementById('telefono-editar').value = "";
		$('#editarModal').modal('hide'); //ocultamos modal
		Command: toastr["success"]("La información fue Modificada exitosamente", "Modificado correctamente");

	})
	.catch(function(error) {
	    console.error("Error al editar Documento: ", error);
	});
}