let students = JSON.parse(localStorage.getItem("students")) || [];

const table = document.getElementById("studentTable");
const modal = document.getElementById("modal");
const form = document.getElementById("studentForm");

document.getElementById("addBtn").onclick = () =>{
modal.style.display="flex";
form.reset();
document.getElementById("editIndex").value="";
}

document.getElementById("closeBtn").onclick = ()=>{
modal.style.display="none";
}

function saveStorage(){
localStorage.setItem("students",JSON.stringify(students));
}

function render(){

table.innerHTML="";

students.forEach((s,i)=>{

table.innerHTML += `
<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.dob}</td>
<td>${s.class}</td>
<td>${s.gpa}</td>
<td>${s.email}</td>
<td>
<button class="edit-btn" onclick="editStudent(${i})">Edit</button>
<button class="delete-btn"onclick="deleteStudent(${i})">Delete</button>
</td>
</tr>
`;

});

updateSummary();
}

function updateSummary(){

let total = students.length;

let avg = 0;

students.forEach(s=>{
avg += parseFloat(s.gpa);
})

avg = total ? (avg/total).toFixed(2) : 0;

document.getElementById("summary").innerText =
`Tổng số sinh viên: ${total} | ĐTB lớp: ${avg}`;

}

function editStudent(index){

let s = students[index];

modal.style.display="flex";

document.getElementById("studentId").value=s.id;
document.getElementById("fullName").value=s.name;
document.getElementById("dob").value=s.dob;
document.getElementById("class").value=s.class;
document.getElementById("gpa").value=s.gpa;
document.getElementById("email").value=s.email;

document.getElementById("editIndex").value=index;

}

function deleteStudent(index){

if(confirm("Are you sure delete this student?")){

students.splice(index,1);

saveStorage();

render();

}

}

function validate(){

let valid = true;

let id = document.getElementById("studentId").value.trim();
let name = document.getElementById("fullName").value.trim();
let dob = document.getElementById("dob").value;
let gpa = document.getElementById("gpa").value;
let email = document.getElementById("email").value.trim();
let pass = document.getElementById("password").value;
let confirm = document.getElementById("confirmPassword").value;

document.querySelectorAll(".error").forEach(e=>e.innerText="");

let idRegex = /^SV\d{6}$/;
let gpaRegex = /^(10|[0-9](\.\d{1,2})?)$/;
let emailRegex = /^[^\s@]+@student\.edu\.vn$/;
let passRegex = /^.{8,}$/;

if(!idRegex.test(id)){
document.getElementById("idError").innerText="Student ID phải dạng SV123456";
valid=false;
}
let age = new Date().getFullYear() - new Date(dob).getFullYear();
if(age < 18){
document.getElementById("dobError").innerText="Sinh viên phải >= 18 tuổi";
valid=false;
}

if(!gpaRegex.test(gpa)){
document.getElementById("gpaError").innerText="ĐTB phải từ 0 đến 10";
valid=false;
}

if(!emailRegex.test(email)){
document.getElementById("emailError").innerText="Email phải dạng @student.edu.vn";
valid=false;
}

if(!passRegex.test(pass)){
document.getElementById("passError").innerText="Password cần 8 ký tự";
valid=false;
}

if(pass !== confirm){
document.getElementById("confirmError").innerText="Password không khớp";
valid=false;
}

return valid;
}

form.onsubmit = function(e){

e.preventDefault();

if(!validate()) return;

let student = {

id:document.getElementById("studentId").value,
name:document.getElementById("fullName").value,
dob:document.getElementById("dob").value,
class:document.getElementById("class").value,
gpa:document.getElementById("gpa").value,
email:document.getElementById("email").value

};

let editIndex = document.getElementById("editIndex").value;

if(editIndex === ""){

students.push(student);

}else{

students[editIndex] = student;

}

saveStorage();

modal.style.display="none";

render();

}

render();