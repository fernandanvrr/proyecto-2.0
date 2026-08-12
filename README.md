# OfertaRadar CL

Prototipo estático de buscador y comparador de ofertas para Chile.

## Qué hace

- Busca por nombre, marca, categoría o tienda.
- Filtra por:
  - categoría,
  - precio máximo,
  - descuento mínimo,
  - tienda,
  - favoritos.
- Ordena por:
  - mayor descuento,
  - menor/mayor precio,
  - mayor ahorro,
  - nombre.
- Guarda favoritos con `localStorage`.
- Compara hasta 3 ofertas.
- Genera accesos para repetir la búsqueda en tiendas externas.
- Permite exportar e importar el catálogo en JSON.
- Funciona en GitHub Pages: no requiere Node.js, API ni Railway.

## Importante

Los productos incluidos en `data.js` son **datos demostrativos** y no corresponden a precios reales.
La aplicación lo indica de forma visible para no confundir al usuario.

Para convertirla en un agregador de precios reales necesitamos una fuente de datos autorizada:
- API oficial de una tienda,
- feed de afiliados,
- base de datos propia alimentada por fuentes autorizadas,
- o un backend que consuma proveedores permitidos.

No se recomienda basar el proyecto en scraping de tiendas, porque puede romperse con cambios de HTML, bloquearse por políticas/CORS o incumplir condiciones de uso.

## Publicar en GitHub Pages

1. Crea un repositorio.
2. Sube:
   - `index.html`
   - `style.css`
   - `data.js`
   - `app.js`
   - `README.md`
3. Ve a `Settings → Pages`.
4. Selecciona `Deploy from a branch`.
5. Rama `main`, carpeta `/ (root)`.
6. Guarda.

## Formato para importar ofertas

```json
[
  {
    "id": 1,
    "name": "Notebook ejemplo",
    "brand": "Marca",
    "category": "Tecnología",
    "store": "Tienda",
    "price": 499990,
    "originalPrice": 699990,
    "emoji": "💻",
    "colors": ["#1d4ed8", "#111827"]
  }
]
```

## Arquitectura preparada para una versión real

La interfaz está separada de los datos. Para una versión con precios reales, `offers` puede reemplazarse por resultados obtenidos desde:

```text
Frontend (GitHub Pages)
        ↓
Backend / API propia
        ↓
Fuentes autorizadas de precios
        ↓
Resultados normalizados
```

Así no es necesario rehacer los filtros, favoritos ni comparador.
