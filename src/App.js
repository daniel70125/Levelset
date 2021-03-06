import React, { Component } from 'react';
import './App.css';
import Cat1 from "./Images/Cat-1.jpeg";
import Cat2 from "./Images/Cat-2.jpeg";
import Cat3 from "./Images/Cat-3.jpeg";
import Cat4 from "./Images/Cat-4.jpeg";
import Cat5 from "./Images/Cat-5.jpeg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cats: [''],
        selectedOwnerName: '',
        searchTerm: '',
        selecetdCat: [
          {
            "Name":"",
          "ID":0,
          "thumbnailUrl":"",
          "Birthdate":"",
          "ownerName":"",
          "viewCount":0
          }
        ]
      }
  }
  componentDidMount(){
    // On mount grab the cats from localStotage
    this.setState({cats: JSON.parse(localStorage.getItem('cats'))})
    // On mount grab the first cat from the array and make them the selected cat.
    this.setState({
      selecetdCat: JSON.parse(localStorage.getItem('cats'))[0]
    })

    let body=document.getElementsByTagName('body')[0]
    body.addEventListener('click', () => {
      console.log('ok')
    })
  }
  // Open cat details overlay
  overlayOn() {
    document.getElementById("overlay").style.display = "block";
    document.querySelector('#edit-birthdate-input').value = this.state.selecetdCat.Birthdate;
  }
  // Close cat details overlay
  overlayOff() {
    document.getElementById("overlay").style.display = "none";
  }
  
  chooseCat(e){
    // Grab the localStorage cats array
    let selectedElm = JSON.parse(localStorage.getItem('cats'));
    // Add 1 to user viewcount on click
    selectedElm[e].viewCount = selectedElm[e].viewCount + 1;
    
    // Set new cat array to local storage with updated viewcount
    localStorage.setItem('cats', JSON.stringify(selectedElm))
    
    this.setState({
      selecetdCat: JSON.parse(localStorage.getItem('cats'))[e]
    })
  }
  // This function changes the owner of the selected cat.
  selectOwnerName(e){
    this.setState({
      selectedOwnerName: e.target.value
    })
  }
  search(e){
    // Grab the cats array from local storage
    let selectedElm = JSON.parse(localStorage.getItem('cats'));

    // Filter array depending on search and update cats arr according
    let filteredArr = selectedElm.filter((elm) => {
      return elm.Name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    
    this.setState({
      cats: filteredArr
    })
    
    // If filteredArr doesnt have any results give selectedCat default attributes.
    if (filteredArr.length === 0 ){
      this.setState({
        selecetdCat: {
            "Name":"",
          "ID":0,
          "thumbnailUrl":"https://static.wikia.nocookie.net/pandorahearts/images/7/70/No_image.jpg.png/revision/latest/scale-to-width-down/600?cb=20121025132440",
          "Birthdate":"",
          "ownerName":"",
          "viewCount":0
          }
      })
    } else {
      this.setState({
        selecetdCat: JSON.parse(localStorage.getItem('cats'))[0]
      })
    }
  }
  
  updateCat(e){
    let updatedUrl = document.querySelector('#edit-thumbnail-url-input').value;
    let updatedName = document.querySelector('#edit-name-input').value;
    let updatedBirthday = document.querySelector('#edit-birthdate-input').value;
    let selectedElm = JSON.parse(localStorage.getItem('cats'));

    // Grab the seleceted cat and update it with new values;
    selectedElm[this.state.selecetdCat.ID] = {
          "Name":updatedName === '' ? this.state.selecetdCat.Name : updatedName,
          "ID":this.state.selecetdCat.ID,
          "thumbnailUrl":updatedUrl === '' ? this.state.selecetdCat.thumbnailUrl:updatedUrl ,
          "Birthdate":updatedBirthday === '' ? this.state.selecetdCat.Birthdate : updatedBirthday,
          "ownerName":this.state.selectedOwnerName === '' ? this.state.selecetdCat.ownerName : this.state.selectedOwnerName,
          "viewCount":this.state.selecetdCat.viewCount
    }
    // Set new cats array to localStorage
    localStorage.setItem('cats', JSON.stringify(selectedElm))
    window.location.reload();
  }

  deleteCat(e){
    let selectedElm = JSON.parse(localStorage.getItem('cats'));
    selectedElm.splice(this.state.selecetdCat.ID, 1)
    localStorage.setItem('cats', JSON.stringify(selectedElm))
    window.location.reload();
  }
  render() { 
    console.log(this.state);
    // If there are no cats array on localStorage make one
    if (!localStorage.cats){
      const catObject = [
        {
          "Name":"Adam",
          "ID":0,
          "thumbnailUrl":Cat1,
          "Birthdate":"2011-01-01",
          "ownerName":"Esther",
          "viewCount":0
        },
        {
          "Name":"Bernard",
          "ID":1,
          "thumbnailUrl":Cat2,
          "Birthdate":"2012-02-02",
          "ownerName":"Darkayla",
          "viewCount":0
        },
        {
          "Name":"Calvin",
          "ID":2,
          "thumbnailUrl":Cat3,
          "Birthdate":"2013-03-03",
          "ownerName":"Cordell",
          "viewCount":0
        },
        {
          "Name":"Daniel",
          "ID":3,
          "thumbnailUrl":Cat4,
          "Birthdate":"2014-04-04",
          "ownerName":"Bishop",
          "viewCount":0
        },
        {
          "Name":"Ezekiel",
          "ID":4,
          "thumbnailUrl":Cat5,
          
          "Birthdate":"2015-05-05",
          "ownerName":"Alexander",
          "viewCount":0
        }
      ]
      localStorage.setItem('cats', JSON.stringify(catObject))
    }

    let selectedElm = JSON.parse(localStorage.getItem('cats'));
    localStorage.setItem('cats', JSON.stringify(selectedElm))

    // Render cats object
    const cats = this.state.cats.map((elm, index) => {
      return <div onClick={(e) => this.chooseCat(index)} key={elm.ID} className='left-cat-box'>
        <img alt={elm.Name} className='col-sm-4, left-cat-box-img' src={elm.thumbnailUrl} />
        <span>Name: {elm.Name}</span>
        <p className='left-box-p'>Birthdate: {elm.Birthdate}</p>
        <p>Owner Name:{elm.ownerName}</p>
      </div>
      }
    )

    // Render owner names
    const ownerNames = this.state.cats.map((elm, index) => {
      return <option key={index} value={elm.ownerName}>{elm.ownerName}</option>
    })

    return ( 
      <div className='container'>
        <h1>Cats</h1>
        <div className="row">
          {/* Left div */}
          <div id='div-left' className="col-sm-12, col-lg-4">
            <div id='search-div'>
              <input style={{"fontSize":"20px"}} onChange={(e) => this.search(e)} className="form-control" type="text" placeholder="Search.." />
            </div>
            {cats}
          </div>

          {/* Right div */}
          <div id='div-right' className="col-sm-12, col-lg-8">
            <div id='cat-details-main'>
              <img id='cat-details-img' alt='alt' src={this.state.selecetdCat.thumbnailUrl} />
              <p>Name: {this.state.selecetdCat.Name}</p>
              <p>D-O-B: {this.state.selecetdCat.Birthdate}</p>
              <p>Owner Name: {this.state.selecetdCat.ownerName}</p>
              <p>Number of views: {this.state.selecetdCat.viewCount} times</p>
              <div id='edit-delete-cont'>
                <span onClick={(e) => this.overlayOn()}>Edit</span> | <span onClick={(e) => this.deleteCat(e)}>Delete</span>
              </div>
            </div>
          </div>
          {/* Overlay to edit cat */}
          <div id='overlay'>
            <h2>Edit Cat</h2>
            <div id='edit-box-main'>
              <div className='edit-box1' >
                <label htmlFor="thumbnail-url">Thumbnail Url :</label> <br></br>
                <label htmlFor="fname">Name :</label> <br></br>
                <label htmlFor="birthdate">Birthdate :</label> <br></br>
                <label htmlFor="owner">Owner :</label> <br></br>
              </div>

              <div className='edit-box2'>
                <input className='form-control' type="text" id="edit-thumbnail-url-input" name="thumbnail-url" />
                <input className='form-control' type="text" id="edit-name-input" name="name" />
                <input className='form-control' type="date" id="edit-birthdate-input" name="birthdate" min="2000-01-01" max="2020-12-31"  />
                <select id="edit-owner-input" name="owner" onChange={(e) => this.selectOwnerName(e)}>
                  {ownerNames}
                </select>
              </div>
              <div id='save-delete-cont'>
                <span onClick={(e) => this.updateCat(e)}>Save</span> <span>|</span> <span onClick={(e) => this.deleteCat(e)}>Delete</span>
              </div>
            </div>
            <button onClick={() => this.overlayOff()} type="button" class="btn-close" aria-label="Close">Close</button>
          </div>

        </div>
      </div>
     );
  }
}
 
export default Home;