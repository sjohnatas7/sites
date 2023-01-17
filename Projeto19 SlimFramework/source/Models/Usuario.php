<?php 
namespace Source\Models;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model{
    protected $fillable=['nome','id','email','senha'];
}