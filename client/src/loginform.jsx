import React from "react";

export function RenderLogin(props) {
  return (
    <main>
      <div className={"d-flex justify-content-center"}>
        <fieldset style={{ width: 50 + "%" }}>
          <legend className="text-center"> Dados de Login </legend>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="InputEmail1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="InputPassword1"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              id="postButton"
              className="btn btn-primary"
              onClick={props.handleClick}>
              Log In
            </button>
            <a className="link-dark" href="http://localhost:3000/register">
              <button
                type="button"
                id="registerButton"
                className="btn btn-warning ms-5">
                Não tenho Cadastro
              </button>
            </a>
          </div>
        </fieldset>
      </div>
    </main>
  );
}
