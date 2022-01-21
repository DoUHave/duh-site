import React, { Component } from "react";
//import ReactS3Uploader from "react-s3-uploader";
import UploadPhotoButton from "../img/Button-Upload-Photo.png";
import UserService from "../services/UserService";
import Constant from "../util/Constant";
import { handle403Errors } from "../util/helper";
import DEFAULT_IMAGE from "../img/user3.jpg";

class UserInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      token: this.props.token,
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      edit: false,
      submitError: "",
      icon: "",
      profilePic: "",
      imageUploaded: false,
      file: "",
    };
    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
    this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
    this.onTextboxChangeStreetAddress = this.onTextboxChangeStreetAddress.bind(
      this
    );
    this.onTextboxChangeCity = this.onTextboxChangeCity.bind(this);
    this.onTextboxChangeState = this.onTextboxChangeState.bind(this);
    this.onTextboxChangeZip = this.onTextboxChangeZip.bind(this);

    this.validateForm = this.validateForm.bind(this);
    this.onSubmitEdits = this.onSubmitEdits.bind(this);

    this.onEditClick = this.onEditClick.bind(this);
    this.getUser = this.getUser.bind(this);

    this.readURL = this.readURL.bind(this);

    this.onError = this.onError.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.preprocess = this.preprocess.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  onTextboxChangeUsername(event) {
    this.setState({
      userName: event.target.value,
    });
  }
  onTextboxChangeFirstName(event) {
    this.setState({
      firstName: event.target.value,
    });
  }
  onTextboxChangeLastName(event) {
    this.setState({
      lastName: event.target.value,
    });
  }
  onTextboxChangeStreetAddress(event) {
    this.setState({
      streetAddress: event.target.value,
    });
  }
  onTextboxChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }
  onTextboxChangeState(event) {
    this.setState({
      state: event.target.value,
    });
  }
  onTextboxChangeZip(event) {
    this.setState({
      zip: event.target.value,
    });
  }

  onSubmitEdits() {
    const {
      userName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zip,
      userId,
      token,
      profilePic,
    } = this.state;

    fetch(`${Constant.API_ENDPOINT}/user/edit/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zip: zip,
        profilePic: profilePic,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === "User Updated!") {
          this.setState({ edit: false });
        }
      });
  }

  readURL(input) {
    let file = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = (e) => {
      this.setState({
        icon: e.target.result,
        profilePic: file,
      });
    };
  }

  onProgress(e) {
    this.setState({ submitError: "Uploading ..." });
  }

  preprocess(file, next) {
    this.setState({ itemImg: file });
    next(file);
  }

  onError(e) {
    console.log(e, "e.message");
    handle403Errors(e);
    this.setState({
      imageUploaded: false,
      profilePic: "",
      submitError: "An error occured while uploading the image!",
    });
  }

  onFinish(result) {
    if (result) {
      this.setState({
        imageUploaded: true,
        profilePic: result.signedUrl.split("?")[0],
        submitError: "",
      });
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    // const { token, user } = UserService.getUserSessionDetails() || {};
   
    const { userId, token } = this.state;

    if (userId && token) {
      fetch(`${Constant.API_ENDPOINT}/user/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            this.setState({
              userName: json.userName,
              firstName: json.firstName,
              lastName: json.lastName,
              email: json.email,
              streetAddress: json.streetAddress,
              city: json.city,
              state: json.state,
              zip: json.zip,
              profilePic: json.profilePic,
            });
          }
        });
    }
  }
  onEditClick() {
    const { edit } = this.state;
    if (!edit) {
      this.setState({
        edit: true,
      });
    } else {
      this.setState({
        edit: false,
      });
    }
  }

  validateForm() {
    const { firstName, lastName, streetAddress, city, state, zip } = this.state;

    if (firstName === "") {
      this.setState({
        submitError: "First Name Cannot Be Empty",
      });
      return;
    } else if (lastName === "") {
      this.setState({
        submitError: "Last Name Cannot Be Empty",
      });
      return;
    } else if (streetAddress === "") {
      this.setState({
        submitError: "Address Cannot Be Empty",
      });
      return;
    // } else if (city === "") {
    //   this.setState({
    //     submitError: "City Cannot Be Empty",
    //   });
    //   return;
    // } else if (state === "") {
    //   this.setState({
    //     submitError: "Must Choose State",
    //   });
    //   return;
    } else if (zip === "") {
      this.setState({
        submitError: "Zip Cannot Be Empty",
      });
      return;
    } else if (zip.length !== 5) {
      this.setState({
        submitError: "Not a Valid Zip Code",
      });
      return;
    } else {
      this.onSubmitEdits();
    }
  }

  render() {
    const {
      firstName,
      lastName,
      zip,
      edit,
      submitError,
      profilePic,
      icon,
    } = this.state;
    const { token } = UserService.getUserSessionDetails() || {};
    if (!edit) {
      return (
        <div style={{ paddingTop: "30px" }} className="UserInfo">
          <div className="profileFlex d-flex " style={{ textAlign: "left" }}>
            <div>
              <img
                src={icon ? icon : profilePic ? profilePic : DEFAULT_IMAGE}
                width={230}
              />
            </div>

            <div className="secondDiv" style={{ textAlign: "left", marginLeft: "20px" }}>
              <h2>HI {firstName}</h2>
              <label className="top-label">
                <b>Zip:</b> {zip}
              </label>
              <br />
              <button
                className="top-input"
                style={{ backgroundColor: "#e4a62d", padding: "10px 28px" }}
                onClick={this.onEditClick}
              >
                Edit
              </button>
            </div>

          </div>
        </div>
      );
    } else {
      return <div className='UserInfo'>
          <h4 className='top-label'>Edit Personal Information</h4>
          <label className='top-label'>First Name</label>
          <br />
          <input style={{ width: '50%' }} className='top-input' type='text' placeholder={firstName} value={firstName} onChange={this.onTextboxChangeFirstName} />
          <br />
          <br />
          <label className='top-label'>Last Name</label>
          <br />
          <input style={{ width: '50%' }} className='top-input' type='text' placeholder={lastName} value={lastName} onChange={this.onTextboxChangeLastName} />
          <br />
          <br />
          <label className='top-label'>Address</label>
          <br />
          <input style={{ width: '50%' }} className='top-input' type='text' placeholder={this.state.streetAddress} value={this.state.streetAddress} onChange={this.onTextboxChangeStreetAddress} />
          <br />
          <br />
          {/* <label className="top-label">City</label>
          <br />
          <input
            style={{ width: "50%" }}
            className="top-input"
            type="text"
            placeholder={this.state.city}
            value={this.state.city}
            onChange={this.onTextboxChangeCity}
          />
          <br />
          <br />
          <label className="top-label">State</label>
          <br />
          <select
            style={{ width: "50%" }}
            className="top-input"
            value={this.state.state}
            onChange={this.onTextboxChangeState}
          >
            <option value="" />
            <option value="OK">OK</option>
            <option value="TX">TX</option>
          </select> 
          <br />
          <br />*/}
          <label className='top-label'>ZIP Code</label>
          <br />
          <input style={{ width: '50%' }} className='top-input' type='text' placeholder={zip} value={zip} onChange={this.onTextboxChangeZip} />
          <br />
          <br />
          <div style={{ paddingTop: '10px' }} id='itemImgSection'>
            <label style={{ margin: '0px' }} className='btn' for='profilePic'>
              <img style={{ width: '100px', height: '40px', marginLeft: '-10px' }} src={UploadPhotoButton} alt='' />
            </label>
            {/*}
            <ReactS3Uploader className='douhave-s3-uploader' signingUrl={`${Constant.API_ENDPOINT}/items/presigned_url/itempics`} signingUrlMethod='GET' accept='image/*' onProgress={this.onProgress} preprocess={this.preprocess} onError={this.onError} onFinish={this.onFinish} id='profilePic' style={{ visibility: 'hidden' }} signingUrlHeaders={{ Authorization: 'Bearer ' + token }} contentDisposition='auto' scrubFilename={(filename) => {
                // Clearing special chars + adding an unique timestamp
                const fName = filename.replace(/[^0-9a-zA-Z_\-\.]/g, '');
                const ext = fName.substr(fName.lastIndexOf('.') + 1);
                return fName.replace('.' + ext, '') + '-' + Date.now() + '.' + ext;
              }} />*/}

            <input type='file' style={{ visibility: 'hidden' }} name='profilePic' id='profilePic' onChange={(e) => this.readURL(e.target)} />
            <p style={{ marginTop: '0px' }}>
              *required (choose a photo that best represents what you are
              looking for)
            </p>
          </div>
          {/* <label className="top-label">Upload Profile Picture</label>
          <br />
          <ReactS3Uploader
            className="douhave-s3-uploader"
            signingUrl="/items/presigned_url/profilePics"
            signingUrlMethod="GET"
            accept="image/*"
            onProgress={this.onProgress}
            preprocess={this.preprocess}
            onError={this.onError}
            onFinish={this.onFinish}
            id="itemImg"
            style={{ visibility: "hidden" }}
            signingUrlHeaders={{ Authorization: "Bearer " + token }}
            contentDisposition="auto"
            scrubFilename={(filename) => {
              // Clearing special chars + adding an unique timestamp
              const fName = filename.replace(/[^0-9a-zA-Z_\-\.]/g, "");
              const ext = fName.substr(fName.lastIndexOf(".") + 1);

              return (
                fName.replace("." + ext, "") + "-" + Date.now() + "." + ext
              );
            }}
          />
          {/* <input
            type="file"
            style={{ visibility: "Show" }}
            name="itemImg"
            onChange={(e) => this.readURL(e.target)}
            id="itemImg"
          /> */}
          <div className='profile-picture-box'>
            <img style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '20px', borderRadius: '50%' }} alt='icon' src={icon ? icon : profilePic ? profilePic : DEFAULT_IMAGE} />
          </div>
          <br />
          <br />
          <button className='top-input' style={{ backgroundColor: '#e4a62d', padding: '10px 28px' }} onClick={this.validateForm}>
            Save
          </button> <button className='top-input' style={{ padding: '10px 28px' }} onClick={this.onEditClick}>
            Cancel
          </button>
          {submitError ? <p>{submitError}</p> : null}
        </div>;
    }
  }
}

export default UserInfo;
