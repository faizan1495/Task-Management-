package com.task.manager.Task.Management.backend.controller;

import com.task.manager.Task.Management.backend.entity.Task;
import com.task.manager.Task.Management.backend.serviceimpl.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskServiceImpl taskService;

    //create
    @PostMapping
    public void addTask(@RequestBody Task task){
        taskService.create(task);
    }
    //get
    @GetMapping
   public List<Task> getAllTask(){
       return taskService.getAll();
   }
    //update
    @PutMapping  ("/{id}")
    public void updateTask(@PathVariable long id,@RequestBody Task task){
        taskService.update(id, task);
    }
    //delete
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.delete(taskId);
    }
}
