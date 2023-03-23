import React, { useState } from "react"
import { FloatingLabel, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { Button } from "@material-tailwind/react"
import { Register } from '../API/Users'
import { Link } from 'react-router-dom'
import env from "react-dotenv";

const Reg = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("")
  const [secretKey, setSecretKey] = useState("");

  function handleSubmit(e) {
    if (userType === "Admin" && secretKey !== env.SecretKey) {
      alert("Invalid Admin");
    } else {
      e.preventDefault();
      const res = Register({ username, email, password, userType });
      console.log(res);
    }
  };



  return (
    <Container className='py-10 mx-auto'>

      <div className='w-[40%] my-4 bg-[#fcedda] p-10 rounded-lg relative mx-auto shadow-lg'>
        <h1 className='font-bold mx-auto md:text-4xl sm:text-3xl text-3xl py-2 mb-3'>
          Reģistrēties
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex mb-3">
            Register as
            <input
              className="ml-3"
              required type="radio"
              name='UserType'
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            /> User
            <input
              className="ml-3"
              required type="radio"
              name='UserType'
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            /> Admin
          </div>
          {userType === "Admin" ?
            <div className="mb-6">
              <div className="px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-md">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="SecretKey"
                    className="mb-3"
                  >
                    <Form.Control
                      className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                      type="text"
                      placeholder="SecretKey"
                      required
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </FloatingLabel>
                </label>
              </div>
            </div> : null}

          <div className="mb-6">
            <div className="px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md">
                <FloatingLabel
                  controlId="floatingInput"
                  label="username"
                  className="mb-3"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                    type="text"
                    placeholder="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FloatingLabel>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <div className="px-3 mb-6 md:mb-0">
              <FloatingLabel
                controlId="floatingInput"
                label="E-MAIL"
                className="mb-3"
              >
                <Form.Control
                  className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            </div>
          </div>

          <div className="flex flex-wrap mb-6 ">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md mb-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="password"
                  className="mb-3"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4"
                    type="password"
                    placeholder="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
                <span className=" text-xs font-bold text-gray-500">
                  Parolej jābūt vismaz 8 simboliem
                </span>
              </label>
            </div>
          </div>

          <Button type="submit" className=' bg-[#FF7D1A] text-white w-auto rounded-xl font-bold my-2 mx-auto px-10 py-3'>
            Reģistrēties
          </Button>
          <Link to={'/Pieslegties'} className="ml-5 text-black underline">Jums jau ir konts?</Link>
        </form>

      </div>
    </Container>
  )
}
export default Reg

