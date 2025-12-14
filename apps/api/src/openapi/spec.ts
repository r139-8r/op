export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'op API',
    version: '0.1.0'
  },
  servers: [{ url: '/' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Created' },
          '409': { description: 'Email already registered' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Login and get a JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Invalid credentials' }
        }
      }
    },
    '/budgets': {
      get: {
        summary: 'List budgets for current user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' }
        }
      },
      post: {
        summary: 'Create a budget for current user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'month', 'amount'],
                properties: {
                  name: { type: 'string' },
                  month: { type: 'string', format: 'date-time' },
                  amount: { type: 'number' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/categories': {
      get: {
        summary: 'List categories for current user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' }
        }
      },
      post: {
        summary: 'Create a category for current user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/expenses': {
      get: {
        summary: 'List expenses for current user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' }
        }
      },
      post: {
        summary: 'Create an expense for current user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['amount', 'date'],
                properties: {
                  amount: { type: 'number' },
                  date: { type: 'string', format: 'date-time' },
                  description: { type: 'string' },
                  categoryId: { type: 'string', format: 'uuid' },
                  budgetId: { type: 'string', format: 'uuid' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' }
        }
      }
    }
  }
} as const;
