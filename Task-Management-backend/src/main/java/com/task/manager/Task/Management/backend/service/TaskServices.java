package com.task.manager.Task.Management.backend.service;

import com.task.manager.Task.Management.backend.entity.Task;

import java.util.List;

public interface TaskServices {

    //create
    Task create(Task task);
    //getall
    List<Task> getAll();
    //update
    Task update(long id,Task updateTask);
    //delete
    void delete(long id);
}
