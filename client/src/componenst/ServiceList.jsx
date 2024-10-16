
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceFrom';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const token = localStorage.getItem("token1");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/categories',
          {
            headers: { Authorization: token },
          }
        );
        setCategories(response.data);
        if (response.data.length > 0) {
          setCategoryId(response.data[0].category_id);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchServices();
    }
  }, [categoryId]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/category/${categoryId}/services`,
        { headers: { Authorization: token } }
      );
      setServices(response.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const updateSeelectedCateogryId = (cateId)=>{
    setCategoryId(cateId)
  }

  const deleteService = async (serviceId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/category/${categoryId}/service/${serviceId}`,
        { headers: { Authorization: token } }
      );
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div>
      <h1>Services</h1>

      {/* Pass categoryId and refreshServices to the form */}
      <ServiceForm 
        categorydata={categories} 
        service={editingService} 
        refreshServices={fetchServices} 
        categoryId={categoryId}  // Pass the selected categoryId
        updateSeelectedCateogryId={updateSeelectedCateogryId}
      />

      <ul>
        {services.map((service) => (
          <li key={service.service_id}>
            {service.name} - {service.type}
            <button onClick={() => setEditingService(service)}>Edit</button>
            <button onClick={() => deleteService(service.service_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;

