import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { API_URL } from "../services/API_URL";

import axios from 'axios'

const EditBeerPage = () => {

    const [thisBeer, setThisBeer] = useState(null)

  
    const navigate = useNavigate()

    const { beerId } = useParams()
  
    // Handler functions for the form inputs. You can leave these as they are.
    const handleTextInput = (e) => {
        console.log("Event", e)
        setThisBeer((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleNumberInput = (e) => {
        setThisBeer((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
    
      if (thisBeer) {
          
          axios.put(`${API_URL}/${thisBeer.id}`, thisBeer)
            .then((response) => {
              console.log(response.data.message)
              navigate('/beers')
            })
            .catch((err) => {
              console.log(err)
            })
      }
  
      // axios.post(`${API_URL}/new`, newBeer)
  
    }

    useEffect(() => {
        axios.get(API_URL + "/" + beerId )
            .then((response) => {
                setThisBeer(response.data)
            })
            .catch((err) => {
                console.log
            })
    }, [])
  
    // TASK:
    // 1. Create a function to handle the form submission and send the form data to the Beers API to create a new beer.
    // 2. Use axios to make a POST request to the Beers API.
    // 3. Once the beer is created, navigate the user to the page showing the list of all beers.
  
  
  
    // Structure and the content of the page showing the form for adding a new beer. You can leave this as it is.
    return (
      <>
        <div className="d-inline-flex flex-column w-100 p-4">
        {thisBeer && 
        
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                className="form-control mb-4"
                type="text"
                name="name"
                placeholder="Beer Name"
                value={thisBeer.name}
                onChange={handleTextInput}
                />
                <label>Tagline</label>
                <input
                className="form-control mb-4"
                type="text"
                name="tagline"
                placeholder="Beer Tagline"
                value={thisBeer.tagline}
                onChange={handleTextInput}
                />
    
                <label className="form-label">Description</label>
                <textarea
                className="form-control mb-4"
                type="text"
                name="description"
                placeholder="Description"
                rows="3"
                value={thisBeer.description}
                onChange={handleTextInput}
                ></textarea>
    
                <label>Image</label>
                <input
                className="form-control mb-4"
                type="text"
                name="image_url"
                placeholder="Image URL"
                value={thisBeer.image_url}
                onChange={handleTextInput}
                />
    
                <label>First Brewed</label>
                <input
                className="form-control mb-4"
                type="text"
                name="first_brewed"
                placeholder="Date - MM/YYYY"
                value={thisBeer.first_brewed}
                onChange={handleTextInput}
                />
    
                <label>Brewer Tips</label>
                <input
                className="form-control mb-4"
                type="text"
                name="brewers_tips"
                placeholder="..."
                value={thisBeer.brewers_tips}
                onChange={handleTextInput}
                />
    
                <label>Attenuation Level</label>
                <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    %
                    </span>
                </div>
                <input
                    className="form-control mb-4"
                    type="number"
                    name="attenuation_level"
                    value={thisBeer.attenuation_level}
                    onChange={handleNumberInput}
                    min={0}
                    max={100}
                />
                </div>
    
                <label>Contributed By</label>
                <input
                className="form-control mb-4"
                type="text"
                name="contributed_by"
                placeholder="Contributed by"
                value={thisBeer.contributed_by}
                onChange={handleTextInput}
                />
                <button className="btn btn-primary btn-round">Edit Beer</button>
            </form>
        
        }
        </div>
      </>
    );
}

export default EditBeerPage