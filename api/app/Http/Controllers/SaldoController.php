<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class SaldoController extends Controller
{
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
