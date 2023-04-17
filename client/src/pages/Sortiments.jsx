import React, { useEffect, useState, Fragment } from 'react'
import { Container, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Product, Search, Category } from '../utils/APIRoutes'
import axios from 'axios'
import _ from "lodash";
import { Button } from "@material-tailwind/react"
import { Slider, makeStyles } from '@material-ui/core/';
import {
  Dialog,
  Disclosure,
  Menu,
  Transition
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/20/solid'

import "../product/styles.css"


const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: 'XS', checked: false },
      { value: '6l', label: 'S', checked: false },
      { value: '12l', label: 'M', checked: false },
      { value: '18l', label: 'L', checked: false },
      { value: '20l', label: 'XL', checked: false },
      { value: '40l', label: 'XXL', checked: false },
      { value: '40l', label: 'XXXL', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const useStyles = makeStyles({
  root: {
    color: 'orange', // change color here
  },
});


const Sort = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [value, setValue] = useState([0, 100]);

  const handleInputChange = (index) => (event) => {
    const newValue = [...value];
    newValue[index] = event.target.value;
    setValue(newValue);
  };

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios
      .get(Product)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));

    axios
      .get(Category)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const selectedCategoryIds = query.getAll('category');
    setSelectedCategories(selectedCategoryIds);
  }, []);
  
  /* const updateSelectedCategories = (categoryId, add) => {
    const updatedSelectedCategories = add
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
  
    setSelectedCategories(updatedSelectedCategories);
  
    const searchParams = new URLSearchParams();
    updatedSelectedCategories.forEach((categoryId) => searchParams.append('category', categoryId));
    const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  
  const handleClearAllCategories = (e) => {
    e.preventDefault()
    setSelectedCategories([]);
    const searchParams = new URLSearchParams();
    const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  
  const filteredProducts = products.filter((product) => {
    const isCategoryMatched = selectedCategories.length === 0 || selectedCategories.some(id => product.categories.includes(id));
    const isPriceMatched = product.price >= value[0] && product.price <= value[1];
    return isCategoryMatched && isPriceMatched;
  }); */

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const productCategories = product.category.map((cat) => cat._id);
    const isCategoryMatched =
      selectedCategories.length === 0
        ? true
        : selectedCategories.every((cat) => productCategories.includes(cat));
    const isPriceMatched = product.price >= value[0] && product.price <= value[1];
    return isCategoryMatched && isPriceMatched;
  });


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
          Search,
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
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <div className=' flex flex-col p-3 rounded-xl w-[100%] '>
                        <input
                          type="search"
                          placeholder="Search"
                          className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm outline-none focus:outline-none focus:shadow-outline w-full"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="relative">
                          {searchResults.length > 0 && (
                            <div className="bg-[#fdedd5] p-1 rounded-lg absolute top-full left-0 right-0 z-10">
                              {searchResults.map((product) => (
                                <div key={product._id}>
                                  <Link to={`/products/${product._id}`} className="text-black no-underline">
                                    <div className="mt-1 bg-white rounded-lg shadow-sm cursor-pointer flex">
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
                          )}
                        </div>
                      </div>
                      <h1 className='font-bold text-2xl ml-5'>Category</h1>
                      {/* <div className='flex flex-col space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 ml-10'>
                        {categories.map(({ _id: id, name }) => (
                          <label key={id}>
                            <input
                              type="checkbox"
                              value={id}
                              checked={selectedCategories.includes(id)}
                              onChange={() => updateSelectedCategories(id, !selectedCategories.includes(id))}
                              className=" mr-2 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                            />
                            {name}
                          </label>
                        ))}
                        <Button onClick={handleClearAllCategories} className="bg-orange p-2 w-[50%] mx-auto">Clear All Categories</Button>
                      </div> */}
                      <div className='px-4'>
                        Price <br />
                        <div className=' flex justify-between mt-3'>
                          <input
                            type="number"
                            value={value[0]}
                            onChange={handleInputChange(0)}
                            min={0}
                            max={100}
                            className="w-[20%] rounded-xl text-center appearance-none m-0 focus:outline-none focus:ring-0 bg-white"
                          />
                          <input
                            type="number"
                            value={value[1]}
                            onChange={handleInputChange(1)}
                            min={0}
                            max={100}
                            className="w-[20%] rounded-xl text-center appearance-none m-0 focus:outline-none focus:ring-0 bg-white"
                          />
                        </div>
                        <Slider
                          value={value}
                          onChange={rangeSelector}
                          valueLabelDisplay="auto"
                          min={0}
                          max={100}
                          step={1}
                          classes={{ root: classes.root }}
                        />
                      </div>
                      {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{section.name}</span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <main>
            <div className="flex items-baseline justify-between border-b border-gray-200 bg-[#fdedd5] mt-20 pb-4 px-4 pt-4 rounded-xl shadow-md">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sotiments</h1>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div className="flex flex-wrap">
                {/* Filters */}
                <form className="hidden lg:block w-[20%]">
                  <div className=' flex flex-col p-3 rounded-xl w-[100%] '>
                    <input
                      type="search"
                      placeholder="Search"
                      className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm outline-none focus:outline-none focus:shadow-outline w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="relative">
                      {searchResults.length > 0 && (
                        <div className="bg-[#fdedd5] p-1 rounded-lg absolute top-full left-0 right-0 z-10">
                          {searchResults.map((product) => (
                            <div key={product._id}>
                              <Link to={`/products/${product._id}`} className="text-black no-underline">
                                <div className="mt-1 bg-white rounded-lg shadow-sm cursor-pointer flex">
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
                      )}
                    </div>
                  </div>
                  <h1 className='font-bold text-2xl'>Category</h1>
                  <div className='flex flex-col space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 pl-5'>
                    {categories.map(({ _id: id, name }) => (
                      <label key={id}>
                        <input
                          type="checkbox"
                          value={id}
                          checked={selectedCategories.includes(id)}
                          onChange={handleCategoryChange}
                          className=" mr-2 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                        />
                        {name}
                      </label>
                    ))}
                    <Button onClick={() => setSelectedCategories([])}>Clear filters</Button>
                  </div>
                  <div >
                    Price <br />
                    <div className=' flex justify-between mt-3'>
                      <input
                        type="number"
                        value={value[0]}
                        onChange={handleInputChange(0)}
                        min={0}
                        max={100}
                        className="w-[20%] rounded-xl text-center appearance-none m-0 focus:outline-none focus:ring-0 bg-white"
                      />
                      <input
                        type="number"
                        value={value[1]}
                        onChange={handleInputChange(1)}
                        min={0}
                        max={100}
                        className="w-[20%] rounded-xl text-center appearance-none m-0 focus:outline-none focus:ring-0 bg-white"
                      />
                    </div>
                    <Slider
                      value={value}
                      onChange={rangeSelector}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      step={1}
                      classes={{ root: classes.root }}
                    />
                  </div>
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5 text-orange" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5 text-orange" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
                <div className='w-[75%] mx-auto'>
                  <div className=" lg:px-8">
                    <div className="flex flex-wrap gap-4">
                      {filteredProducts.map((product) => (
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
                              <p className="mt-1 text-xs text-gray-500">Colors: {product.color}</p>
                            </div>
                            <p className="text-xs font-medium text-gray-900">{product.price} €</p>
                            <p>Category: {product.category.map((cat) => cat.name).join(", ")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <Pagination className='justify-center my-5'>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </>
  )
}

export default Sort