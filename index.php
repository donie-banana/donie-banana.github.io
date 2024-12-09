<!DOCTYPE html>
<html lang="en">
<head>
    <title>Overzicht Localhost</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="stylesheet.css">
</head>
<body>
    <div id="overzicht">
        <?php
        $ip = $_SERVER['REMOTE_ADDR'];

        $dirItems = scandir(__DIR__);
        foreach ($dirItems as $item) {
            $check = true;
            if ($ip != '::1' && $item == '..') {
                $check = false;
            } else {
                echo '<script>console.log("its me. '.$ip.'");</script>';
            }

            if ($item !== '.' && $item !== '.git' && is_dir(__DIR__ . DIRECTORY_SEPARATOR . $item) && $check) {
                ?>
                <a href="<?= htmlspecialchars($item); ?>" class="item"><?= htmlspecialchars($item); ?></a>
                <?php
            }
        }
        ?>
    </div>
</body>
</html>
