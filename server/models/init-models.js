import Sequelize from "sequelize";
import config from "../../config/config";

const sequelize = new Sequelize(config.db_name, config.db_username, config.db_pass, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const DataTypes = require("sequelize").DataTypes;
const _categories = require("./categories");
const _countries = require("./countries");
const _customers = require("./customers");
const _departments = require("./departments");
const _employees = require("./employees");
const _job_history = require("./job_history");
const _jobs = require("./jobs");
const _locations = require("./locations");
const _orders = require("./orders");
const _orders_detail = require("./orders_detail");
const _products = require("./products");
const _regions = require("./regions");
const _shippers = require("./shippers");
const _suppliers = require("./suppliers");

function initModels(sequelize) {
  const categories = _categories(sequelize, DataTypes);
  const countries = _countries(sequelize, DataTypes);
  const customers = _customers(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const job_history = _job_history(sequelize, DataTypes);
  const jobs = _jobs(sequelize, DataTypes);
  const locations = _locations(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const orders_detail = _orders_detail(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const regions = _regions(sequelize, DataTypes);
  const shippers = _shippers(sequelize, DataTypes);
  const suppliers = _suppliers(sequelize, DataTypes);

  orders.belongsToMany(products, { as: "ordet_prod_id_products", through: orders_detail, foreignKey: "ordet_order_id", otherKey: "ordet_prod_id" });
  products.belongsToMany(orders, { as: "ordet_order_id_orders", through: orders_detail, foreignKey: "ordet_prod_id", otherKey: "ordet_order_id" });
  locations.belongsTo(countries, { as: "country", foreignKey: "country_id" });
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id" });
  job_history.belongsTo(departments, { as: "department", foreignKey: "department_id" });
  departments.hasMany(job_history, { as: "job_histories", foreignKey: "department_id" });
  departments.belongsTo(employees, { as: "manager", foreignKey: "manager_id" });
  employees.hasMany(departments, { as: "departments", foreignKey: "manager_id" });
  employees.belongsTo(employees, { as: "manager", foreignKey: "manager_id" });
  employees.hasMany(employees, { as: "employees", foreignKey: "manager_id" });
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id" });
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id" });
  job_history.belongsTo(jobs, { as: "job", foreignKey: "job_id" });
  jobs.hasMany(job_history, { as: "job_histories", foreignKey: "job_id" });
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id" });
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id" });
  countries.belongsTo(regions, { as: "region", foreignKey: "region_id" });
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id" });
  products.belongsTo(categories, { as: "prod_cate", foreignKey: "prod_cate_id" });
  categories.hasMany(products, { as: "products", foreignKey: "prod_cate_id" });
  orders_detail.belongsTo(orders, { as: "ordet_order", foreignKey: "ordet_order_id" });
  orders.hasMany(orders_detail, { as: "orders_details", foreignKey: "ordet_order_id" });
  orders_detail.belongsTo(products, { as: "ordet_prod", foreignKey: "ordet_prod_id" });
  products.hasMany(orders_detail, { as: "orders_details", foreignKey: "ordet_prod_id" });
  orders.belongsTo(shippers, { as: "order_ship", foreignKey: "order_ship_id" });
  shippers.hasMany(orders, { as: "orders", foreignKey: "order_ship_id" });
  products.belongsTo(suppliers, { as: "prod_supr", foreignKey: "prod_supr_id" });
  suppliers.hasMany(products, { as: "products", foreignKey: "prod_supr_id" });

  return {
    categories,
    countries,
    customers,
    departments,
    employees,
    job_history,
    jobs,
    locations,
    orders,
    orders_detail,
    products,
    regions,
    shippers,
    suppliers,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
