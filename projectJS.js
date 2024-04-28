
function createMealPlan(e) {
    e.preventDefault();
    let emailValid = document.forms.mealForm.elements.email.checkValidity();
    if (!emailValid) {
        alert("Email address is not valid:\n" + document.forms.mealForm.elements.email.validationMessage);
        return;
    }

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let goal = document.getElementById("goal").value;

    myText = ("<!DOCTYPE html><html>\n<head>\n<title>Meal Plan</title>\n</head>\n<body>\n");
    myText += (`<h1>Meal Plan for ${name}</h1>\n`);
    myText += (`<p>${email}<p>\n`);
    myText += (`<div><h3>Weekly Goal</h3>${goal}</div><br>\n`);

    myText += ('<h3>Detailed Plan</h3><table><thead></thead><tr><th></th><th>Breakfast</th><th>Snack</th><th>Lunch</th><th>Snack</th><th>Supper</th></tr></thead>\n');
    myText += `<tr><th>Monday</th>${getDaysMeals('mon')}</tr>\n`;
    myText += `<tr><th>Tuesday</th>${getDaysMeals('tue')}</tr>\n`;
    myText += `<tr><th>Wednesday</th>${getDaysMeals('wed')}</tr>\n`;
    myText += `<tr><th>Thursday</th>${getDaysMeals('thu')}</tr>\n`;
    myText += `<tr><th>Friday</th>${getDaysMeals('fri')}</tr>\n`;
    myText += `<tr><th>Saturday</th>${getDaysMeals('sat')}</tr>\n`;
    myText += `<tr><th>Sunday</th>${getDaysMeals('sun')}</tr>\n`;

    myText += ("</table></body>\n</html>\n");

    flyWindow = window.open('about:blank','myPop','width=900,height=600,left=60,top=60');
    flyWindow.document.write(myText);
}

document.getElementById("create").addEventListener('click',createMealPlan);
document.getElementById("download").addEventListener('click',downloadMealPlan);

function getDaysMeals(rowId) {
    let row =  document.getElementById(rowId);
    let result = '';
    for (let i = 0; i < 5; i++) {
        meal = row.getElementsByTagName('input')[i].value;
        result += `<td>${meal}</td>`;
    }
    return result;
}

function generatePlainText() {
    // This function creates a plain text version of the meal plan for downloading
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let goal = document.getElementById("goal").value;

    myText = `Meal Plan for ${name}\n\n`;
    myText += `Weekly Goal: ${goal}\n\n`;
    myText += `MONDAY\n${getDaysMealsPlainText('mon')}\n`;
    myText += `TUESDAY\n${getDaysMealsPlainText('tue')}\n`;
    myText += `WEDNESDAY\n${getDaysMealsPlainText('wed')}\n`;
    myText += `THURSDAY\n${getDaysMealsPlainText('thu')}\n`;
    myText += `FRIDAY\n${getDaysMealsPlainText('fri')}\n`;
    myText += `SATURDAY\n${getDaysMealsPlainText('sat')}\n`;
    myText += `SUNDAY\n${getDaysMealsPlainText('sun')}\n`;
    
    return myText;
}

function getDaysMealsPlainText(rowId) {
    let row =  document.getElementById(rowId);
    let result = `Breakfast: ${row.getElementsByTagName('input')[0].value}\n`;
    result += `Snack: ${row.getElementsByTagName('input')[1].value}\n`;
    result += `Lunch: ${row.getElementsByTagName('input')[2].value}\n`;
    result += `Snack: ${row.getElementsByTagName('input')[3].value}\n`;
    result += `Dinner: ${row.getElementsByTagName('input')[4].value}\n`;
    
    return result;
}

function downloadMealPlan() {
    let link = document.getElementById('downloadLink');
    link.setAttribute('href', 'data:text/attachment;base64,' + utf8_to_b64(generatePlainText()));
    document.getElementById('linkWrapper').style.display = 'block';
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
