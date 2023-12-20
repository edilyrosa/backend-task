import pg from "pg";
import { config } from 'dotenv';
config();// Cargar variables de entorno desde el archivo .env


const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false, // Esto permite aceptar certificados autofirmados
  },
});


const createClientTableQuery = `
CREATE TABLE IF NOT EXISTS client (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  city VARCHAR(50),
  state VARCHAR(10),
  country VARCHAR(10),
  industry_code VARCHAR(10),
  active BOOLEAN
);
`;
//TODO
// const createProjectTableQuery = `
// CREATE TABLE IF NOT EXISTS public.project
// (
//     id serial PRIMARY KEY,
//     name character varying(50),
//     client_id INTEGER REFERENCES public.client(id) ON DELETE CASCADE,
//     description character varying(50),
//     active boolean
// );
// `;

//TODO
// const createActivityTableQuery = `
// CREATE TABLE IF NOT EXISTS public.activity
// (
//     id serial PRIMARY KEY,
//     description character varying(50),
//     project_id INTEGER REFERENCES public.project(id) ON DELETE CASCADE,
//     active boolean
// );
// `;

const createCategoryTableQuery = `
CREATE TABLE IF NOT EXISTS public.category
(
    id serial PRIMARY KEY,
    description character varying(50),
    active boolean
);
`;

const createProductTableQuery = `
CREATE TABLE IF NOT EXISTS public.product
(
    id serial PRIMARY KEY,
    description character varying(50),
    active boolean
);
`;


//TODO
// const createActivityCategoryTableQuery = `
// CREATE TABLE IF NOT EXISTS public.activitycategory
// (
//     activity_id INTEGER REFERENCES public.activity(id)ON DELETE CASCADE,
//     category_id INTEGER REFERENCES public.category(id) ON DELETE CASCADE
// );
// `;


//TODO
// const createProjectProductTableQuery = `
// CREATE TABLE IF NOT EXISTS public.projectproduct
// (
//   project_id INTEGER REFERENCES public.project(id) ON DELETE CASCADE,
//   product_id INTEGER REFERENCES public.product(id) ON DELETE CASCADE
// );
// `;


const createContractorTableQuery = `
CREATE TABLE IF NOT EXISTS public.contractor
(
    id serial PRIMARY KEY,
    fullname VARCHAR(40),
    gender VARCHAR(10),
    birthyear INTEGER,
    country_residence VARCHAR(40),
    active BOOLEAN
);
`;

//TODO
// const createTaskEntryTableQuery = `
//   CREATE TABLE IF NOT EXISTS public.taskentry
//   (
//       id serial PRIMARY KEY,
//       contractor_id INTEGER REFERENCES public.contractor(id) ON DELETE CASCADE,
//       date DATE,
//       duration DECIMAL(11, 10),
//       billable BOOLEAN,
//       project_id INTEGER REFERENCES public.project(id) ON DELETE CASCADE,
//       client_id INTEGER REFERENCES public.client(id) ON DELETE CASCADE,
//       product_id INTEGER REFERENCES public.product(id) ON DELETE CASCADE,
//       activity_id INTEGER REFERENCES public.activity(id) ON DELETE CASCADE,
//       category_id INTEGER REFERENCES public.category(id) ON DELETE CASCADE,
//       description VARCHAR(50)
//   );
//   `;

const listTablesQuery = `
SELECT table_name
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY table_name;
`;


const dropTable = async (tableName) => {
  try {
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    await pool.query(query);
    console.log(`Table ${tableName} has been dropped successfully`);
  } catch (error) {
    console.error(`Error dropping table ${tableName}:`, error);
    throw error;
  }
};


const consultaTable = async () => {
  try {
    const result = await pool.query(listTablesQuery);
    return result.rows;
  } catch (error) {
    console.error('Error querying tables:', error);
    throw error;
  }
};


//!OJITO
const createTable = async () => {
  try {
    const result = await pool.query(createClientTableQuery); //!query
    console.log('table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};









module.exports = {
  query: (text, params) => pool.query(text, params),
  consultaTable,
  createTable,
  //createTableAndInsertCategories, 
  //createTableAndInsertProducts,
  //insertContractor,
  //insertProjects,
  //insertActivities,
  //insertActivityCategories,
  //insertProjectProducts,
  //insertTaskEntries,
  //modifyDurationColumnType,
  //modifyTaskEntryTable, 
  dropTable
};


/*









const insertCategoryQuery = `
INSERT INTO public.category (description, active)
VALUES ($1, $2)
RETURNING *;
`;
const createTableAndInsertCategories = async () => {
  try {
    // Crear la tabla category si no existe
    //await pool.query(createCategoryTableQuery);

    //! Inserciones de ejemplo en la tabla category
    const categoriesToInsert = [
      { description: 'Category 1', active: true },
      { description: 'Category 2', active: false },
      { description: 'Category 3', active: true }
    ];

    for (const category of categoriesToInsert) {
      const result = await pool.query(insertCategoryQuery, [category.description, category.active]);
      console.log('Inserted category:', result.rows[0]);
    }

    console.log('Categories inserted successfully');
  } catch (error) {
    console.error('Error creating table or inserting categories:', error);
  }
};

const insertProductQuery = `
INSERT INTO public.product (description, active)
VALUES ($1, $2)
RETURNING *;
`;
const createTableAndInsertProducts = async () => {
  try {
    // Crear la tabla category si no existe
    //await pool.query(createCategoryTableQuery);

    //! Inserciones
    const productToInsert = [
      { description: 'PRO 1', active: true },
      { description: 'PRO 2', active: false },
      { description: 'PRO 3', active: true }
    ];

    for (const product of productToInsert) {
      const result = await pool.query(insertProductQuery, [product.description, product.active]);
      console.log('Inserted product:', result.rows[0]);
    }

    console.log('inserted successfully');
  } catch (error) {
    console.error('Error creating table or inserting:', error);
  }
};


const insertContractorQuery = `
INSERT INTO public.contractor (fullname, gender, birthyear, country_residence, active)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
`;
const insertContractor = async () => {
  try {
    // Crear la tabla contractor si no existe
    await pool.query(createContractorTableQuery);

    // Inserciones de ejemplo en la tabla contractor
    const contractorsToInsert = [
      { fullname: 'Contractor 1', gender: 'Male', birthyear: 1990, country_residence: 'USA', active: true },
      { fullname: 'Contractor 2', gender: 'Female', birthyear: 1985, country_residence: 'Canada', active: true },
      { fullname: 'Contractor 3', gender: 'Male', birthyear: 1988, country_residence: 'UK', active: false }
    ];

    for (const contractor of contractorsToInsert) {
      try {
        const result = await pool.query(insertContractorQuery, [
          contractor.fullname,
          contractor.gender,
          contractor.birthyear,
          contractor.country_residence,
          contractor.active
        ]);
        console.log('Inserted contractor:', result.rows[0]);
      } catch (error) {
        console.error('Error inserting contractor:', error);
      }
    }  

    console.log('Contractors inserted successfully');
  } catch (error) {
    console.error('Error creating table or inserting contractors:', error);
  }
};


const insertProjectQuery = `
INSERT INTO public.projectsuper (name, client_id, description, active)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;
const insertProjects = async () => {
  try {
    // Inserciones de ejemplo en la tabla project
    const projectsToInsert = [
      { name: 'Project 1', client_id: 4, description: 'Description 1', active: true },
      { name: 'Project 2', client_id: 4, description: 'Description 2', active: true },
    ];

    for (const project of projectsToInsert) {
      try {
        const result = await pool.query(insertProjectQuery, [
          project.name,
          project.client_id,
          project.description,
          project.active
        ]);
        console.log('Inserted project:', result.rows[0]);
      } catch (error) {
        console.error('Error inserting project:', error);
      }
    }  

    console.log('Projects inserted successfully');
  } catch (error) {
    console.error('Error inserting projects:', error);
  }
};

const insertActivityQuery = `
INSERT INTO public.activity (description, project_id, active)
VALUES ($1, $2, $3)
RETURNING *;
`;

const insertActivities = async () => {
  try {
    // Inserciones de ejemplo en la tabla activity
    const activitiesToInsert = [
      { description: 'Activity 7', project_id: 7, active: true },
      { description: 'Activity 14', project_id: 14, active: true }
    ];

    for (const activity of activitiesToInsert) {
      try {
        const result = await pool.query(insertActivityQuery, [
          activity.description,
          activity.project_id,
          activity.active
        ]);
        console.log('Inserted activity:', result.rows[0]);
      } catch (error) {
        console.error('Error inserting activity:', error);
      }
    }

    console.log('Activities inserted successfully');
  } catch (error) {
    console.error('Error inserting activities:', error);
  }
};

const insertActivityCategoryQuery = `
INSERT INTO public.activitycategory (activity_id, category_id)
VALUES ($1, $2)
RETURNING *;
`;

const insertActivityCategories = async () => {
  try {
    // Inserciones de ejemplo en la tabla activitycategory
    const activityCategoriesToInsert = [
      { activity_id: 1, category_id: 1 },
      { activity_id: 3, category_id: 3 }
    ];

    for (const activityCategory of activityCategoriesToInsert) {
      try {
        const result = await pool.query(insertActivityCategoryQuery, [
          activityCategory.activity_id,
          activityCategory.category_id
        ]);
        console.log('Inserted activitycategory:', result.rows[0]);
      } catch (error) {
        console.error('Error inserting activitycategory:', error);
      }
    }

    console.log('Activity categories inserted successfully');
  } catch (error) {
    console.error('Error inserting activity categories:', error);
  }
};

const insertProjectProductQuery = `
INSERT INTO public.projectproduct (project_id, product_id)
VALUES ($1, $2)
RETURNING *;
`;

const insertProjectProducts = async () => {
  try {
    // Inserciones de ejemplo en la tabla projectproduct
    const projectProductsToInsert = [
      { project_id: 4, product_id: 1 },
      { project_id: 4, product_id: 4 }
    ];

    for (const projectProduct of projectProductsToInsert) {
      try {
        const result = await pool.query(insertProjectProductQuery, [
          projectProduct.project_id,
          projectProduct.product_id
        ]);
        console.log('Inserted projectproduct:', result.rows[0]);
      } catch (error) {
        console.error('Error inserting projectproduct:', error);
      }
    }

    console.log('Project products inserted successfully');
  } catch (error) {
    console.error('Error inserting project products:', error);
  }
};


const insertTaskEntryQuery = `
INSERT INTO public.taskentry (contractor_id, date, duration, billable, project_id, client_id, product_id, activity_id, category_id, description)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;
`;

const insertTaskEntries = async () => {
  try {
    // Inserciones de ejemplo en la tabla taskentry
    const taskEntriesToInsert = [
      { contractor_id: 1, date: '2023-08-10', duration: 3.5, billable: true, project_id: 1, client_id: 4, product_id: 1, activity_id: 1, category_id: 1, description: 'Task 1' },
      { contractor_id: 2, date: '2023-08-11', duration: 2.0, billable: false, project_id: 2, client_id: 5, product_id: 2, activity_id: 2, category_id: 2, description: 'Task 2' },
      { contractor_id: 3, date: '2023-08-12', duration: 4.25, billable: true, project_id: 3, client_id: 6, product_id: 1, activity_id: 1, category_id: 3, description: 'Task 3' }
    ];

    for (const taskEntry of taskEntriesToInsert) {
      try {
        const result = await pool.query(insertTaskEntryQuery, [
          taskEntry.contractor_id,
          taskEntry.date,
          taskEntry.duration,
          taskEntry.billable,
          taskEntry.project_id,
          taskEntry.client_id,
          taskEntry.product_id,
          taskEntry.activity_id,
          taskEntry.category_id,
          taskEntry.description
        ]);
        console.log('Inserted taskentry:', result.rows[0]);
      } catch (error) {
        console.error('Error inserting taskentry:', error);
      }
    }

    console.log('Task entries inserted successfully');
  } catch (error) {
    console.error('Error inserting task entries:', error);
  }
};


const modifyDurationColumnType = async () => {
  const modifyQuery = `
    ALTER TABLE public.taskentry
    ALTER COLUMN duration TYPE NUMERIC(8, 2);
  `;
  
  try {
    await pool.query(modifyQuery);
    console.log('Modified duration column type successfully');
  } catch (error) {
    console.error('Error modifying duration column type:', error);
  }
};


const dropClientIDColumnQuery = `
  ALTER TABLE public.taskentry
  DROP COLUMN IF EXISTS client_id;
`;

const modifyTaskEntryTableQuery = `
  ALTER TABLE public.taskentry
  ALTER COLUMN project_id DROP NOT NULL;
`;

const modifyTaskEntryTable = async () => {
  try {
    // Eliminar la columna client_id
    await pool.query(dropClientIDColumnQuery);
    
    // Modificar la estructura de la tabla para permitir valores nulos en project_id
    await pool.query(modifyTaskEntryTableQuery);

    console.log('Table taskentry modified successfully');
  } catch (error) {
    console.error('Error modifying taskentry table:', error);
  }
};










*/