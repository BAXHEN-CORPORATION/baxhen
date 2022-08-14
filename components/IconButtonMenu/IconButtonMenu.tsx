//** External Imports */
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

//** Local Imports */

//** Typings */

interface Menu {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  label: string;
}

export interface IconButtonMenuProps {
  open: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  menus: Menu[];
}

//** Default Props */
const defaultProps: Partial<IconButtonMenuProps> = {};

/**
 * Component for handling menu open and close actions and icons
 *
 * @component
 */
const Menu: React.FC<IconButtonMenuProps> = ({ open, onClick, menus }) => {
  return (
    <>
      <IconButton onClick={onClick} color="primary">
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      {open && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "transparent",
          }}
        >
          {menus.map(({ label, onClick }) => (
            <ListItem
              key={label}
              sx={{ height: "2rem", justifyContent: "center" }}
            >
              <ListItemText
                onClick={onClick}
                primary={label}
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                  cursor: "pointer",
                  minWidth: "max-content",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

Menu.defaultProps = defaultProps;

export default Menu;
