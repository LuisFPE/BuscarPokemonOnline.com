# BuscarPokemonOnline.com

## Información General

Esta página web permite al usuario buscar el pokemon que desee, una vez obtenido se muestra información relevante de dicho pokemon. Los datos se obtienen de una API pública llamada PokéApi la cual actualmente se encuentra en la v2.

## Funcionalidades Principales

- **Mostrar Información General del Pokemon:** Una vez obtenida la respuesta de la API la página selecciona información general del pokemon como su nombre, su descripción, su o sus tipos, su número y si puede traer un objeto equipado, junto con una imagen del mismo.

- **Mostrar las Estadísticas del Pokemon:** Una vez obtenida la respuesta de la API la página selecciona las estadísticas del pokemon siendo estas: Puntos de Salud, Ataque, Defensa, Ataque Especial, Defensa Especial y Velocidad para después crear una gráfica que las muestre.

- **Mostrar los Movimientos que aprende el Pokemon:** Una vez obtenida la respuesta de la API la página selecciona información de los movimientos que aprende el pokemon y la muestra, entre esta información está su nombre, categoría, potencia, precisión y tipo .

- **Botón de Favoritos:** En la sección de información general hay un botón que permite marcar el pokemon como uno de tus favoritos.

## Uso

1. Abre el archivo `Index.html` en un navegador web compatible.
2. Haz click en la barra de búsqueda.
3. Escribe el nombre o número del pokemon que deseas buscar.
4. Dale click al botón de buscar para realizar la búsqueda.
5. Para marcar como favoritos, haz clic en el botón que tiene un símbolo de +.

## Notas Adicionales

- El código utiliza JavaScript para interactuar con el DOM y realizar llamadas a la API de PokéApi para obtener los datos.
- Los pokemon marcados como favoritos se almacenan localmente en el navegador del usuario utilizando el localStorage API.

## Requisitos

- Conexión a Internet para acceder a la API de PokéApi.
- Un navegador web moderno compatible con JavaScript.

## Autor

Este proyecto fue desarrollado por Luis Padua.