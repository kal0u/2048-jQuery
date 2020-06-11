(function ($) // début du pluggin
{
    $.fn.game2048 = function () //function game2048 du pluggin
    {
        let size_x = 4;
        let size_y = 4;
        var move;
        var score = 0;
        var canMoveLeft =1;
        var canMoveUp =1;
        var canMoveDown =1;
        var canMoveRight =1;
        $(this).append("<h2> 2048 </h2>")
        $(this).append("<div id='score'> Score = " + score + "</div>")
        $(this).append("<div class='wrapper'> <button id='replay'> Restart ! </button></div>")
        $(this).append("<audio id='audio'> <source src='zelda.wav' type='audio/mpeg'></audio>")
        $(this).append(generate_map(size_x, size_y));


        generate_tiles(2, size_x, size_y);

        function generate_map(size_x, size_y) {

            var table = $('<table></table>');
            for (let y = 0; y < size_y; y++) {
                let ligne = $('<tr></tr>');
                for (let x = 0; x < size_x; x++) {

                    let kase = $('<td></td>').attr('x', x).attr('y', y).attr('nbr', 0).attr('played', false);
                    ligne.append(kase);
                }
                table.append(ligne);

            }
            return table;
        }

        function initiate() {
            $('td').each(function () {
                $(this).attr("played", false);
            })
        };

        function myScore() {
            element = $('#score');
            element.empty();
            element.append("Score  = "+score);
        }

        $( "#replay" ).click(function() {
            $('table').remove();
            $('body').append(generate_map(size_x, size_y));
            generate_tiles(2, size_x, size_y);
            score = 0;
          });

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        function generate_tile_value() {
            if (getRandomInt(3) == 0)
                return 4;
            else
                return 2;
        }


        function generate_tiles(nbr_tiles, size_x, size_y) {
            for (let index = 0; index < nbr_tiles; index++) {
                x = getRandomInt(size_x);
                // console.log("value of x = " + x);
                y = getRandomInt(size_y);
                // console.log("value of y = " + y);
                if ($("td[x*='" + x + "'][y*='" + y + "']").attr('nbr') != 0) {
                    generate_tiles(nbr_tiles - index, size_x, size_y);
                }
                else {
                    value = generate_tile_value();
                    if (value == 2) {
                        $("td[x*='" + x + "'][y*='" + y + "']").attr('nbr', value).addClass("color_"+2);

                    }
                    else if (value == 4) {
                        $("td[x*='" + x + "'][y*='" + y + "']").attr('nbr', value).addClass("color_"+4);

                    }
                    $("td[x*='" + x + "'][y*='" + y + "']").append(value);
                }

            }
        }
        $("body").keydown(function (event) {
            
            $('#audio')[0].play();
            
            if (event.which == 37) {
                console.log("Moving left");
                moveLeft();
                console.log(move);
                if (move == true) {
                    generate_tiles(1, size_x, size_y);
                    canMoveLeft = 1;
                }
                else
                canMoveLeft = 0;
                
                initiate();
                myScore();
            }
            else if (event.which == 38) {
                console.log("Moving up !");
                moveUp();
                console.log(move);

                if (move == true) {
                    generate_tiles(1, size_x, size_y);
                    canMoveUp = 1;
                }
                else{
                    canMoveUp = 0;
                }
                initiate();
                myScore();
            }
            else if (event.which == 39) {
                console.log("Moving right !");
                moveRight();
                console.log(move);

                if (move == true) {
                    generate_tiles(1, size_x, size_y);
                    canMoveRight =1;
                }
                else
                canMoveRight = 0;
                
                initiate();
                myScore();
            }
            else if (event.which == 40) {
                console.log("Moving down !");
                moveDown();
                console.log(move);

                if (move == true) {
                    generate_tiles(1, size_x, size_y);
                    canMoveDown = 1;
                }
                else
                canMoveDown =0;
                
                initiate();
                myScore();
            }
            console.log(canMoveLeft);
            console.log(canMoveUp);
            console.log(canMoveDown);
            console.log(canMoveRight);
            if (canMoveDown == 0 && canMoveUp == 0 && canMoveRight == 0 && canMoveLeft ==0 )
            {
                alert("GAME OVER");
            }
        });

        function moveRight() {
            move = false;
            for (let y = 0; y < size_y; y++) {
                for (let x = size_x - 1; x > 0; x--) {

                    let cell = $("td[x*='" + x + "'][y*='" + y + "']");
                    let cellComp = $("td[x*='" + (x - 1) + "'][y*='" + y + "']")
                    let value_cell = cell.attr('nbr');
                    let value_cellComp = cellComp.attr('nbr');
                    let cell_pl = cell.attr("played");
                    let cell_comp_pl = cellComp.attr("played");

                    if (value_cell == 0 && value_cellComp != value_cell) {
                        cell.attr('nbr', value_cellComp);
                        cell.attr('empty', false)
                        cell.text(value_cellComp);
                        cellComp.attr('nbr', 0);
                        cellComp.attr("empty", true);
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+value_cellComp);
                        // x = size_x;
                        move = true;
                    }
                    if (value_cell == value_cellComp && value_cell != 0 && cell_pl == "false" && cell_comp_pl == "false") {
                        console.log("move " + value_cell + "vers" + value_cellComp)
                        let n_value = value_cell * 2;
                        cell.attr('nbr', n_value);
                        cell.text(n_value);
                        cell.attr("played", true)
                        cellComp.attr("nbr", 0)
                        cellComp.attr("empty", true)
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+n_value);
                        // x = size_x;
                        move = true;
                        score = score + n_value;
                        console.log("score is " + score)
                        if (n_value == 2048) {
                            alert("Victory !!!");
                        }


                    }

                }
            }
        }
        function moveLeft() {
            move = false;
            for (let y = 0; y < size_y; y++) {
                for (let x = 0; x < size_x - 1; x++) {

                    let cell = $("td[x*='" + x + "'][y*='" + y + "']");
                    let cellComp = $("td[x*='" + (x + 1) + "'][y*='" + y + "']")
                    let value_cell = cell.attr('nbr');
                    let value_cellComp = cellComp.attr('nbr');
                    let cell_pl = cell.attr("played");
                    let cell_comp_pl = cell.attr("played");

                    if (value_cell == 0 && value_cellComp != value_cell) {
                        // console.log(move);

                        cell.attr('nbr', value_cellComp);
                        cell.attr('empty', false)
                        cell.text(value_cellComp);
                        cellComp.attr('nbr', 0);
                        cellComp.attr("empty", true);
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+value_cellComp);


                        x = -1;
                        move = true;
                    }
                    if (value_cell == value_cellComp && value_cell != 0 && cell_pl == "false" && cell_comp_pl == "false") {
                        console.log("move " + value_cell + "vers" + value_cellComp)
                        let n_value = value_cell * 2;
                        cell.attr('nbr', n_value);
                        cell.text(n_value);
                        cell.attr("played", true)
                        cellComp.attr("nbr", 0)
                        cellComp.attr("empty", true)
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+n_value);
                        x = size_x;
                        move = true;
                        score = score + n_value;
                        console.log("score is " + score)
                        if (n_value == 128) {
                            alert("Victory !!!");
                        }

                    }

                }
            }
        }


        function moveDown() {
            move = false;
            for (let x = 0; x < size_x; x++) {
                for (let y = size_y - 1; y > 0; y--) {
                    let cell = $("td[x*='" + x + "'][y*='" + y + "']");
                    let cellComp = $("td[x*='" + (x) + "'][y*='" + (y - 1) + "']")
                    let value_cell = cell.attr('nbr');
                    let value_cellComp = cellComp.attr('nbr');
                    let cell_pl = cell.attr("played");
                    let cell_comp_pl = cell.attr("played");

                    if (value_cell == 0 && value_cellComp != value_cell) {

                        cell.attr('nbr', value_cellComp);
                        cell.attr('empty', false)
                        cell.text(value_cellComp);
                        cellComp.attr('nbr', 0);
                        cellComp.attr("empty", true);
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+value_cellComp);


                        x = -1;
                        y = size_y - 1;
                        move = true;
                    }
                    if (value_cell == value_cellComp && value_cell != 0 && cell_pl == "false" && cell_comp_pl == "false") {
                        console.log("move " + value_cell + "vers" + value_cellComp)
                        let n_value = value_cell * 2;
                        cell.attr('nbr', n_value);
                        cell.text(n_value);
                        cell.attr("played", true)
                        cellComp.attr("nbr", 0)
                        cellComp.attr("empty", true)
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+n_value);
                        x = -1;
                        y = size_y - 1;
                        move = true;
                        score = score + n_value;
                        console.log("score is " + score)
                        if (n_value == 128) {
                            alert("Victory !!!");
                        }

                    }

                }
            }
        }
        function moveUp() {
            move = false;
            for (let x = 0; x < size_x; x++) {
                for (let y = size_y - 1; y >= 0; y--) {

                    let cell = $("td[x*='" + x + "'][y*='" + y + "']");
                    let cellComp = $("td[x*='" + x + "'][y*='" + (y + 1) + "']")
                    let value_cell = cell.attr('nbr');
                    let value_cellComp = cellComp.attr('nbr');
                    let cell_pl = cell.attr("played");
                    let cell_comp_pl = cell.attr("played");

                    if (value_cell == 0 && value_cellComp != value_cell) {

                        cell.attr('nbr', value_cellComp);
                        cell.attr('empty', false)
                        cell.text(value_cellComp);
                        cellComp.attr('nbr', 0);
                        cellComp.attr("empty", true);
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+value_cellComp);


                        move = true;

                        // x = -1;
                        y = size_y - 1;
                    }
                    if (value_cell == value_cellComp && value_cell != 0 && cell_pl == "false" && cell_comp_pl == "false") {
                        console.log("move " + value_cell + "vers" + value_cellComp)
                        let n_value = value_cell * 2;
                        cell.attr('nbr', n_value);
                        cell.text(n_value);
                        cell.attr("played", true)
                        cellComp.attr("nbr", 0)
                        cellComp.attr("empty", true)
                        cellComp.text("");
                        cellComp.removeClass();
                        cell.addClass("color_"+n_value);
                        x = -1;
                        y = size_y - 1;
                        move = true;
                        score = score + n_value;
                        console.log("score is " + score)
                        if (n_value == 128) {
                            alert("Victory !!!");
                        }
                    }

                }
            }
        }
    }
})(jQuery);
