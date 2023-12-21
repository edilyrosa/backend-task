// import db from '../db.js'
// exports.getAllTaskentry = async (req, res) => {
//   const queryTask = `
//     SELECT
//       te.id,
//       te.contractor_id,
//       c.fullname AS contractor_name,
//       te.date,
//       te.duration,
//       te.billable,
//       te.project_id,
//       p.name AS project_name,
//       cl.id AS client_id,
//       cl.name AS client_name,
//       te.product_id,
//       pr.description AS product_description,
//       te.activity_id,
//       a.description AS activity_description,
//       te.category_id,
//       cat.description AS category_description,
//       te.description
//     FROM
//       taskentry te
//     JOIN
//       contractor c ON te.contractor_id = c.id
//     JOIN
//       project p ON te.project_id = p.id
//     JOIN
//       client cl ON p.client_id = cl.id
//     JOIN
//       product pr ON te.product_id = pr.id
//     JOIN
//       activity a ON te.activity_id = a.id
//     JOIN
//       category cat ON te.category_id = cat.id;
//   `;

//   try {
//     const result = await db.query(queryTask);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving taskentries:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving taskentries.' });
//   }
// };

// exports.getTaskentryById = async (req, res) => {
//   const taskentryId = req.params.id;

//   try {
//     const query = `
//     SELECT
//       te.id,
//       te.contractor_id,
//       c.fullname AS contractor_name,
//       te.date,
//       te.duration,
//       te.billable,
//       te.project_id,
//       p.name AS project_name,
//       cl.id AS client_id,
//       cl.name AS client_name,
//       te.product_id,
//       pr.description AS product_description,
//       te.activity_id,
//       a.description AS activity_description,
//       te.category_id,
//       cat.description AS category_description,
//       te.description
//     FROM
//       taskentry te
//     JOIN
//       contractor c ON te.contractor_id = c.id
//     JOIN
//       project p ON te.project_id = p.id
//     JOIN
//       client cl ON p.client_id = cl.id
//     JOIN
//       product pr ON te.product_id = pr.id
//     JOIN
//       activity a ON te.activity_id = a.id
//     JOIN
//       category cat ON te.category_id = cat.id
//     WHERE te.id = $1;
//   `;
//     const result = await db.query(query, [taskentryId]);
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error retrieving taskentry by ID:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving taskentry by ID.' });
//   }
// };

// exports.createTaskentry = async (req, res) => {
//   const { contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description } = req.body;

//   try {
//     const insertQuery = `
//       INSERT INTO taskentry (contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//       RETURNING *`;
      
//     const insertValues = [contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description];

//     const insertResult = await db.query(insertQuery, insertValues);
    
//     // Obtener el ID de la entrada de tarea insertada
//     const taskentryId = insertResult.rows[0].id;

//     const selectQuery = `
//       SELECT
//         te.id,
//         c.fullname AS contractor_name,
//         te.date,
//         te.duration,
//         te.billable,
//         p.name AS project_name,
//         cl.id AS client_id,
//         cl.name AS client_name,
//         pr.description AS product_description,
//         a.description AS activity_description,
//         cat.description AS category_description,
//         te.description
//       FROM
//         taskentry te
//       JOIN
//         contractor c ON te.contractor_id = c.id
//       JOIN
//         project p ON te.project_id = p.id
//       JOIN
//         client cl ON p.client_id = cl.id
//       JOIN
//         product pr ON te.product_id = pr.id
//       JOIN
//         activity a ON te.activity_id = a.id
//       JOIN
//         category cat ON te.category_id = cat.id
//       WHERE te.id = $1;
//     `;

//     const selectValues = [taskentryId];

//     const selectResult = await db.query(selectQuery, selectValues);

//     res.status(201).json(selectResult.rows[0]); // Devolver los detalles completos de la entrada de tarea creada
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error inserting taskentry');
//   }
// };


// exports.updateTaskentry = async (req, res) => {
//   const taskentryId = req.params.id;
//   const { contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description } = req.body;

//   try {
//     const updateQuery = `
//       UPDATE taskentry
//       SET contractor_id = $1, date = $2, duration = $3, billable = $4, project_id = $5, product_id = $6, activity_id = $7, category_id = $8, description = $9
//       WHERE id = $10
//       RETURNING *`;

//     const updateValues = [contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description, taskentryId];

//     const updateResult = await db.query(updateQuery, updateValues);

//     const selectQuery = `
//       SELECT
//         te.id,
//         te.contractor_id,
//         c.fullname AS contractor_name,
//         te.date,
//         te.duration,
//         te.billable,
//         te.project_id,
//         p.name AS project_name,
//         cl.id AS client_id,
//         cl.name AS client_name,
//         te.product_id,
//         pr.description AS product_description,
//         te.activity_id,
//         a.description AS activity_description,
//         te.category_id,
//         cat.description AS category_description,
//         te.description
//       FROM
//         taskentry te
//       JOIN
//         contractor c ON te.contractor_id = c.id
//       JOIN
//         project p ON te.project_id = p.id
//       JOIN
//         client cl ON p.client_id = cl.id
//       JOIN
//         product pr ON te.product_id = pr.id
//       JOIN
//         activity a ON te.activity_id = a.id
//       JOIN
//         category cat ON te.category_id = cat.id
//       WHERE te.id = $1;
//     `;

//     const selectValues = [taskentryId];

//     const selectResult = await db.query(selectQuery, selectValues);

//     res.json(selectResult.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error updating taskentry');
//   }
// };

// exports.deleteTaskentry = async (req, res) => {
//   const taskentryId = req.params.id;

//   try {
//     const query = 'DELETE FROM taskentry WHERE id = $1';
//     const result = await db.query(query, [taskentryId]);
//     res.json({ message: 'Taskentry was deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error deleting taskentry');
//   }
// };

// exports.getClientsWithTaskentries = async (req, res) => {
//   const query = `
//   SELECT DISTINCT
//   c.id AS client_id,
//   c.name AS client_name
// FROM
//   client c
// INNER JOIN
//   project p ON c.id = p.client_id
// INNER JOIN
//   taskentry te ON p.id = te.project_id;
//   `;

//   try {
//     const result = await db.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving clients with taskentries:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving clients with taskentries.' });
//   }
// };


// taskentryController.js
import db from '../db.js';

export const getAllTaskentries = async (req, res) => {
  const queryTask = `
    SELECT
      te.id,
      te.contractor_id,
      c.fullname AS contractor_name,
      te.date,
      te.duration,
      te.billable,
      te.project_id,
      p.name AS project_name,
      cl.id AS client_id,
      cl.name AS client_name,
      te.product_id,
      pr.description AS product_description,
      te.activity_id,
      a.description AS activity_description,
      te.category_id,
      cat.description AS category_description,
      te.description
    FROM
      taskentry te
    JOIN
      contractor c ON te.contractor_id = c.id
    JOIN
      project p ON te.project_id = p.id
    JOIN
      client cl ON p.client_id = cl.id
    JOIN
      product pr ON te.product_id = pr.id
    JOIN
      activity a ON te.activity_id = a.id
    JOIN
      category cat ON te.category_id = cat.id;
  `;

  try {
    const result = await db.query(queryTask);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving taskentries:', error);
    res.status(500).json({ error: 'An error occurred while retrieving taskentries.' });
  }
};

export const getTaskentryById = async (req, res) => {
  const taskentryId = req.params.id;

  try {
    const query = `
      SELECT
        te.id,
        te.contractor_id,
        c.fullname AS contractor_name,
        te.date,
        te.duration,
        te.billable,
        te.project_id,
        p.name AS project_name,
        cl.id AS client_id,
        cl.name AS client_name,
        te.product_id,
        pr.description AS product_description,
        te.activity_id,
        a.description AS activity_description,
        te.category_id,
        cat.description AS category_description,
        te.description
      FROM
        taskentry te
      JOIN
        contractor c ON te.contractor_id = c.id
      JOIN
        project p ON te.project_id = p.id
      JOIN
        client cl ON p.client_id = cl.id
      JOIN
        product pr ON te.product_id = pr.id
      JOIN
        activity a ON te.activity_id = a.id
      JOIN
        category cat ON te.category_id = cat.id
      WHERE te.id = $1;
    `;
    const result = await db.query(query, [taskentryId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving taskentry by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving taskentry by ID.' });
  }
};

export const createTaskentry = async (req, res) => {
    const { contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description } = req.body;
  
    try {
      const insertQuery = `
        INSERT INTO taskentry (contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`;
        
      const insertValues = [contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description];
  
      const insertResult = await db.query(insertQuery, insertValues);
      
      // Obtener el ID de la entrada de tarea insertada
      const taskentryId = insertResult.rows[0].id;
  
      const selectQuery = `
        SELECT
          te.id,
          c.fullname AS contractor_name,
          te.date,
          te.duration,
          te.billable,
          p.name AS project_name,
          cl.id AS client_id,
          cl.name AS client_name,
          pr.description AS product_description,
          a.description AS activity_description,
          cat.description AS category_description,
          te.description
        FROM
          taskentry te
        JOIN
          contractor c ON te.contractor_id = c.id
        JOIN
          project p ON te.project_id = p.id
        JOIN
          client cl ON p.client_id = cl.id
        JOIN
          product pr ON te.product_id = pr.id
        JOIN
          activity a ON te.activity_id = a.id
        JOIN
          category cat ON te.category_id = cat.id
        WHERE te.id = $1;
      `;
  
      const selectValues = [taskentryId];
  
      const selectResult = await db.query(selectQuery, selectValues);
  
      res.status(201).json(selectResult.rows[0]); // Devolver los detalles completos de la entrada de tarea creada
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting taskentry');
    }
  };




// = async (req, res) => {
//   const { contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description } = req.body;

//   try {
//     const insertQuery = `
//       INSERT INTO taskentry (contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//       RETURNING *`;

//     const insertValues = [contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description];

//     const insertResult = await db.query(insertQuery, insertValues);
    
//     const taskentryId = insertResult.rows[0].id;

//     const selectQuery = `
//       SELECT
//         te.id,
//         c.fullname AS contractor_name,
//         te.date,
//         te.duration,
//         te.billable,
//         p.name AS project_name,
//         cl.id AS client_id,
//         cl.name AS client_name,
//         pr.description AS product_description,
//         a.description AS activity_description,
//         cat.description AS category_description,
//         te.description
//       FROM
//         taskentry te
//       JOIN
//         contractor c ON te.contractor_id = c.id
//       JOIN
//         project p ON te.project_id = p.id
//       JOIN
//         client cl ON p.client_id = cl.id
//       JOIN
//         product pr ON te.product_id = pr.id
//       JOIN
//         activity a ON te.activity_id = a.id
//       JOIN
//         category cat ON te.category_id = cat.id
//       WHERE te.id = $1;
//     `;

//     const selectValues = [taskentryId];

//     const selectResult = await db.query(selectQuery, selectValues);

//     res.status(201).json(selectResult.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error inserting taskentry');
//   }
// };

export const updateTaskentry = async (req, res) => {
  const taskentryId = req.params.id;
  const { contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description } = req.body;

  try {
    const updateQuery = `
      UPDATE taskentry
      SET contractor_id = $1, date = $2, duration = $3, billable = $4, project_id = $5, product_id = $6, activity_id = $7, category_id = $8, description = $9
      WHERE id = $10
      RETURNING *`;

    const updateValues = [contractor_id, date, duration, billable, project_id, product_id, activity_id, category_id, description, taskentryId];

    const updateResult = await db.query(updateQuery, updateValues);

    const selectQuery = `
      SELECT
        te.id,
        te.contractor_id,
        c.fullname AS contractor_name,
        te.date,
        te.duration,
        te.billable,
        te.project_id,
        p.name AS project_name,
        cl.id AS client_id,
        cl.name AS client_name,
        te.product_id,
        pr.description AS product_description,
        te.activity_id,
        a.description AS activity_description,
        te.category_id,
        cat.description AS category_description,
        te.description
      FROM
        taskentry te
      JOIN
        contractor c ON te.contractor_id = c.id
      JOIN
        project p ON te.project_id = p.id
      JOIN
        client cl ON p.client_id = cl.id
      JOIN
        product pr ON te.product_id = pr.id
      JOIN
        activity a ON te.activity_id = a.id
      JOIN
        category cat ON te.category_id = cat.id
      WHERE te.id = $1;
    `;

    const selectValues = [taskentryId];

    const selectResult = await db.query(selectQuery, selectValues);

    res.json(selectResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating taskentry');
  }
};

export const deleteTaskentry = async (req, res) => {
  const taskentryId = req.params.id;

  try {
    const query = 'DELETE FROM taskentry WHERE id = $1';
    const result = await db.query(query, [taskentryId]);
    res.json({ message: 'Taskentry was deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting taskentry');
  }
};

export const getClientsWithTaskentries = async (req, res) => {
  const query = `
    SELECT DISTINCT
      c.id AS client_id,
      c.name AS client_name
    FROM
      client c
    INNER JOIN
      project p ON c.id = p.client_id
    INNER JOIN
      taskentry te ON p.id = te.project_id;
  `;

  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving clients with taskentries:', error);
    res.status(500).json({ error: 'An error occurred while retrieving clients with taskentries.' });
  }
};
