<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class SaldoController extends Controller
{

    public function all()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {
                $id_usuario = $data['data']['id_usuario'] ?? null;
                $fecha_inicio = date('Y-m-d', strtotime($data['data']['fecha_inicio'])) ?? null;
                $fecha_fin = date('Y-m-d', strtotime($data['data']['fecha_fin']."+ 1 days")) ?? null;

                $fechas = array($fecha_inicio, $fecha_fin);



                DB::beginTransaction();

                try {

                    if ($fecha_inicio) {
                        $result = DB::table('saldos')
                            ->select('saldos.*')
                            ->where('saldos.id_usuario', '=', $id_usuario)
                            ->whereBetween('saldos.fecha_saldo', array($fecha_inicio, $fecha_fin))
                            ->get();

                        if (count($result)>0) {
                            for ($x=0;$x<count($result);$x++) {
                                $result[$x]->fecha_saldo = date("d/M/Y", strtotime($result[$x]->fecha_saldo));
                            }
                        }
                    } else {
                        $result = DB::table('saldos')
                            ->select('saldos.*')
                            ->where('saldos.id_usuario', '=', $id_usuario)
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


    public function add()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => 'required',
                'monto_saldo' => 'required'
            ]);


            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $monto_saldo = $data['data']['monto_saldo'] ?? null;
                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    $fecha_saldo = date('Y-m-d H:i:s');

                    if ($id_usuario) {
                        $usuarios = DB::table('saldos')->insertGetId([
                            "monto_saldo" => $monto_saldo,
                            "fecha_saldo" => $fecha_saldo,
                            "id_usuario" => $id_usuario
                        ]);
                    } else {
                        /*$usuarios = DB::table('usuario')
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

                        DB::table('cargos')->insert($cargos);*/
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
