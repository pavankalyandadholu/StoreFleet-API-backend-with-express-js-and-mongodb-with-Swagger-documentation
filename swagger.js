import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration
const swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: "StoreFleet API",
        version: "1.0.0",
        description: "A simple Express API"
    },
    servers: [
        {
          url: `https://store-fleet-api.vercel.app`,
          description: 'StoreFleet API DOCUMENTATION',
        },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
        {
          bearerAuth: [],
        },
      ],
    paths: {
      '/api/storefleet/user/signup': {
        post: {
          tags: ['Users'],
          summary: 'Register a new user',
          description: 'Create a new user in the system.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                    confirmPassword: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Registration successful' },
            400: { description: 'Email already registered or invalid input' },
          },
        },
      },
      '/api/storefleet/user/login': {
        post: {
          tags: ['Users'],
          summary: 'User login',
          description: 'Authenticate the user and generate a token.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful, token generated' },
            400: { description: 'Missing email or password' },
            401: { description: 'Invalid email or password' },
          },
        },
      },
      '/api/storefleet/user/password/forget': {
        post: {
          tags: ['Users'],
          summary: 'Request password reset',
          description: 'Send a password reset email to the user.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', format: 'email' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Email sent successfully' },
            400: { description: 'User does not exist' },
          },
        },
      },
      '/api/storefleet/user/password/reset/{token}': {
        put: {
          tags: ['Users'],
          summary: 'Reset user password',
          description: 'Reset the user\'s password using a valid token.',
          parameters: [
            {
              name: 'token',
              in: 'path',
              required: true,
              description: 'Reset password token',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    password: { type: 'string' },
                    confirmPassword: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Password reset successfully' },
            400: { description: 'Invalid token or password mismatch' },
          },
        },
      },
      '/api/storefleet/user/password/update': {
        put: {
          tags: ['Users'],
          summary: 'Update user password',
          description: 'Update the current user\'s password.',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    currentPassword: { type: 'string' },
                    newPassword: { type: 'string' },
                    confirmPassword: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Password updated successfully' },
            400: { description: 'Invalid password or mismatch' },
          },
        },
      },
      '/api/storefleet/user/profile/update': {
        put: {
          tags: ['Users'],
          summary: 'Update user profile',
          description: 'Update the current user\'s profile details.',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Profile updated successfully' },
            400: { description: 'Invalid profile details' },
          },
        },
      },
      '/api/storefleet/user/details': {
        get: {
          tags: ['Users'],
          summary: 'Get user details',
          description: 'Get the current user\'s details.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Successfully retrieved user details' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/api/storefleet/user/logout': {
        get: {
          tags: ['Users'],
          summary: 'User logout',
          description: 'Log the user out and invalidate the token.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Successfully logged out' },
          },
        },
      },
      '/api/storefleet/user/admin/allusers': {
        get: {
          tags: ['Users'],
          summary: 'Get all users (Admin)',
          description: 'Retrieve a list of all users in the system (Admin only).',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Successfully retrieved all users' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden (Admin only)' },
          },
        },
      },
      '/api/storefleet/user/admin/details/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Get user details for admin',
          description: 'Retrieve details of a specific user by ID (Admin only).',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the user',
            },
          ],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Successfully retrieved user details' },
            400: { description: 'User not found' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden (Admin only)' },
          },
        },
      },
      '/api/storefleet/user/admin/delete/{id}': {
        delete: {
          tags: ['Users'],
          summary: 'Delete a user (Admin)',
          description: 'Delete a specific user by ID (Admin only).',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the user to be deleted',
            },
          ],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Successfully deleted user' },
            400: { description: 'User not found' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden (Admin only)' },
          },
        },
      },
      '/api/storefleet/user/admin/update/{id}': {
        put: {
          tags: ['Users'],
          summary: 'Update user profile and role (Admin)',
          description: 'Update the profile and role of a specific user by ID (Admin only).',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the user to be updated',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                  },
                },
              },
            },
          },
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Successfully updated user profile and role' },
            400: { description: 'Invalid input or user not found' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden (Admin only)' },
          },
        },
      },

      "/api/storefleet/product/products": {
        "get": {
          "tags": ["Product"],
          "summary": "Get All Products",
          "description": "Fetch all products with optional search, filter, and pagination.",
          "parameters": [
            { "name": "page", "in": "query", "schema": { "type": "integer" }, "description": "Page number for pagination." },
            { "name": "keyword", "in": "query", "schema": { "type": "string" }, "description": "Keyword for searching products." },
            { "name": "category", "in": "query", "schema": { "type": "string" }, "description": "Filter products by category." },
            { "name": "pricegte", "in": "query", "schema": { "type": "number" }, "description": "Minimum price filter." },
            { "name": "pricelte", "in": "query", "schema": { "type": "number" }, "description": "Maximum price filter." },
            { "name": "ratinggte", "in": "query", "schema": { "type": "number" }, "description": "Minimum rating filter." },
            { "name": "ratinglte", "in": "query", "schema": { "type": "number" }, "description": "Maximum rating filter." }
          ],
          "responses": {
            "200": {
              "description": "List of products.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": { "$ref": "#/components/schemas/Product" }
                  }
                }
              }
            },
            "400": { "description": "Bad request." }
          }
        }
      },
      "/api/storefleet/product/details/{id}": {
        "get": {
          "tags": ["Product"],
          "summary": "Get Product Details",
          "description": "Fetch details of a specific product by ID.",
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Product ID." }
          ],
          "responses": {
            "200": {
              "description": "Product details.",
              "content": {
                "application/json": {
                  "schema": { "$ref": "#/components/schemas/Product" }
                }
              }
            },
            "400": { "description": "Product not found." }
          }
        }
      },
      "/api/storefleet/product/add": {
        "post": {
          "tags": ["Product"],
          "summary": "Add New Product",
          "description": "Admin-only route to add a new product.",
          "security": [ { "bearerAuth": [] } ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/ProductInput" }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Product added successfully.",
              "content": {
                "application/json": {
                  "schema": { "$ref": "#/components/schemas/Product" }
                }
              }
            },
            "400": { "description": "Bad request." }
          }
        }
      },
      "/api/storefleet/product/update/{id}": {
        "put": {
          "tags": ["Product"],
          "summary": "Update Product",
          "description": "Admin-only route to update an existing product.",
          "security": [ { "bearerAuth": [] } ],
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Product ID." }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/ProductInput" }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Product updated successfully.",
              "content": {
                "application/json": {
                  "schema": { "$ref": "#/components/schemas/Product" }
                }
              }
            },
            "400": { "description": "Product not found or bad request." }
          }
        }
      },
      "/api/storefleet/product/delete/{id}": {
        "delete": {
          "tags": ["Product"],
          "summary": "Delete Product",
          "description": "Admin-only route to delete a product.",
          "security": [ { "bearerAuth": [] } ],
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Product ID." }
          ],
          "responses": {
            "200": { "description": "Product deleted successfully." },
            "400": { "description": "Product not found or bad request." }
          }
        }
      },
      "/api/storefleet/product/rate/{id}": {
        "put": {
          "tags": ["Product"],
          "summary": "Rate a Product",
          "description": "Allows an authenticated user to rate a product.",
          "security": [ { "bearerAuth": [] } ],
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Product ID." }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "rating": { "type": "number" },
                    "comment": { "type": "string" }
                  },
                  "required": ["rating"]
                }
              }
            }
          },
          "responses": {
            "201": { "description": "Rating added or updated successfully." },
            "400": { "description": "Product not found or bad request." }
          }
        }
      },
      "/api/storefleet/product/reviews/{id}": {
        "get": {
          "tags": ["Product"],
          "summary": "Get All Reviews",
          "description": "Fetch all reviews for a specific product by ID.",
          "parameters": [
            { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Product ID." }
          ],
          "responses": {
            "200": {
              "description": "List of reviews.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": { "$ref": "#/components/schemas/Review" }
                  }
                }
              }
            },
            "400": { "description": "Product not found." }
          }
        }
      },
      "/api/storefleet/product/review/delete": {
        "delete": {
          "tags": ["Product"],
          "summary": "Delete Review",
          "description": "Allows a user to delete their review for a product.",
          "security": [ { "bearerAuth": [] } ],
          "parameters": [
            { "name": "productId", "in": "query", "required": true, "schema": { "type": "string" }, "description": "Product ID." },
            { "name": "reviewId", "in": "query", "required": true, "schema": { "type": "string" }, "description": "Review ID." }
          ],
          "responses": {
            "200": { "description": "Review deleted successfully." },
            "400": { "description": "Review or product not found, or unauthorized." }
          }
        }
      },
      "/api/storefleet/order/new": {
        "post": {
          "tags": ["Order"],
          "summary": "Place a New Order",
          "description": "Allows an authenticated user to place a new order.",
          "security": [
            { "bearerAuth": [] }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "productId": { "type": "string" },
                          "quantity": { "type": "integer" }
                        },
                        "required": ["productId", "quantity"]
                      }
                    },
                    "totalPrice": { "type": "number" }
                  },
                  "required": ["items", "totalPrice"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Order placed successfully."
            },
            "400": {
              "description": "Invalid input data."
            },
            "401": {
              "description": "Unauthorized access."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      }
      
    }

  };
  const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
  // Setup Swagger UI
  export function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions,{ customCssUrl: CSS_URL }));
}
