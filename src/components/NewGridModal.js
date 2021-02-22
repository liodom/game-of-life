import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { generateGrid } from "../store/actions";

// ----------- Styled components -----------
const ModalStyled = styled.div`
  position: absolute;
  top: 2vh;
  left: 5vw;
  width: 90vw;
  height: 90vh;
  background-color: white;
  border: 10px solid green;
  border-radius: 40px;
`;

const FormStyled = styled.form`
  margin: 100px auto;
  margin-bottom: 50px;
  width: 90%;
  height: 20%;
`;

const InputContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  width: 20%;
`;

const LabelStyled = styled.label`
  display: inline-block;
  color: black;
  width: 200px;
  font-size: 1.4rem;
`;

const SelectedStyled = styled.select`
  display: inline-block;
  width: 100px;
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
`;

const OptionStyled = styled.option``;

const ButtonStyled = styled.button`
  display: flex;
  background-color: green;
  border: 2px solid lightgreen;
  color: white;
  font-family: Arial Narrow, sans-serif;
  font-size: 2rem;
  margin: 0 auto;
  padding: 10px 25px;
  color: white;
  outline: none;
  border-radius: 20px;
  ${(props) => (props.shouldHover ? "&:hover {cursor: pointer }" : "")}
`;

const StyledText = styled.div`
  margin: 10px auto;
  margin-top: 100px;
  width: 70%;
  text-align: center;
  font-size: 2rem;
`;

// ------------ NewGridModal Component ------------------

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

    if (rowValue !== 0 && columnValue !== 0) {
      // compose the grid from rows and columns
      const gridSeed = { numberOfRows: rowValue, numberOfColumns: columnValue };

      // dispatch the action to the reducer
      props.generateGrid(gridSeed);
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

    // close the modal
    props.closeModal();
  };

  console.log("new columnValue is => ", columnValue);
  console.log("new rowValue is => ", rowValue);
  console.log("GRID => ", grid);

  if (props.showModal) {
    return (
      <div className="modal">
        <ModalStyled>
          <StyledText>
            Use the dropdowns below to generate a random Grid
          </StyledText>
          {/* "" */}
          <FormStyled>
            <InputContainerStyled>
              <LabelStyled>Rows:</LabelStyled>
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
            {/* "" */}
            <InputContainerStyled>
              <LabelStyled>Columns:</LabelStyled>
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
            </InputContainerStyled>
            {/* "" */}
          </FormStyled>
          <ButtonStyled
            onClick={(event) => createGridHandler(event)}
            shouldHover
          >
            Create Grid
          </ButtonStyled>
        </ModalStyled>
      </div>
    );
  }
  return <></>;
};

const mapStateToProps = (state) => {
  console.log("STATE FROM NEW MODAL => ", state);
  return { userGrid: state.userGrid };
};

const mapDispatchToProps = {
  generateGrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGridModal);
