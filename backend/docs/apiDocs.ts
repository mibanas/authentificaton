// Import des fonctions de gestion des tâches
import  addTask  from'./userDocs';
import  updateTask  from'./userDocs';
import  changeTaskStatus  from'./userDocs';
import  deleteTask  from'./userDocs';


// Définition de la documentation de l'API
const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'My REST API - Documentation',
    description: 'Description of my API here',
    contact: {
      name: 'Mohamed SANABI',
      email: 'sanabi_mohamed@hotmail.fr',
      url: 'https://wwww.mohamedsanabi.com',
    },
  },
  servers: [
    {
      url: `http://localhost:3020`,
      description: 'Local Server',
    },
    {
      url: 'https://api.mysite.com',
      description: 'Production Server',
    },
  ],
  tags: [
    {
      name: 'Tasks',
    },
  ],
  paths: {
    '/tasks/addtask': {
      post: addTask,
      tags: ['Tasks'],
      summary: 'Add a new task',
      operationId: 'addTask',
      responses: {
        '201': {
          description: 'Task added successfully!',
        },
      },
    },
    '/tasks/updatetask/{id}': {
      put: updateTask,
      delete: deleteTask,
      tags: ['Tasks'],
      summary: 'Update task, delete task',
      operationId: 'updateDeleteTask',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the task',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Task updated/deleted successfully!',
        },
      },
    },
    '/tasks/{id}': {
      put: changeTaskStatus,
      tags: ['Tasks'],
      summary: 'Change task status by ID',
      operationId: 'changeTaskStatus',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the task',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Task status changed successfully!',
        },
        '404': {
          description: 'Task not found',
        },
        '500': {
          description: 'Internal Server Error',
        },
      },
    },
  },
  components: {
    schemas: {
      TaskInput: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          priority: { type: 'string' },
          deadline: { type: 'string', format: 'date' },
        },
        required: ['title', 'description', 'priority', 'deadline'],
      },
      Task: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          priority: { type: 'string' },
          deadline: { type: 'string', format: 'date' },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

// Export de la documentation de l'API
export default apiDocumentation;
