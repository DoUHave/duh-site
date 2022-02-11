import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";
import { Spinner } from "reactstrap";
import PostButton from "../img/Button- Post It.png";
import UploadPhotoButton from "../img/Button-Upload-Photo.png";
import checkmark1 from "../img/checkmark1.png";
import BestMatchesButton from "../img/Matches-Gold.png";
import PostAnotherButton from "../img/Post-Another-Gold.png";
import ItemService from "../services/ItemService";
import UserService from "../services/UserService";
import Constant from "../util/Constant";
import { handle403Errors } from "../util/helper";
import EmailConfirmationBox from "./EmailConfirmationBox";

class NeedForm extends Component {
  constructor(props) {
    super(props);
    let firstName = this.props.firstName;
    let userId = this.props.userId;
    let email = (UserService.getUserSessionDetails() || {}).email;

    this.state = {
      submitError: "",
      imageUploaded: false,
      name: "",
      itemImg: null,
      loading: false,
      imageUploaded: false,
      budget: "",
      category: "",
      category1: "",
      category2: "",
      condition: "",
      description: "",
      location: "",
      locationState: "",
      locationZip: "",
      submittedby: firstName,
      submittedby1: userId,
      carmake: "",
      carmodel: "",
      caryear: "",
      cellmake: "",
      cellmodel: "",
      cellcarrier: "",
      cellos: "",
      gamesystem: "",
      contactinfo: email,
      phone: "",
      locationFetch: "",
      menu: [
        {
          name: "Vehicles",
          subMenu: [
            {
              name: "Trucks",
              submenu: [
                { name: "Off-Road" },
                { name: "Low-Rides" },
                { name: "Import" },
                { name: "Work" },
              ],
            },
            {
              name: "Cars",
              submenu: [
                { name: "Commuter" },
                { name: "Vintage" },
                { name: "Import" },
                { name: "Muscle" },
              ],
            },
            {
              name: "Motorcycles",
              submenu: [
                { name: "Vintage" },
                { name: "Modern" },
                { name: "Off-Road" },
                { name: "Harley-Davidsons" },
              ],
            },
          ],
        },
        {
          name: "Collectibles",
          subMenu: [
            {
              name: "Cards",
              submenu: [
                { name: "Sports" },
                { name: "Wrestling" },
                { name: "Pokemon" },
                { name: "Others" },
              ],
            },
            { name: "Records" },
            { name: "Instruments" },
            { name: "Arts" },
          ],
        },
        {
          name: "Electronics",
          subMenu: [
            { name: "Stereos" },
            { name: "Personal-Electronics" },
            { name: "Video-Games" },
            { name: "Vintage-Console-Games" },
          ],
        },
        {
          name: "Fashion",
          subMenu: [
            { name: "Men", submenu: [{ name: "Vintage" }, { name: "Modern" }] },
            {
              name: "Women",
              submenu: [
                { name: "Vintage" },
                { name: "Modern" },
                { name: "Athletic" },
              ],
            },
            { name: "Others" },
          ],
        },
        {
          name: "Home",
          subMenu: [
            { name: "Furniture" },
            { name: "Decore" },
            { name: "Vintage" },
            { name: "Modern" },
            { name: "Other" },
          ],
        },
      ],
    };

    this.onTextChangeName = this.onTextChangeName.bind(this);
    this.onChangeItemImg = this.onChangeItemImg.bind(this);
    this.onTextChangeBudget = this.onTextChangeBudget.bind(this);
    this.onTextChangeCategory = this.onTextChangeCategory.bind(this);
    this.onTextChangeCategory1 = this.onTextChangeCategory1.bind(this);
    this.onTextChangeCategory2 = this.onTextChangeCategory2.bind(this);
    this.onTextChangeCondition = this.onTextChangeCondition.bind(this);
    this.onTextChangeDescription = this.onTextChangeDescription.bind(this);
    this.onTextChangeLocation = this.onTextChangeLocation.bind(this);
    this.onTextChangeLocationState = this.onTextChangeLocationState.bind(this);
    this.onTextChangeLocationZip = this.onTextChangeLocationZip.bind(this);
    this.onTextChangeSubmittedby = this.onTextChangeSubmittedby.bind(this);

    this.onTextChangeCarmake = this.onTextChangeCarmake.bind(this);
    this.onTextChangeCarmodel = this.onTextChangeCarmodel.bind(this);
    this.onTextChangeCaryear = this.onTextChangeCaryear.bind(this);
    this.onTextChangeCellmake = this.onTextChangeCellmake.bind(this);
    this.onTextChangeCellmodel = this.onTextChangeCellmodel.bind(this);
    this.onTextChangeCellcarrier = this.onTextChangeCellcarrier.bind(this);
    this.onTextChangeCellos = this.onTextChangeCellos.bind(this);
    this.onTextChangeGamesystem = this.onTextChangeGamesystem.bind(this);
    this.onTextChangeContactInfo = this.onTextChangeContactInfo.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.callZipInfo = this.callZipInfo.bind(this);
    this.callZipInfo2 = this.callZipInfo2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.onError = this.onError.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.preprocess = this.preprocess.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  onTextChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  onChangeItemImg(event) {
    const file = event.target.files[0];
    this.setState({
      itemImg: file,
    });
  }
  onTextChangeBudget(event) {
    this.setState({
      budget: event.target.value,
    });
  }
  onTextChangeCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }
  onTextChangeCategory1(event) {
    this.setState({
      category1: event.target.value,
    });
  }
  onTextChangeCategory2(event) {
    this.setState({
      category2: event.target.value,
    });
  }
  onTextChangeCondition(event) {
    this.setState({
      condition: event.target.value,
    });
  }
  onTextChangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }
  onTextChangeLocation(event) {
    this.setState({
      location: event.target.value,
    });
  }
  onTextChangeLocationState(event) {
    this.setState({
      locationState: event.target.value,
    });
  }
  onTextChangeLocationZip(event) {
    this.setState({
      locationZip: event.target.value,
    });
  }
  onTextChangeSubmittedby(event) {
    this.setState({
      submittedby: event.target.value,
    });
  }
  onTextChangeCarmake(event) {
    this.setState({
      carmake: event.target.value,
    });
  }
  onTextChangeCarmodel(event) {
    this.setState({
      carmodel: event.target.value,
    });
  }
  onTextChangeCaryear(event) {
    this.setState({
      caryear: event.target.value,
    });
  }
  onTextChangeCellmake(event) {
    this.setState({
      cellmake: event.target.value,
    });
  }
  onTextChangeCellmodel(event) {
    this.setState({
      cellmodel: event.target.value,
    });
  }
  onTextChangeCellcarrier(event) {
    this.setState({
      cellcarrier: event.target.value,
    });
  }
  onTextChangeCellos(event) {
    this.setState({
      cellos: event.target.value,
    });
  }
  onTextChangeGamesystem(event) {
    this.setState({
      gamesystem: event.target.value,
    });
  }
  onTextChangeContactInfo(event) {
    this.setState({
      contactinfo: event.target.value,
    });
  }
  onChangePhone(event) {
    this.setState({
      phone: event.target.value,
    });
  }

  callZipInfo() {
    const { locationZip } = this.state;

    fetch(`${Constant.API_ENDPOINT}/zips/${locationZip}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.response) {
          this.setState({
            locationFetch: json.response,
            locationZip: json.zip_code,
            locationState: json.state,
            locationCity: json.city,
          });
        }
      });
  }

  callZipInfo2() {
    const { locationZip } = this.state;

    var isnum = /^\d+$/.test(locationZip);

    this.setState({
      location: "",
      locationState: "",
    });

    if (locationZip === "") {
      this.setState({
        submitError: "Please Include Zip",
      });
      return;
    } else if (locationZip.length !== 5) {
      this.setState({
        submitError: "Invalid Zip",
      });
      return;
    } else if (!isnum) {
      this.setState({
        submitError: "Invalid Zip",
      });
      return;
    } else {
      this.setState({
        submitError: "",
      });
    }

    this.setState({ loading: true });

    return fetch(
      `https://redline-redline-zipcode.p.rapidapi.com/rest/info.json/${locationZip}/degrees`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "redline-redline-zipcode.p.rapidapi.com",
          "x-rapidapi-key":
            "47eaf9b3eemsh8821c07d555b84cp11d76cjsn3879605d5b16",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          loading: false,
          location: response.city,
          locationState: response.state,
          submitError: "",
        });
      })
      .catch((err) => {
        this.setState({ loading: false, submitError: "" });
      });
  }

  validateForm() {
    const {
      name,
      itemImg,
      budget,
      category,
      description,
      location,
      locationState,
      locationZip,
      contactinfo,
    } = this.state;
    this.setState({ submitError: "" });
    const { emailConfirmed } = UserService.getUserSessionDetails() || {};

    var isnum = /^\d+$/.test(locationZip);

    if (this.state.loading) {
      this.setState({
        submitError: "Still loading ...",
      });
      return;
    } else if (!emailConfirmed) {
      this.setState({
        submitError:
          "Please confirm your email address with the instructions on the home page.",
      });
      return;
    } else if (name === "") {
      this.setState({
        submitError: "Item name cannot be empty.",
      });
      return;
    } else if (!itemImg) {
      this.setState({
        submitError: "Please pick up the item image.",
      });
      return;
    } else if (category === "") {
      this.setState({
        submitError: "Please choose a category.",
      });
      return;
    } else if (budget === "") {
      this.setState({
        submitError: "Budget cannot be empty.",
      });
      return;
    } else if (isNaN(budget)) {
      this.setState({
        submitError: "Please include only numbers in budget.",
      });
      return;
    } else if (description === "") {
      this.setState({
        submitError: "Description cannot be empty.",
      });
      return;
    } else if (description.length < 20) {
      this.setState({
        submitError: "Description needs to be at least 20 characters.",
      });
      return;
    } else if (locationZip === "") {
      this.setState({
        submitError: "Please include Zip.",
      });
      return;
    } else if (locationZip.length !== 5) {
      this.setState({
        submitError: "Invalid zip.",
      });
      return;
    } else if (!isnum) {
      this.setState({
        submitError: "Invalid zip.",
      });
    } else if (location === "") {
      this.setState({
        submitError: "Please include city where item is located.",
      });
      return;
    } else if (locationState === "") {
      this.setState({
        submitError: "Please choose a state.",
      });
      return;
    } else if (contactinfo === "") {
      this.setState({
        submitError: "Please include a contact number or email address.",
      });
      return;
    } else {
      this.onSubmit();
    }
  }

  async onSubmit() {
    const {
      name,
      itemImg,
      budget,
      category,

      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submittedby1,
      carmake,
      carmodel,
      caryear,
      cellmake,
      cellmodel,
      cellcarrier,
      cellos,
      gamesystem,
      contactinfo,
      category1,
      category2,
    } = this.state;

    const data = {
      name,
      itemImg,
      budget,
      category:
        (category !== "" ? JSON.parse(category).name : "") +
        "/" +
        (category1 !== "" ? JSON.parse(category1).name : "") +
        "/" +
        (category2 !== "" ? JSON.parse(category2).name : ""),
      condition: "new",
      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submittedby1,
      carmake,
      carmodel,
      caryear,
      cellmake,
      cellmodel,
      cellcarrier,
      cellos,
      gamesystem,
      contactinfo,
    };

    // Enabling the loader
    this.setState({ loading: true });

    const json = await ItemService.postItem(data);

    // Disabling the loader
    this.setState({ loading: false });

    if (json.message === "Item created in /items") {
      this.setState({
        submitError:
          "Your Requested Item has been posted, Please proceed to the home page to see your listing.",
        name: "",
        itemImg: "",
        imageUploaded: false,
        budget: "",
        category: "",
        condition: "",
        description: "",
        location: "",
        locationState: "",
        locationZip: "",
        submittedby: "",
        submittedby1: "",
        carmake: "",
        carmodel: "",
        caryear: "",
        cellmake: "",
        cellmodel: "",
        cellcarrier: "",
        cellos: "",
        gamesystem: "",
        category1: "",
        category2: "",
      });
    } else {
      this.setState({
        submitError: (json.error && json.error.message) || "",
      });
    }
  }

  onProgress(e) {
    this.setState({ submitError: "Uploading ..." });
  }

  preprocess(file, next) {
    this.setState({ itemImg: file });
    next(file);
  }

  onError(e) {
    handle403Errors(e);
    this.setState({
      imageUploaded: false,
      itemImg: "",
      submitError: "An error occured while uploading the image!",
    });
  }

  onFinish(result) {
    if (result) {
      this.setState({
        imageUploaded: true,
        itemImg: result.signedUrl.split("?")[0],
        submitError: "",
      });
    }
  }

  render() {
    const {
      submitError,
      name,
      budget,
      category,
      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submittedby1,
      contactinfo,
      phone,
      menu,
      category1,
    } = this.state;

    const { token, email } = UserService.getUserSessionDetails() || {};
    return <div className='NeedForm'>
        {/*<EmailConfirmationBox style={{ margin: 'auto', textAlign: 'center' }} />*/}
        <div className='FormElements'>
          <input type='hidden' value={submittedby1} />
          <div id='itemName'>
            <br />
            <input className='top-input' style={{ width: '100%' }} type='text' value={name} placeholder='Item Name' onChange={this.onTextChangeName} required />
            <br />
          </div>
          <br />
          <div className='LocationDetails'>
            <div className='Zip'>
              <input className='top-input' style={{ width: '100%' }} type='text' placeholder='ZIP Code' value={locationZip} onChange={this.onTextChangeLocationZip} onBlur={this.callZipInfo2} />
              <br />
            </div>
            <br />
            {/*
            <div>
              <div className='City'>
                <input className='top-input' style={{ width: '100%' }} type='text' value={location} placeholder='City' disabled />
                <br />
              </div>
              <br />
              <div className='State'>
                <input className='top-input' style={{ width: '100%' }} type='text' value={locationState} placeholder='State' disabled />
              </div>
            </div>
          */}
          </div>

          <div style={{ paddingTop: '10px' }} id='itemImgSection'>
            <label style={{ margin: '0px' }} className='btn' for='itemImg'>
              <img style={{ width: '100px', height: '40px', marginLeft: '-10px' }} src={UploadPhotoButton} alt='' />
            </label>

            {this.state.itemImg ? <img className='pictureCheck' style={{ width: '3%', height: 'auto' }} src={checkmark1} alt='' /> : null}
            {
            <ReactS3Uploader className='douhave-s3-uploader' signingUrl={`${Constant.API_ENDPOINT}/items/presigned_url/itempics`} signingUrlMethod='GET' accept='image/*' onProgress={this.onProgress} preprocess={this.preprocess} onError={this.onError} onFinish={this.onFinish} id='itemImg' style={{ visibility: 'hidden' }} signingUrlHeaders={{ Authorization: 'Bearer ' + token }} contentDisposition='auto' scrubFilename={(filename) => {
                // Clearing special chars + adding an unique timestamp
                const fName = filename.replace(/[^0-9a-zA-Z_\-\.]/g, '');
                const ext = fName.substr(fName.lastIndexOf('.') + 1);

                return fName.replace('.' + ext, '') + '-' + Date.now() + '.' + ext;
              }} />
            }

            <input type='file' style={{ visibility: 'hidden' }} name='itemImg' id='itemImg' onChange={this.onChangeItemImg} />
            <p style={{ marginTop: '0px' }}>
              *required (choose a photo that best represents what you are
              looking for)
            </p>
          </div>
          <div className='itemRow'>
            <div id='itemCategory'>
              <label style={{ fontWeight: '600' }}>Select Category</label>
              <br />
              <select className='top-input' style={{ width: '100%', margin: '0 20px 0 0' }} required value={this.state.category} onChange={this.onTextChangeCategory}>
                <option value='' />
                {menu.map((item) => (
                  <option value={JSON.stringify(item)}>{item.name}</option>
                ))}
              </select>
              <br />
            </div>
            {category !== '' && JSON.parse(category) && JSON.parse(category).subMenu && <div id='itemCategory'>
                <label style={{ fontWeight: '600' }}>
                  Select Sub Category
                </label>
                <br />
                <select className='top-input' style={{ width: '100%', margin: '0 20px 0 0' }} required value={this.state.category1} onChange={this.onTextChangeCategory1}>
                  <option value='' />
                  {JSON.parse(category).subMenu.map((item) => (
                    <option value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
              </div>}
            {category1 !== '' && JSON.parse(category1) && JSON.parse(category1).submenu && <div id='itemCategory'>
                <label style={{ fontWeight: '600' }}>
                  Select Sub Category
                </label>
                <br />
                <select className='top-input' style={{ width: '100%', margin: '0 20px 0 0' }} required value={this.state.category2} onChange={this.onTextChangeCategory2}>
                  <option value='' />
                  {JSON.parse(category1).submenu.map((item) => (
                    <option value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
              </div>}
            <div id='itemBudget'>
              <br />
              <input className='top-input' style={{ width: '100%' }} required type='text' placeholder='Budget $' value={budget} onChange={this.onTextChangeBudget} />
              <br />
              <br />
            </div>
          </div>

          <div>
            <label style={{ fontWeight: '600' }}>DESCRIPTION</label>
            <br />
            <textarea className='top-input' style={{ width: '100%' }} minLength='25' maxLength='1000' rows='4' cols='50' value={description} onChange={this.onTextChangeDescription} />
            <br />
          </div>

          {this.state.loading ? <>
              <Spinner className='block-center' style={{ width: '5rem', height: '5rem' }} />
              <h3>Did You Know?</h3>
              <p>
                DOUHAVE's "Get Matches Now" service searches over 80
                different platforms for you when you post what you need?
              </p>
            </> : <div />}

          <input type='hidden' value={submittedby} />
          <input type='hidden' value={contactinfo} />

          {contactinfo !== email ? <input required type='text' placeholder='Your Contact Email' value={phone} onChange={this.onChangePhone} /> : null}
          <br />

          {submitError ? <p style={{ marginTop: '1rem', marginBottom: '1rem', fontWeight: 'bolder' }}>
              {submitError}
            </p> : null}

          <button style={{ border: 'none', background: 'none' }} onClick={this.validateForm}>
            <img style={{ height: '40px', width: 'auto' }} src={PostButton} alt='PostButton' />
          </button>

          {this.state.submitError === 'Your Requested Item has been posted, Please proceed to the home page to see your listing.' ? <button style={{ border: 'none' }} onClick={() => window.location.reload(false)}>
              <img style={{ height: '40px', width: 'auto' }} src={PostAnotherButton} alt='PostAnotherButton' />
            </button> : null}

          {this.state.submitError === 'Your Requested Item has been posted, Please proceed to the home page to see your listing.' ? <a href='https://douhave.square.site/product/top-5-local-matches-/4?cs=true' target='_blank'>
              <img src={BestMatchesButton} alt='Get best matches' style={{ height: '40px', width: 'auto' }} />
            </a> : null}
        </div>
      </div>
  }
}

export default NeedForm;
