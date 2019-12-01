<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class CargoController extends Controller
{
    public function all()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'monto_cargo' => '',
                'fecha_cargo' => '',
            ]);


            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $monto_cargo = $data['data']['monto_cargo'] ?? null;
                    $fecha_cargo = $data['data']['fecha_cargo'] ?? null;


                    $result = DB::table('cargos')
                        ->select('cargos.*')
                        ->get();


                    $insert = DB::table('cargos')->insertGetId([
                        "monto_cargo" => $monto_cargo,
                        "fecha_cargo" => $fecha_cargo,
                        "id_usuario" => 4
                    ]);

                    dd($insert);


                    if ($result) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos encontrados.";
                        $data = $result;
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Datos no encontrados.";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }

    public function xid()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_cat_sexo' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $id_cat_sexo = $data['data']['id_cat_sexo'];

                    $row = DB::table('cat_sexo')
                        ->select('cat_sexo.*')
                        ->where('cat_sexo.id_cat_sexo', '=', $id_cat_sexo)
                        ->first();

                    if ($row) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos encontrados.";
                        $data = $row;
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Datos no encontrados.";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }

    public function add()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'fecha_cargo' => 'required',
                'monto_cargo' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $monto_cargo = $data['data']['monto_cargo'] ?? null;
                    $fecha_cargo = $data['data']['fecha_cargo'] ?? null;
                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    $fecha_cargo = date('Y-m-d', strtotime($fecha_cargo));
                    if ($id_usuario) {
                        $usuarios = DB::table('cargos')->insertGetId([
                            "monto_cargo" => $monto_cargo,
                            "fecha_cargo" => $fecha_cargo,
                            "id_usuario" => $id_usuario
                        ]);
                    } else {
                        $usuarios = DB::table('usuario')
                            ->where('usuario.id_cat_tipo_permiso', '=', 2)
                            ->get();

                        $cargos = [];


                        foreach ($usuarios as $user) {
                            $cargos[] = [
                                "monto_cargo" => $monto_cargo,
                                "fecha_cargo" => $fecha_cargo,
                                "id_usuario" => $user->id_usuario
                            ];
                        }



                        DB::table('cargos')->insert($cargos);
                    }


                    if ($usuarios) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos agregados.";
                        $data = $usuarios;
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Error al agregar.";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return array($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }


}
