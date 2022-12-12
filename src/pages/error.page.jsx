import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 15%;
`;

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <ErrorPageContainer>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
