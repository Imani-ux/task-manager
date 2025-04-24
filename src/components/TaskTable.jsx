import React from 'react';
import { Table, Th, Td, DeleteButton } from '../styles';
import { FaTrash } from 'react-icons/fa';

const TaskTable = ({ tasks, onDeleteTask }) => {
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
        {tasks.map((task, index) => (
          <tr key={index} style={{ color: "white" }}>
            <Td>{index + 1}</Td>
            <Td>{task.title}</Td>
            <Td>{task.dueDate}</Td>
            <Td>{task.completed ? '✅ Done' : '⏳ Pending'}</Td>
            <Td>
              <DeleteButton onClick={() => onDeleteTask(index)}>
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
