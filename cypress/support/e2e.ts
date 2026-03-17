import "./commands";

// @ts-ignore
Cypress.Commands.overwrite("visit", (originalFn: any, url: any, options: any) => {
  return originalFn(url, options).then((win: Cypress.AUTWindow) => {
    const style = win.document.createElement("style");
    style.id = "cypress-disable-animations";
    style.innerHTML = `
      *, *::before, *::after {
        transition-duration: 0ms !important;
        animation-duration: 0ms !important;
        animation-delay: 0ms !important;
        animation-fill-mode: forwards !important;
        scroll-behavior: auto !important;
      }
      /* Garante que elementos que iniciam com opacidade zero 
         fiquem visíveis imediatamente nos testes */
      [class*="animate-"] {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    win.document.head.appendChild(style);
    return win;
  });
});

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Hydration failed") ||
    err.message.includes("There was an error while hydrating") ||
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #425")
  ) {
    return false;
  }
  return true;
});