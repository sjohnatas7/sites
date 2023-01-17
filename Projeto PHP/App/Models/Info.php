<?php

namespace App\Models;

use MF\Model\Model;

class Info extends Model{
    
    public function getInfo(){
        try{
        $query = 'select titulo, descricao from tb_info';
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }catch(\PDOException $e){
            echo $e->getMessage();
        }
    }
}