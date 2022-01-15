import React, { Component } from "react";
import { BiMenu } from "react-icons/bi";
import {
  FaCar,
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMusic,
  FaShoppingBag,
  FaTshirt,
  FaTv,
  FaYoutube,
} from "react-icons/fa";
import MultilevelSidebar from "react-multilevel-sidebar";
import "react-multilevel-sidebar/src/Sidebar.css";

let options = [
  {
    content: [
      {
        id: 1,
        name: " Vehicles",
        icon: <FaCar />,
        children: [
          {
            content: [
              {
                id: 2,
                name: "Trucks",
                children: [
                  {
                    content: [
                      { name: "Off-Road", to: "/offroadtrucks" },
                      { name: "Low Rides", to: "/lowridestrucks" },
                      { name: "Import", to: "/importtrucks" },
                      { name: "work", to: "/worktrucks" },
                    ],
                  },
                ],
              },
              {
                id: 3,
                name: "Cars",
                children: [
                  {
                    content: [
                      { name: "Commuter", to: "/cimmutercar" },
                      { name: "Vintage", to: "/vintagecar" },
                      { name: "Import", to: "/importcar" },
                      { name: "Muscle", to: "/musclecar" },
                    ],
                  },
                ],
              },
              {
                id: 4,
                name: "Motocycles",
                children: [
                  {
                    content: [
                      { name: "Vintage", to: "/vintagemotorcycles" },
                      { name: "Modern", to: "/modernmotorcycles" },
                      { name: "Off Road", to: "/offroadmotorcycles" },
                      { name: "Harley Davidson", to: "/harleydavidsons" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: " Collectibles",
        icon: <FaShoppingBag />,
        children: [
          {
            content: [
              {
                id: 6,
                name: "Cards",
                children: [
                  {
                    content: [
                      { name: "Sports", to: "/sportscards" },
                      { name: "Wrestling", to: "/wrestlingcards" },
                      { name: "Pokemon", to: "/pokemoncards" },
                      { name: "Others", to: "/otherscards" },
                    ],
                  },
                ],
              },
              {
                id: 7,
                name: "Records",
                to: "/records",
              },
              {
                id: 8,
                name: "Instruments",
                to: "/instruments",
              },
              {
                id: 9,
                name: "Arts",
                to: "/arts",
              },
            ],
          },
        ],
      },
      {
        id: 10,
        name: " Electronics",
        icon: <FaTv />,
        children: [
          {
            content: [
              {
                id: 11,
                name: "Stereos",
                to: "/stereos",
              },
              {
                id: 12,
                name: "Personal Electronics",
                to: "/personalelectronics",
              },
              {
                id: 13,
                name: "Video Games",
                to: "/videogames",
              },
              {
                id: 14,
                name: "Vintage Colsole Games",
                to: "/vintageconsolegames",
              },
            ],
          },
        ],
      },
      {
        id: 15,
        name: " Fashion",
        icon: <FaTshirt />,
        children: [
          {
            content: [
              {
                id: 16,
                name: "Men",
                to: "/stereos",
                children: [
                  {
                    content: [
                      { name: "Vintage", to: "/vintagemen" },
                      { name: "Modern", to: "/modernmen" },
                    ],
                  },
                ],
              },
              {
                id: 17,
                name: "Women",
                to: "/personalelectronics",
                children: [
                  {
                    content: [
                      { name: "Vintage", to: "/vintagewomen" },
                      { name: "Modern", to: "/modernwomen" },
                      { name: "Athletic", to: "/athleticnwomen" },
                    ],
                  },
                ],
              },
              {
                id: 18,
                name: "Others",
                to: "/otherfashion",
              },
            ],
          },
        ],
      },
      {
        id: 19,
        name: " Home",
        icon: <FaHome />,
        children: [
          {
            content: [
              {
                id: 20,
                name: "Furniture",
                to: "/furniturehome",
              },
              {
                id: 21,
                name: "Decore",
                to: "/decorehome",
              },
              {
                id: 22,
                name: "Vintage",
                to: "/VintageHome",
              },
              {
                id: 23,
                name: "Modern",
                to: "/modernhome",
              },
              {
                id: 24,
                name: "Other",
                to: "/otherhome",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Quick Links",
    content: [
      { id: 25, name: "Home", to: "/" },
      { id: 26, name: "What People Need", to: "/WhatPeopleNeed" },
      { id: 27, name: "What You Need", to: "/WhatYouNeed" },
      { id: 28, name: "About Us", to: "https://www.duhflip.com/" },
      { id: 29, name: "Contact", to: "/Contact" },
      { id: 30, name: "Partners", to: "/Partners" },
    ],
  },
  {
    title: "Social Links",
    content: [
      {
        id: 31,
        name: "  facebook",
        icon: <FaFacebook />,
        to: "https://www.facebook.com/DoUhave.co",
      },
      {
        id: 32,
        name: "  Instagram",
        icon: <FaInstagram />,
        to: "https://www.instagram.com/douhave.co",
      },
      {
        id: 33,
        name: "  Youtube",
        icon: <FaYoutube />,
        to: "https://www.youtube.com/channel/UCjwi66Egr3vAgOvz33mpJwg",
      },
      {
        id: 34,
        name: "  TicTok",
        icon: <FaMusic />,
        to: "https://www.tiktok.com/@team.douhave?lang=en",
      },
    ],
  },
];

class Drawer extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  //   you can also use this function on any of your event to open/close the sidebar
  handleSidebarToggle = (isOpen) => {
    this.setState({ isOpen });
  };

  handleClick = (itemOptions) => {
    /* 
            do something with the item you clicked.
            you can also send custom properties of your choice
            in the options array you'll be getting those here
            whenever you click that item
        */
  };

  render() {
    return (
      <div>
        <MultilevelSidebar
          open={this.state.isOpen}
          onToggle={this.handleSidebarToggle}
          options={options}
          header="All Categories"
          onItemClick={this.handleClick}
        />

        {/* using in our button to open the sidebar */}
        <button
          style={{ background: "none", border: "none", outline: "none" }}
          onClick={() => this.handleSidebarToggle(true)}
        >
          <BiMenu className="profile-icon" />
        </button>
      </div>
    );
  }
}

export default Drawer;
