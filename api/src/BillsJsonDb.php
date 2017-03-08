<?php
namespace Api;

class BillsJsonDb
{

    private $source = null;

    function __construct($source){
        $this->source = realpath($source);
    }

    function getBills()
    {
        $json = file_get_contents($this->source);
        $data = json_decode($json, true);
        return $data['bills'];
    }

    function findIndexById($id)
    {
        $bills = $this->getBills();
        foreach ($bills as $key => $bill) {
            if ($bill['id'] == $id) {
                return $key;
            }
        }
        return false;
    }

    function writeBills($bills)
    {
        $data = ['bills' => $bills];
        $json = json_encode($data);
        file_put_contents($this->source, $json);
    }

}