import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDTV0RzmB-hv2CPbwM-gEbbkcMVsgSurAc",
    authDomain: "sistema-calendarios-utn.firebaseapp.com",
    projectId: "sistema-calendarios-utn",
    storageBucket: "sistema-calendarios-utn.appspot.com",
    messagingSenderId: "409729685216",
    appId: "1:409729685216:web:715075faa4dbe615342285",
    measurementId: "G-G8J5PLE64V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const calendarioContainer = document.getElementById('calendario');

async function cargarCalendariosDesdeFirestore() {
    const querySnapshot = await getDocs(collection(db, "calendarios"));
    if (!querySnapshot.empty) {
        const calendarioBase = calendarioContainer.querySelector('.calendar-wrapper');
        if (calendarioBase) calendarioBase.style.display = 'none';
    }

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const url = data.url;
        const nombre = data.nombre || "Calendario " + doc.id; // Usar nombre personalizado si existe

        const wrapper = document.createElement('div');
        wrapper.classList.add('calendar-wrapper');

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.loading = "lazy";
        iframe.title = nombre; // Asignar nombre como título

        wrapper.appendChild(iframe);
        calendarioContainer.appendChild(wrapper);
    });
}

window.addEventListener('DOMContentLoaded', cargarCalendariosDesdeFirestore);