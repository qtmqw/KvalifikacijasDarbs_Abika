import React, { Component } from "react"
import { FloatingLabel, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom";
import { ForgotPassword } from '../API/Users'

export default class ParolesMaina extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email } = this.state
    const res = ForgotPassword({ email });
    console.log(res);
  }

  render() {
    return (
      <Container className='py-10 mx-auto'>
        <div className='lg:w-[40%] md:w-[100%] my-[5%] bg-[#fcedda] p-10 rounded-lg relative mx-auto shadow-lg '>
          <h1 className='font-bold mx-auto md:text-4xl sm:text-3xl text-3xl py-2 mb-3'>
            Mainīt paroli
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-6">
              <FloatingLabel
                controlId="floatingInput"
                label="E-MAIL"
                className="mb-3"
              >
                <Form.Control
                  className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 "
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FloatingLabel>
            </div>
            <Button type="submit" className=' bg-[#FF7D1A] text-white w-auto rounded-xl font-bold  mx-auto px-10 py-3'>
              Nosūtīt
            </Button>
            <Link to='/Pieslegties' className="ml-4 text-black">Pieslēgties</Link>
          </form>
        </div>
      </Container>
    )
  }
}

