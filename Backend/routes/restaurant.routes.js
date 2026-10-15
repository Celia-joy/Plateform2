import { Router } from 'express'
import authorize from '../middleware/auth.middleware.js'
import {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    getMyRestaurant,
    updateMyRestaurant,
} from '../controllers/restaurant.controller.js'

const restaurantRouter = Router()

restaurantRouter.get('/', getRestaurants)
restaurantRouter.get('/mine', authorize, getMyRestaurant)
restaurantRouter.put('/mine', authorize, updateMyRestaurant)
restaurantRouter.get('/:id', getRestaurantById)
restaurantRouter.post('/', authorize, createRestaurant)

export default restaurantRouter