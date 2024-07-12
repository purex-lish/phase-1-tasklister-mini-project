document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

// Prevent default form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault(); 

      // task description input value
      const taskInput = document.getElementById('new-task-description');
      const taskDescription = taskInput.value.trim();

      if (taskDescription !== '') {
          // Get priority select value
          const prioritySelect = document.getElementById('priority-select');
          const priorityValue = prioritySelect.value;

          // Create new list item for the task
          const newTask = document.createElement('li');
          newTask.textContent = taskDescription;
          newTask.dataset.priority = priorityValue; 

          // Set colors based on priority
          switch (priorityValue) {
              case 'high':
                  newTask.style.color = 'blue;
                  break;
              case 'medium':
                  newTask.style.color = 'red';
                  break;
              case 'low':
                  newTask.style.color = 'green';
                  break;
              // Default color
              default:
                  newTask.style.color = 'black'; 
          }

          // Add delete button to the task added
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.classList.add('delete-button');
          newTask.appendChild(deleteButton);

          // Append new task to the task list
          taskList.appendChild(newTask);

          // ensure it Clears the input field after adding task
          taskInput.value = '';
      }
  });

  // Event for delete buttons
  taskList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-button')) {
          // Remove the parent <li> element of the clicked delete button
          event.target.parentNode.remove();
      }
  });

  // Function to sort tasks by priority
  function sortTasks(order) {
      const tasksArray = Array.from(taskList.getElementsByTagName('li'));

      tasksArray.sort(function(a, b) {
          const priorityA = a.dataset.priority;
          const priorityB = b.dataset.priority;

          if (order === 'ascending') {
              return priorityA.localeCompare(priorityB);
          } else if (order === 'descending') {
              return priorityB.localeCompare(priorityA);
          }
      });

      // Clear current list
      taskList.innerHTML = '';

      // Append sorted tasks back to the list
      tasksArray.forEach(function(task) {
          taskList.appendChild(task);
      });
  }

  // Example usage: Sort tasks in ascending order
  sortTasks('ascending');
});