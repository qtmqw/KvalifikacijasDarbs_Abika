import React, { useState } from "react"
import { FloatingLabel, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { Button } from "@material-tailwind/react"
import { Register } from '../API/Users'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible, AiOutlineWarning } from 'react-icons/ai'


const Reg = () => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("User")
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const res = Register({ username, name, lastname, email, company, password, userType });
    console.log(res);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validatePassword = (password) => {
    const errors = [];
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Parolē jābūt vismaz viens lielais burts');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Parolē jābūt vismaz viens mazais burts');
    }
    if (!/(?=.*[0-9])/.test(password)) {
      errors.push('Parolē jābūt vismaz viens cipars');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Parolē jābūt vismaz viens speciāls simbols');
    }
    if (/\s/.test(password)) {
      errors.push('Parolē nevar būt atstarpju');
    }
    if (password.length < 8) {
      errors.push('Parolei vajag būt vismaz 8 simbolus garai');
    }
    setPasswordErrors(errors);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    if (confirmPassword !== "" && e.target.value !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== "" && e.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  return (
    <Container fluid='sm' className='flex justify-center my-[5%]]'>

      <div className='lg:w-[40%] md:w-[80%] sm:w-full my-4 bg-[#fcedda] md:p-10 sm:p-5 rounded-lg relative mx-auto shadow-lg'>
        <h1 className='font-bold mx-auto md:text-4xl sm:text-3xl text-3xl py-2 mb-3'>
          Reģistrēties
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <div className="md:px-3 sm:px-0 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md">
                <FloatingLabel
                  controlId="floatingInput"
                  label="lietotājvārds"
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
            <div className="md:px-3 sm:px-0 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Vārds"
                  className="mb-3"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                    type="text"
                    placeholder="Vārds"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FloatingLabel>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <div className="md:px-3 sm:px-0 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Uzvārds"
                  className="mb-3"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                    type="text"
                    placeholder="Uzvārds"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </FloatingLabel>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <div className="md:px-3 sm:px-0 mb-6 md:mb-0">
              <FloatingLabel
                controlId="floatingInput"
                label="E-pasts"
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
          <div className="mb-6">
            <div className="md:px-3 sm:px-0 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Uzņēmums"
                  className="mb-3"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                    type="text"
                    placeholder="Uzņēmums"
                    required
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </FloatingLabel>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap  ">
            <div className="w-full md:px-3 sm:px-0 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md ">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Parole"
                  className="mb-3 static"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parole"
                    required
                    onChange={handlePasswordChange}
                  />
                  <checkbox onClick={togglePasswordVisibility} className="absolute bottom-0 right-0 text-2xl pb-3 pr-3 ">
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye /> }
                  </checkbox>
                </FloatingLabel>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap mb-6 ">
            <div className="w-full  md:px-3 sm:px-0 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-md mb-2 ">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Paroles apstiprināšana"
                  className="mb-3 static"
                >
                  <Form.Control
                    className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4"
                    type={showPassword ? "text" : "password"}
                    placeholder="Paroles apstiprināšana"
                    required
                    onChange={handleConfirmPasswordChange}
                  />
                </FloatingLabel>
                {passwordMatchError && (
                  <div className="text-red-500 text-xs mb-2">
                    <AiOutlineWarning className="inline-block mr-1" />
                    Paroles nesakrīt.
                  </div>
                )}
                <span className=" text-xs font-bold text-gray-500">
                  Paroles prasības:
                </span><br />
                {passwordErrors.length > 0 && (
                  <div className="flex flex-wrap text-red-500 text-xs">
                    {passwordErrors.map((error, index) => (
                      <div key={index} className="w-full">
                        <AiOutlineWarning className="inline-block mr-1" />
                        {error}
                      </div>
                    ))}
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="flex md:flex-row sm:flex-col">
            <Button type="submit" className=' bg-[#FF7D1A] font-bold text-white w-auto rounded-xl md:ml-4 sm:ml-0 px-10 py-3'>
              Reģistrēties
            </Button>
            <Link to='/Pieslegties' className="text-black md:mx-0 md:ml-5 md:pt-0 my-auto sm:mx-auto sm:pt-4">Jums jau ir konts?</Link>
          </div>
        </form>
      </div>
    </Container>
  )
}
export default Reg

