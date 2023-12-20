import db from '../db'
exports.getAllClients = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM public.client;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving clients:', error);
    res.status(500).json({ error: 'An error occurred while retrieving clients.' });
  }
};

exports.getClientById = async (req, res) => {
  const clientId = req.params.id;
  
  try {
    const query = 'SELECT * FROM client WHERE id = $1';
    const result = await db.query(query, [clientId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving client by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving client by ID.' });
  }
};


exports.createClient = async (req, res) => {
  const { name, city, state, country, industry_code, active } = req.body;
  try {
    const query = `
      INSERT INTO client (name, city, state, country, industry_code, active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
      
    const values = [name, city, state, country, industry_code, active];

    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]); // 201 Created
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la inserción');
  }
};

exports.updateClient = async (req, res) => {
  const clientId = req.params.id;
  const { name, city, state, country, industry_code, active } = req.body;

  try {
    const query = `
      UPDATE client
      SET name = $1, city = $2, state = $3, country = $4, industry_code = $5, active = $6
      WHERE id = $7
      RETURNING *`;
      
    const values = [name, city, state, country, industry_code, active, clientId];

    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la actualización');
  }
};

exports.deleteClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const query = 'DELETE FROM client WHERE id = $1';
    const result = await db.query(query, [clientId]);
    res.json({ message: 'Cliente eliminado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la eliminación');
  }
};
