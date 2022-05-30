import "./adminsidebar.css";
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

export default function AdminSidebar() {
  return (
    <div className="sidebaradmin">
      <div className="sidebarWrapperadmin">
        <div className="sidebarMenuadmin">
          <h3 className="sidebarTitleadmin">Dashboard</h3>
          <ul className="sidebarListadmin">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIconadmin" />
              Home
            </li>
            </Link>
            <li className="sidebarListItemadmin">
              <Timeline className="sidebarIconadmin" />
              Analytics
            </li>
            <li className="sidebarListItemadmin">
              <TrendingUp className="sidebarIconadmin" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenuadmin">
          <h3 className="sidebarTitleadmin">Quick Menu</h3>
          <ul className="sidebarListadmin">
            <Link to="/users" className="link">
              <li className="sidebarListItemadmin">
                <PermIdentity className="sidebarIconadmin" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItemadmin">
                <Storefront className="sidebarIconadmin" />
                Products
              </li>
            </Link>
            <li className="sidebarListItemadmin">
              <AttachMoney className="sidebarIconadmin" />
              Transactions
            </li>
            <li className="sidebarListItemadmin">
              <BarChart className="sidebarIconadmin" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenuadmin">
          <h3 className="sidebarTitleadmin">Notifications</h3>
          <ul className="sidebarListadmin">
            <li className="sidebarListItemadmin">
              <MailOutline className="sidebarIconadmin" />
              Mail
            </li>
            <li className="sidebarListItemadmin">
              <DynamicFeed className="sidebarIconadmin" />
              Feedback
            </li>
            <li className="sidebarListItemadmin">
              <ChatBubbleOutline className="sidebarIconadmin" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenuadmin">
          <h3 className="sidebarTitleadmin">Staff</h3>
          <ul className="sidebarListadmin">
            <li className="sidebarListItemadmin">
              <WorkOutline className="sidebarIconadmin" />
              Manage
            </li>
            <li className="sidebarListItemadmin">
              <Timeline className="sidebarIconadmin" />
              Analytics
            </li>
            <li className="sidebarListItemadmin">
              <Report className="sidebarIconadmin" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}