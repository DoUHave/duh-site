import React, { Component } from "react";
import {
  FaCar,
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaShoppingBag,
  FaTshirt,
  FaTv,
} from "react-icons/fa";
class SubMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        {
          name: "Vehicles",
          subMenu: [
            {
              name: "Trucks",
              link: "#",
              submenu: [
                { name: "Off-Road", link: "/offroadtrucks" },
                { name: "Low-Rides", link: "/lowridestrucks" },
                { name: "Import", link: "/importtrucks" },
                { name: "Work", link: "/worktrucks" },
              ],
            },
            {
              name: "Cars",
              link: "#",
              submenu: [
                { name: "Commuter", link: "/commutercar" },
                { name: "Vintage", link: "/vintagercar" },
                { name: "Import", link: "/importcar" },
                { name: "Muscle", link: "/musclecar" },
              ],
            },
            {
              name: "Motorcycles",
              link: "#",
              submenu: [
                { name: "Vintage", link: "/vintagemotorcycles" },
                { name: "Modern", link: "/modernmotorcycles" },
                { name: "Off-Road", link: "/offroadmotorcycles" },
                { name: "Harley-Davidsons", link: "/harleydavidsons" },
              ],
            },
          ],
        },
        {
          name: "Collectibles",
          subMenu: [
            {
              name: "Cards",
              link: "#",
              submenu: [
                { name: "Sports", link: "/sportscards" },
                { name: "Wrestling", link: "/wrestlingcards" },
                { name: "Pokemon", link: "/pokemoncards" },
                { name: "Others", link: "/othercards" },
              ],
            },
            {
              name: "Records",
              link: "/records",
            },
            {
              name: "Instruments",
              link: "/instruments",
            },
            {
              name: "Arts",
              link: "/arts",
            },
          ],
        },
        {
          name: "Electronics",

          subMenu: [
            {
              name: "Stereos",
              link: "/stereos",
            },
            {
              name: "Personal-Electronics",
              link: "/personalelectronics",
            },
            {
              name: "Video-Games",
              link: "/videogames",
            },
            {
              name: "Vintage-Console-Games",
              link: "/vintageconsolegames",
            },
          ],
        },
        {
          name: "Fashion",

          subMenu: [
            {
              name: "Men",
              link: "#",
              submenu: [
                { name: "Vintage", link: "/vintagemen" },
                { name: "Modern", link: "/modernmen" },
              ],
            },
            {
              name: "Women",
              link: "#",
              submenu: [
                { name: "Vintage", link: "/vintagewomen" },
                { name: "Modern", link: "/modernwomen" },
                { name: "Athletic", link: "/athleticwomen" },
              ],
            },
            {
              name: "Others",
              link: "/otherfashion",
            },
          ],
        },
        {
          name: "Home",

          subMenu: [
            {
              name: "Furniture",
              link: "/furniturehome",
            },
            {
              name: "Decore",
              link: "/decorehome",
            },
            {
              name: "Vintage",
              link: "/VintageHome",
            },
            {
              name: "Modern",
              link: "/modernhome",
            },
            {
              name: "Other",
              link: "/otherhome",
            },
          ],
        },
      ],
    };

    this.onCatClick = this.onCatClick.bind(this);
  }

  onCatClick(cat) {
    this.props.changeCategory(cat);
  }
  render() {
    let { menu } = this.state;

    function icon(item) {
      return item === "Vehicles" ? (
        <FaCar />
      ) : item === "Collectibles" ? (
        <FaShoppingBag />
      ) : item === "Electronics" ? (
        <FaTv />
      ) : item === "Fashion" ? (
        <FaTshirt />
      ) : item === "Home" ? (
        <FaHome />
      ) : null;
    }

    return (
      <>
        <div className="sub-menu" style={{ backgroundColor: "black" }}>
          <ul className="sub-menu-ul">
            {menu.map((oneLevel, i) => (
              <li key={i} className="sub-menu-li">
                <a href="#">
                  <i style={{ color: "#fff", padding: "0 12px" }}>
                    {icon(oneLevel.name)}
                  </i>
                  {oneLevel.name}
                  <i style={{ color: "#fff", padding: "0 12px" }}>
                    <FaChevronDown />
                  </i>
                </a>
                {oneLevel && oneLevel.subMenu && oneLevel.subMenu.length > 0 && (
                  <ul>
                    {oneLevel.subMenu.map((twoLevel, j) => (
                      <li key={j} className="sub-menu-li menu">
                        <a href={twoLevel.link}>
                          {twoLevel.name}
                          <i style={{ color: "#fff", padding: "0 12px" }}>
                            {twoLevel &&
                              twoLevel.submenu &&
                              twoLevel.submenu.length > 0 && <FaChevronRight />}
                          </i>
                        </a>
                        {twoLevel &&
                          twoLevel.submenu &&
                          twoLevel.submenu.length > 0 && (
                            <ul>
                              {twoLevel.submenu.map((threeLevel, k) => (
                                <li
                                  key={k}
                                  className="sub-menu-li menu"
                                  onClick={() =>
                                    this.onCatClick(
                                      oneLevel.name +
                                        "/" +
                                        twoLevel.name +
                                        "/" +
                                        threeLevel.name
                                    )
                                  }
                                >
                                  <a href={threeLevel.link}>
                                    {threeLevel.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div />
      </>
    );
  }
}

export default SubMenu;
