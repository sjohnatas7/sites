<?php


use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Source\Models\Produto;

$app->group('/v1', function (Group $group) {
    $group->get('/produtos/lista', function($request, $response){
        $produtos = Produto::all();

        $response->getBody()->write(json_encode($produtos));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });
    $group->post('/produtos/adiciona', function($request, $response){
        $dados = $request->getParsedBody();
        $produto = Produto::create($dados);
        $response->getBody()->write(json_encode($produto));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });
    $group->get('/produtos/lista/{id}', function($request, $response, $args){
        $produtos = Produto::find($args['id']);
        $response->getBody()->write(json_encode($produtos));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });
    $group->put('/produtos/atualiza/{id}', function($request, $response, $args){
        $dados = $request->getParsedBody();
        $produtos = Produto::find($args['id']);
        $produtos->update($dados);
        $response->getBody()->write(json_encode($produtos));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });
    $group->get('/produtos/delete/{id}', function($request, $response, $args){
        $produtos = Produto::find($args['id']);
        $response->getBody()->write(json_encode($produtos));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    });
});