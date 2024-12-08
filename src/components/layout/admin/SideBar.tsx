import { Box } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logos/logo.svg";
import LogoMini from "../../../assets/logos/logomini.png";

const SideBar = (props: any) => {
  const { collapsed, toggled } = props;
  const navigate = useNavigate();
  return (
    <Sidebar collapsed={collapsed} toggled={toggled}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          px: 1,
        }}
      >
        <Link
          to="/admin"
          style={{
            width: 150,
            height: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {collapsed ? (
            <img src={LogoMini} style={{ height: "30px", width: "auto" }} />
          ) : (
            <img src={Logo} />
          )}
        </Link>
      </Box>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem onClick={() => navigate("/admin")}>Dashboard</MenuItem>
        <SubMenu label="Exams">
          <MenuItem onClick={() => navigate("/admin/exam-set")}>
            {" "}
            Exam set{" "}
          </MenuItem>
          {/* <MenuItem onClick={() => navigate("/admin/exam")}>Exam</MenuItem> */}
        </SubMenu>
        <SubMenu label="Vocabularies">
          <MenuItem onClick={() => navigate("/admin/voca-set")}>
            Voca sets
          </MenuItem>
          <MenuItem>Lessons</MenuItem>
          <MenuItem>Vocabularies</MenuItem>
        </SubMenu>
        <MenuItem onClick={() => navigate("/admin/listen-group")}>
          Listen Practice
        </MenuItem>
        <MenuItem> Account </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
