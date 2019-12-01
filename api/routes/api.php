<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'cors'], function () {
    Route::get('_sexos', 'CatalogosController@sexos');
    Route::get('_estados', 'CatalogosController@estados');
    Route::get('_tipo_permisos', 'CatalogosController@tipopermisos');
    Route::get('_meses', 'CatalogosController@meses');



    Route::post('_login', 'Auth\LoginController@Login');
    Route::post('_register', 'RegisterController@Login');

    Route::post('_sexo_datos', 'SexoController@all');
    Route::post('_sexo_xid', 'SexoController@show');
    Route::post('_sexo_agregar', 'SexoController@add');
    Route::post('_sexo_editar', 'SexoController@edit');
    Route::post('_sexo_eliminar', 'SexoController@delete');

    Route::post('_tipo_permiso_datos', 'TipoPermisosController@all');
    Route::post('_tipo_permiso_xid', 'TipoPermisosController@show');
    Route::post('_tipo_permiso_agregar', 'TipoPermisosController@add');
    Route::post('_tipo_permiso_editar', 'TipoPermisosController@edit');
    Route::post('_tipo_permiso_eliminar', 'TipoPermisosController@delete');

    Route::post('_estados_datos', 'EstadosController@all');
    Route::post('_estados_xid', 'EstadosController@show');
    Route::post('_estados_agregar', 'EstadosController@add');
    Route::post('_estados_editar', 'EstadosController@edit');
    Route::post('_estados_eliminar', 'EstadosController@delete');

    Route::post('_usuario_datos', 'UsuarioController@all');
    Route::post('_usuario_xid', 'UsuarioController@show');
    Route::post('_usuario_agregar', 'UsuarioController@add');
    Route::post('_usuario_editar', 'UsuarioController@edit');
    Route::post('_usuario_eliminar', 'UsuarioController@delete');

    Route::post('_usuario_permiso_datos', 'UsuarioController@permiso');

    Route::post('_cargo_agregar', 'CargoController@add');
    Route::post('_cargo_xid', 'CargoController@xid');

});

