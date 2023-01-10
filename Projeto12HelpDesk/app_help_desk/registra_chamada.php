<?php
    session_start();

    $filename = 'arquivo.txt';
    $titulo=str_replace('#','id: ',$_POST['titulo']);
    $categoria=str_replace('#','id: ',$_POST['categoria']);
    $descricao=str_replace('#','id: ',$_POST['descricao']);
    $texto = $_SESSION['id'] . '#' . $titulo . '#' . $categoria . '#' . $descricao . "\n" ;
    // Let's make sure the file exists and is writable first.

    // In our example we're opening $filename in append mode.
    // The file pointer is at the bottom of the file hence
    // that's where $somecontent will go when we fwrite() it.
    if (!$fp = fopen($filename, 'a')) {
         echo "Cannot open file ($filename)";
         exit;
    }

    // Write $somecontent to our opened file.
    if (fwrite($fp, $texto) === FALSE) {
        echo "Cannot write to file ($filename)";
        exit;
    }

    // echo "Success, wrote ($texto) to file ($filename)";

    fclose($fp);
    header("Location: abrir_chamado.php")


?>



    