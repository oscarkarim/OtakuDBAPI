// Importa el pool para la conexión a la base de datos
import pool from '../db.js';


// Obtener un anime por su ID,titulo,genero o todos los animes si no hay id
export const getAnimes = async (req, res) => {
  const { id, title, genre } = req.query; // Extraer los parámetros de consulta

  try {
    // Buscar por ID
    if (id) {
      const [rows] = await pool.query('SELECT * FROM Animes WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message:  `Anime id:${id} no encontrado.` });
      }
      return res.json(rows[0]);
    }

    // Buscar por titulo (sin importar el orden de las palabras)
    if (title) {
      const words = title.split(' '); // Dividir el título en palabras
      const likeClauses = words.map(() => 'title LIKE ?').join(' AND '); // Crear cláusulas dinámicas para cada palabra
      const values = words.map((word) => `%${word}%`); // Formatear las palabras para búsqueda parcial

      const [rows] = await pool.query(`SELECT * FROM Animes WHERE ${likeClauses}`, values);
      if (rows.length === 0) {
        return res.status(404).json({ message: `No se encontraron animes con las palabras: ${title} .` });
      }
      return res.json(rows);
    }

    // Buscar por genero
    if (genre) {
      const [rows] = await pool.query('SELECT * FROM Animes WHERE genre LIKE ?', [`%${genre}%`]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron animes con ese género.' });
      }
      return res.json(rows);
    }

    // Si no se proporcionan parametros de consulta, devolver todos los animes
    const [rows] = await pool.query('SELECT * FROM Animes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};



// Crear un nuevo anime
export const createAnime = async (req, res) => {
  const {
    uid,
    title,
    synopsis,
    genre,
    aired,
    episodes,
    members,
    popularity,
    ranked,
    score,
    img_url,
    link,
  } = req.body;

  const query = `
    INSERT INTO Animes 
    (uid, title, synopsis, genre, aired, episodes, members, popularity, ranked, score, img_url, link) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    // Ejecutar la consulta
    const [result] = await pool.query(query, [
      uid,
      title,
      synopsis,
      JSON.stringify(genre), // Convertir el array en una cadena JSON
      aired,
      episodes,
      members,
      popularity,
      ranked,
      score,
      img_url,
      link,
    ]);

    // Accesar al ID insertado
    const insertedId = result.insertId;

    // Regresar la respuesta
    res.status(201).json({
      id: insertedId,
      uid,
      title,
      synopsis,
      genre,
      aired,
      episodes,
      members,
      popularity,
      ranked,
      score,
      img_url,
      link,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el anime.', details: error.message });
  }
};


// Actualizar anime
export const updateAnime = async (req, res) => {
  const { id } = req.query; // Extraer el ID del parámetro de consulta

  if (!id) {
    return res.status(400).json({ message: 'El parámetro "id" es requerido.' });
  }

  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'Al menos un campo debe ser proporcionado para actualizar.' });
  }

  // Block updates to restricted fields
  const restrictedFields = ['uid', 'id'];
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => !restrictedFields.includes(key))
  );

  if (Object.keys(filteredUpdates).length === 0) {
    return res.status(400).json({ message: 'No se pueden actualizar los campos uid o id.' });
  }

  // Dynamically build the SET clause
  const setClause = Object.keys(filteredUpdates)
    .map((field) => `${field} = ?`)
    .join(', ');

  const values = [...Object.values(filteredUpdates), id];

  const query = `UPDATE Animes SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Anime no encontrado.' });
    }

    res.json({ message: `Campo(s) actualizado(s) correctamente en el anime id:${id}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el anime.', details: error.message });
  }
};

  

// borrar anime
export const deleteAnime = async (req, res) => {
  await pool.query('DELETE FROM Animes WHERE id = ?', [req.query.id]);
  res.json({ message: `Anime id:${req.query.id} borrado.` });
};
