<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CatalogosController extends Controller
{
    public function sexos()
    {
        DB::beginTransaction();

        try {

            $result = DB::table('cat_sexo')
                ->select('cat_sexo.*')
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
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }

        return $response;
    }

    public function estados()
    {

        DB::beginTransaction();

        try {

            $result = DB::table('cat_estados')
                ->select('cat_estados.*')
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
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }


        return $response;
    }

    public function tipopermisos()
    {
        DB::beginTransaction();

        try {

            $result = DB::table('cat_tipo_permiso')
                ->select('cat_tipo_permiso.*')
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
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }


        return $response;
    }

    public function meses()
    {
        DB::beginTransaction();

        try {

            $result = DB::table('cat_meses')
                ->select('cat_meses.*')
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
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }


        return $response;
    }
}
