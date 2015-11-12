<html>
    <head>
        <title></title>
        <script type="text/javascript">
            function verjson() {
                var json = document.getElementById("d1").innerHTML;

                json = eval("(" + json + ")");

                alert(json.chart.backgroundColor.linearGradient[3]);
            }
        </script>
    </head>
    <body>
        <div style="display:none;" id="d1">
            <?php
            $o = fopen("archivo.json", "r");
            while (!feof($o)) {
                $r = fread($o, filesize("archivo.json"));
                echo $r;
            }
            ?>
        </div>
        <input type="button" value="ver json" onclick="verjson();" />

    </body>
</html>