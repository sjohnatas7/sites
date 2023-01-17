<?php


use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Application\Settings\SettingsInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Models\Usuario;
use Firebase\JWT\JWT;

$app->post('/v1/token', function (Request $request, Response $response) {
    $dados = $request->getParsedBody();
    $email = $dados['email'] ?? null;
    $senha = $dados['senha'] ?? null;
    $usuario = Usuario::where('email',$email)->first();
    if(!is_null($usuario)&&$senha==$usuario->senha){
        $settings = $this->get(SettingsInterface::class);
        $secretKey = $settings->get('secretKey');
        $token = $settings->get('token');
        $jwt = JWT::encode($token, $secretKey,'RS256');
        $response->getBody()->write(json_encode($jwt));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
    $response->getBody()->write(json_encode($usuario));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
});