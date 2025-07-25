  // Importar módulos de Firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    // Configuración de tu proyecto Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDTV0RzmB-hv2CPbwM-gEbbkcMVsgSurAc",
      authDomain: "sistema-calendarios-utn.firebaseapp.com",
      projectId: "sistema-calendarios-utn",
      storageBucket: "sistema-calendarios-utn.appspot.com",
      messagingSenderId: "409729685216",
      appId: "1:409729685216:web:715075faa4dbe615342285",
      measurementId: "G-G8J5PLE64V"
    };

    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Elementos del DOM
    const form = document.getElementById('calendarForm');
    const input = document.getElementById('calendarUrl');
    const container = document.getElementById('calendarios');

    // Función para crear y mostrar un calendario en el DOM
    function mostrarCalendario(id, url) {
      const wrapper = document.createElement('div');
      wrapper.className = 'calendar-wrapper';

      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.loading = "lazy";
      iframe.title = "Calendario Agregado";

      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.className = 'delete-btn';
      btn.onclick = async () => {
        if (confirm("¿Deseas eliminar este calendario?")) {
          await deleteDoc(doc(db, "calendarios", id));
          wrapper.remove();
        }
      };

      wrapper.appendChild(iframe);
      wrapper.appendChild(btn);
      container.appendChild(wrapper);
    }

    // Cargar calendarios desde Firestore al iniciar
    async function cargarCalendarios() {
      const querySnapshot = await getDocs(collection(db, "calendarios"));
      container.innerHTML = ''; // Limpiar contenedor

      if (querySnapshot.empty) {
        const defaultUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ20hcjdAL0gayURPcWrxX9yCklMDYum2rImCmrQf_n5gBxQPhKP0RgzIJI3G_9HRXv22Jce6O71?gv=true";
        const docRef = await addDoc(collection(db, "calendarios"), { url: defaultUrl });
        mostrarCalendario(docRef.id, defaultUrl);
      } else {
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          mostrarCalendario(docSnap.id, data.url);
        });
      }
    }

    // Evento para agregar un nuevo calendario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = input.value.trim();
      if (!url) return;
      const docRef = await addDoc(collection(db, "calendarios"), { url });
      mostrarCalendario(docRef.id, url);
      input.value = '';
    });

    // Cargar calendarios al iniciar
    window.addEventListener('DOMContentLoaded', cargarCalendarios);