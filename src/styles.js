import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: white;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const TableContainer = styled.div`
  margin-top: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: #1f2937;
  color: white;
`;

export const Td = styled.td`
  padding: 0.5rem;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #f87171;
  cursor: pointer;
   transition: color 0.3s ease-in-out;
    &:hover {
    color: darkred; 
  }
`;

export const SearchBar = styled.div`
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
