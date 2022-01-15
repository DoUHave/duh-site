import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import About from './components/About.js';
import AdsBar from './components/AdsBar.js';
import AdvancedSearch from './components/AdvancedSearch.js';
import Appliances from './components/Appliances.js';
import Auto from './components/Auto.js';
import AutoService from './components/AutoService.js';
import Beauty from './components/Beauty.js';
import CategoryItems from './components/CategoryItems.js';
import Cell from './components/Cell.js';
import ChatView from './components/ChatView.js';
import Clothing from './components/Clothing.js';
import ComEquip from './components/ComEquip.js';
import Contact from './components/Contact.js';
import EmailConfirmed from './components/EmailConfirmed.js';
import Footer from './components/Footer.js';
import ForgotPassword from './components/ForgotPassword.js';
import Furniture from './components/Furniture.js';
import Header from './components/Header.js';
import Home from './components/Home.js';
import HomeService from './components/HomeService.js';
import Housing from './components/Housing.js';
import HowItWorks from './components/HowItWorks.js';
import Instruments from './components/Instruments.js';
import ItemDetails from './components/ItemDetails.js';
import Messages from './components/Messages.js';
import Misc from './components/Misc.js';
import MobileMenu from './components/MobileMenu.js';
import Moto from './components/Moto.js';
import PaymentFormLoader from './components/PaymentFormLoader.js';
import Register from './components/Register.js';
import SearchResults from './components/SearchResults.js';
import SideBar from './components/SideBar.js';
import Login from './components/Signin.js';
import UserPanel from './components/UserPanel.js';
import Vidgame from './components/Vidgame.js';
import WhatPeopleNeed from './components/WhatPeopleNeed.js';
import WhatYouNeed from './components/WhatYouNeed.js';
import './PaymentFormLoader.css';
import ItemService from './services/ItemService.js';
import UserService from './services/UserService.js';
import Constant from './util/Constant.js';
import { getFromStorage } from './util/storage.js';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isAuth: false,
      disableInfiniteScroll: false,
      lastId: '',
      userName: '',
      firstName: '',
      userId: '',
      email: '',
      searchTerm: '',
      searchResults: [],
      showResults: false,
      distance: '',
      zipCode: '',
      zipResults: [],
      errorMessage: '',
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.getUserVerify = this.getUserVerify.bind(this);

    this.onSearch = this.onSearch.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onZipChange = this.onZipChange.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getItemsInfinite = this.getItems.bind(this, true);
    this.searchBehaviorObject = ItemService.getSearchBehaviorObject();
  }

  onTextChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  onDistanceChange(event) {
    this.setState({
      lastId: '',
      searchResults: [],
      distance: event.target.value,
    });
  }

  onZipChange(event) {
    this.setState({
      lastId: '',
      searchResults: [],
      zipCode: event.target.value,
    });
  }

  handleSearch() {
    if (!this.state.zipCode || this.state.zipCode.length !== 5)
      return alert('Invalid zip code provided.');
    if (
      window.location.pathname !== '/' &&
      window.location.pathname !== '/WhatPeopleNeed'
    ) {
      window.location = `/WhatPeopleNeed?zipCode=${
        this.state.zipCode
      }&distance=${this.state.distance}`;
    } else {
      this.searchBehaviorObject.next({
        zipCode: this.state.zipCode,
        distance: this.state.distance,
      });
    }
  }

  /**
   * Searching on enter key pressed
   * @param {*} e
   */
  onKeyPress = (e) => {
    if (e.which === 13) this.handleSearch();
  };

  /**
   * Getting the items.
   * @param {*} category The optinal category.
   */
  getItems(isInfiniteScroll = false) {
    ItemService.getAllItems(
      'all',
      this.state.lastId,
      this.state.zipCode,
      this.state.distance
    )
      .then((json) => {
        if (json && json.count > 0) {
          json.items = json.items || [];
          this.setState({
            searchResults: this.state.searchResults.concat(json.items),
            lastId: json.lastId,
            disableInfiniteScroll: json.items.length === 0 ? true : false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage:
            error.response && error.response.data
              ? error.response.data.message
              : error.message,
        });
      });
  }

  onSearch() {
    this.handleSearch();
  }

  componentDidMount() {
    this.getUserVerify();
  }
  async getUserVerify() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      //Verify
      if (token) {
        try {
          let response = await Axios.get(
            `${Constant.API_ENDPOINT}/user/verify/${token}`
          );
          let json = response.data;
          if (json.message === 'User Verified') {
            const userSession = {
              token,
              userName: json.userName,
              firstName: json.firstName,
              userId: json.userId,
              email: json.email,
              profilePic: json.profilePic || '',
              permissions: json.permissions || [],
              emailConfirmed: json.emailConfirmed || false,
              isAuth: true,
            };
            this.setState(userSession);
            UserService.setUser(userSession);
          } else {
            UserService.deleteUserSession();
            this.setState({
              isAuth: false,
            });
          }
        } catch (error) {
          console.log('Errror-->', error);
        }
      }
    } else {
      UserService.deleteUserSession();
      this.setState({
        isAuth: false,
      });
    }
  }
  render() {
    const {
      isAuth,
      userName,
      firstName,
      userId,
      searchTerm,
      showResults,
      token,
      email,
      distance,
      zipCode,
      zipResults,
    } = this.state;

    return (
      <div className='App'>
        <Header isAuth={isAuth} userName={userName} firstName={firstName} />

        <MobileMenu />
      
        <div
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className='mycontainer'>
          <SideBar  />
          <AdsBar style={{ height: '100%' }} />
          {this.state.showResults ? (
            <InfiniteScroll
              dataLength={this.state.searchResults.length}
              next={this.getItemsInfinite}
              // hasMore={!this.state.disableInfiniteScroll}
              // loader={
              //   <Spinner
              //     className="block-center"
              //     style={{ width: "5rem", height: "5rem" }}
              //   />
              // }
            >
              <Spinner
                className='block-center'
                style={{
                  width: '5rem',
                  height: '5rem',
                  position: 'absolute',
                  top: '19rem',
                  left: '47%',
                }}
              />

              <h3
                style={{
                  color: '#000',
                  position: 'absolute',
                  top: '26rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}>
                Did You Know?
              </h3>
              <p
                style={{
                  color: '#000',
                  position: 'absolute',
                  top: '29rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}>
                DOUHAVE's "Get Matches Now" service searches over 80 different platforms for you when you post what you need?
              </p>
              <SearchResults
                isAuth={isAuth}
                userId={userId}
                searchResults={this.state.searchResults}
                token={token}
                firstName={firstName}
                zipCode={zipCode}
                distance={distance}
                zipResults={zipResults}
              />
            </InfiniteScroll>
          ) : (
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path={'/'}
                  render={(props) => (
                    <Home
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/WhatPeopleNeed'}
                  render={(props) => (
                    <WhatPeopleNeed
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/WhatYouNeed'}
                  render={(props) => (
                    <WhatYouNeed
                      {...props}
                      isAuth={isAuth}
                      email={email}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route path={'/HowItWorks'} component={HowItWorks} />
                <Route
                  path={'/PaymentFormLoader'}
                  component={PaymentFormLoader}
                />

                <Route path={'/About'} component={About} />
                <Route path={'/Contact'} component={Contact} />
                <Route path={'/Register'} component={Register} />
                <Route path={'/Signin'} component={Login} />
                <Route path={'/email-confirmed'} component={EmailConfirmed} />

                <Route
                  path={'/auto'}
                  render={(props) => (
                    <Auto
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/appliances'}
                  render={(props) => (
                    <Appliances
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/moto'}
                  render={(props) => (
                    <Moto
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/cell'}
                  render={(props) => (
                    <Cell
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/furniture'}
                  render={(props) => (
                    <Furniture
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/instruments'}
                  render={(props) => (
                    <Instruments
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/games'}
                  render={(props) => (
                    <Vidgame
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />

                <Route
                  path={'/homeservice'}
                  render={(props) => (
                    <HomeService
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/autoservice'}
                  render={(props) => (
                    <AutoService
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/clothing'}
                  render={(props) => (
                    <Clothing
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/misc'}
                  render={(props) => (
                    <Misc
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/collectibles'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='collectibles'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/antiques'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='antiques'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintage'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='vintage'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/offroadtrucks'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Trucks/Off-Road'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/lowridestrucks'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Trucks/Low-Rides'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/importtrucks'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Trucks/Import'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/worktrucks'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Trucks/Work'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/commutercar'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Cars/Commuter'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintagercar'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Cars/Vintage'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/importcar'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Cars/Import'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/musclecar'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Cars/Muscle'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintagemotorcycles'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Motorcycles/Vintage'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/modernmotorcycles'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Motorcycles/Modern'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/offroadmotorcycles'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Motorcycles/Off-Road'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/harleydavidsons'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Motorcycles/Harley-Davidsons'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/sportscards'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Collectibles/Cards/Sports'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/wrestlingcards'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Collectibles/Cards/Wrestling'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/pokemoncards'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Collectibles/Cards/Pokemon'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/othercards'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Collectibles/Cards/Others'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/records'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Collectibles/Records/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/instruments'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Vehicles/Instruments/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/arts'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Collectibles/Arts/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/stereos'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Electronics/Stereos/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/personalelectronics'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Electronics/Personal-Electronics/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/videogames'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Electronics/Video-Games/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintageconsolegames'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Electronics/Vintage-Console-Games/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/furniturehome'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Home/Furniture/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/decorehome'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Home/Decore/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/modernhome'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Home/Modern/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintagehome'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Home/Vintage/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/otherhome'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Home/Other/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/otherfashion'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Fashion/Others/'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintagemen'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Fashion/Men/Vintage'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/modernmen'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Fashion/Men/Modern'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintagewomen'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Fashion/Women/Vintage'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/modernwomen'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Fashion/Women/Modern'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/athleticwomen'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='Fashion/Women/Athletic'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/rarevehicles'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='rarevehicles'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/vintageHome'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='vintageHome'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/other'}
                  render={(props) => (
                    <CategoryItems
                      {...props}
                      category='other'
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/comequip'}
                  render={(props) => (
                    <ComEquip
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/housing'}
                  render={(props) => (
                    <Housing
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />
                <Route
                  path={'/beauty'}
                  render={(props) => (
                    <Beauty
                      {...props}
                      isAuth={isAuth}
                      userName={userName}
                      firstName={firstName}
                      userId={userId}
                      token={token}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />

                <Route
                  path={'/userpanel'}
                  render={(props) => (
                    <UserPanel
                      {...props}
                      zipCode={zipCode}
                      userId={userId}
                      token={token}
                      distance={distance}
                    />
                  )}
                />
                <Route path={'/messages'} render={(props) => <Messages />} />
                <Route
                  path={'/advanced'}
                  render={(props) => (
                    <AdvancedSearch
                      {...props}
                      isAuth={isAuth}
                      userId={userId}
                      token={token}
                      firstName={firstName}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  )}
                />

                <Route exact path='/item/:itemId' component={ItemDetails} />
                <Route
                  exact
                  path='/forgotPassword/:pwdResetToken'
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path='/forgotPassword'
                  component={ForgotPassword}
                />

                <Route
                  path={'/chat_view/:itemId/offerings'}
                  render={(props) => <ChatView {...props} type='offerings' />}
                />

                <Route
                  path={'/chat_view/:itemId/inquired'}
                  render={(props) => <ChatView {...props} type='inquired' />}
                />
              </Switch>
            </BrowserRouter>
          )}

          {/* // <Footer /> */}
        </div>
      </div>
    );
  }
}

export default App;
