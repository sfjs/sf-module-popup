<?
header('Content-type: application/json');

$response = array(
    'status' => 200,
    'template' => '
    <form action="{{url}}.php" class="js-sf-form">
    <h1>Template from server</h1>
    <h2>Hello, {{name}}</h2>

    <div>Yet another template received via ajax call from server</div>
    <br>
    <div class="footer">
        <button class="submit">{{buttons.labels.first}}</button>
    </div>
    </form>
    '
);

echo json_encode($response);

?>