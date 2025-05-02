import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function CategoryFilter({ setCategoriesFromFilter }) {
  const { categories } = useSelector(state => state.category)
  const [selectedCategories, setSelectedCategories] = useState([])
  const myRefs = useRef([]);
  // console.log(myRefs)

  const selectCategory = (e, category, i) => {
    const isChecked = e.target.checked;
    const selectedMainCat = category.name.split("/")[0];
  
    setCategoriesFromFilter(prev => ({
      ...prev,
      [category.name]: isChecked
    }));
  
    const allCategories = categories.map((cat, idx) => ({
      name: cat.name,
      idx,
    }));
  
    const matchingIndexes = allCategories.reduce((acc, item) => {
      const main = item.name.split("/")[0];
      if (main === selectedMainCat) {
        acc.push(item.idx);
      }
      return acc;
    }, []);
    console.log(matchingIndexes)
  
    if (isChecked) {
      setSelectedCategories((old) => {
        const updated = [...old, category.name];
  
        // disable unrelated categories
        myRefs.current.forEach((ref, idx) => {
          if (ref && !matchingIndexes.includes(idx)) {
            ref.disabled = true;
          }
        });
  
        return updated;
      });
    } else {
      setSelectedCategories((old) => {
        const updated = old.filter(name => name !== category.name);
  
        // if none left, reset
        if (updated.length === 0) {
          setCategoriesFromFilter({}); // clear all filters
        
          myRefs.current.forEach((ref) => {
            if (ref) {
              ref.checked = false;
              ref.disabled = false;
            }
          });
        }
        
  
        // re-enable all categories
        myRefs.current.forEach((ref) => {
          if (ref) ref.disabled = false;
        });
  
        return updated;
      });
    }
  };
  

  return (
    <React.Fragment>
      <Form.Label className='fw-bold'>Category</Form.Label>
      <Form>
        {categories.map((c, i) => (
          <div key={i}>
            <Form.Check type="checkbox" id={`category-${i}`}>
              <Form.Check.Input type="checkbox"
                onChange={e => selectCategory(e, c, i)}
                ref={ (el) => (myRefs.current[i] = el) }
              />
              <Form.Check.Label style={{ cursor: "pointer" }}>{c.name}</Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </React.Fragment>
  )
}

export default CategoryFilter