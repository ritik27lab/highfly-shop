import React, { useState } from 'react';
import { ReactComponent as Close } from '../assets/svg/close.svg';
import { ReactComponent as Delete } from '../assets/svg/delete.svg';
import { ReactComponent as Button } from '../assets/svg/button.svg';
import './Product.css';
import axios from 'axios';
import './Product.css';



const Component = ({
  component,
  onDeleteComponent,
  onAddSection,
  onDeleteSection,
}: {
  component: {
    index: number;
    sections: {
      name: string;
      studentList: { name: string }[];
    }[];
  };
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
  const handleSubmit = async (componentIndex: number, sectionIndex: number) => {
 
     component.sections[sectionIndex]?.studentList?.push({
      name: formData.name,
    });

    console.log('CCOCOCOCO', component)

    const formDataWithIds = {
      ...formData,
      componentId: component.index,
      sectionId: component.sections.length,
    };
    axios
      .post('http://localhost:8000/createUser', formData)
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

  // console.log("COMPOJENTS", JSON.stringify(component)

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
      <div style={{ textAlign: 'center' }}>Component Id:{component.index}</div>

      {component.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginTop: 4, padding: 5 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: 10 }}>
            <text style={{ fontFamily: 'sans-serif', fontSize: 12 }}>{section.name}</text>
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
          {/* Render the student list */}
          {/* {section.studentList.map((student, studentIndex) => (
            <div key={studentIndex}>{student.name}</div>
          ))} */}
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
            <button type="button" onClick={()=>handleSubmit(component.index,component.sections.length)} className='submit-button'>
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
  const [treeData, setTreeData] = useState({
    classList: [
      {
        name: "Component 1",
        sectionList: [
          { name: "Section 1", studentList: [] },
          { name: "Section 2", studentList: [] },
        ],
      },
      {
        name: "Component 2",
        sectionList: [{ name: "Section 1", studentList: [] }],
      },
    ],
  });

  // Function to add a new component
  const addComponent = () => {
    const newComponent = {
      name: `Component ${treeData.classList.length + 1}`,
      sectionList: [],
    };
    setTreeData({
      classList: [...treeData.classList, newComponent],
    });
  };

  console.log('TREEEDATA', treeData)
  // Function to add a new section to a component
  const addSection = (componentIndex: number) => {
    const newSection = {
      name: `Section ${treeData.classList[componentIndex].sectionList.length + 1}`,
      studentList: [],
    };
    const updatedTreeData = { ...treeData };
    updatedTreeData.classList[componentIndex].sectionList.push(newSection);
    setTreeData(updatedTreeData);
  };

  // Function to delete a component
  const deleteComponent = (componentIndex: number) => {
    const updatedTreeData = { ...treeData };
    updatedTreeData.classList.splice(componentIndex, 1);
    setTreeData(updatedTreeData);
  };

  // Function to delete a section from a component
  const deleteSection = (componentIndex: number, sectionIndex: number) => {
    const updatedTreeData = { ...treeData };
    updatedTreeData.classList[componentIndex].sectionList.splice(sectionIndex, 1);
    setTreeData(updatedTreeData);
  };



  return (
    <div style={{ backgroundColor: "#ffffff", flex: 1 }}>
      {/* Button to add a new component */}
      <button style={{ alignSelf: "flex-end" }} onClick={addComponent}>
        Add component
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Render components */}
        {treeData.classList.map((component, componentIndex) => (
          <Component
            key={componentIndex}
            component={{
              // index: componentIndex + 1, // Assuming you want to display an index for each component
              index: Math.trunc(Math.random()*10000000000), // Assuming you want to display an index for each component
              sections: component.sectionList,
            }}
            onDeleteComponent={() => deleteComponent(componentIndex)}
            onAddSection={() => addSection(componentIndex)}
            onDeleteSection={(sectionIndex) =>
              deleteSection(componentIndex, sectionIndex)
            }
          />
        ))}
      </div>
    </div>
  );
};


export default HomePage;

