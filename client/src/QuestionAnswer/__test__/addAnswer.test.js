/** @jest-environment jsdom */
import React from "react";
import axios from 'axios';
const config = require('../../../../config.js');
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { render, screen, fireEvent, wait } from "@testing-library/react";
// import {fireEvent} from '@testing-library/user-event';

import AddAnswer from '../addAnswer.jsx';

test("user input should be rendered", () => {
  const prod_id = 66642;
  const quest_id = 640766;
  var { getByText, getByLabelText,getByPlaceholderText } = render(<AddAnswer prod_id={prod_id} quest_id={quest_id} />);
  fireEvent.click(getByText("Add Answer"));
  /*
  const usernameInput=screen.getByPlaceholderText(/username .../i);
  // expect(usernameInput.value).toBeInTheDocument()
  await wait(()=>getByText(usernameInput.value))
  */

  const usernameInput=getByPlaceholderText(/username .../i);
  fireEvent.change(usernameInput,{target:{value:"sharon"}});
  // await wait(()=>getByText("sharon"))
   getByText("sharon")
})