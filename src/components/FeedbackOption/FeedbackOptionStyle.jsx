import styled from 'styled-components';

export const Button = styled.button`
  width: 100px;
  padding: 5px 15px;
  background-color: #19a71d;
  border: transparent;
  :not(:last-child) {
    margin-right: 10px;
  }
  cursor: pointer;
  :hover,
  :focus {
    color: white;
    background-color: #f5261f;
  }
`;
