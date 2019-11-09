'use strict';

const Route = use('Route');

Route.on('/').render('main.home');
Route.get('/:slug', 'CategoryController.index').as('category.index');
Route.get('/test/test', 'CategoryController.test');
Route.get('/seller/start', 'Seller/RegisterController.index');
Route.get('/seller/register', 'Seller/RegisterController.create');
Route.post('/seller/register', 'Seller/RegisterController.store');
