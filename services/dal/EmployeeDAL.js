import ConnectToDB from "./DB";

export const GetAllEmployees = async (successCallBack) => {
  try {
    const db = await ConnectToDB();
    const data = await db.getAllAsync(
      `SELECT * FROM employees ORDER by empl_name`
    );
    successCallBack(data);
  } catch (error) {
    throw error;
  }
};

export const CreateEmployee = async (emp) => {
  const db = await ConnectToDB();
  const statement = await db.prepareAsync(
    "INSERT INTO employees (empl_no, empl_name) VALUES (?,?)"
  );
  await statement.executeAsync([emp.employeeNo, emp.employeeName]);
};

export const UpdateEmployee = async (emp) => {
  try {
    const db = await ConnectToDB();
    await db.runAsync(
      "UPDATE employees SET empl_no=?, empl_name=? WHERE id=?",
      [emp.employeeNo, emp.employeeName, emp.employeeId]
    );
  } catch (error) {
    throw error;
  }
};

export const DeleteEmployee = async (empl) => {
  try {
    const db = await ConnectToDB();
    await db.runAsync("DELETE FROM employees WHERE id=?", empl.id);
  } catch (error) {
    throw error;
  }
};
