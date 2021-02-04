<?php
echo '<style type="text/css" media="all">
.answer { width: 30vw; padding: 3% 5%; margin: 10% auto 15% auto; font-family: "SF", sans-serif; font-size: 1.2vw; }
</style>';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {$email = $_POST['email'];}
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
    if (isset($_POST['name'])) {$name = $_POST['name'];}
    if (isset($_POST['brand'])) {$brand = $_POST['brand'];}
    if (isset($_POST['year'])) {$year = $_POST['year'];}
    if (isset($_POST['power'])) {$power = $_POST['power'];}
    if (isset($_POST['volume'])) {$volume = $_POST['volume'];}
    if (isset($_POST['engine'])) {$engine = $_POST['engine'];}
    if (isset($_POST['fuel'])) {$fuel = $_POST['fuel'];}
    if (isset($_POST['services'])) {$services = $_POST['services'];}
    if (isset($_POST['message'])) {$message = $_POST['message'];}
    
 
    $to = "stopchek@gmail.com";
    $sendfrom   = "$email";
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "Отзыв с сайта";
    $message = "
        <b>Телефон:</b> $phone
        <br/>
        <b>Имя:</b> $name
        <br/>
        <b>Марка, модель авто:</b> $brand
        <br/>
        <b>Год выпуска, пробег:</b> $year
        <br/>
        <b>Мощьность л.с.:</b> $power
        <br/>
        <b>Обьём:</b> $volume
        <br/>
        <b>Двигатель:</b> $engine
        <br/>
        <b>Топливо:</b> $fuel
        <br/>
        <b>Интересуемые услуги:</b> $services
        <br/>
        <b>Свой вариант:</b> $message";
    $send = mail ($to, $subject, $message, $headers);
    if ($send == 'true')
    {
        echo '<div class="answer">
                Спасибо за отправку вашего сообщения!
               </div>';
    }
    else
    {echo '<div class="answer">
                <b>Ошибка. Сообщение не отправлено!</b>
            </div>';
    }
} else {
    http_response_code(403);
    echo "Попробуйте еще раз";
}?>