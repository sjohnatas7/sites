<?php

declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;

return function (App $app) {
    $app->add(function (){
        
    });
    $app->add(SessionMiddleware::class);
};
