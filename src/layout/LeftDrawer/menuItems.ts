export type MenuAction = "profile" | "settings" | "contacts";
import personIcon from "../../shared/components/icons/person.svg";
import settingsIcon from "../../shared/components/icons/settings.svg";
import contactsIcon from "../../shared/components/icons/contacts.svg";

export type MenuItem = {
  text: string;
  icon: string;
  action: MenuAction;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    text: "My Profile",
    icon: personIcon,
    action: "profile",
  },
  {
    text: "Settings",
    icon: settingsIcon,
    action: "settings",
  },
  {
    text: "Contacts",
    icon: contactsIcon,
    action: "contacts",
  },
];
