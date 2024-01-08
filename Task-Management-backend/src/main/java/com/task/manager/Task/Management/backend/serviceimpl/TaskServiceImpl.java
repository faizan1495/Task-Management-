package com.task.manager.Task.Management.backend.serviceimpl;

import com.task.manager.Task.Management.backend.entity.Task;
import com.task.manager.Task.Management.backend.repository.TaskRepository;
import com.task.manager.Task.Management.backend.service.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskServices {

    @Autowired
    private TaskRepository taskRepository;
    @Override
    public Task create(Task task) {

        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task update(long id,Task updateTask) {

        Optional<Task> byId = taskRepository.findById(id);
        if (byId.isPresent()){
            Task taskupdt = byId.get();
            taskupdt.setTitle(updateTask.getTitle());
            taskupdt.setDescreption(updateTask.getDescreption());
            return taskRepository.save(taskupdt);
        }else {
            throw new RuntimeException("Task not found with id:" + id);
        }
    }

    @Override
    public void delete(long id) {
        taskRepository.deleteById(id);
    }
}
