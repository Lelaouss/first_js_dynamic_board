// création du tableau JS
var tableauJS = new Array();

// récupération des input HTML
var sNom = document.getElementById("nom");
var sPrenom = document.getElementById("prenom");
var sMail = document.getElementById("mail");
var sTel = document.getElementById("tel");
var sVille = document.getElementById("ville");

// récupération du tbody HTML
var tabBody = document.getElementById("tabBody");

// compteur de lignes des tableaux HTML et JS
var iLines = 0;


// fonction qui ajoute une ligne au tableau
function addLine() {
    // création du nouveau tableau JS splité
    var tableauSplitted = new Array();

    // variables locales
    var i, line, cel, chkBox, celChkBox;

    // on parcours le tableau JS dont on split par les "§"
    tableauJS[iLines] = sNom.value+"§"+sPrenom.value+"§"+sMail.value+"§"+sTel.value+"§"+sVille.value;
    tableauSplitted = tableauJS[iLines].split("§");

    // création de la ligne HTML
    line = document.createElement("tr");
    tabBody.appendChild(line);
    // ajout d'ID sur chaque ligne
    line.setAttribute("id", "line"+iLines);

    // création de la cellule de checkbox
    celChkBox = document.createElement("td");
    celChkBox.setAttribute("class", "cel_checkBox");
    chkBox = document.createElement("input");
    chkBox.setAttribute("type", "checkbox");
    chkBox.setAttribute("name", "chk_personne");
    chkBox.setAttribute("onclick", "buttonDisplay()");
    // ajout d'ID sur chaque checkbox
    chkBox.setAttribute("id", "chk_personne"+iLines);
    // ajout de value sur chaque checkbox
    chkBox.setAttribute("value", iLines);
    line.appendChild(celChkBox).appendChild(chkBox);

    // on parcours le nouveau tableau splité pour remplir notre tableau HTML
    for (i=0; i<tableauSplitted.length; i++) {
        // création des cellules
        cel = document.createElement("td");
        // ajout de la détection de click sur chaque cellule autre que checkbox
        cel.setAttribute("onclick", "selectLine(" + iLines + ")");
        line.appendChild(cel);

        // remplissage des cellules avec le JS
        cel.textContent = tableauSplitted[i];
    }
    // remise à zéro des champs
    raz();
    // incrémentation du compteur des IDs
    iLines++;
}


// fonction de remise à zéro des champs
function raz() {
    // recupération des boutons "Ajouter" et "RAZ"
    var addButton = document.getElementById("ajouter");
    var modifyButton = document.getElementById("modifier");
    var razButton = document.getElementById("reset");

    // on vide tous les champs
    sNom.value = sPrenom.value = sMail.value = sTel.value = sVille.value = "";
    // on cache les boutons "Ajouter", "Modifier" et "RAZ"
    addButton.setAttribute("class", "hide");
    modifyButton.setAttribute("class", "hide");
    razButton.setAttribute("class", "hide");
}


// fonction qui passe checked toutes les checkbox
function selectAll() {
    // récupération de la checkbox d'en tête
    var checkHead = document.getElementById("allSelect");

    // tableau contenant toutes les checkbox
    var selectedLines = new Array;
    selectedLines = document.getElementsByName("chk_personne");

    // recupération des boutons
    var addButton = document.getElementById("ajouter");
    var delButton = document.getElementById("supprimer");

    // on parcours tous les éléments checkbox du tableau HTML
    for (i=0; i<iLines; i++) {
        // si la checkbox d'en tête est sélectionné elle check toutes les autres
        if (checkHead.checked) {
            selectedLines[i].checked = true;
            // on montre le bouton "Supprimer"
            delButton.setAttribute("class", "show");
            // on cache le bouton "Ajouter"
            addButton.setAttribute("class", "hide");
        // sinon si on la décoche elle décoche toutes les autres
        } else if (!checkHead.checked) {
            selectedLines[i].checked = false;
            // on cache tous les boutons
            buttonDisplay();
        }
    }
}


// fonction de remplissage des inputs lors du click sur la ligne et cochage de la checkbox de la ligne
function selectLine(iSelectedLine) {
    var selectedLine = document.getElementById("line"+iSelectedLine);
    var elementLine = selectedLine.querySelectorAll("td");

    // récupération de la checkbox de la ligne cliquée
    var checkBoxLine = document.getElementById("chk_personne"+iSelectedLine);

    // remplissage des inputs
    sNom.value = elementLine[1].textContent;
    sPrenom.value = elementLine[2].textContent;
    sMail.value = elementLine[3].textContent;
    sTel.value = elementLine[4].textContent;
    sVille.value = elementLine[5].textContent;

    // cochage de la checkbox de la ligne
    if (checkBoxLine.checked == false) {
        checkBoxLine.checked = true;
    } else {
        checkBoxLine.checked = false;
    }

    // affichage des boutons "RAZ" et "Ajouter"
    buttonDisplay();
}


// fonction de suppression de ligne
function delLine() {
    // variables compteurs
    var i;

    // variables
    var selectedLines, linesToDel;

    // on récupère toutes les checkbox
    var allTbodyCheckbox = new Array();
    allTbodyCheckbox = document.getElementsByName("chk_personne");

    // on parcours le nombre de checkbox et on récupère la value de celles qui sont cochées
    for (i=(iLines-1); i>=0; i--) {
        selectedLines = allTbodyCheckbox[i];
        if (selectedLines.checked) {
            // récupération de la value de la ligne sélectionnée
            linesToDel = selectedLines.value;
            // on supprime la ligne équivalente à la ligne à supprimer dans le tableauJS
            tableauJS.splice(linesToDel, 1);
        }        
    }
    // on vide le tableau HTML
    clearHTMLArray();
    // on regénère notre tableau HTML avec la ou les ligne(s) en moins
    buildHTMLArray();
    // on cache les boutons
    buttonDisplay();
}


// fonction qui vide le tableau HTML
function clearHTMLArray() {
    // variables locales
    var allLines, i;

    // on supprime d'abord toutes les lignes HTML
    for (i=0; i<iLines; i++) {
        allLines = document.getElementById("line"+i);
        allLines.remove();
    }
    // remise à zéro du compteur de lignes des tableaux
    iLines = 0;
}


// fonction qui regènere le tableau à partir du tableauJS existant
function buildHTMLArray() {
    // variables locales
    var i, iBuild, lineBuild, celChkBoxBuild, chkBoxBuild, celBuild;

    // tableau
    var tableauSplittedBuild = new Array();

    // récupération de la checkbox d'en tête
    var checkHead = document.getElementById("allSelect");

    // on reconstruit chaque ligne en HTML en parcourant le tableau JS
    for (iBuild=0; iBuild<tableauJS.length; iBuild++) {
        // on découpe le tableauJS
        tableauSplittedBuild = tableauJS[iBuild].split("§");

        // création de la ligne HTML
        lineBuild = document.createElement("tr");
        tabBody.appendChild(lineBuild);
        // ajout d'ID sur chaque ligne
        lineBuild.setAttribute("id", "line"+iBuild);

        // création de la cellule de checkbox
        celChkBoxBuild = document.createElement("td");
        celChkBoxBuild.setAttribute("class", "cel_checkBox");
        chkBoxBuild = document.createElement("input");
        chkBoxBuild.setAttribute("type", "checkbox");
        chkBoxBuild.setAttribute("name", "chk_personne");
        chkBoxBuild.setAttribute("onclick", "buttonDisplay()");
        // ajout d'ID sur chaque checkbox
        chkBoxBuild.setAttribute("id", "chk_personne"+iBuild);
        // ajout de value sur chaque checkbox
        chkBoxBuild.setAttribute("value", iBuild);
        lineBuild.appendChild(celChkBoxBuild).appendChild(chkBoxBuild);

        // on parcours le nouveau tableau splité pour remplir notre tableau HTML
        for (i=0; i<tableauSplittedBuild.length; i++) {
            // création des cellules
            celBuild = document.createElement("td");
            // ajout de la détection de click sur chaque cellule autre que checkbox
            celBuild.setAttribute("onclick", "selectLine(" + iBuild + ")");
            lineBuild.appendChild(celBuild);

            // remplissage des cellules avec le JS
            celBuild.textContent = tableauSplittedBuild[i];
        }
        // incrémentation du compteur des IDs
        iLines++;
    } 
    // on décoche la checkbox d'en tête si elle est cochée
    if (checkHead.checked) {
        checkHead.checked = false;
    }
    // remise à zéro des champs
    raz();
}


// fonction qui affiche ou cache les boutons en fonction des conditions
function buttonDisplay() {
    // recupération des boutons
    var addButton = document.getElementById("ajouter");
    var modifyButton = document.getElementById("modifier");
    var delButton = document.getElementById("supprimer");
    var razButton = document.getElementById("reset");

    // on récupère toutes les valeurs des champs input
    var allInputsTextValues = sNom.value+sPrenom.value+sMail.value+sTel.value+sVille.value;

    // variables
    var selectedLines, i;

    // compteur de checkbox cochées
    var nbCheckedLines = 0;

    // récupération de toutes les checkbox du tbody
    var allTbodyCheckbox = new Array();
    allTbodyCheckbox = document.getElementsByName("chk_personne");

    // récupération de la checkbox d'en tête
    var checkHead = document.getElementById("allSelect");


    // si les champs input sont remplis on montre les bouton "Ajouter" et "RAZ"
    if (allInputsTextValues != "") {
        razButton.setAttribute("class", "show");
        addButton.setAttribute("class", "show");
    // sinon on les cache
    } else if ((allInputsTextValues == "")) {
        razButton.setAttribute("class", "hide");
        addButton.setAttribute("class", "hide");
    }

    // on parcours les checkbox du tbody et on récupère le nombre de checkbox cochées
    for (i=0; i<iLines; i++) {
        selectedLines = allTbodyCheckbox[i];
        // si une ligne est cochée on incrémente le compteur de checkbox cochées
        if (selectedLines.checked) {
            nbCheckedLines++;
        }
    }
    // si une seule ligne est cochée dans le  tableau et que les champs ne sont pas vides
    if (nbCheckedLines == 1) {
        // si les champs input ne sont pas vides
        if (allInputsTextValues != "") {
            // affichage des boutons "Modifier", "RAZ" et "Supprimer"
            modifyButton.setAttribute("class", "show");
            razButton.setAttribute("class", "show");
            delButton.setAttribute("class", "show");
            // on cache le bouton "Ajouter"
            addButton.setAttribute("class", "hide");
        // sinon
        } else {
            // on cache les boutons "Ajouter", "Modifier" et "RAZ", on affiche le bouton "Supprimer"
            addButton.setAttribute("class", "hide");
            modifyButton.setAttribute("class", "hide");
            razButton.setAttribute("class", "hide");
            delButton.setAttribute("class", "show");
        }      
    // si plusieurs lignes sont cochées
    } else if (nbCheckedLines > 1) {
        // affichage bouton "Supprimer"
        delButton.setAttribute("class", "show");
        // on cache les boutons "Ajouter" et "Modifier"
        addButton.setAttribute("class", "hide");
        modifyButton.setAttribute("class", "hide");
    // si toutes les lignes sont décochées
    } else if (nbCheckedLines == 0) {
        // on cache les boutons "Modifier" et "Supprimer"
        modifyButton.setAttribute("class", "hide");
        delButton.setAttribute("class", "hide");
    }

    // si toutes les lignes sont cochées (au moins une) et on coche la checkbox d'en tête
    if ((nbCheckedLines == iLines) && (nbCheckedLines > 0)) {
        checkHead.checked = true;
    // sinon on la décoche
    } else {
        checkHead.checked = false;
    }
}


// fonction qui permet de modifier les valeurs d'une ligne
function modify() {
    // variables compteurs
    var i;

    // variables
    var selectedLine, lineToModify;

    // on récupère toutes les checkbox
    var allTbodyCheckbox = new Array();
    allTbodyCheckbox = document.getElementsByName("chk_personne");

    // on parcours le nombre de checkbox et on récupère la value de celle qui est cochée
    for (i=(iLines-1); i>=0; i--) {
        selectedLine = allTbodyCheckbox[i];
        if (selectedLine.checked) {
            // récupération de la value de la ligne sélectionnée
            lineToModify = selectedLine.value;
            // on change les valeurs de la ligne à modifier dans le tableauJS par celles contenues dans les champs input
            tableauJS[lineToModify] = sNom.value+"§"+sPrenom.value+"§"+sMail.value+"§"+sTel.value+"§"+sVille.value;
        }
    }
    // on vide le tableau HTML
    clearHTMLArray();
    // on regénère notre tableau HTML avec la ligne modifiée
    buildHTMLArray();
    // on cache les boutons
    buttonDisplay();
}


//////////////// !!!!!!!!!!!!!!!!revoir la fonction selectedLines .....................////////