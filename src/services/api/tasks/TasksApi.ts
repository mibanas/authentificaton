import axios from "axios";

export const getAllTasks = async () => {
  try {
    const allTasks = await axios.get("http://localhost:3020/task/alltasks");
    return allTasks.data;
  } catch (error : any) {
    console.error("Erreur lors de la récupération des tâches :", error.message);
    throw error;
  }
};

export const deleteTaskById = async (taskId : any) => {
  try {
    const response = await axios.put(
      `http://localhost:3020/task/deletetask/${taskId}`
    );
    return response.data;
  } catch (error : any) {
    console.error("Erreur lors de la suppression de la tâche :", error.message);
    throw error;
  }
};

export const changeStatusById = async (taskId : any) => {
  try {
    const response = await axios.put(`http://localhost:3020/task/${taskId}`);
    return response.data;
  } catch (error : any) {
    console.error("Erreur lors de la suppression de la tâche :", error.message);
    throw error;
  }
}

export const addTask = async (taskData : any) => {
  try {
    const response = await axios.post("http://localhost:3020/task/addtask", taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId : any, formData : any) => {
  try {
    const response = await fetch(`http://localhost:3020/task/updatetask/${taskId}`, {
      method: 'PUT', // Assuming you use PUT for updating tasks
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while updating the task.' };
  }
};
