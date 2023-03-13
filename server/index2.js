import dotenv from "dotenv";

const express = require("express");
dotenv.config();

const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  port: 5432,
  database: "hr-db2",
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Server listening on port ${port}`));

// ===REGIONS===
// REGIONS GET ALL
app.get("/api/regions", (req, res) => {
  pool.query("select *  from regions", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// REGIONS GET BY ID
app.get("/api/regions/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from regions where region_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// REGIONS POST
app.post("/api/regions/", (req, res) => {
  const { name } = req.body;
  pool.query("insert into regions (region_name) values ($1)", [name], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

// REGIONS PUT
app.put("/api/regions/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  pool.query("update regions set region_name = $1 where region_id = $2", [name, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

// REGIONS DELETE
app.delete("/api/regions/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from regions where region_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// ===LOCATIONS===
// LOCATIONS GET ALL
app.get("/api/locations", (req, res) => {
  pool.query("select *  from locations", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// LOCATIONS GET BY ID
app.get("/api/locations/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from locations where location_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// LOCATIONS POST
app.post("/api/locations/", (req, res) => {
  const { location_id, street_address, postal_code, city, state_province, country_id } = req.body;

  pool.query("insert into locations (location_id,street_address,postal_code,city,state_province,country_id ) values ($1,$2,$3,$4,$5,$6)", [location_id, street_address, postal_code, city, state_province, country_id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil Insert");
  });
});

// LOCATIONS PUT
app.put("/api/locations/:id", (req, res) => {
  const { street_address, postal_code, city, state_province, country_id } = req.body;
  const { id } = req.params;

  pool.query("update locations set street_address = $1,postal_code = $2,city = $3,state_province = $4,country_id = $5 where location_id = $6", [street_address, postal_code, city, state_province, country_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

// LOCATIONS DELETE
app.delete("/api/locations/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from locations where location_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// ===EMPLOYEES===
// EMPLOYEES GET ALL
app.get("/api/employees", (req, res) => {
  pool.query("select *  from employees", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// EMPLOYEES GET BY ID
app.get("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from employees where employee_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// EMPLOYEES POST
app.post("/api/employees/", (req, res) => {
  const { employee_id, first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;

  pool.query(
    "insert into employees (employee_id,first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    [employee_id, first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).end("Data berhasil Insert");
    }
  );
});

// EMPLOYEES PUT
app.put("/api/employees/:id", (req, res) => {
  const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;
  const { id } = req.params;
  pool.query(
    "update employees set first_name = $1,last_name = $2,email = $3,phone_number = $4,hire_date = $5,salary = $6,commission_pct = $7,job_id = $8,manager_id = $9,department_id = $10 where employee_id = $11",
    [first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).end("Data berhasil update");
    }
  );
});

// EMPLOYEES DELETE
app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from employees where employee_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// ===DEPARTMENTS===
// DEPARTMENTS GET ALL
app.get("/api/departments", (req, res) => {
  pool.query("select *  from departments", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// DEPARTMENTS GET BY ID
app.get("/api/departments/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from departments where department_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// DEPARTMENTS POST
app.post("/api/departments/", (req, res) => {
  const { department_id, department_name, manager_id, location_id } = req.body;

  pool.query("insert into departments(department_id,department_name,manager_id,location_id) values ($1,$2,$3,$4)", [department_id, department_name, manager_id, location_id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil Insert");
  });
});

// DEPARTMENTS PUT
app.put("/api/departments/:id", (req, res) => {
  const { department_name, manager_id, location_id } = req.body;
  const { id } = req.params;
  pool.query("update departments set department_name = $1,manager_id = $2,location_id = $3 where department_id= $4", [department_name, manager_id, location_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

// DEPARTMENTS DELETE
app.delete("/api/departments/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from departments where department_id= $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// ===JOBS===
// JOBS GET ALL
app.get("/api/jobs", (req, res) => {
  pool.query("select *  from jobs", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// JOBS GET BY ID
app.get("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from jobs where job_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// JOBS POST
app.post("/api/jobs/", (req, res) => {
  const { job_id, job_title, min_salary, max_salary } = req.body;

  pool.query("insert into jobs(job_id, job_title, min_salary, max_salary) values ($1,$2,$3,$4)", [job_id, job_title, min_salary, max_salary], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil Insert");
  });
});

// JOBS PUT
app.put("/api/jobs/:id", (req, res) => {
  const { job_title, min_salary, max_salary } = req.body;
  const { id } = req.params;
  pool.query("update jobs set job_title = $1,min_salary = $2,max_salary = $3 where job_id= $4", [job_title, min_salary, max_salary, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

// JOBS DELETE
app.delete("/api/jobs/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from jobs where job_id= $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// ===Countries===
// Countries GET ALL
app.get("/api/countries", (req, res) => {
  pool.query("select *  from countries", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// COUNTRIES GET BY ID
app.get("/api/countries/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from countries where country_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// COUNTRIES POST
app.post("/api/countries/", (req, res) => {
  const { country_id, country_name, region_id } = req.body;

  pool.query("insert into countries(country_id, country_name, region_id) values ($1,$2,$3)", [country_id, country_name, region_id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil Insert");
  });
});

// COUNTRIES PUT
app.put("/api/countries/:id", (req, res) => {
  const { country_name, region_id } = req.body;
  const { id } = req.params;
  pool.query("update countries set country_name = $1,region_id = $2 where country_id=$3", [country_name, region_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});
// pool.query("update jobs set job_title = $1,min_salary = $2,max_salary = $3 where job_id= $4", [job_title, min_salary, max_salary, id], (error, result) => {

// JOBS DELETE
app.delete("/api/countries/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from countries where country_id= $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});
