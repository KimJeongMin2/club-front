import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupsIcon from '@mui/icons-material/Groups';
import { ListSubheader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Diversity3Icon from '@mui/icons-material/Diversity3';
const drawerWidth = "220px";

export default function MasterDrawerLeft() {
  const navigate = useNavigate();

  const lists = [
    {
      subheader: "동아리 부원 관리",
      items: [
        {
          icon: <GroupsIcon />,
          text: "신청 목록 조회",
          path: "/ClubJoinList",
        },
        {
            icon: <Diversity3Icon />,
            text: "나의 동아리 부원",
            path: "/myClubMember",
          },
      ],
    },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };
  return (
    <Box
      position="fixed"
      sx={{
        marginTop: "20px",
        maxWidth: drawerWidth,
        height: "100%",
        bgcolor: "#ffffff",
      }}
    >
      {lists.map((list, index) => (
        <React.Fragment key={index}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            aria-labelledby="sidebar-header"
            subheader={
              <ListSubheader id="sidebar-header">
                {list.subheader}
              </ListSubheader>
            }
          >
             {list.items.map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleItemClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
}
