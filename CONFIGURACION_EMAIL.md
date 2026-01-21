# 📧 Configuración de EmailJS para Queen Studio

## ✅ Sistema Implementado

Ya agregué el código necesario para enviar correos automáticamente cuando un cliente agenda una cita. Ahora necesitas configurar tu cuenta de EmailJS.

---

## 🔧 Pasos para Configurar (10 minutos)

### 1️⃣ Crear Cuenta en EmailJS

1. Ve a: **https://www.emailjs.com/**
2. Haz clic en **"Sign Up"** (Registrarse)
3. Usa el correo: **medinaabi03@gmail.com**
4. Verifica tu email (revisa bandeja de entrada/spam)

---

### 2️⃣ Conectar tu Gmail

1. Una vez dentro, ve a **"Email Services"** en el menú lateral
2. Haz clic en **"Add New Service"**
3. Selecciona **Gmail**
4. Haz clic en **"Connect Account"**
5. Autoriza con tu cuenta **medinaabi03@gmail.com**
6. Copia el **Service ID** que aparece (ejemplo: `service_abc123`)

---

### 3️⃣ Crear la Plantilla de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura así:

**Nombre del Template:** Queen Studio - Nueva Cita

**To Email:** 
```
{{to_email}}
```

**Reply To (opcional):** 
```
medinaabi03@gmail.com
```
*O déjalo vacío. Este campo indica a dónde irán las respuestas si alguien responde al correo.*

**Subject (Asunto):**
```
🎀 Nueva Cita Agendada - {{nombre}}
```

**Content (Contenido HTML):**

**⚠️ IMPORTANTE: Copia TODO el código de abajo (desde `<div` hasta `</div>` final) y pégalo en EmailJS**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f4ec; border: 3px solid #b99654; border-radius: 15px;"><div style="text-align: center; background: linear-gradient(135deg, rgba(171, 151, 104, 0.85), rgba(251, 235, 197, 0.8)); padding: 20px; border-radius: 10px; margin-bottom: 20px;"><h1 style="color: #333; font-family: 'Great Vibes', cursive; font-size: 2.5rem; margin: 0;">Queen Studio</h1><p style="color: #666; margin: 5px 0;">Nueva Cita Agendada</p></div><div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"><h2 style="color: #b99654; border-bottom: 2px solid #b99654; padding-bottom: 10px;">📋 Información del Cliente</h2><table style="width: 100%; margin-top: 20px;"><tr><td style="padding: 10px; font-weight: bold; color: #333; width: 40%;">👤 Nombre:</td><td style="padding: 10px; color: #666;">{{nombre}}</td></tr><tr style="background-color: #f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #333;">📱 Teléfono:</td><td style="padding: 10px; color: #666;">{{telefono}}</td></tr><tr><td style="padding: 10px; font-weight: bold; color: #333;">💅 Servicio:</td><td style="padding: 10px; color: #666;">{{servicio}}</td></tr><tr style="background-color: #f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #333;">📅 Fecha:</td><td style="padding: 10px; color: #666;">{{fecha}}</td></tr><tr><td style="padding: 10px; font-weight: bold; color: #333;">🕐 Hora:</td><td style="padding: 10px; color: #666;">{{hora}}</td></tr><tr style="background-color: #f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #333;">💰 Anticipo:</td><td style="padding: 10px; color: #666;">{{anticipo}}</td></tr></table><div style="margin-top: 20px; padding: 15px; background-color: #fff9e6; border-left: 4px solid #b99654; border-radius: 5px;"><p style="margin: 0; font-weight: bold; color: #333;">📝 Notas:</p><p style="margin: 10px 0 0 0; color: #666;">{{notas}}</p></div><div style="text-align: center; margin-top: 30px;"><a href="https://wa.me/52{{telefono}}?text=Hola%20{{nombre}},%20te%20contacto%20de%20Queen%20Studio%20sobre%20tu%20cita%20de%20{{servicio}}" style="display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">💬 Contactar por WhatsApp</a></div></div><div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.9rem;"><p>Queen Studio - Sistema de Citas Automático</p><p>📍 Saltillo, Coahuila | 📞 844-600-2354</p></div></div>
```

4. Haz clic en **"Save"**
5. Copia el **Template ID** (ejemplo: `template_xyz789`)

---

### 4️⃣ Obtener tu Public Key

1. Ve a **"Account"** en el menú
2. Busca la sección **"General"**
3. Copia tu **Public Key** (ejemplo: `AbCdEfGhIjKlMnOp`)

---

### 5️⃣ Configurar el Código

Abre el archivo: **`js/script.js`**

Busca estas líneas y reemplaza:

```javascript
emailjs.init("TU_PUBLIC_KEY_AQUI"); // ← Pega tu Public Key

// Más abajo en el código:
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', emailParams)
//           ↑                 ↑
//    Service ID         Template ID
```

**También reemplaza el correo destino:**
```javascript
to_email: 'CORREO_QUEEN_STUDIO@gmail.com' // ← Correo donde llegarán las notificaciones
```

---

## 🎯 Ejemplo de Configuración Completa

```javascript
// Inicializar EmailJS
emailjs.init("AbCdEfGhIjKlMnOp"); // Tu Public Key

// ...código...

// Parámetros del email
const emailParams = {
  nombre: formData.nombre,
  telefono: formData.telefono,
  servicio: formData.servicio,
  fecha: formData.fecha,
  hora: formData.hora,
  anticipo: formData.anticipo,
  notas: formData.notas,
  to_email: 'queenstudio@gmail.com' // Email de Queen Studio
};

// Enviar email
emailjs.send('service_abc123', 'template_xyz789', emailParams)
//            ↑ Service ID      ↑ Template ID
```

---

## ✨ ¿Cómo Funciona?

1. Un cliente llena el formulario en **agendar.html**
2. Al hacer clic en "Agendar Cita":
   - Se guarda la cita en localStorage (para el admin)
   - Se envía automáticamente un correo desde **medinaabi03@gmail.com**
   - El correo llega al correo de Queen Studio con toda la información
   - El correo tiene un diseño elegante con los colores de Queen Studio
   - Incluye un botón para contactar al cliente por WhatsApp

---

## 📊 Límites Gratuitos

- **200 emails/mes** gratis
- Si necesitas más, puedes upgradear o crear otra cuenta

---

## 🔍 Solución de Problemas

**Si los correos no llegan:**

1. Verifica que pegaste correctamente los 3 valores (Public Key, Service ID, Template ID)
2. Revisa la consola del navegador (F12) para ver errores
3. Asegúrate que el correo destino esté correcto
4. Verifica que Gmail esté conectado en EmailJS
5. Revisa la carpeta de Spam

**Si marca error en la consola:**
- Verifica que los nombres de las variables en el template coincidan exactamente
- Asegúrate que EmailJS esté inicializado antes de enviar

---

## 📱 Contacto

Si tienes problemas, revisa la documentación de EmailJS:
https://www.emailjs.com/docs/

O puedes usar el sistema de WhatsApp que ya está integrado como respaldo.

---

✅ **¡Listo! Una vez configurado, cada cita enviará un correo automático con toda la información del cliente.**
