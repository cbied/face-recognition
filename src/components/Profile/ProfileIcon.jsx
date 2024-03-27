import { Dropdown, ButtonToolbar, Popover, IconButton, Whisper } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

const ProfileIcon = ({ onRouteChange, handleOpen }) => {
  const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = (eventKey) => {
      if (eventKey === 1) {
        handleOpen();
      } else {
        onRouteChange("signIn");
      }
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1}>View Profile</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };
  return (
    <ButtonToolbar style={{ marginRight: "4rem", marginTop: "3rem" }}>
      <Whisper placement="leftStart" trigger="click" speaker={renderMenu}>
        <IconButton appearance="primary" icon={<PlusIcon />} circle />
      </Whisper>
    </ButtonToolbar>
  );
};

export default ProfileIcon;
