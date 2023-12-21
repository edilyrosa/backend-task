// import db from '../db.js'

// exports.getAllProject = async (req, res) => {
//   const queryPro = `
//       SELECT
//         p.id,
//         p.name,
//         p.client_id,
//         c.name AS client_name,
//         p.description,
//         p.active
//       FROM
//         public.project p
//       JOIN
//         public.client c ON p.client_id = c.id;
//     `;

//   try {
//     const result = await db.query(queryPro);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving projects:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving projects.' });
//   }
// };


// exports.getProjectById = async (req, res) => {
//   const projectId = req.params.id;
  
//   try {
//     const query = `
//     SELECT
//         p.id,
//         p.name,
//         p.client_id,
//         c.name AS client_name,
//         p.description,
//         p.active
//       FROM
//         public.project p
//       JOIN
//         public.client c ON p.client_id = c.id 
//       WHERE p.id = $1;
//     `;
    
//     const result = await db.query(query, [projectId]);
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error retrieving project by ID:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving by ID.' });
//   }
// };

// exports.createProject = async (req, res) => {
//   const { name, client_id, description, active } = req.body;
//   try {
//     const insertQuery = `
//       INSERT INTO project (name, client_id, description, active)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *`;
      
//     const insertValues = [name, client_id, description, active];

//     const insertResult = await db.query(insertQuery, insertValues);
//     const projectId = insertResult.rows[0].id; // Obtener el ID del proyecto insertado

//     const selectQuery = `
//       SELECT
//         p.id,
//         p.name,
//         p.client_id,
//         c.name AS client_name,
//         p.description,
//         p.active
//       FROM
//         public.project p
//       JOIN
//         public.client c ON p.client_id = c.id
//       WHERE p.id = $1;
//     `;

//     const selectValues = [projectId];

//     const selectResult = await db.query(selectQuery, selectValues);

//     res.status(201).json(selectResult.rows[0]); // Devolver los datos completos del proyecto con detalles de cliente
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error en la inserción');
//   }
// };

// exports.updateProject = async (req, res) => {
//   const projectId = req.params.id;
//   const { name, client_id, description, active } = req.body;

//   try {
//     const updateQuery = `
//       UPDATE project
//       SET name = $1, client_id = $2, description = $3, active = $4
//       WHERE id = $5
//       RETURNING *`;
      
//     const updateValues = [name, client_id, description, active, projectId];

//     const updateResult = await db.query(updateQuery, updateValues);

//     // Realizar la consulta adicional para obtener los datos actualizados y detalles de cliente
//     const selectQuery = `
//       SELECT
//         p.id,
//         p.name,
//         p.client_id,
//         c.name AS client_name,
//         p.description,
//         p.active
//       FROM
//         public.project p
//       JOIN
//         public.client c ON p.client_id = c.id
//       WHERE p.id = $1;
//     `;

//     const selectValues = [projectId];

//     const selectResult = await db.query(selectQuery, selectValues);

//     res.json(selectResult.rows[0]); // Devolver los datos actualizados con detalles de cliente
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error updating');
//   }
// };


// exports.deleteProject = async (req, res) => {
//   const projectId = req.params.id;

//   try {
//     const query = 'DELETE FROM project WHERE id = $1';
//     const result = await db.query(query, [projectId]);
//     res.json({ message: 'project was deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error deleting');
//   }
// };


// exports.getProjectsAndTotalHoursByClient = async (req, res) => {
//   const { clientId } = req.params;

//   try {
//     const query = `
//       SELECT
//         c.id AS client_id,
//         c.name AS client_name,
//         p.id AS project_id,
//         p.name AS project_name,
//         SUM(te.duration) AS duration
//       FROM
//         public.client c
//       JOIN
//         public.project p ON c.id = p.client_id
//       LEFT JOIN
//         public.taskentry te ON p.id = te.project_id
//       WHERE
//         c.id = $1
//       GROUP BY
//         c.id,
//         c.name,
//         p.id,
//         p.name
//       HAVING
//         SUM(te.duration) IS NOT NULL
//       ORDER BY
//         c.id,
//         p.id;
//     `;

//     const result = await db.query(query, [clientId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving project and total hours information:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving project and total hours information.' });
//   }
// };


// projectController.js
import db from '../db.js';

export const getAllProjects = async (req, res) => {
  const queryPro = `
    SELECT
      p.id,
      p.name,
      p.client_id,
      c.name AS client_name,
      p.description,
      p.active
    FROM
      public.project p
    JOIN
      public.client c ON p.client_id = c.id;
  `;

  try {
    const result = await db.query(queryPro);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ error: 'An error occurred while retrieving projects.' });
  }
};

export const getProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const query = `
      SELECT
        p.id,
        p.name,
        p.client_id,
        c.name AS client_name,
        p.description,
        p.active
      FROM
        public.project p
      JOIN
        public.client c ON p.client_id = c.id 
      WHERE p.id = $1;
    `;

    const result = await db.query(query, [projectId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving project by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving by ID.' });
  }
};

export const createProject = async (req, res) => {
  const { name, client_id, description, active } = req.body;
  try {
    const insertQuery = `
      INSERT INTO project (name, client_id, description, active)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const insertValues = [name, client_id, description, active];

    const insertResult = await db.query(insertQuery, insertValues);
    const projectId = insertResult.rows[0].id;

    const selectQuery = `
      SELECT
        p.id,
        p.name,
        p.client_id,
        c.name AS client_name,
        p.description,
        p.active
      FROM
        public.project p
      JOIN
        public.client c ON p.client_id = c.id
      WHERE p.id = $1;
    `;

    const selectValues = [projectId];

    const selectResult = await db.query(selectQuery, selectValues);

    res.status(201).json(selectResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la inserción');
  }
};

export const updateProject = async (req, res) => {
  const projectId = req.params.id;
  const { name, client_id, description, active } = req.body;

  try {
    const updateQuery = `
      UPDATE project
      SET name = $1, client_id = $2, description = $3, active = $4
      WHERE id = $5
      RETURNING *`;

    const updateValues = [name, client_id, description, active, projectId];

    const updateResult = await db.query(updateQuery, updateValues);

    const selectQuery = `
      SELECT
        p.id,
        p.name,
        p.client_id,
        c.name AS client_name,
        p.description,
        p.active
      FROM
        public.project p
      JOIN
        public.client c ON p.client_id = c.id
      WHERE p.id = $1;
    `;

    const selectValues = [projectId];

    const selectResult = await db.query(selectQuery, selectValues);

    res.json(selectResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating');
  }
};

export const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const query = 'DELETE FROM project WHERE id = $1';
    const result = await db.query(query, [projectId]);
    res.json({ message: 'project was deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting');
  }
};

export const getProjectsAndTotalHoursByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const query = `
      SELECT
        c.id AS client_id,
        c.name AS client_name,
        p.id AS project_id,
        p.name AS project_name,
        SUM(te.duration) AS duration
      FROM
        public.client c
      JOIN
        public.project p ON c.id = p.client_id
      LEFT JOIN
        public.taskentry te ON p.id = te.project_id
      WHERE
        c.id = $1
      GROUP BY
        c.id,
        c.name,
        p.id,
        p.name
      HAVING
        SUM(te.duration) IS NOT NULL
      ORDER BY
        c.id,
        p.id;
    `;

    const result = await db.query(query, [clientId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving project and total hours information:', error);
    res.status(500).json({ error: 'An error occurred while retrieving project and total hours information.' });
  }
};
