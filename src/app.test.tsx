import React from "react";
import { shallow } from "enzyme";

import App from "./app";

test("App Component renders", done => {
  const wrapper = shallow(<App title="Testing" />);
  expect(wrapper).toMatchSnapshot();
  expect;
  done();
});
