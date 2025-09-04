// Función principal para exportar citas
document.getElementById('exportBtn').addEventListener('click', exportarCitas);

async function exportarCitas() {
    try {
        // 1. Obtener todos los iframes de calendarios
        const iframes = document.querySelectorAll('.calendar-wrapper iframe');

        // 2. Preparar datos para CSV
        let csvContent = "Calendario,Enlace para ver citas,Instrucciones\n";

        // 3. Procesar cada iframe
        iframes.forEach(iframe => {
            const url = iframe.src;
            const nombre = iframe.title || "Calendario sin nombre";

            // Crear enlace de exportación (cambia 'embed' por 'export' en la URL)
            const exportUrl = url.replace('embed', 'export') + '&exportFormat=csv';

            csvContent += `"${nombre}","${url}","Accede a ${exportUrl} para descargar las citas en CSV"\n`;
        });

        // 4. Descargar archivo
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `enlaces_calendarios_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        alert("Se ha descargado un archivo con enlaces a los calendarios. Sigue las instrucciones para exportar las citas.");

    } catch (error) {
        console.error("Error al exportar citas:", error);
        alert("Ocurrió un error. Por favor accede manualmente a cada calendario y usa la opción 'Exportar' de Google Calendar.");
    }
}