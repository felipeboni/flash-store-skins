import { useState } from "react";
import Switch from "react-custom-checkbox/switch";

import { gray, sky } from "tailwindcss/colors";

const checkedTrackStyle = {
  opacity: 1,
  transition: "all 0.25s ease-in-out",
  border: "1px solid" + sky["500"],
};

const checkedIndicatorStyle = {
  transform: "translateX(14px)",
  background: sky["500"],
};

const checkedIconStyle = {
  opacity: 1,
  transition: "all 0.25s ease-in-out",
};

const indicatorStyle = {
  alignItems: "center",
  background: gray["600"],
  borderRadius: 9999,
  bottom: 2,
  display: "flex",
  height: 12,
  justifyContent: "center",
  left: 2,
  outline: "solid 2px transparent",
  position: "absolute",
  transition: "0.25s",
  width: 12,
};

const trackStyle = {
  background: gray["900"],
  border: "1px solid" + gray["600"],
  borderRadius: 9999,
  cursor: "pointer",
  display: "flex",
  height: 18,
  marginRight: 12,
  position: "relative",
  width: 32,
};

const CustomSwitch = ({ label, state }) => {
  const [checked, setChecked] = state;

  return (
    <>
      <Switch
        checked={checked}
        onChange={setChecked}
        indicatorStyle={indicatorStyle}
        trackStyle={trackStyle}
        checkedIconStyle={checkedIconStyle}
        checkedIndicatorStyle={checkedIndicatorStyle}
        checkedTrackStyle={checkedTrackStyle}
        label={label}
        labelClassName={"text-white text-xs font-normal text-[#6b7280]"}
      />
    </>
  );
};

export { CustomSwitch };
