import renderer from 'react-test-renderer';
import React from 'react';
import AddAnswer from '../Components/addAnswer.js';

it('name is updated when users input their name',()=>{

  const [selectIdQ,setSelectIdQ]=React.useState(641682);
  const [showDiagA,setShowDiagA]=React.useState(true);

  var handleAddA = (e) => {
    setSelectIdQ(e.target.id || '');
    setShowDiagA(!showDiagA);
  }

  const component=renderer.create(
    <AddAnswer quest_id={selectIdQ} closeModal={handleAddA} />

  )

})