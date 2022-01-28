import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import About from './components/About.js';
import AdsBar from './components/AdsBar.js';
import AdvancedSearch from './components/AdvancedSearch.js';
import CategoryItems from './components/CategoryItems.js';
import ChatView from './components/ChatView.js';
import Contact from './components/Contact.js';
import EmailConfirmed from './components/EmailConfirmed.js';
import Footer from './components/Footer.js';
import ForgotPassword from './components/ForgotPassword.js';
import Header from './components/Header.js';
import Home from './components/Home.js';
import HowItWorks from './components/HowItWorks.js';
import ItemDetails from './components/ItemDetails.js';
import Messages from './components/Messages.js';
import MobileMenu from './components/MobileMenu.js';
import PaymentFormLoader from './components/PaymentFormLoader.js';
import Register from './components/Register.js';
import SearchResults from './components/SearchResults.js';
import SideBar from './components/SideBar.js';
import Login from './components/Signin.js';
import UserPanel from './components/UserPanel.js';
import WhatPeopleNeed from './components/WhatPeopleNeed.js';
import WhatYouNeed from './components/WhatYouNeed.js';
import './PaymentFormLoader.css';
import ItemService from './services/ItemService.js';
import UserService from './services/UserService.js';
import Constant from './util/Constant.js';
import { getFromStorage } from './util/storage.js';
import Axios from 'axios';
import { FaUtensilSpoon } from 'react-icons/fa';
import './App.scss';

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
          
          <AdsBar/>
          
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
              <Routes>
                <Route
                  path='/'
                  element={
                    <React.Fragment>
                      <Home
                          isAuth={isAuth}
                          userName={userName}
                          firstName={firstName}
                          userId={userId}
                          token={token}
                          zipCode={zipCode}
                          distance={distance}
                        />
                    </React.Fragment>
                  }/>
                <Route
                  path={'/WhatPeopleNeed'}
                  element={
                    <React.Fragment>
                      <WhatPeopleNeed
                        isAuth={isAuth}
                        userName={userName}
                        firstName={firstName}
                        userId={userId}
                        token={token}
                        zipCode={zipCode}
                        distance={distance}
                      />
                    </React.Fragment>
                  }
                />
                <Route
                  path={'/WhatYouNeed'}
                  element={
                    <React.Fragment>
                      <WhatYouNeed
                        isAuth={isAuth}
                        email={email}
                        userName={userName}
                        firstName={firstName}
                        userId={userId}
                        token={token}
                        zipCode={zipCode}
                        distance={distance}
                      />
                    </React.Fragment>
                  }
                />
                <Route path={'/HowItWorks'} element= { <HowItWorks />} />
                <Route
                  path={'/PaymentFormLoader'}
                  element={ <PaymentFormLoader />}
                />

                <Route path={'/About'} element={ <About />} />
                <Route path={'/Contact'} element={ <Contact />} />
                <Route path={'/Register'} element={ <Register />} />
                <Route path={'/Signin'} element={ <Login />} />
                <Route path={'/email-confirmed'} element={ <EmailConfirmed />} />

                <Route
                  path={'/:route'}
                  element={
                    <React.Fragment>
                      <CategoryItems
                        isAuth={isAuth}
                        userName={userName}
                        firstName={firstName}
                        userId={userId}
                        token={token}
                        zipCode={zipCode}
                        distance={distance}
                      />
                    </React.Fragment>
                  }
                />
               
              <Route
                  path={'/userpanel'}
                  element={
                    <UserPanel
                      zipCode={zipCode}
                      userId={userId}
                      token={token}
                      distance={distance}
                    />
                  }
                />
                <Route path={'/messages'} element={ <Messages />} />
                <Route
                  path={'/advanced'}
                  element={
                    <AdvancedSearch
                      isAuth={isAuth}
                      userId={userId}
                      token={token}
                      firstName={firstName}
                      zipCode={zipCode}
                      distance={distance}
                    />
                  }
                />

                <Route exact path='/item/:id' element={<ItemDetails />} />

                <Route
                  exact
                  path='/forgotPassword/:pwdResetToken'
                  element={<ForgotPassword/>}
                />
                <Route
                  exact
                  path='/forgotPassword'
                  element={<ForgotPassword/>}
                />

                <Route
                  path={'/chat_view/:itemId/offerings'}
                  element={<ChatView type='offerings' />}
                />

                <Route
                  path={'/chat_view/:itemId/inquired'}
                  element={<ChatView type='inquired' />}
                />
              </Routes>
            </BrowserRouter>
          )}

          {/* // <Footer /> */}
        </div>
      </div>
    );
  }
}

export default App;
