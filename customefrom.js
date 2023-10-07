"use client";
import React, { useState } from 'react';

function DynamicForm() {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  const fieldData = [
    { type: 'text', defaultValue: 'Default Text Value' },
    { type: 'number', defaultValue: 0 },
    { type: 'select', defaultValue: '' },
    { type: 'multiselect', defaultValue: [] },
    { type: 'radio', defaultValue: '' },
    { type: 'checkbox', defaultValue: [] },
    { type: 'date', defaultValue: '' },
    { type: 'time', defaultValue: '' },
    { type: 'file', defaultValue: null },
    { type: 'password', defaultValue: '' },
    { type: 'hidden', defaultValue: '' },
    { type: 'color', defaultValue: '#000000' },
    { type: 'range', defaultValue: 0 },
    { type: 'email', defaultValue: '' },
    { type: 'phone', defaultValue: '' },
    { type: 'url', defaultValue: '' },
    { type: 'toggle', defaultValue: false },
    { type: 'search', defaultValue: '' },
    { type: 'rating', defaultValue: 0 },
    // Add other field types here
  ];

  const handleAddField = (type) => {
    // Create a new field with a unique name
    const fieldName = `field_${fields.length}`;
    const fieldInfo = fieldData.find((fieldInfo) => fieldInfo.type === type);
    const defaultValue = fieldInfo ? fieldInfo.defaultValue : '';

    const newField = { name: fieldName, type, label: `Field ${fields.length + 1}` };
    
    // Update the fields array and form data
    setFields([...fields, newField]);
    setFormData({ ...formData, [fieldName]: defaultValue });
  };

  const handleRemoveField = (fieldName) => {
    // Remove the field from the fields array and form data
    const updatedFields = fields.filter((field) => field.name !== fieldName);
    const updatedFormData = { ...formData };
    delete updatedFormData[fieldName];

    setFields(updatedFields);
    setFormData(updatedFormData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    // Handle different field types separately
    if (type === 'checkbox') {
      const updatedValue = formData[name] || [];
      if (checked) {
        updatedValue.push(value);
      } else {
        const index = updatedValue.indexOf(value);
        if (index !== -1) {
          updatedValue.splice(index, 1);
        }
      }
      setFormData({ ...formData, [name]: updatedValue });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const renderInputField = (field) => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'password':
      case 'hidden':
      case 'email':
      case 'phone':
      case 'url':
      case 'search':
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      case 'multiselect':
        return (
          <select
            name={field.name}
            value={formData[field.name] || []}
            onChange={handleChange}
            multiple
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      case 'checkbox':
        return (
          <div>
            <label>
              <input
                type="checkbox"
                name={field.name}
                value="option1"
                checked={(formData[field.name] || []).includes('option1')}
                onChange={handleChange}
              />
              Option 1
            </label>
            <label>
              <input
                type="checkbox"
                name={field.name}
                value="option2"
                checked={(formData[field.name] || []).includes('option2')}
                onChange={handleChange}
              />
              Option 2
            </label>
            <label>
              <input
                type="checkbox"
                name={field.name}
                value="option3"
                checked={(formData[field.name] || []).includes('option3')}
                onChange={handleChange}
              />
              Option 3
            </label>
          </div>
        );
      case 'radio':
        return (
          <div>
            <label>
              <input
                type="radio"
                name={field.name}
                value="option1"
                checked={formData[field.name] === 'option1'}
                onChange={handleChange}
              />
              Option 1
            </label>
            <label>
              <input
                type="radio"
                name={field.name}
                value="option2"
                checked={formData[field.name] === 'option2'}
                onChange={handleChange}
              />
              Option 2
            </label>
            <label>
              <input
                type="radio"
                name={field.name}
                value="option3"
                checked={formData[field.name] === 'option3'}
                onChange={handleChange}
              />
              Option 3
            </label>
          </div>
        );
      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'time':
        return (
          <input
            type="time"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            name={field.name}
            onChange={handleChange}
          />
        );
      case 'color':
        return (
          <input
            type="color"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'range':
        return (
          <input
            type="range"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'toggle':
        return (
          <label>
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
            />
            Toggle
          </label>
        );
      case 'rating':
        return (
          <input
            type="number"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            min="0"
            max="5"
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h1>Dynamic React Form</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            {renderInputField(field)}
            <button type="button" onClick={() => handleRemoveField(field.name)}>Remove</button>
          </div>
        ))}
        {fieldData.map((fieldInfo) => (
          <button key={fieldInfo.type} type="button" onClick={() => handleAddField(fieldInfo.type)}>
            Add {fieldInfo.type.charAt(0).toUpperCase() + fieldInfo.type.slice(1)} Field
          </button>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;