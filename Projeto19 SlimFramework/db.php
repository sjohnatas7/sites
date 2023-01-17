<?php 
use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

if(PHP_SAPI != 'cli'){
    return 'Rodar via CLI';
}
require __DIR__ . '/vendor/autoload.php';

// Set up settings
if (false) { // Should be set to true in production
	$containerBuilder->enableCompilation(__DIR__ . '/var/cache');
}
$containerBuilder = new ContainerBuilder();

$settings = require __DIR__ . '/app/settings.php';
$settings($containerBuilder);

// Set up dependencies
$dependencies = require __DIR__ . '/app/dependencies.php';
$dependencies($containerBuilder);
$container = $containerBuilder->build();

AppFactory::setContainer($container);
$app = AppFactory::create();
$db = $container->get('db');
$schema = $db->schema();

$tabela = 'produtos';
$schema->dropIfExists($tabela);
$schema->create($tabela,function($table){
    $table->increments('id');
    $table->string('titulo',100);
    $table->text('descricao');
    $table->decimal('preco',11,2);
    $table->string('fabricante',60);
    $table->timestamps();
});
$db->table($tabela)->insert([
    'titulo'=>'Smartphone Motorola Moto G6',
    'descricao'=>'Android Oreo - 8.0 Tela 5,7 Octa-Core',
    'preco'=>889.00,
    'fabricante'=>'Motorola',
    'created_at'=>'2022-12-31',
    'updated_at'=>'2022-12-31'
]);
$db->table($tabela)->insert([
    'titulo'=>'Iphone X Cinza Espacial 64GB',
    'descricao'=>'Tela 5.8 IOS 12 $G Wi-fi Câmera 12MP',
    'preco'=>4999.00,
    'fabricante'=>'Apple',
    'created_at'=>'2023-01-20',
    'updated_at'=>'2023-01-20'
]);
