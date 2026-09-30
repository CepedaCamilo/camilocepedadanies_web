// Datos generales de la web. Si cambias de email o de ciudad, se cambia aquí y en ningún otro sitio.
export const sitio = {
  nombre: 'Camilo Cepeda Danies', // el nombre real (pie, Impressum, textos alternativos)
  marca: 'camilocepedadanies', // como el logo: en la pestaña del navegador y al compartir la web
  email: 'hi@camilocepedadanies.com', // se reenvía a Gmail (reenvío de Namecheap)
  ciudad: 'Hamburg',
  // Demo "Secure by default" (/files-live.html): la ventanilla que envía y comprueba los códigos por email.
  // Es la clave PUBLISHABLE (pública, pensada para ir en la web); la secreta nunca sale del servidor.
  demoCodigo: {
    api: 'https://supabase.danies.trade/functions/v1/demo-codigo',
    clave: 'sb_publishable_ghOYo_9qOmecLIxCFrry8S_wpvLySp4',
  },
  // Formulario de contacto (/contact): la ventanilla que reenvía el mensaje por email (no lo guarda). Misma clave publishable.
  contacto: {
    api: 'https://supabase.danies.trade/functions/v1/contacto',
    clave: 'sb_publishable_ghOYo_9qOmecLIxCFrry8S_wpvLySp4',
  },
  // La frase que sale en Google y al compartir, en los tres idiomas
  descripcion: {
    en: 'Product and brand designer in Hamburg, now building software: from the interface to the server.',
    de: 'Produkt- und Markendesigner in Hamburg, der heute auch Software baut: vom Interface bis zum Server.',
    es: 'Diseñador de producto y marca en Hamburgo que ahora también crea software: de la interfaz al servidor.',
  },
}
