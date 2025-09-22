document.addEventListener('DOMContentLoaded', () => {
    // Nuevos selectores para la fotocopiadora
    const printBtn = document.getElementById('print-btn');
    const memoText = document.getElementById('memo-text');
    const officeCopier = document.getElementById('office-copier');
    
    let quotes = [];

    async function loadQuotes() {
        try {
            const response = await fetch('quotes.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            quotes = await response.json();
            printBtn.disabled = false;
            memoText.textContent = 'Presione \'Imprimir\' si necesita una cita citable...';
        } catch (error) {
            console.error("No se pudieron cargar las citas:", error);
            memoText.textContent = 'Error de atasco de papel en el sistema moral. Inténtalo de nuevo.';
        }
    }

    function getWisdom() {
        if (quotes.length === 0) return;

        printBtn.disabled = true;
        memoText.textContent = 'Imprimiendo...';

        // Aplicamos la clase para la animación
        officeCopier.classList.add('is-printing');

        // Simulamos el tiempo de impresión
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            // Usamos innerHTML para formatear el autor en una nueva línea
            //memoText.innerHTML = `"${randomQuote.quote}" <br><br><strong>- ${randomQuote.author}</strong>`;
            memoText.innerHTML = `"${randomQuote.quote}"`;
            printBtn.disabled = false;
        }, 1500);

        // Quitamos la clase de animación para que pueda volver a usarse
        setTimeout(() => {
            officeCopier.classList.remove('is-printing');
        }, 800); // Coincide con la duración de la animación 'shake'
    }
    
    printBtn.disabled = true;
    memoText.textContent = 'Calentando la impresora...';
    loadQuotes();
    printBtn.addEventListener('click', getWisdom);
});