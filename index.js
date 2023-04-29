(async function(){
const data = await fetch('/data.json');
const res = await data.json();
let employees = res;

let selectedEmployeesId =employees[0].id;
let selectedEmplyee =employees[0];

const employeelist =document.querySelector('.employees__names--list')
const employeeinfo =document.querySelector('.employees__single--info')

const createEmployee =document.querySelector(".createEmployee")
const addEmployeeModal =document.querySelector(".addEmployee");
const addEmployeeForm = document.querySelector(".addEmployee_create")

createEmployee.addEventListener("click",()=>{
    addEmployeeModal.style.display="flex"
})
addEmployeeModal.addEventListener("click",(e)=>{
   if(e.target.className ==="addEmployee"){

    addEmployeeModal.style.display="none"
   }

})
addEmployeeForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formdata = new FormData(addEmployeeForm);
    const values =[...formdata.entries()]
    let emp ={}
    values.forEach((val)=>{
        emp[val[0]] =val[1]
    })
    emp.id=employees[employees.length-1].id+1
    emp.age=new Date().getFullYear -parseInt(emp.dob.slice(0,4),10)
    emp.imageUrl=emp.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(emp)
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display="none"

    console.log(val);
})
employeelist.addEventListener("click",(e)=>{
    // event delegation
    if(e.target.tagName==="SPAN" && selectedEmployeesId!==e.target.id){
        selectedEmployeesId=e.target.id;
        renderEmployees();
        rendersingleEmployee();
    }
if(e.target.tagName==='I'){
    employees.filter((val)=>{
        String(val.id) !=e.target.id
    })

if(String(selectedEmployeesId)===e.target.parentNode.id){
    selectedEmployeesId=employees[0]?.id || -1;
    selectedEmplyee =employees[0] || {};
    rendersingleEmployee();

}
renderEmployees();
}
})
const renderEmployees =() =>{
    employeelist.innerHTML=""
    employees.forEach((emp)=>{
        console.log(emp);
        const employee =document.createElement("span")
        employee.classList.add("employees__names--item")
        if(parseInt(selectedEmployeesId,10)===emp.id){
            employee.classList.add("selected");
            selectedEmplyee=emp;
        }
        employee.setAttribute("id",emp.id);
        employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
        employeelist.append(employee)
    })

}
const rendersingleEmployee =() =>{
    employeeinfo.innerHTML = `
    <img src="${selectedEmplyee.imageUrl}" />
    <span class="employees__single--heading">
    ${selectedEmplyee.firstName} ${selectedEmplyee.lastName} (${selectedEmplyee.age})
    </span>
    <span>${selectedEmplyee.address}</span>
    <span>${selectedEmplyee.email}</span>
    <span>Mobile - ${selectedEmplyee.contactNumber}</span>
    <span>DOB - ${selectedEmplyee.dob}</span>
  `;

}
renderEmployees();
})()