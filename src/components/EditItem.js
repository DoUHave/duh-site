import React, { Component } from "react";
import Constant from "../util/Constant";

class EditItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.item;

    this.state = {
      itemName: item.name,
      itemBudget: item.budget,
      itemCategory: item.category,
      itemLocation: item.location,
      itemState: item.locationState,
      itemCondition: item.condition,
      itemDescription: item.description,
      itemSubmittedby: item.submittedby,
      submitError: "",
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCondition = this.onChangeCondition.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubmittedby = this.onChangeSubmittedby.bind(this);

    this.validateForm = this.validateForm.bind(this);
    this.onSubmitEdits = this.onSubmitEdits.bind(this);
  }

  onChangeName(event) {
    this.setState({
      itemName: event.target.value,
    });
  }
  onChangeBudget(event) {
    this.setState({
      itemBudget: event.target.value,
    });
  }
  onChangeCategory(event) {
    this.setState({
      itemCategory: event.target.value,
    });
  }
  onChangeLocation(event) {
    this.setState({
      itemLocation: event.target.value,
    });
  }
  onChangeState(event) {
    this.setState({
      itemState: event.target.value,
    });
  }
  onChangeCondition(event) {
    this.setState({
      itemCondition: event.target.value,
    });
  }
  onChangeDescription(event) {
    this.setState({
      itemDescription: event.target.value,
    });
  }
  onChangeSubmittedby(event) {
    this.setState({
      itemSubmittedby: event.target.value,
    });
  }

  onSubmitEdits() {
    const {
      itemName,
      itemBudget,
      itemCategory,
      itemLocation,
      itemState,
      itemCondition,
      itemDescription,
      itemSubmittedby,
    } = this.state;
    const item = this.props.item;
    const token = this.props.token;

    fetch(`${Constant.API_ENDPOINT}/items/item/edit/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: itemName,
        budget: itemBudget,
        category: itemCategory,
        location: itemLocation,
        locationState: itemState,
        condition: itemCondition,
        description: itemDescription,
        submittedby: itemSubmittedby,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === "Item updated!") {
          window.location.reload();
        }
      });
  }

  validateForm() {
    const {
      itemName,
      itemBudget,
      itemCategory,
      itemLocation,
      itemState,
      itemCondition,
      itemDescription,
      itemSubmittedby,
      submitError,
    } = this.state;

    if (itemName === "") {
      this.setState({
        submitError: "Item Name Cannot Be Empty",
      });
      return;
    } else if (itemCategory === "") {
      this.setState({
        submitError: "Please Choose a Category",
      });
      return;
    } else if (itemBudget === "") {
      this.setState({
        submitError: "Budget Cannot Be Empty",
      });
      return;
    } else if (isNaN(itemBudget)) {
      this.setState({
        submitError: "Please Include Only Numbers in Budget",
      });
      return;
    } else if (itemCondition === "") {
      this.setState({
        submitError: "Please Choose a Condition",
      });
      return;
    } else if (itemDescription === "") {
      this.setState({
        submitError: "Description Cannot be Empty",
      });
      return;
    } else if (itemDescription.length < 20) {
      this.setState({
        submitError: "Description Needs to be at least 20 characters",
      });
      return;
    } else if (itemLocation === "") {
      this.setState({
        submitError: "Please Include City where Item is Located",
      });
      return;
    } else if (itemState === "") {
      this.setState({
        submitError: "Please Choose a State",
      });
      return;
    } else if (itemSubmittedby === "") {
      this.setState({
        submitError: "Please Include Your Name",
      });
      return;
    } else {
      this.onSubmitEdits();
    }
  }

  render() {
    const item = this.props.item;
    const {
      itemName,
      itemBudget,
      itemCategory,
      itemLocation,
      itemState,
      itemCondition,
      itemDescription,
      itemSubmittedby,
      submitError,
    } = this.state;
    return (
      <div className="EditItem">
        <h1>Edit</h1>
        <label>Item Name</label>
        <br />
        <input
          type="text"
          placeholder={item.name}
          value={itemName}
          onChange={this.onChangeName}
        />
        <br />
        <label>Budget</label>
        <br />
        <input
          type="text"
          placeholder={item.budget}
          value={itemBudget}
          onChange={this.onChangeBudget}
        />
        <br />
        <label>Category</label>
        <br />
        <select value={itemCategory} onChange={this.onChangeCategory}>
          <option value="" />
          <option value="auto">Car's and Trucks</option>
          <option value="appliance">Appliances</option>
          <option value="moto">Moto/ATV/UTV</option>
          <option value="cell">Cell Phones</option>
          <option value="furniture">Furniture</option>
          <option value="instrument">Musical Instruments</option>
          <option value="game">Video Games</option>
          <option value="clothing">Clothing & Accessories</option>
          <option value="collectible">Antiques & Collectibles</option>
          <option value="beauty">Beauty & Cosmetics</option>
          <option value="comequip">Commercial & Restaurant Equipment</option>
          <option value="misc">Everything Else</option>
          <option value="housing">Housing & Places to Live</option>
          <option value="autoservice">Auto Services</option>
          <option value="homeservice">Home Services</option>
        </select>
        <br />
        <label>City</label>
        <br />
        <input
          type="text"
          placeholder={item.location}
          value={itemLocation}
          onChange={this.onChangeLocation}
        />
        <br />
        <label>State</label>
        <br />
        <select value={itemState} onChange={this.onChangeState}>
          <option value="" />
          <option value="OK">OK</option>
          <option value="TX">TX</option>
        </select>
        <br />
        <label>Condition</label>
        <br />
        <select value={itemCondition} onChange={this.onChangeCondition}>
          <option value="" />
          <option value="new">New</option>
          <option value="likeNew">Like New</option>
          <option value="lightlyUsed">Lightly Used</option>
          <option value="used">Used</option>
          <option value="wellUsed">Well Used</option>
          <option value="needRepair">Needs Some Repair</option>
          <option value="parts">Parts</option>
        </select>
        <br />
        <label>Description</label>
        <br />
        <textarea
          minLength="25"
          maxLength="1000"
          rows="4"
          cols="50"
          placeholder={item.description}
          value={itemDescription}
          onChange={this.onChangeDescription}
        />
        <br />
        <label>Your Name</label>
        <br />
        <input
          type="text"
          placeholder={item.submittedby}
          value={itemSubmittedby}
          onChange={this.onChangeSubmittedby}
        />
        <br />
        <button onClick={this.validateForm}>Save</button>
        <button onClick={this.props.onCancel}>Cancel</button>
        {submitError ? <p>{submitError}</p> : null}
      </div>
    );
  }
}

export default EditItem;
