import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button'; // <- Ensure you import Button component
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilters = () => {
    setSelectedValue('');
    dispatch(setSearchedQuery(''));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 sm:p-5 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="text-red-500 border-red-300 hover:bg-red-50"
        >
          Clear All
        </Button>
      </div>

      <hr className="mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-5">
          <h2 className="font-semibold text-md mb-2">{data.filterType}</h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {data.array.map((item, idx) => {
              const itemId = `id-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-sm">{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
