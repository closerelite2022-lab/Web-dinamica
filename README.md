# Ático Castellana — landing inmobiliaria inmersiva

Proyecto completo y editable en **Next.js + React + TypeScript + Tailwind CSS**, preparado para desplegar en Vercel.

Es una **demostración visual**, inspirada en la estructura y el lenguaje visual de una landing inmobiliaria cinematográfica. Las seis fotografías de los ambientes fueron generadas con IA y los dos planos son ilustrativos: **no representan una vivienda real**.

## Puesta en marcha

Requisitos: Node.js 20.9 o superior y npm.

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

Para comprobar la versión de producción:

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Cómo personalizar la propiedad

1. Editá `src/data/property.ts`: título, ubicación, textos, estadísticas, galería, habitaciones y marca.
2. Reemplazá los archivos WebP de `public/images/` por fotos propias o autorizadas. Conservá las rutas o actualizalas en el archivo de datos.
3. Actualizá los SVG ilustrativos de `src/components/FloorPlan.tsx` o reemplazalos con planos reales.
4. Configurá un número de WhatsApp en `.env.local`, usando `.env.example` como guía.
5. Cambiá `NEXT_PUBLIC_SITE_URL` por el dominio final.
6. Cuando sea una propiedad real y los datos estén confirmados, cambiá `robots.ts` y el campo `robots` de `layout.tsx` para permitir indexación.

**Contacto de demostración:** sin número configurado, el CTA abre WhatsApp con el texto prellenado para compartirlo con un contacto elegido por el visitante; no envía una solicitud a una inmobiliaria. Configurá el número real antes de publicar la web comercialmente.

## Interacciones incluidas

- Tres secciones con lienzo Canvas 2D, imagen sticky a pantalla completa y avance ligado al scroll.
- Animación cinematográfica suave: encuadres, zoom lento y fundidos entre ambientes.
- Textos contextuales que aparecen y desaparecen según el progreso.
- Banda de características de la propiedad.
- Dos tarjetas de planos ilustrativos.
- Carrusel de siete fotografías con flechas, puntos, teclado y swipe en móvil.
- Enlaces para consultas por WhatsApp.
- Diseño responsive y soporte de `prefers-reduced-motion`.
- Metadatos Open Graph, tipografías locales y recursos optimizados.

### Sustituir fotografías por recorridos reales

La referencia original usa cientos de fotogramas por sección para simular un recorrido continuo. Esta versión, al usar imágenes de ejemplo, implementa el **mismo patrón de interacción scroll + Canvas**, pero anima fotos estáticas con desplazamientos y fundidos. No simula tener un video real ni contiene una secuencia de cámara de cientos de fotogramas.

Cuando tengas tus propios videos de recorrido, podés generar fotogramas WebP/AVIF con FFmpeg o Sharp y adaptar el renderizador en `src/components/ScrollSequence.tsx` para pintar el fotograma correspondiente al porcentaje de scroll. Mantené la precarga progresiva y el control de memoria si el número de imágenes aumenta.

## Estructura

```text
src/
  app/                 Página, estilos y metadatos
  components/          Canvas, planos y carrusel
  data/property.ts     Todo el contenido editable
public/
  images/              Fotografías de ejemplo WebP
  fonts/               Fraunces e Inter, alojadas localmente
```

## Deploy en Vercel

1. Subí este directorio a un repositorio de GitHub.
2. En Vercel elegí **Add New → Project → Import Git Repository**.
3. Seleccioná el repositorio. Debería detectar automáticamente **Next.js**.
4. Configurá `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_SITE_URL` en **Project Settings → Environment Variables** (si corresponde).
5. Presioná **Deploy**.

No requiere base de datos, credenciales de servidor ni `vercel.json`.

## Notas de propiedad intelectual

El código es una implementación nueva. Las fotografías incluidas son activos de ejemplo generados con IA. No se incluyen fotografías, videos, planos reales ni marca comercial de la landing usada como inspiración. Las fuentes Fraunces e Inter están disponibles bajo licencias abiertas.
