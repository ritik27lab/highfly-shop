import React,{useState} from 'react';
import { ReactComponent as Close } from '../assets/svg/close.svg'
import { ReactComponent as Delete } from '../assets/svg/delete.svg'

interface Section {
  id: number;
}

interface ComponentType {
  index: number;
  sections: Section[];
}


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

  const [sectionInputs, setSectionInputs] = useState<string[]>([]);

  const handleAddInputField = (sectionIndex: number) => {
    setSectionInputs((prevState) => {
      const newState = [...prevState];
      newState[sectionIndex] = (newState[sectionIndex] || '') + 'Input Field '; // Customize this as needed
      return newState;
    });
  };

  return (
    // <div style={{  height: 360, width: 360 , borderRadius: 10 , borderWidth: 5, borderColor: 'red' , backgroundColor: 'pink' ,margin: 20}}>
    //   <div style={{ marginTop: 10, alignSelf: 'flex-end', paddingRight: 10 , alignItems:"flex-end"}}>
    //     <button onClick={onAddSection}>Add Section</button>
    //     {/* <button onClick={onDeleteComponent}>Delete Component</button> */}
    //     <Close style={{marginLeft: 220}} onClick={onDeleteComponent}/>
    //   </div>
    //   <div style={{ textAlign: 'center' }}>Component {component.index}</div>
    //   {component.sections.map((_, sectionIndex) => (
    //     <div key={sectionIndex} style={{ marginTop: 10, padding: 5, border: '1px solid #ddd' }}>
    //       Section {sectionIndex + 1}
    //       {/* <button onClick={() => onDeleteSection(sectionIndex)}>Delete Section</button> */}
    //       <Delete onClick={() => onDeleteSection(sectionIndex)}/>
    //     </div>
    //   ))}
    // </div>
    <div
    style={{
      height: 360,
      width: 360,
      borderRadius: 10,
      borderWidth: 5,
      borderColor: 'red',
      backgroundColor: 'pink',
      margin: 20,
    }}
  >
    <div style={{ marginTop: 10, alignSelf: 'flex-end', paddingRight: 10, alignItems: 'flex-end' }}>
      <button onClick={onAddSection}>Add Section</button>
      <Close style={{ marginLeft: 220 }} onClick={onDeleteComponent} />
    </div>
    <div style={{ textAlign: 'center' }}>Component {component.index}</div>
    {component.sections.map((_, sectionIndex) => (
      <div key={sectionIndex} style={{ marginTop: 4, padding: 5, border: '1px solid #ddd' }}>
        <div style={{backgroundColor: 'grey', borderRadius: 10 , height: '80px' }}>
          <text style={{fontFamily: 'sans-serif', fontSize: 12}}>Section {sectionIndex + 1}</text>
          <Close style={{marginLeft:250,height : 18 , width: 18 , marginTop: 5 }} onClick={() => onDeleteSection(sectionIndex)}>Delete Section</Close>
        </div>

        {/* <div>
          {sectionInputs[sectionIndex]}
          <button onClick={() => handleAddInputField(sectionIndex)}>Add Input Field</button>
        </div> */}
      </div>
    ))}
  </div>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


const HomePage = () => {

  const [components, setComponents] = useState<ComponentType[]>([{ index: 1, sections: [] }]);

  const addComponent = () => {
    const newIndex = components.length + 1;
    setComponents([...components, { index: newIndex, sections: [] }]);
  };

  const addSection = (componentIndex: number) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].sections.push({ id: Date.now() });
    setComponents(updatedComponents);
  };

  const deleteComponent = (componentIndex: number) => {
    const updatedComponents = components.filter((_, index) => index !== componentIndex);
    setComponents(updatedComponents);
  };

  const deleteSection = (componentIndex: number, sectionIndex: number) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].sections.splice(sectionIndex, 1);
    setComponents(updatedComponents);
  };

  return (
    <div style={{ backgroundColor:'#ffffff', flex: 1 }}>
      <button style={{alignSelf:'flex-end',}} onClick={addComponent}>Add component</button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
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
