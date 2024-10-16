





import React, { useState, useEffect } from 'react';
import axios from 'axios';

const token = localStorage.getItem("token1");

const ServiceForm = ({ service, refreshServices, categorydata = [], categoryId,  updateSeelectedCateogryId}) => {
  const [name, setName] = useState(service ? service.name : '');
  const [type, setType] = useState(service ? service.type : '');
  const [priceOptions, setPriceOptions] = useState(service ? service.priceOptions : [{ duration: '', price: '', type: '' }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId); // Default to passed categoryId

  useEffect(() => {
    if (!priceOptions || priceOptions.length === 0) {
      setPriceOptions([{ duration: '', price: '', type: '' }]);
    }
  }, [priceOptions]);
  useEffect(() => {
    if (selectedCategoryId) {
      updateSeelectedCateogryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handlePriceOptionChange = (index, field, value) => {
    const updatedOptions = [...priceOptions];
    updatedOptions[index][field] = value;
    setPriceOptions(updatedOptions);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, type, priceOptions };

    try {
      if (service) {
        await axios.put(
          `http://localhost:8080/api/category/${selectedCategoryId}/service/${service.service_id}`,
          data,
          { headers: { Authorization: token } }
        );
      } else {
        console.log('category id ', selectedCategoryId)
        await axios.post(
          `http://localhost:8080/api/category/${selectedCategoryId}/service`,
          data,
          { headers: { Authorization: token } }

        );
      }
      refreshServices(); // Reload services after submission
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Service Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Service Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          name="category"
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select a category</option>
          {categorydata.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <h3>Price Options</h3>
      {priceOptions.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Duration"
            value={option.duration}
            onChange={(e) => handlePriceOptionChange(index, 'duration', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={option.price}
            onChange={(e) => handlePriceOptionChange(index, 'price', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={option.type}
            onChange={(e) => handlePriceOptionChange(index, 'type', e.target.value)}
            required
          />
        </div>
      ))}
      
      <button type="submit">{service ? 'Update Service' : 'Create Service'}</button>
    </form>
  );
};

export default ServiceForm;

