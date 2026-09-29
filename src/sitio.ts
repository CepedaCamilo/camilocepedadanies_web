// Datos generales de la web. Si cambias de email o de ciudad, se cambia aquí y en ningún otro sitio.
export const sitio = {
  nombre: 'Camilo Cepeda Danies',
  email: 'camilocepedadanies@gmail.com',
  ciudad: 'Hamburg',
  // Demo "Secure by default" (/files-live.html): la ventanilla que envía y comprueba los códigos por email.
  // Es la clave PUBLISHABLE (pública, pensada para ir en la web); la secreta nunca sale del servidor.
  demoCodigo: {
    api: 'https://supabase.danies.trade/functions/v1/demo-codigo',
    clave: 'sb_publishable_ghOYo_9qOmecLIxCFrry8S_wpvLySp4',
  },
  descripcion:
    'Product and brand designer in Hamburg, now building software: from the interface to the server.',
}
