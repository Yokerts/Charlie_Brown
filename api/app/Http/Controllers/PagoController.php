<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class PagoController extends Controller
{

    public function all()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => '',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $result = DB::table('pagos')
                        ->select('pagos.*')
                        ->get();

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



    public function show()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => '',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $id_usuario = $data['data']['id_usuario'] ?? null;

                    $result = DB::table('pagos')
                        ->select('pagos.*')
                        ->where('pagos.id_usuario', '=', $id_usuario)
                        ->get();

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
                'monto_pago' => 'required'
            ]);


            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    $monto_saldo = $data['data']['monto_pago'] ?? null;
                    $id_cargo = $data['data']['id_cargo'] ?? null;
                    $fecha_saldo = date('Y-m-d H:i:s');


                    $row = DB::table('usuario')
                        ->select('usuario.*')
                        ->where('usuario.id_usuario', '=', $id_usuario)
                        ->first();

                    $saldos = DB::table('saldos')
                        ->select('saldos.*')
                        ->where('saldos.id_usuario', '=', $id_usuario)
                        ->get();


                    if (count($saldos)>0) {
                        $saldo_total=0;
                        for ($x = 0; $x<count($saldos); $x++) {
                            $saldo_total = $saldo_total+$saldos[$x]->monto_saldo;
                        }
                        $row->saldo= $row->saldo+$saldo_total;
                    }

                    $pagos = DB::table('pagos')
                        ->select('pagos.*')
                        ->where('pagos.id_usuario', '=', $id_usuario)
                        ->get();


                    if (count($pagos)>0) {
                        $saldo_pagos=0;
                        for ($x = 0; $x<count($pagos); $x++) {
                            $saldo_pagos = $saldo_pagos+$pagos[$x]->monto_pago;
                        }
                        $row->saldo= $row->saldo-$saldo_pagos;
                    }

                    if ($row->saldo > $monto_saldo){
                        if ($id_usuario) {
                            $usuarios = DB::table('pagos')->insertGetId([
                                "monto_pago" => $monto_saldo,
                                "fecha_pago" => $fecha_saldo,
                                "id_usuario" => $id_usuario,
                                "id_cargo" => $id_cargo
                            ]);
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
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Saldo Insuficiente.";
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
