// Fonction de connexion
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Création du corps de la requête
    var requestBody = username + "$$$" + password;

    fetch('http://192.168.178.27:65432', { // Replace with the correct server URL
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: requestBody
    })
    .then(response => response.text())
    .then(data => {
        if (data === "connexion: Échec") {
            document.getElementById("loginStatus").innerHTML = "Adresse e-mail ou mot de passe incorrect.";
        } else {
            // Création d'un cookie pour maintenir la session de l'utilisateur (expire dans 7 jours)
            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);

            document.cookie = "username=" + username + "; expires=" + expirationDate.toUTCString();
            
            // Rediriger l'utilisateur vers la page principale
            window.location.href = "index.html";
        }
    })
    .catch(error => console.error('Erreur lors de la connexion:', error));
}

// Vérifier si l'utilisateur est déjà connecté (lorsque la page se charge)
window.onload = function() {
    var cookies = document.cookie.split(';');
    var loggedInUser = null;

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf("username=") === 0) {
            loggedInUser = cookie.substring("username=".length, cookie.length);
        }
    }
    
    if (loggedInUser) {
        // L'utilisateur est connecté, afficher le bouton de déconnexion
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
    } else {
        // L'utilisateur n'est pas connecté, afficher le bouton de connexion
        document.getElementById("loginButton").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
    }
}

// Fonction de déconnexion
function logout() {
    // Supprimer le cookie en fixant sa date d'expiration dans le passé
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = "index.html";
}

// Récupérez les éléments à faire apparaître
var elements = document.querySelectorAll('.element');

// Fonction pour vérifier si un élément est dans la fenêtre de visualisation
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Fonction pour gérer l'animation des éléments
function animateElements() {
    elements.forEach(function (element) {
        if (isElementInViewport(element)) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Ajoutez un gestionnaire d'événements de défilement pour activer l'animation
window.addEventListener('scroll', animateElements);

// Appelez animateElements() une fois au chargement de la page pour gérer les éléments déjà visibles
window.addEventListener('load', animateElements);