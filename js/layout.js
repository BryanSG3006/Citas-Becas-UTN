
 /*    // Llamado al navbar
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const navbarPath = isLocal ? "./Layout/navbar.html" : "/Citas-Becas-UTN/Layout/navbar.html";

    fetch(navbarPath)
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;

        // Esperar un ciclo del event loop para asegurar que el DOM está actualizado
        setTimeout(() => {
          const currentPath = window.location.pathname.split("/").pop() || "index.html";
          const navLinks = document.querySelectorAll(".navbar-menu a");

          navLinks.forEach(link => {
            const hrefFile = link.getAttribute("href").split("/").pop();
            if ((currentPath === "login.html" || currentPath === "mantenimiento.html") && hrefFile === "login.html") {
              link.classList.add("active");
            } else if (currentPath === "index.html" && hrefFile === "index.html") {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });

          const toggleButton = document.getElementById('navbar-toggle');
          const menu = document.querySelector('.navbar-menu');

          if (toggleButton && menu) {
            toggleButton.addEventListener('click', () => {
              menu.classList.toggle('show');
            });
          } else {
            console.warn("No se encontró el botón hamburguesa o el menú.");
          }
        }, 0);
      })
      .catch(error => console.error("Error cargando el navbar:", error));
 */




    //Llamado al footer
    fetch('./Layout/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-container').innerHTML = data;
      })
      .catch(error => {
        console.error('Error cargando el footer:', error);
      });
