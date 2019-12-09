import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 15px;
  }
  select {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 15px;
  }
  label {
    flex: 1;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'button',
  disable: props.loading,
}))`
  background: #14c7ea;
  border: 0;
  padding: 0 15px;
  height: 30px;
  border-radius: 4px;
  margin-top: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
