import React, { useEffect, useState } from 'react'
import { Container, Pagination, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Product } from '../utils/APIRoutes'
import axios from 'axios'
import _ from "lodash";
import { Button } from "@material-tailwind/react"


const Sort = () => {

  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get(Product).then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const debouncedSearch = _.debounce(handleSearch, 500);
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      if (searchTerm === "") {
        setSearchResults([]);
      } else {
        const response = await axios.post(
          `http://localhost:8080/products/search`,
          { search: searchTerm }
        );
        setSearchResults(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <Container fluid>

        <div className='shadow-xl bg-[#fdedd5] flex flex-col p-3 my-5 rounded-xl'>
          <div className='flex flex-col justify-center'>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="bg-[#FF7D1A] mx-auto"
            >
              Kategorijas
            </Button>
            <Collapse in={open}>
              <div>
                vrrvrv revrevrerv  revvrvrre rvevrerevvr ervervevre erverrvevrev revrevrrve ervrevvrerv rvrrrev
              </div>
            </Collapse>
          </div>
        </div>

        <div className='flex'>
          <div className='w-[23%]'>

            <div className='shadow-xl bg-[#fdedd5] flex flex-col p-3 rounded-xl w-[100%] mr-3' >
              <input
                type="search"
                placeholder="Search"
                className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full mb-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchResults.map((product) => (
                <div key={product._id}>
                  <Link to={`/products/${product._id}`} className="text-black no-underline">
                    <div className="mt-1 bg-white rounded-lg shadow-sm cursor-pointer flex ">
                      <img className="rounded-lg md:max-w-14 max-h-14 ml-1 p-1" src={`/uploads/${product.image}`} />
                      <div className="my-auto w-full ml-4 uppercase font-bold">
                        <div>{product.title}</div>
                        <div className=' font-semibold text-gray-400'>price: {product.price} €,  Color: {product.color}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

          </div>
          <div className='flex flex-wrap w-[77%]'>
            <div>
              <div className="mx-auto lg:px-8">
                <div className="flex flex-wrap gap-3">
                  {products.map((product) => (
                    <div key={product._id} className="group relative shadow-sm rounded-md mb-5">
                      <div className="max-h-30 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-transparent group-hover:opacity-75 lg:aspect-none lg:h-60 shadow-md">
                        <img
                          src={`/uploads/${product.image}`}
                          alt="..."
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-2 flex justify-between mx-2">
                        <div>
                          <h3 className="text-xs text-gray-700">
                            <Link to={`/products/${product._id}`} className="text-black no-underline">
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">Color: {product.color}</p>
                        </div>
                        <p className="text-xs font-medium text-gray-900">Price: {product.price} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Pagination className='mx-auto my-5'>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Sort