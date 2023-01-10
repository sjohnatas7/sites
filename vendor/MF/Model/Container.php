<?php

namespace MF\Model;

    use App\Connection;
    class Container{
        public static function getModel($model){
            $class = "\\App\\Models\\".ucfirst($model);
            $conn = new Connection;
            $conn = $conn->getDb();
            return new $class($conn);
        }
    }

    ?>