document.getElementById("menuOpener").addEventListener("mouseover", openMenu)
document.getElementById("menu").addEventListener("mouseleave", closeMenu)
document.querySelector("#level1").addEventListener("click", level1)
document.getElementById("level2").addEventListener("click", level2)
document.getElementById("level3").addEventListener("click", level3)
document.querySelector("#newGame").addEventListener("click", reload)
document.querySelector("#playAgain").addEventListener("click", reload)
document.getElementById("level3").addEventListener("click", level3)

let height, weight, flags, mat, randCol, randRow, tempMat, flagsValue = 9, table, tr, td, img, i = -1,
    j = -1, id, boolMat, timer = 0, status1, isFirst = 0, tempFlag, canContinue = 0,name2
function isContinue() {//המשך המשחק שנעצר באמצע באם התבקש
    if (localStorage.getItem("ifNew") == 1) {
        height = localStorage.getItem("height")
        weight = localStorage.getItem("weight")
        tempFlag = Number(localStorage.getItem("tempFlag"))
        flags = Number(localStorage.getItem("flags"))
        timer = Number(localStorage.getItem("timer"))
        name2=localStorage.getItem("name1")
        let index = 0;
        let temp = localStorage.getItem("mat").split(",");
        mat = new Array(height)
        for (let i = 0; i < height; i++) {
            mat[i] = new Array(weight)
        }
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < weight; j++) {
                mat[i][j] = temp[index++];
            }
        }
        index = 0;
        temp = localStorage.getItem("boolMat").split(",");
        boolMat = new Array(height)
        for (let i = 0; i < height; i++) {
            boolMat[i] = new Array(weight)
        }
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < weight; j++) {
                boolMat[i][j] = temp[index++];
            }
        }
        document.getElementById("timer").innerHTML = timer;
        document.getElementById("countFlag").innerHTML = tempFlag;
        createGameBoard();
    }
    else
        level1();
}
function openMenu() {
    document.getElementById("menu").style.top = "-0.5vw"
}
function closeMenu() {
    document.getElementById("menu").style.top = "-18vw"

}
//שליחת נתונים ע"פ הרמה שנבחרה
function level1() {
    load(8, 8, 10);
}
function level2() {
    load(10, 17, 30);
}
function level3() {
    load(13, 29, 99);
}
function reload() //כשלוחץ משחק חדש
{
    document.getElementById("alert").style.display = "none"
    isFirst = 0
    load(height, weight, flags)
}
function load(height1, weight1, flags1) {//טעינת המשחק
    name2=localStorage.getItem("name1")
    canContinue = 0;//איפוס כדי שיהיה אפשר ללחוץ
    document.getElementById("timer").innerHTML = "00";
    document.getElementById("countFlag").innerHTML = flags1;
    timer = 0;
    height = height1;
    weight = weight1;
    flags = flags1;
    tempFlag = flags1;
    mat = new Array(height1)
    for (let i = 0; i < height1; i++) {
        mat[i] = new Array(weight1)
    }
    for (let i = 0; i < height1; i++) {
        for (let j = 0; j < weight1; j++) {
            mat[i][j] = 0;
        }
    }
    randflags(height1, weight1, flags1)
    fillMat();
    fillBoolMat();
    createGameBoard();
}
function randflags(height1, weight1, flags1) {//הגרלת מיקומי המוקשים
    for (let j = 0; j < flags1; j++) {
        randCol = Math.round(Math.random() * (weight1 - 1));
        randRow = Math.round(Math.random() * (height1 - 1));
        //console.log(mat[randCol][randRow]);
        while (mat[randRow][randCol] == flagsValue) {
            randCol = Math.round(Math.random() * (weight1 - 1));
            randRow = Math.round(Math.random() * (height1 - 1));
        }
        mat[randRow][randCol] = flagsValue;
    }
}
function fillMat() {//מילוי המיקומים ע"פ מספר המוקשים שמסביב
    tempMat = new Array(height + 2)
    for (let i = 0; i < height + 2; i++) {
        tempMat[i] = new Array(weight + 2)
    }
    for (let i = 0; i < height + 2; i++)//הקצאת מטריצת מסגרת 
    {
        for (let j = 0; j < weight + 2; j++) {
            tempMat[i][j] = 10;
        }
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < weight; j++) {
            tempMat[i + 1][j + 1] = mat[i][j];
        }
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < weight; j++) {
            if (tempMat[i + 1][j + 1] != flagsValue) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (tempMat[i + k][j + l] == flagsValue) {
                            tempMat[i + 1][j + 1]++;
                        }
                    }
                }
            }
        }
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < weight; j++) {
            mat[i][j] = tempMat[i + 1][j + 1];
        }
    }
}
function fillBoolMat() {
    boolMat = new Array(height)
    for (let i = 0; i < height; i++) {
        boolMat[i] = new Array(weight)
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < weight; j++) {
            boolMat[i][j] = 0;
        }
    }
}
function createGameBoard() {//יצירת לוח המשחק
    table = document.createElement("table");
    for (let i = 0; i < height; i++) {//יוצר את ה-tr
        tr = document.createElement("tr");
        for (let j = 0; j < weight; j++) {//יוצר את כל הtd
            td = document.createElement("td");
            td.setAttribute("id", "i" + i + "j" + j)//i1j2---t1
            td.classList.add("tdSquares")
            img = document.createElement("img")
            let src;
            if (boolMat[i][j] == 0)
                src = "../images/square.png";
            else if (boolMat[i][j] == flagsValue) {
                src = "../images/flag.png"
            }
            else {
                src = "../images/p" + mat[i][j] + ".png";
            }
            img.setAttribute("src", src)
            img.classList.add("square")
            td.appendChild(img)
            if (flags == 99)
                td.classList.add("large")
            else if (flags == 10)
                td.classList.add("small")
            else
                td.classList.add("big")
            td.addEventListener("click", click1)
            td.addEventListener("contextmenu", addflags)
            if(boolMat[i][j]!=0&&boolMat[i][j]!=flagsValue)
                td.addEventListener("dblclick", doubleClick)

            tr.appendChild(td)

        }
        table.appendChild(tr)
    }
    document.getElementById("myTable").innerHTML = ""
    document.getElementById("myTable").appendChild(table)


}
function addflags() {//הוספה או מחיקה של הדגלים
    if (isFirst == 0) {
        isFirst = 1;
        countSeconds();
    }
    event.preventDefault()
    let indexj;
    id = event.target.parentElement.id;
    if (id === "")
        return;
    indexj = id.indexOf("j");
    i = Number(id.substr(1, indexj - 1))
    j = Number(id.substr(indexj + 1, id.length - indexj))
    if (boolMat[i][j] == flagsValue) {
        event.target.setAttribute("src", "../images/square.png")
        tempFlag++;
        document.getElementById("countFlag").innerHTML = tempFlag;
        boolMat[i][j] = 0;

    }
    else if (boolMat[i][j] == 0 && tempFlag > 0) {
        event.target.setAttribute("src", "../images/flag.png")
        tempFlag--;
        boolMat[i][j] = flagsValue;
        document.getElementById("countFlag").innerHTML = tempFlag;
        //חדש
        if (tempFlag == 0) {
            isWin();
        }
        //
    }

}
function click1() {//פתיחת מיקום בלחיצה שמאלית
 
    let indexj;
    id = event.target.parentElement.id;
    if (id === "" || canContinue == 1)//מונע אפשרןת של לחיצה במקרה של ניצחון או כישלון
        return;
    indexj = id.indexOf("j");
    i = Number(id.substr(1, indexj - 1))
    j = Number(id.substr(indexj + 1, id.length - indexj))
    if (boolMat[i][j] != 0) {
        return;
    }
    if (mat[i][j] == flagsValue) {
        if (isFirst == 0){
            load(height, weight, flags)
            click1()
        }
        else{
            bombs();
        return;
        }   
    }
    if (mat[i][j] == 0) {
        zero1(i, j);
        console.log(mat)
    }
    else {
        let src = "../images/p" + mat[i][j] + ".png";
        document.getElementById("i" + i + "j" + j).firstChild.setAttribute("src", src);
        document.getElementById("i" + i + "j" + j).addEventListener("dblclick", doubleClick);//לחיצה כפולה
        boolMat[i][j] = 1;
        playAudio("a5");

    }
    if (isFirst == 0) {
        isFirst = 1;
        countSeconds();
    }
    console.log("i=", i, "j=", j);
}
function zero1(x1, y1) {//בלחיצה על אפס
    let x = Number(x1);
    let y = Number(y1);
    if (x >= height || y >= weight || x <= -1 || y <= -1 || boolMat[x][y] != 0) {
        return;
    }
    if (mat[x][y] != 0) {
        let src = "../images/p" + mat[x][y] + ".png";
        document.getElementById("i" + x + "j" + y).firstChild.setAttribute("src", src);
        document.getElementById("i" + x + "j" + y).addEventListener("dblclick", doubleClick);//לחיצה כפולה
        boolMat[x][y] = 1;
        playAudio("a5");
        return;
    }
    boolMat[x][y] = 1;
    let src = "../images/p" + mat[x][y] + ".png";
    document.getElementById("i" + x + "j" + y).firstChild.setAttribute("src", src)
    //event.target.setAttribute("src",src)
    zero1(x - 1, y - 1);
    zero1(x - 1, y);
    zero1(x - 1, y + 1);
    zero1(x + 1, y - 1);
    zero1(x + 1, y + 1);
    zero1(x + 1, y);
    zero1(x, y + 1);
    zero1(x, y - 1);
}
function doubleClick() {//לחיצה כפולה
    let indexj;
    id = event.target.parentElement.id;
    if (id === "")
        return;
    indexj = id.indexOf("j");
    i = Number(id.substr(1, indexj - 1))
    j = Number(id.substr(indexj + 1, id.length - indexj))
    let bla = mat[i][j], mistake = 0;
    for (let n = i - 1; n <= i + 1; n++) {
        for (let m = j - 1; m <= j + 1; m++) {//שינוי
            if (n >= 0 && n < height && m >= 0 && m < weight) {
                if (boolMat[n][m] == flagsValue)
                    bla--;
            }
        }
    }
    if (bla == 0) {
        for (let n = i - 1; n <= i + 1; n++) {
            for (let m = j - 1; m <= j + 1; m++) {//שינוי
                if (n >= 0 && n < height && m >= 0 && m < weight) {
                    if (boolMat[n][m] == flagsValue) {
                        if (mat[n][m] != flagsValue) {
                            mistake = 1;
                        }
                    }
                    else if(mat[n][m]==0)
                        zero1(n,m)
                    if (boolMat[n][m] == 0 && mat[n][m] != flagsValue) {
                        let src = "../images/p" + mat[n][m] + ".png";
                        document.getElementById("i" + n + "j" + m).firstChild.setAttribute("src", src)
                        document.getElementById("i" + n + "j" + m).addEventListener("dblclick", doubleClick);//לחיצה כפולה

                        boolMat[n][m] = 1;
                    }
                }
            }
        }
        if (mistake == 1) {
            bombs();
        }
    }
    else
        return;


}
function bombs() {//התפוצצות
    event.target.setAttribute("src", "../images/redBomb.png")
    for (let i1 = 0; i1 < height; i1++) {
        for (let j1 = 0; j1 < weight; j1++) {
            if (mat[i1][j1] == flagsValue) {
                        document.getElementById("i" + i1 + "j" + j1).firstChild.
                        setAttribute("src", "../images/bomb.png");
                        playAudio("a4");
            }
        }
    }
    event.target.setAttribute("src", "../images/redBomb.png")
    playAudio("a4");
    endGame();

}
function countSeconds() {//טיימר
    status1 = setInterval("upSeconds()", 1000)
}
function upSeconds() {//עדכון טיימר
    timer = timer + 1;
    if (timer < 10)
        document.getElementById("timer").innerHTML = "0" + timer;
    else
        document.getElementById("timer").innerHTML = timer;
}
function endGame() {//כישלון
    isFirst=0;
    canContinue = 1;
    playAudio("a6");
    clearInterval(status1);
    setTimeout(() => {
        document.getElementById("alert").style.display = "flex";
        document.getElementById("text").innerHTML = "Oops, <span>"+name2+"</span> you stepped on a mine";
    }, 1000);
    localStorage.clear();
    localStorage.setItem("name1",name2);
}
function isWin() {//בדיקת ניצחון
    for (let n = 0; n < height; n++) {
        for (let m = 0; m < weight; m++) {
            if ((boolMat[n][m] == flagsValue && mat[n][m] != flagsValue) || boolMat[n][m] != flagsValue && mat[n][m] == flagsValue)
                return;
        }
    }
    win();
}
function win() {//ניצחון
    isFirst=0;
    canContinue = 1;
    document.getElementById("alert").style.display = "block";
    document.getElementById("text").innerHTML = "<span>"+name2+"</span> ,You did it!!!!! Shapooo!!";
    clearInterval(status1);
    playAudio("a7");
    localStorage.clear();
    localStorage.setItem("name1",name2);
}
function playAudio(num) {//שמע
    let audio1 = document.getElementById(num);
    audio1.play();
}
function unload() {//שמירת נתונים בסגירת המשחק
    if (canContinue == 0) {
        localStorage.setItem("height", height);
        localStorage.setItem("weight", weight);
        localStorage.setItem("tempFlag", tempFlag);
        localStorage.setItem("flags", flags);
        localStorage.setItem("mat", mat);
        localStorage.setItem("boolMat", boolMat);
        localStorage.setItem("timer", timer);
    }
}