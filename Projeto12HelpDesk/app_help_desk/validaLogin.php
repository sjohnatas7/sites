<?php
    session_start();
    $usuario_autenticado=false;
    $usuario_id=null;
    $usuarios_app=[
        ['email'=>'adm@teste.com','senha'=>'026159','id'=>1,'tipo_perfil'=>1],
        ['email'=>'user@teste.com','senha'=>'026159','id'=>2,'tipo_perfil'=>1],
        ['email'=>'jose@teste.com','senha'=>'123456','id'=>3,'tipo_perfil'=>2],
        ['email'=>'maria@teste.com','senha'=>'123456','id'=>4,'tipo_perfil'=>2],
    ];
    foreach($usuarios_app as $user){
        if($user['email']==$_POST['email']&&$user['senha']==$_POST['senha']){
            $usuario_autenticado=true;
            $usuario_id=$user['id'];
            $usuario_tipo=$user['tipo_perfil'];
        }
    }
    if($usuario_autenticado){
        $_SESSION['autenticado']='SIM';
        $_SESSION['id']=$usuario_id;
        $_SESSION['tipo_perfil']=$usuario_tipo;
        header('Location: home.php');
    }else{
        $_SESSION['autenticado']='NAO';
        header('Location: index.php?login=erro');
    }


?>