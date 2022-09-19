import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  justify-content: center;
`;

export const Item = styled.li`
  font-size: 20px;
  font-weight: bold;
  color: #120f3b;
  :not(:last-child) {
    margin-right: 10px;
  }
`;
