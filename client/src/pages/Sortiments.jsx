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
  PlusIcon,
} from '@heroicons/react/20/solid'

import "../product/styles.css"

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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios.get(Product, { params: { color: selectedColors.join(",") } })
      .then(response => {
        setProducts(response.data);
        // Extract available colors from products
        const colors = [...new Set(response.data.flatMap(product => product.color))];
        setAvailableColors(colors);
        const sizes = [...new Set(response.data.flatMap(product => product.size))];
        setAvailableSizes(sizes);
      })
      .catch((error) => console.error(error));

    axios.get(Category)
      .then((response) => {
        setCategories(response.data);
        const query = new URLSearchParams(window.location.search);
        const selectedCategoryIds = query.getAll('category');
        setSelectedCategories(selectedCategoryIds);
      })
      .catch((error) => console.error(error));
  }, []);

  //category
  const clearCategories = () => {
    setSelectedCategories([]);
    const searchParams = new URLSearchParams();
    const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const updateSelectedCategories = (categoryId, add) => {
    const updatedSelectedCategories = add
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);

    setSelectedCategories(updatedSelectedCategories);

    const searchParams = new URLSearchParams();
    updatedSelectedCategories.forEach((categoryId) => searchParams.append('category', categoryId));
    const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  //color
  const handleColorSelection = (event) => {
    const color = event.target.value;
    const isChecked = event.target.checked;

    setSelectedColors(prevSelectedColors => {
      if (isChecked) {
        return [...prevSelectedColors, color];
      } else {
        return prevSelectedColors.filter(selectedColor => selectedColor !== color);
      }
    });
  };

  //size
  const handleSizeSelection = (event) => {
    const size = event.target.value;
    const isChecked = event.target.checked;

    setSelectedSizes(prevSelectedSizes => {
      if (isChecked) {
        return [...prevSelectedSizes, size];
      } else {
        return prevSelectedSizes.filter(selectedSize => selectedSize !== size);
      }
    });
  };

  //search
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

  // price
  const handleInputChange = (index) => (event) => {
    const newValue = [...value];
    newValue[index] = event.target.value;
    setValue(newValue);
  };

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  // filter
  const filteredProducts = products.filter(product => {
    const isPriceMatched = product.price >= value[0] && product.price <= value[1];
    const isSelectedCategory = selectedCategories.length === 0
      || selectedCategories.every(selectedCategory => product.category.some(cat => selectedCategory === cat._id));
    const isColorMatched = selectedColors.length === 0
      || selectedColors.some((color) => product.color.includes(color));
    const isSizeMatched = selectedSizes.length === 0
      || selectedSizes.some((size) => product.size.includes(size));
    return isPriceMatched && isSelectedCategory && isColorMatched && isSizeMatched;
  });
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const sortOptions = [
    { name: 'Low to High', value: 'lowToHigh' },
    { name: 'High to Low', value: 'highToLow' }
  ];

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
                      <h1 className='font-medium text-gray-900 text-2xl px-4'>Category</h1>
                      <div className='flex flex-col space-y-4 border-b border-gray-200 text-sm font-medium text-gray-900 px-4 py-2'>
                        {categories.map(({ _id: id, name }) => (
                          <label key={id}>
                            <input
                              type="checkbox"
                              value={id}
                              checked={selectedCategories.includes(id)}
                              onChange={(e) => {
                                const categoryId = e.target.value;
                                const add = e.target.checked;
                                updateSelectedCategories(categoryId, add);
                              }}
                              className="mr-2 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                            />
                            {name}
                          </label>
                        ))}
                        <Button className="bg-orange p-2 w-[50%] mx-auto" onClick={clearCategories}>Clear All Categories</Button>
                      </div>
                      <div className='px-4'>
                        <span className="font-medium text-gray-900 text-2xl">Price</span> <br />
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
                      <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Color</span>
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
                              <div className="space-y-6">
                                {availableColors.map(color => (
                                  <div key={color} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      value={color}
                                      className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                                      onChange={handleColorSelection}
                                      checked={selectedColors.includes(color)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">{color}</label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Size</span>
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
                              <div className="space-y-6">
                                {availableSizes.map(size => (
                                  <div key={size} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      value={size}
                                      className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                                      onChange={handleSizeSelection}
                                      checked={selectedSizes.includes(size)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">{size}</label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
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
                          <Menu.Item key={option.value}>
                            <a
                              href={option.href}
                              className=" text-black cursor-pointer block p-4 py-2 text-sm border-gray-300"
                              onClick={() => setSortOrder(option.value)}
                            >
                              {option.name}
                            </a>
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
                {/*search*/}
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
                  {/*cetegory*/}
                  <h1 className='font-bold text-2xl'>Category</h1>
                  <div className='flex flex-col space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 pl-5'>
                    {categories.map(({ _id: id, name }) => (
                      <label key={id}>
                        <input
                          type="checkbox"
                          value={id}
                          checked={selectedCategories.includes(id)}
                          onChange={(e) => {
                            const categoryId = e.target.value;
                            const add = e.target.checked;
                            updateSelectedCategories(categoryId, add);
                          }}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                        />
                        {name}
                      </label>
                    ))}
                    <Button className="bg-orange p-2 w-[50%] mx-auto" onClick={clearCategories}>Clear All Categories</Button>
                  </div>
                  {/*price*/}
                  <div >
                    <div className=' font-semibold text-lg pt-2'>Price</div>
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
                  {/*color*/}
                  <Disclosure as="div" className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-semibold text-lg text-gray-900">Color</span>
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
                            {availableColors.map(color => (
                              <div key={color} className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={color}
                                  className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                                  onChange={handleColorSelection}
                                  checked={selectedColors.includes(color)}
                                />
                                <label className="ml-3 text-sm text-gray-600">{color}</label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/*size*/}
                  <Disclosure as="div" className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-semibold text-lg text-gray-900">Size</span>
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
                            {availableSizes.map(size => (
                              <div key={size} className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={size}
                                  className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                                  onChange={handleSizeSelection}
                                  checked={selectedSizes.includes(size)}
                                />
                                <label className="ml-3 text-sm text-gray-600">{size}</label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
                {/*product*/}
                <div className="lg:w-[75%] lg:mx-auto md:w-full sm:mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="group relative shadow-sm rounded-md">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Container>
    </>
  )
}

export default Sort