package com.task.manager.Task.Management.backend.repository;

import com.task.manager.Task.Management.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {
}
