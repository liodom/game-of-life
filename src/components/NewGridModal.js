import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { generateGrid } from "../store/actions";

// ----------- Styled components -----------
const ModalStyled = styled.div`
  position: absolute;
  top: 5vh;
  left: 10vw;
  width: 80vw;
  height: 80vh;
  background-color: lightgreen;
  border: 1px solid orange;
  border-radius: 10px;
`;

const FormStyled = styled.form`
  background-color: pink;
  margin: 10px auto;
`;

const InputContainerStyled = styled.div`
  disply: block;
`;

const LabelStyled = styled.label`
  display: inline-block;
  background-color: green;
  color: blue;
  width: 200px;
  margin-left: 200px;
`;

const InputStyled = styled.input`
  background-color: yellow;
`;

const SelectedStyled = styled.select`
  background-color: orange;
`;

const OptionStyled = styled.option`
  color: red;
`;

const ButtonStyled = styled.button`
  background-color: gray;
`;

const NewGridModal = (props) => {
  const [rowValue, setRowValue] = useState(0);
  const [columnValue, setColumnValue] = useState(0);
  const [grid, setGrid] = useState({});

  console.log("NEW GRID MODAL PROPS => ", props);

  // ---------- Helper Functions ------------
  const rowOnChangeHandler = (event) => {
    event.preventDefault();
    setRowValue(parseInt(event.target.value));
  };

  const columnOnChangeHandler = (event) => {
    event.preventDefault();
    setColumnValue(parseInt(event.target.value));
  };

  const createGridHandler = (event) => {
    event.preventDefault();

    let message = "";
    //  if (rowValue !== 0 && columnValue !== 0) {
    //    setGrid({
    //      ...grid,
    //      numberOfRows: rowValue,
    //      numberOfColumns: columnValue,
    //    });
    //  }

    if (rowValue !== 0 && columnValue !== 0) {
      // compose the grid from rows and columns
      const gridSeed = { numberOfRows: rowValue, numberOfColumns: columnValue };

      // dispatch the action to the reducer
      props.dispatch(generateGrid(gridSeed));
    } else if (rowValue === 0) {
      message =
        message + "\nThe number of rows must be greater than or equal to 2!";
      if (columnValue === 0) {
        message =
          message +
          "\nThe number of columns must be greater than or equal to 2!";
      }
    } else if (columnValue === 0) {
      message =
        message + "\nThe number of columns must be greater than or equal to 2!";
      if (rowValue === 0) {
        message =
          message + "\nThe number of rows must be greater than or equal to 2!";
      }
    }
    if (message !== "") {
      alert(message);
    }
    setGrid(props.userGrid);

    // close the modal
    props.closeModal();
  };

  console.log("new columnValue is => ", columnValue);
  console.log("new rowValue is => ", rowValue);
  console.log("GRID => ", grid);

  if (props.showModal) {
    return (
      <>
        <ModalStyled>
          <FormStyled>
            <InputContainerStyled>
              <LabelStyled>Number of rows:</LabelStyled>
              <SelectedStyled
                name="rows"
                onChange={(e) => rowOnChangeHandler(e)}
                required
              >
                <OptionStyled value="0">0</OptionStyled>
                <OptionStyled value="2">2</OptionStyled>
                <OptionStyled value="3">3</OptionStyled>
                <OptionStyled value="4">4</OptionStyled>
                <OptionStyled value="5">5</OptionStyled>
                <OptionStyled value="6">6</OptionStyled>
                <OptionStyled value="7">7</OptionStyled>
                <OptionStyled value="8">8</OptionStyled>
              </SelectedStyled>{" "}
            </InputContainerStyled>

            <InputContainerStyled>
              <LabelStyled>Number of columns:</LabelStyled>
              <SelectedStyled
                name="columns"
                onChange={(e) => columnOnChangeHandler(e)}
                required
              >
                <OptionStyled value="0">0</OptionStyled>
                <OptionStyled value="2">2</OptionStyled>
                <OptionStyled value="3">3</OptionStyled>
                <OptionStyled value="4">4</OptionStyled>
                <OptionStyled value="5">5</OptionStyled>
                <OptionStyled value="6">6</OptionStyled>
                <OptionStyled value="7">7</OptionStyled>
                <OptionStyled value="8">8</OptionStyled>
                <OptionStyled value="9">9</OptionStyled>
                <OptionStyled value="10">10</OptionStyled>
                <OptionStyled value="11">11</OptionStyled>
                <OptionStyled value="12">12</OptionStyled>
              </SelectedStyled>

              {/* <LabelStyled>Number of Columns: </LabelStyled>
            <InputStyled
              placeholder="Enter the number of columns"
              value={columnValue}
              onChange={(e) => columnOnChangeHandler(e)}
            /> */}
            </InputContainerStyled>
          </FormStyled>
          <ButtonStyled onClick={(event) => createGridHandler(event)}>
            Create Grid
          </ButtonStyled>
        </ModalStyled>
      </>
    );
  }
  return <></>;
};
const mapStateToProps = (state) => {
  console.log("STATE FROM NEW MODAL => ", state);
  return { userGrid: state.userGrid };
};

export default connect(mapStateToProps, null)(NewGridModal);
