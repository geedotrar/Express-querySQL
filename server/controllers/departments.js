import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const departments = await req.context.models.departments.findAll();
    return res.send(departments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const departments = await req.context.models.departments.findOne({
      where: { department_id: req.params.id },
    });
    return res.send(departments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const create = async (req, res) => {
  try {
    const departments = await req.context.models.departments.create({
      department_id: req.body.department_id,
      department_name: req.body.department_name,
      manager_id: req.body.manager_id,
      location_id: req.body.location_id,
    });
    return res.send(departments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const departments = await req.context.models.departments.update(
      {
        department_name: req.body.department_name,
        manager_id: req.body.manager_id,
        location_id: req.body.location_id,
      },
      { returning: true, where: { department_id: req.params.id } }
    );
    return res.send(departments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const departments = await req.context.models.departments.destroy({
      where: { department_id: req.params.id },
    });
    return res.send(`delete ${departments} rows`);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// QUERYSQL
const querySQL = async (req, res) => {
  try {
    const query = await sequelize.query("SELECT * from departments where department_id = :id", { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT });
    return res.send(query);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  querySQL,
};
