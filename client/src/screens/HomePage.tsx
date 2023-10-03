import React, { useState } from 'react';
import { ReactComponent as Close } from '../assets/svg/close.svg';
import { ReactComponent as Delete } from '../assets/svg/delete.svg';
import { ReactComponent as Button } from '../assets/svg/button.svg';
import './Product.css';
import axios from 'axios';
import './Product.css';

// Define interfaces for Section and ComponentType
interface Section {
  id: number;
}

interface ComponentType {
  index: number;
  sections: Section[];
}

// Component for each ComponentType
const Component = ({
  component,
  onDeleteComponent,
  onAddSection,
  onDeleteSection,
}: {
  component: ComponentType;
  onDeleteComponent: () => void;
  onAddSection: () => void;
  onDeleteSection: (sectionIndex: number) => void;
}) => {
  // State for form modal and form data
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    componentId: '',
    sectionId: '',
  });

  // Function to open the form modal
  const openFormModal = () => {
    setFormModalOpen(true);
  };

  // Function to close the form modal
  const closeFormModal = () => {
    setFormModalOpen(false);
  };

  // Function to handle input changes in the form
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
  console.log("--->>>",  "class"+component.index, "section"+component.sections.length,)
    const formDataWithIds = {
      ...formData,
      componentId: component.index,
      sectionId: component.sections.length,
    };

    axios
      .post('http://localhost:8000/createUser', formDataWithIds)
      .then((response) => {
        // Handle the response from the server if needed
        console.log('Response from server:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., network issues or server errors
        console.error('Error:', error);
      })
      .then(() => {
        // Optionally, you can perform actions after successful submission.
        // For example, close the modal and clear the form.
        closeFormModal();
        setFormData({
          name: '',
          email: '',
          address: '',
          phoneNumber: '',
          componentId: '',
          sectionId: '',
        });
      });
  };

  return (
    <div
      style={{
        height: '100%',
        width: 360,
        borderRadius: 10,
        borderWidth: 5,
        backgroundColor: '#E6F4F1',
        margin: 20,
      }}
    >
      <div style={{ marginTop: 10, alignSelf: 'flex-end', paddingRight: 10, alignItems: 'flex-end' }}>
        <button onClick={onAddSection}>Add Section</button>
        {/* Close button for deleting the component */}
        <Close style={{ marginLeft: 220 }} onClick={onDeleteComponent} />
      </div>
      <div style={{ textAlign: 'center' }}>Component {component.index}</div>

      {component.sections.map((_, sectionIndex) => (
        <div key={sectionIndex} style={{ marginTop: 4, padding: 5 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: 10 }}>
            <text style={{ fontFamily: 'sans-serif', fontSize: 12 }}>Section {sectionIndex + 1}</text>
            {/* Delete button for deleting a section */}
            <Delete
              style={{ marginLeft: 250, height: 18, width: 18, marginTop: 5 }}
              onClick={() => onDeleteSection(sectionIndex)}
            >
              Delete Section
            </Delete>
            {/* Button to open the form modal */}
            <Button onClick={openFormModal} style={{ alignSelf: 'flex-start', marginLeft: 250, height: 65 }} />
          </div>
        </div>
      ))}

      {/* Form modal */}
      {isFormModalOpen && (
        <div className="form-modal">
          <h2>Form Modal</h2>
          <form>
            {/* Input fields for the form */}
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            <br />
            <label>Email:</label>
            <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
            <br />
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            <br />

            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <br />
            {/* Button to submit the form */}
            <button type="button" onClick={handleSubmit} className='submit-button'>
              Submit
            </button>
          </form>
          {/* Button to close the form modal */}
          <button onClick={closeFormModal} className="close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

// HomePage component
const HomePage = () => {
  // State for components
  const [components, setComponents] = useState<ComponentType[]>([{ index: 1, sections: [] }]);

  // Function to add a new component
  const addComponent = () => {
    const newIndex = components.length + 1;
    setComponents([...components, { index: newIndex, sections: [] }]);
  };

  // Function to add a new section to a component
  const addSection = (componentIndex: number) => {
    const updatedComponents = [...components];
    const sections = updatedComponents[componentIndex].sections;

    // Check if the sections length is already 3, and if so, display an alert and return early
    // if (sections.length >= 3) {
    //   alert("You can't add more than 3 sections. Buy premium to get access to unlimited sections");
    //   return;
    // }
    const newSection = { id: Date.now() };
    sections.push(newSection);
    setComponents(updatedComponents);
  };

  // Function to delete a component
  const deleteComponent = (componentIndex: number) => {
    const updatedComponents = components.filter((_, index) => index !== componentIndex);
    setComponents(updatedComponents);
  };

  // Function to delete a section from a component
  const deleteSection = (componentIndex: number, sectionIndex: number) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].sections.splice(sectionIndex, 1);
    setComponents(updatedComponents);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', flex: 1 }}>
      {/* Button to add a new component */}
      <button style={{ alignSelf: 'flex-end' }} onClick={addComponent}>
        Add component
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Render components */}
        {components.map((component, componentIndex) => (
          <Component
            key={componentIndex}
            component={component}
            onDeleteComponent={() => deleteComponent(componentIndex)}
            onAddSection={() => addSection(componentIndex)}
            onDeleteSection={(sectionIndex) => deleteSection(componentIndex, sectionIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

