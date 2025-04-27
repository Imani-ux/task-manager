import React from 'react';
import { Table, Th, Td, DeleteButton } from '../styles';
import { FaTrash, FaEdit } from 'react-icons/fa';

const TaskTable = ({ tasks, onDeleteTask, onToggleStatus, onEditTask }) => {
  return (
    <Table className='exptable'>
      <thead>
        <tr>
          <Th>#</Th>
          <Th>Title</Th>
          <Th>Due Date</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {tasks
          .filter(task => task && task.id) 
          .map((task, index) => (
            <tr key={task.id} style={{ color: "white" }}>
              <Td>{index + 1}</Td>
              <Td>{task.title}</Td>
              <Td>{task.dueDate}</Td>
              <Td>
                <select
                  value={task.completed ? 'done' : 'pending'}
                  onChange={(e) =>
                    onToggleStatus(task.id, e.target.value === 'done')
                  }
                  style={{ padding: '4px', borderRadius: '4px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </select>
              </Td>
              <Td>
                <button
                  onClick={() => onEditTask(task)}
                  style={{
                    background: 'blue',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    border: 'none',
                  }}
                >
                  <FaEdit />
                </button>
                <DeleteButton onClick={() => onDeleteTask(task.id)}>
                  <FaTrash />
                </DeleteButton>
              </Td>
            </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskTable;