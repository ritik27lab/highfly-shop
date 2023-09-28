import React,{useState} from 'react';
import { ReactComponent as Delete } from '../assets/svg/delete.svg'

interface Section {
  id: number;
}

interface ComponentType {
  index: number;
  sections: Section[];
}

const Component: React.FC<{
  component: ComponentType;
  onDeleteComponent: () => void;
  onAddSection: () => void;
  onDeleteSection: (sectionIndex: number) => void;
}> = ({ component, onDeleteComponent, onAddSection, onDeleteSection }) => {
  return (
    <div style={{ backgroundColor: 'pink', height: 360, width: 360 }}>
      <div style={{ marginTop: 10, alignSelf: 'flex-end', paddingRight: 10 }}>
        <button onClick={onAddSection}>Add Section</button>
        <button onClick={onDeleteComponent}>Delete Component</button>
      </div>
      <div style={{ textAlign: 'center' }}>Component {component.index}</div>
      {component.sections.map((_, sectionIndex) => (
        <div key={sectionIndex} style={{ marginTop: 10, padding: 5, border: '1px solid #ddd' }}>
          Section {sectionIndex + 1}
          <button onClick={() => onDeleteSection(sectionIndex)}>Delete Section</button>
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
    <div style={{ backgroundColor: '#a4a4a4', flex: 1 }}>
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
      <button onClick={addComponent}>Add another component</button>
    </div>
  );
};
export default HomePage;
