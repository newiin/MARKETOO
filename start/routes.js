'use strict';

const Route = use('Route');

Route.on('/').render('main.home');
Route.get('/:slug', 'CategoryController.index').as('category.index');
Route.get('/test/test', 'CategoryController.test');
