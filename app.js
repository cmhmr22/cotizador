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



//agrega datos
function guardar(){
	var	nombre = document.getElementById('nombre').value;
	var	telefono = document.getElementById('telefono').value;

	db.collection("clientes").add({
    
    Nombre: nombre,
    Telefono: telefono,
    Created_at: "06/17/2019",
    Updated_at: "06/17/2019"

	})
	.then(function(docRef) {
	    console.log("Datos guardados con ID: ", docRef.id);
		document.getElementById('nombre').value = "";
		document.getElementById('telefono').value = "";
	})
	.catch(function(error) {
	    console.error("Error al agregar Documento: ", error);
	});
}


