<?
header('Content-type: application/json');

$response = array(
    'status' => 200,
    'suggestions' => array(
        'first'     => 'first suggestion',
        'second'    => 'second suggestion',
        'third'     => 'third suggestion',
        'fourth'    => 'fourth suggestion',
    )
);

echo json_encode($response);

?>