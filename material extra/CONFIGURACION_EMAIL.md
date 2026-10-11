# 📧 Configuración de EmailJS para Queen Studio

A continuación está la plantilla HTML que debes pegar como *Content* en tu plantilla de EmailJS (Template). Copia exactamente todo el bloque HTML desde <div> hasta </div> final.

## Plantilla HTML (copiar completa)

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f4ec; border: 3px solid #b99654; border-radius: 15px;">
  <div style="text-align: center; background: linear-gradient(135deg, rgba(171, 151, 104, 0.85), rgba(251, 235, 197, 0.8)); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
    <h1 style="color: #333; font-family: 'Great Vibes', cursive; font-size: 2.5rem; margin: 0;">Queen Studio</h1>
    <p style="color: #666; margin: 5px 0;">🎀 Nueva Cita Agendada</p>
  </div>
  
  <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #b99654; border-bottom: 2px solid #b99654; padding-bottom: 10px;">📋 Detalles de la Cita</h2>
    
    <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; width: 40%; background: #f9f9f9;">👤 Cliente:</td>
        <td style="padding: 10px; color: #666;">{{nombre}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; background: #f9f9f9;">📱 Teléfono:</td>
        <td style="padding: 10px; color: #666;">{{telefono}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; background: #f9f9f9;">💅 Servicio:</td>
        <td style="padding: 10px; color: #666;">{{servicio}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; background: #f9f9f9;">📅 Fecha:</td>
        <td style="padding: 10px; color: #666;">{{fecha}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; background: #f9f9f9;">🕐 Hora Inicio:</td>
        <td style="padding: 10px; color: #666;">{{hora}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; background: #f9f9f9;">⏰ Hora Fin:</td>
        <td style="padding: 10px; color: #666;">{{hora_fin}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #333; background: #f9f9f9;">⏱️ Duración:</td>
        <td style="padding: 10px; color: #666;">{{duracion}}</td>
      </tr>
    </table>

    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
      <p style="margin: 0; font-weight: bold; color: #333;">🧾 Servicios del pedido ({{numero_servicios}}):</p>
      <div style="margin: 10px 0 0 0; color: #666; white-space: pre-line;">{{resumen_servicios}}</div>
    </div>

    {{#notas}}
    <div style="margin-top: 20px; padding: 15px; background-color: #fff9e6; border-left: 4px solid #b99654; border-radius: 5px;">
      <p style="margin: 0; font-weight: bold; color: #333;">📝 Notas Adicionales:</p>
      <p style="margin: 10px 0 0 0; color: #666;">{{notas}}</p>
    </div>
    {{/notas}}

    <div style="text-align: center; margin-top: 30px;">
      <!-- En este correo (lo recibe el administrador), el botón abre el chat hacia la clienta con el mensaje automático prellenado -->
      <a href="{{whatsapp_prefill}}" style="display: inline-block; background: #25D366; color: white; padding: 15px 18px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-right:8px;">💬 Contactar por WhatsApp (cliente)</a>
      <!-- Botón para agregar la cita al calendario (descarga .ics o abre Google Calendar) -->
      <a href="{{invite_url}}" style="display: inline-block; background: #b99654; color: black; padding: 15px 18px; text-decoration: none; border-radius: 25px; font-weight: bold;">📅 Agregar al calendario</a>
    </div>
        <div style="text-align: center; margin-top: 30px;">
      <a href="https://queenstudioym.com/admin.html" style="display: inline-block; background: #b99654; color: black; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Ir a la pagina</a>
    </div>
  </div>

  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.9rem;">
    <p>Queen Studio - Sistema de Citas Automático</p>
    <p>📍 Saltillo, Coahuila | 📞 844-600-2354</p>
  </div>
</div>
```

## Notas para el template
 - Mantén exactamente las llaves `{{nombre}}`, `{{telefono}}`, `{{servicio}}`, `{{fecha}}`, `{{hora}}`, `{{hora_fin}}`, `{{duracion}}`, `{{notas}}`, `{{numero_servicios}}`, `{{resumen_servicios}}`.
 - `{{servicio}}` incluye lo elegido dentro del servicio (ej. "Otro: Tinte de cabello, Corte de cabello").
 - `{{hora}}` y `{{hora_fin}}` llegan en formato 24 horas (ej. 14:00 y 17:30).
 - `{{resumen_servicios}}` lista todas las citas del pedido, una por línea; por eso lleva `white-space: pre-line`.
 - `{{invite_url}}` solo se usa como enlace del botón "Agregar al calendario", no se muestra como texto.
 - Nota: el mensaje automático personalizado ahora se envía desde el panel administrativo vía el botón de WhatsApp (no se incluye automáticamente en el correo). Si necesitas incluirlo en el email, dímelo y lo re-agrego explícitamente.

## Pasos rápidos (si no los tienes ya)
- Pegar la plantilla en EmailJS → *Email Templates* → *Create New Template* → pegar HTML.
- Guardar y copiar `Template ID`.
- Configurar `js/script.js` con `emailjs.init(PUBLIC_KEY)` y reemplazar service/template IDs.
 - Asegúrate que `emailParams` incluya `to_email` si lo usas.

---

Si quieres, puedo también actualizar el ejemplo de `emailParams` en `js/script.js` para incluir campos adicionales y mostrar exactamente cómo se envía. ¿Deseas que prepare el comando `git commit` con mensajes y la lista de archivos modificados?