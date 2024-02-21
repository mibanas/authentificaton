const taskModelDefinition = {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      priority: { type: 'string' },
      deadline: { type: 'string', format: 'date' },
    },
};

const addTask = {
    tags: ['Tasks'],
    description: 'Add a new task',
    operationId: 'addTask',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/TaskInput',
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Task added successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                data: taskModelDefinition,
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Internal Server Error' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
    },
};

// Swagger definition for updateTask operation
const updateTask = {
    tags: ['Tasks'],
    description: 'Update a task by ID',
    operationId: 'updateTask',
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
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/TaskInput',
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Task updated successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                data: taskModelDefinition,
              },
            },
          },
        },
      },
      '404': {
        description: 'Task not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Task not found.' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Internal Server Error' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
    },
};

const changeTaskStatus = {
    tags: ['Tasks'],
    description: 'Change task status by ID',
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
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                data: taskModelDefinition,
              },
            },
          },
        },
      },
      '404': {
        description: 'Task not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Task not found.' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Internal Server Error' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
    },
};

const deleteTask = {
    tags: ['Tasks'],
    description: 'Delete a task by ID',
    operationId: 'deleteTask',
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
        description: 'Task deleted successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Task deleted successfully.' },
                dataDeleted: taskModelDefinition,
              },
            },
          },
        },
      },
      '404': {
        description: 'Task not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Task not found.' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Internal Server Error' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
    },
};

export default { addTask, updateTask, changeTaskStatus, deleteTask };
