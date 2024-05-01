import express from 'express';
import Recipe from '../Recipe.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Management API',
      version: '1.0.0',
      description: 'API to manage recipes',
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server/routes/recipes.js'],// Path to the file where your routes are defined
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /saveRecipe:
 *   post:
 *     summary: Save a new recipe
 *     description: This endpoint saves a new recipe to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ingredients
 *               - instructions
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the recipe
 *                 example: "Chocolate Cake"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *                 example: ["Cocoa powder", "Eggs", "Flour", "Sugar"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions
 *                 example: "Mix all ingredients and bake for 30 minutes."
 *     responses:
 *       201:
 *         description: Recipe saved successfully
 *       500:
 *         description: Error saving recipe
 */
router.post('/saveRecipe', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).send('Recipe saved successfully');
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).send('Error saving recipe');
  }
});

export { router as recipeRouter };
