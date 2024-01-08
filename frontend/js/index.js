var addBtn=document.querySelector("#add_task");
var model=document.querySelector(".modal");
var createBtn=document.querySelector("#create-btn");
var createBtn2=document.getElementById("create-btn");
var updateBtn=document.querySelector("#updte-btn");
var closeBtn=document.querySelector(".close-icon");
const url="http://localhost:8081/tasks";


addBtn.onclick = function(){
    model.classList.add("active");
}

closeBtn.addEventListener("click",()=>{
    model.classList.remove("active");
})
// form data
var taskData=[];
var title_data = document.querySelector("#title");
var decs_data = document.querySelector("#Descrption");
var createTask = document.querySelector("#create-btn");
var taskfromdata=document.querySelector("#taskForm");



createBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const newTask = {
        title: title_data.value,
        descreption: decs_data.value
    };
    console.log(newTask);
    

    try {
        const createdTask = await createTaskBypost(newTask);
        console.log('Task created successfully:', createdTask);
        // Do any additional handling if needed
    } catch (error) {
        console.error('Error creating task:', error);
        // Handle the error as needed
    }
     
    swal("Done","Task Save","success" );
  
    callGetApi();  
    //addTask();
    //getTaskFromlocalStorage();
    taskfromdata.reset('');
    closeBtn.click();
});




// call post method to add task
const createTaskBypost = async (newTask)=>{
       try {
        const response = await fetch("http://localhost:8081/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json ; charset=utf-8'
            },
            body: JSON.stringify(newTask),
        });
        console.log('Response Status:', response.status);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseBody = await response.text();
        if (!responseBody) {
            console.warn('Empty response body. Assuming success for POST request.');
            return null; // or return an appropriate response
        }

        const data = JSON.parse(responseBody);
        console.log('Task created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; // You can throw the error again if needed
    }
}




//call-Get-API Method
async function callGetApi(){

    let getAllTasks= await fetch(`${url}`);
    getAllTasks = await getAllTasks.json();
    console.warn(getAllTasks);
    document.getElementById("table-data").innerHTML = getAllTasks.map((task)=>
    `
    <tr index='${task.id}'>
    <td>${task.id}</td>
    <td>${task.title}</td>
    <td>${task.descreption}</td>
    <td>
        <button class="updt-btn" style="background-color: #04AA6D;">Update</button>
        <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>  
    </td>
    `).join("");

 // update
var alledit = document.querySelectorAll(".updt-btn");

for (var i = 0; i < alledit.length; i++) {
    alledit[i].addEventListener("click", async function () {
        var tr = this.parentElement.parentElement;
        var td = tr.getElementsByTagName("TD");
        var id = tr.getAttribute("index");

        var title = td[1].innerHTML;
        var decs = td[2].innerHTML;
        addBtn.click();

        createBtn2.disabled = true;
        updateBtn.disabled = false;
        
        title_data.value = title;
        decs_data.value = decs;

        updateBtn.addEventListener("click", async () => {
            const updateTask = {
                title: title_data.value,
                descreption: decs_data.value
            };

            try {
                await upDateTask(updateTask, id);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        });
    });
}

// update task api call
const upDateTask = async (updateTask, id) => {
    try {
        const response = await fetch(`http://localhost:8081/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(updateTask),
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
            throw new Error(`something went wrong, status ${response.status}`);
        }

        const task = await response.json();
        console.log('Task updated successfully:', task);
        return task;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error; // You can throw the error again if needed
    }
};


    //delete method call
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0; i<allDelBtn.length; i++) {
        allDelBtn[i].onclick= async function (){
            var tr = this.parentElement.parentElement;
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(async (willDelete) => {
                if (willDelete)
                 {
                
                       
                        var id =  tr.getAttribute("index");
                       
                        try {
                            const response= await fetch(`${url}/${id}`, {
                                method: 'DELETE',
                                
                            });
                            if (response.status !== 200) {
                                throw new Error(`something went wrong,status ${response.status}`);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    
                    
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                  callGetApi();
                } else {
                  swal("Your imaginary file is safe!");
                }
            });
        }
    }

}

callGetApi();
//-----------------------------------------
