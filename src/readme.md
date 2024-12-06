<img src="https://i.imgur.com/ncchCz3.png" 
        alt="Picture" 
        width="400" 
        height="400" 
        style="display: block; margin: 0 auto" />

## Descripción
**OtakuDB** es una API para gestionar información sobre animes. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de animes, que incluye detalles como el título, sinopsis, género, y más. El dataset inicial se obtuvo de MyAnimeList.

## Consideraciones
- Los valores enviados en el body deben ser en formato **JSON**.

- La creación de un nuevo anime devuelve un `id` generado automáticamente.

## Esquema
### Anime Schema

| Dato       | Tipo            | Descripción                                                   |
|------------|-----------------|---------------------------------------------------------------|
| **id**     | integer         | ID único del anime asignado en la BD (autoincremental).       |
| **uid**    | integer         | ID único del anime generado en la pagina de MyAnimeList.                                           |
| **title**  | string          | Título del anime.                                             |
| **synopsis**| string         | Descripción breve o sinopsis del anime.                       |
| **genre**  | array of strings| Lista de géneros del anime.                                   |
| **aired**  | string          | Año en el que se emitió el anime.                              |
| **episodes**| integer        | Número de episodios del anime.                                |
| **members**| integer         | Número de miembros en MyAnimeList.              |
| **popularity**| integer      | Posición de popularidad del anime.                            |
| **ranked** | integer         | Posición del anime en el ranking.                             |
| **score**  | number (float)  | Puntuación del anime (entre 0 y 10).                          |
| **img_url**| string (uri)    | URL de la imagen del anime.                                   |
| **link**   | string (uri)    | Enlace al sitio del anime.                                    |

## Sobre el Autor.

- Esta API fue elaborada por **Oscar Castañeda** para la materia de *API REST*.

- Su anime favorito es **Frieren: Beyond Journey's End**

<img src="https://i.imgur.com/JRJTx34.jpeg" 
        alt="Picture" 
        width="222" 
        height="300" 
        style="display: block; margin: 0 auto" />