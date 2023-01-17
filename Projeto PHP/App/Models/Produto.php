<?php

namespace App\Models;
use MF\Model\Model;


class Produto extends Model{
    public function getProdutos(){
        try{
        $query = 'select id, descricao, preco from tb_produtos';
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }catch(\PDOException $e){
            echo $e->getMessage();
        }
    }
}