









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const token = localStorage.getItem("token1");

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categories', {
          headers: { Authorization: token },
        });
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [token]);

  const addCategory = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/category',
        { name: categoryName },
        { headers: { Authorization: token } }
      );
      setCategories([...categories, { name: categoryName, id: response.data.id }]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setCategories(categories.filter((category) => category.category_id !== id));
      alert(reponse.data.message)
     
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const updateCategory = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/category/${id}`,
        { name: editCategoryName },
        { headers: { Authorization: token } }
      );
      setCategories(categories.map(category =>
        category.category_id === id ? { ...category, name: editCategoryName } : category
      ));
      setEditCategoryId(null); // Reset edit mode
      setEditCategoryName(''); // Clear input field
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold text-white mb-8">Categories</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Add category"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        />
        <button
          onClick={addCategory}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="mt-10 space-y-4 w-full max-w-lg">
        {categories.map((category) => (
          <li key={category.category_id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
            {editCategoryId === category.category_id ? (
              <div className="w-full flex flex-col space-y-2">
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  placeholder="Edit category"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => updateCategory(category.category_id)}
                    className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setEditCategoryId(null);
                      setEditCategoryName('');
                    }}
                    className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <span>{category.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditCategoryId(category.category_id);
                      setEditCategoryName(category.name);
                    }}
                    className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category.category_id)}
                    className="bg-brown-500 text-white py-1 px-4 rounded-md hover:bg-brown-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
               
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <button
          onClick={() => navigate('/service')}
          className="bg-brown-600 text-white py-2 px-4 rounded-md hover:bg-brown-700 transition-colors"
        >
          Category Service
        </button>
      </div>
    </div>
  );
};

export default Categories;
