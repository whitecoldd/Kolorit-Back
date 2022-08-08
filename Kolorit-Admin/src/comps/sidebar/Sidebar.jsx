import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link to ='/sliders'>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Slider
              </li>
            </Link>
            <Link to ='/brands'>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Brand
              </li>
            </Link>
            <Link to ='/brandsIcons'>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Brands For Lower Slider
              </li>
            </Link>
            <Link to='/categories'>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to='/subcategories'>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                SubCategories
              </li>
            </Link>
            <Link to='/subsubcategories'>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                SubSubCategories
              </li>
            </Link>
            <Link to='/contacts'>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Contacts
              </li>
            </Link>
            <Link to='/abouts'>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                About
              </li>
            </Link>
            <Link to='/articles'>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Articles
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}