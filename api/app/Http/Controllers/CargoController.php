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
                'id_usuario' => ''
            ]);


            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    $fecha_inicio = date('Y-m-d', strtotime($data['data']['fecha_inicio'])) ?? null;
                    $fecha_fin = date('Y-m-d', strtotime($data['data']['fecha_fin'])) ?? null;

                    if ($fecha_inicio) {
                        $result = DB::table('cargos')
                            ->select('cargos.*')
                            ->where('cargos.id_usuario', '=', $id_usuario)
                            ->whereBetween('cargos.fecha_cargo', array($fecha_inicio, $fecha_fin))
                            ->get();
                        for ($x=0; $x<count($result); $x++){
                            $pagado = DB::table('pagos')
                                ->select('pagos.*')
                                ->where('pagos.id_cargo', '=', $result[$x]->id)
                                ->first();

                            if ($pagado){
                                $result[$x]->estatus = "Pagado";
                            } else {
                                $result[$x]->estatus = "Por Pagar";
                            }
                        }

                        /* if (count($result)>0) {
                             for ($x=0;$x<count($result);$x++) {
                                 $result[$x]->fecha_cargo = date("d/M/Y", strtotime($result[$x]->fecha_cargo));
                             }
                         }*/
                    } else {
                        $result = DB::table('cargos')
                            ->select('cargos.*')
                            ->where('cargos.id_usuario', '=', $id_usuario)
                            ->get();
                    }


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
