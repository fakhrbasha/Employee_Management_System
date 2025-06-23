var Employees;
var currentIndex;
var ProfileImageSrc = ''

// =================== \/\/ ** Elements **\/\/=================== //
var search = document.getElementById('search');
var createNewEmp = document.getElementById('createNewEmp')
var containerICreateEmp = document.querySelector('.inputCreate')
var createBtn = document.getElementById('createBtn');
var CloseBtn = document.getElementById('closeBtn')
var update = document.getElementById('updated')
var updateBtn = document.getElementById('updateBtn');
// var forDisplay = document.getElementById('EmployeeDisplay')
var selectSearch = document.getElementById('selectSearch')
var searchInput = document.getElementById('searchInput')
// =================== \/\/ ** HTML Inputs **\/\/=================== //
var inputName = document.getElementById('nameInput')
var inputAge = document.getElementById('ageInput')
var inputPhone = document.getElementById('phoneInput')
var inputCity = document.getElementById('cityInput')
var inputEmail = document.getElementById('emailInput')
var inputDate = document.getElementById('dateInput')
var profileImgInput = document.getElementById('ProfileImg')
var userImg = document.getElementById('UserPhoto')

// =================== \/\/ ** For Photo **\/\/=================== //
var reader = new FileReader()


// ====================\/\/ Local Storage \/\/ ================== \\


if (localStorage.getItem('Employee') == null) {
    Employees = [];
} else {
    // zbon adeem eleh data
    Employees = JSON.parse(localStorage.getItem('Employee'));
    console.log(Employees);
    displayEmp();
}
var counter = Employees.length
// =================== \/\/ ** Create **\/\/=================== //

createBtn.addEventListener('click', function () {
    if (!validationForm()) {
        return;
    }
    var Employee = {
        name: inputName.value,
        age: inputAge.value,
        phone: inputPhone.value,
        city: inputCity.value,
        email: inputEmail.value,
        date: inputDate.value,
        imagePathNAme: ProfileImageSrc,
        id: `EMP-${counter}`,
    }
    Employees.push(Employee)
    // console.log(Employees);
    // displayEmp()
    closeBtn()
    reset()
    // localStorage.setItem('Employee' , JSON.stringify(Employees));
    localStoragee()
    counter++;

})

// =================== \/\/ ** Display **\/\/=================== //

function displayEmp() {
    var content = ``
    for (var i = 0; i < Employees.length; i++) {
        content += `
        <tr>
                        <td width="100px"><img src="${Employees[i].imagePathNAme}"   class="img-fluid" width="100px" alt=""></td>
                        <td>${Employees[i].name}</td>
                        <td>${Employees[i].age}</td>
                        <td>${Employees[i].city}</td>
                        <td>${Employees[i].email}</td>
                        <td>${Employees[i].phone}</td>
                        <td>${Employees[i].date}</td>
                        <td >
                            <button class="btn btn-danger" onclick = Delete(${i}) >Delete</button>
                        </td>
                        <td >
                            <button class="btn btn-primary" id="updated" onclick = "showUpdateModel('${Employees[i].id}')">update</button>
                        </td>
                    </tr>
        `
    }
    document.getElementById('EmployeeDisplay').innerHTML = content;
}

// =================== \/\/ ** Delete **\/\/=================== //

function Delete(currentIndex) {
    Employees.splice(currentIndex, 1)
    localStoragee()
}

// =================== \/\/ ** Update **\/\/=================== //
function showUpdateModel(id) {
    newEmp();
    var index = getEmployeeById(id);
    currentIndex = index;

    inputName.value = Employees[index].name;
    inputAge.value = Employees[index].age;
    inputPhone.value = Employees[index].phone;
    inputCity.value = Employees[index].city;
    inputEmail.value = Employees[index].email;
    inputDate.value = Employees[index].date;
    ProfileImageSrc = Employees[index].imagePathNAme;
    userImg.setAttribute("src", ProfileImageSrc);

    createBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}
updateBtn.addEventListener('click', function () {
    Employees[currentIndex].name = inputName.value;
    Employees[currentIndex].age = inputAge.value;
    Employees[currentIndex].phone = inputPhone.value;
    Employees[currentIndex].city = inputCity.value;
    Employees[currentIndex].email = inputEmail.value;
    Employees[currentIndex].date = inputDate.value;
    Employees[currentIndex].imagePathNAme = ProfileImageSrc;

    localStoragee();

    reset();
    closeBtn();
    updateBtn.classList.add('d-none');
    createBtn.classList.remove('d-none');
});
// =================== \/\/ ** Photo **\/\/=================== //

profileImgInput.addEventListener('input', function (e) {
    var employeeImg = e.target.files[0]
    reader.readAsDataURL(employeeImg)
    // base64
    reader.onload = function (r) {
        // console.log(r.currentTarget.result); src
        var imgSrc = r.currentTarget.result
        ProfileImageSrc = imgSrc
        userImg.setAttribute('src', imgSrc)
    }
})
// =================== \/\/ ** reset **\/\/=================== //



function reset() {
    inputName.value = ''
    inputName.classList.remove('is-valid')
    inputName.classList.remove('is-invalid')
    inputAge.value = ''
    inputAge.classList.remove('is-valid')
    inputAge.classList.remove('is-invalid')
    inputPhone.value = ''
    inputPhone.classList.remove('is-valid')
    inputPhone.classList.remove('is-invalid')
    inputCity.value = ''
    inputCity.classList.remove('is-valid')
    inputCity.classList.remove('is-invalid')
    inputDate.value = ''
    inputDate.classList.remove('is-valid')
    inputDate.classList.remove('is-invalid')
    inputEmail.value = ''
    inputEmail.classList.remove('is-valid')
    inputEmail.classList.remove('is-invalid')
    userImg.setAttribute("src", "https://placehold.co/600x400");
    userImg.parentNode.classList.remove("invalidImage");
}

// =================== \/\/ ** create new employee btn **\/\/=================== //

createNewEmp.addEventListener('click', newEmp)

function newEmp() {
    containerICreateEmp.classList.replace('d-none', 'd-flex')
}


// =================== \/\/ ** Close Btn **\/\/=================== //
CloseBtn.addEventListener('click', closeBtn)
function closeBtn() {
    containerICreateEmp.classList.replace('d-flex', 'd-none');
    reset()
}


// =================== \/\/ ** Local Storage **\/\/=================== //

function localStoragee() {
    localStorage.setItem('Employee', JSON.stringify(Employees));
    displayEmp()
}

// ====================\/\/ get employee by id \/\/ ================== \\
function getEmployeeById(id) {
    var index = -1;
    for (var i = 0; i < Employees.length; i++) {
        if (Employees[i].id === id) {
            index = i
            break
        }
    }
    return index
}

// ====================\/\/ validation \/\/ ================== \\
inputName.addEventListener("input", function (e) {
    if (!validationInputName(e.target.value)) {
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.replace("is-invalid", "is-valid");
    }
});

function validationInputName(value) {
    if (value.length < 3) {
        return false
    }
    return true
}

inputAge.addEventListener('input', function (e) {
    if (!validateInputAge(e.target.value)) {
        inputAge.classList.add("is-invalid");
    } else {
        inputAge.classList.replace("is-invalid", "is-valid");
    }
})
function validateInputAge(value) {
    if (value < 18 || value > 63) {
        return false
    }
    return true
}

function validatePhone(value) {
    var regex = /^(002){0,1}01[0125][0-9]{8}$/
    if (value.match(regex)) {
        return true
    }
    return false
}
inputPhone.addEventListener('input', function (e) {
    if (!validatePhone(e.target.value)) {
        inputPhone.classList.add("is-invalid");
    } else {
        inputPhone.classList.replace("is-invalid", "is-valid");
    }
})
function validateCity(value) {
    // cairo giza aga alexandra
    var regex = /^(cairo|giza|aga|alexandra)$/i;
    if (value.match(regex)) {
        return true
    } else {
        return false
    }
}
inputCity.addEventListener('input', function (e) {
    if (!validateCity(e.target.value)) {
        inputCity.classList.add('is-invalid')
    } else {
        inputCity.classList.replace("is-invalid", "is-valid");
    }
})
function validationEmail(value) {
    var regex = /^[a-z][a-z0-9\.]{0,50}@(gmail\.com|yahoo\.net)$/
    if (regex.test(value)) {
        return true
    } else {
        return false
    }
}
inputEmail.addEventListener('input', function (e) {
    if (!validationEmail(e.target.value)) {
        inputEmail.classList.add('is-invalid')
    } else {
        inputEmail.classList.replace('is-invalid', 'is-valid')
    }
})

function validationForm() {
    var result = true;
    if (!validationInputName(inputName.value)) {
        result = false
        inputName.classList.add('is-invalid')
    }
    if (!validateInputAge(inputAge.value)) {
        result = false
        inputAge.classList.add('is-invalid')
    }
    if (!validateCity(inputCity.value)) {
        result = false
        inputCity.classList.add('is-invalid')
    }
    if (!validatePhone(inputPhone.value)) {
        result = false
        inputPhone.classList.add('is-invalid')
    }
    if (!validationEmail(inputEmail.value)) {
        result = false
        inputEmail.classList.add('is-invalid')
    }
    if (inputDate.value == '') {
        result = false
        inputDate.classList.add('is-invalid')
    }
    if (userImg.getAttribute('src') == "https://placehold.co/600x400") {
        userImg.parentNode.classList.add("invalidImage");
    }
    return result
}


// ====================\/\/ search \/\/ ================== \\
var searched;
selectSearch.addEventListener('change', function (e) {
    // console.log(e.target.value);
    searched = e.target.value
    if (e.target.value == 'name' || e.target.value == 'email') {
        searchInput.removeAttribute('disabled')
    }
})
searchInput.addEventListener('input', function (e) {
    var content = ``
    for (var i = 0; i < Employees.length; i++) {
        if (searched == 'name') {
            if (Employees[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
                content += `
            <tr>
                            <td width="100px"><img src="${Employees[i].imagePathNAme}"   class="img-fluid" width="100px" alt=""></td>
                            <td>${Employees[i].name}</td>
                            <td>${Employees[i].age}</td>
                            <td>${Employees[i].city}</td>
                            <td>${Employees[i].email}</td>
                            <td>${Employees[i].phone}</td>
                            <td>${Employees[i].date}</td>
                            <td >
                                <button class="btn btn-danger" onclick = Delete(${i}) >Delete</button>
                            </td>
                            <td >
                                <button class="btn btn-primary" id="updated" onclick = "showUpdateModel('${Employees[i].id}')">update</button>
                            </td>
                        </tr>
            `
            }
        }else if(searched == 'email'){
            if (Employees[i].email.toLowerCase().includes(e.target.value.toLowerCase())) {
                content += `
            <tr>
                            <td width="100px"><img src="${Employees[i].imagePathNAme}"   class="img-fluid" width="100px" alt=""></td>
                            <td>${Employees[i].name}</td>
                            <td>${Employees[i].age}</td>
                            <td>${Employees[i].city}</td>
                            <td>${Employees[i].email}</td>
                            <td>${Employees[i].phone}</td>
                            <td>${Employees[i].date}</td>
                            <td >
                                <button class="btn btn-danger" onclick = Delete(${i}) >Delete</button>
                            </td>
                            <td >
                                <button class="btn btn-primary" id="updated" onclick = "showUpdateModel('${Employees[i].id}')">update</button>
                            </td>
                        </tr>
            `
            }
        }
    }
    document.getElementById('EmployeeDisplay').innerHTML = content;

})

