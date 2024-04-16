import { useRef } from "react";
import PropTypes from "prop-types";
import { FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";

const WidgetCommonSearch = ({ callback }) => {
  const search = useRef("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      callback(search.current.value);
    }
  };

  const handleClick = () => {
    callback(search.current.value);
  };

  return (
    <FormGroup>
      <FormLabel>Pencarian Barang</FormLabel>
      <FormControl
        ref={search}
        onKeyPress={handleKeyPress}
        placeholder="Search"
      />
      <Button onClick={handleClick}>Search</Button>
    </FormGroup>
  );
};

WidgetCommonSearch.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default WidgetCommonSearch;
