<?php

require_once __DIR__ . '/../vendor/autoload.php';
// Enable PHP Error level
error_reporting(E_ALL);
ini_set('display_errors', 'On');


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$app = new Silex\Application();
$app['debug'] = true;// Enable debug mode
$billPayDb = new \Api\BillsJsonDb(__DIR__ . '/resources/bills-pay.json');
$billReceiveDb = new \Api\BillsJsonDb(__DIR__ . '/resources/bills-receive.json');

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills-pay', function () use ($app, $billPayDb) {
    $bills = $billPayDb->getBills();
    return $app->json($bills);
});

$app->get('api/bills-pay/total-to-pay', function () use ($app, $billPayDb) {
    $bills = $billPayDb->getBills();
    $sum = 0;
    foreach ($bills as $value) {
        if (!$value['done']) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['to_pay' => $sum]);
});

$app->get('api/bills-pay/total-paid', function () use ($app, $billPayDb) {
    $bills = $billPayDb->getBills();
    $sum = 0;
    foreach ($bills as $value) {
        if ($value['done']) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['paid' => $sum]);
});

$app->get('api/bills-pay/{id}', function ($id) use ($app, $billPayDb) {
    $bills = $billPayDb->getBills();
    $bill = $bills[$billPayDb->findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills-pay', function (Request $request) use ($app, $billPayDb) {
    $bills = $billPayDb->getBills();
    $data = $request->request->all();
    $data['id'] = rand(100, 100000);
    $bills[] = $data;
    $billPayDb->writeBills($bills);
    return $app->json($data);
});

$app->put('api/bills-pay/{id}', function (Request $request, $id) use ($app, $billPayDb) {
    $bills = $billPayDb->getBills();
    $data = $request->request->all();
    $index = $billPayDb->findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    $billPayDb->writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-pay/{id}', function ($id) use ($billPayDb) {
    $bills = $billPayDb->getBills();
    $index = $billPayDb->findIndexById($id);
    array_splice($bills, $index, 1);
    $billPayDb->writeBills($bills);
    return new Response("", 204);
});

/** bills  receive*/

$app->get('api/bills-receive', function () use ($app, $billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    return $app->json($bills);
});

$app->get('api/bills-receive/total-to-receive', function () use ($app, $billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    $sum = 0;
    foreach ($bills as $value) {
        if (!$value['done']) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['to_receive' => $sum]);
});

$app->get('api/bills-receive/total-received', function () use ($app, $billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    $sum = 0;
    foreach ($bills as $value) {
        if ($value['done']) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['received' => $sum]);
});

$app->get('api/bills-receive/{id}', function ($id) use ($app, $billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    $bill = $bills[$billReceiveDb->findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills-receive', function (Request $request) use ($app, $billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    $data = $request->request->all();
    $data['id'] = rand(100, 100000);
    $bills[] = $data;
    $billReceiveDb->writeBills($bills);
    return $app->json($data);
});

$app->put('api/bills-receive/{id}', function (Request $request, $id) use ($app, $billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    $data = $request->request->all();
    $index = $billReceiveDb->findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    $billReceiveDb->writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receive/{id}', function ($id) use ($billReceiveDb) {
    $bills = $billReceiveDb->getBills();
    $index = $billReceiveDb->findIndexById($id);
    array_splice($bills, $index, 1);
    $billReceiveDb->writeBills($bills);
    return new Response("", 204);
});

$app->match("{uri}", function ($uri) {
    return "OK";
})
    ->assert('uri', '.*')
    ->method("OPTIONS");


$app->run();