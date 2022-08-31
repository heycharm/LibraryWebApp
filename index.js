function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}

Display.prototype.add = function (book) {
  tableBody = document.getElementById("tableBody");
  let uiString = `
<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;

  tableBody.innerHTML += uiString;
};
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length < 3 || book.author.length < 3) {
    return false;
  } else {
    return true;
  }
};
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById(`message`);
  message.innerHTML = `
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
};

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value; //.value is used for getting the text wriiten in the text area
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  //   console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();

    display.show("success", "Your book has been successfully added");
  } else {
    display.show("danger", "Required entry should be more than 3 characters.");
  }

  e.preventDefault(); //prevents refresh of the page
}
