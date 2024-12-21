const resultBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');
const searchBox = document.querySelector('.search-box');

window.onload = async () => {
    const link = await fetch("https://jsonplaceholder.typicode.com/posts");
    const res = await link.json();
    display(res);
}


inputBox.onkeyup = async () => {
    // show loader
    document.getElementById("loader").style.display = "block";


    const link = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const res = await link.json();
    console.log(res);

    let input =inputBox.value;
    let result = res.filter((keyword) => {
        const regex = new RegExp(`^${input}`,'gi');
        return keyword.title.match(regex);
    });
    // console.log(result);
    // hide loader
    document.getElementById("loader").style.display = "none";

    display(result);
    if (result.length === 0) {
        resultBox.style.display = "none";
        // Clear previous error messages if any
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and display the error message
        const errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.innerHTML = "No result found";
        errorMessage.style.display = "block";
        searchBox.append(errorMessage);
    } else {
        resultBox.style.display = "grid";
        // Clear any existing error message if results are found
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
}


function display(result) {
    
    // console.log(id);
    const content = result.map(list => {
        return `<div  class = "box">
            <p>${list.title}</p>
            <p>${list.body}...</p>
            <a class="button" href="result.html?id=${list.id}">View Post</a>
        </div>`;
    }).join("");
    resultBox.innerHTML = content;
}

/* function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = "";
} */
